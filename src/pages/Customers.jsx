import React, { useState, useEffect } from 'react'
import { useDatabase } from '../contexts/DatabaseContext'
import { useAuth } from '../contexts/AuthContext'
import DataTable from '../components/DataTable'
import LoadingSpinner from '../components/LoadingSpinner'
import { Plus } from 'lucide-react'

function Customers() {
  const { query, logAudit } = useDatabase()
  const { user, hasPermission } = useAuth()
  const [customers, setCustomers] = useState([])
  const [companies, setCompanies] = useState([])
  const [customerGroups, setCustomerGroups] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState(null)
  const [formData, setFormData] = useState({
    customer_code: '',
    customer_short_desc: '',
    customer_long_desc: '',
    cust_group_code: '',
    company_code: '',
    enabled: true
  })
  const [codeError, setCodeError] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [customersResult, companiesResult, customerGroupsResult] = await Promise.all([
        query(`SELECT c.*, co.company_short_desc, cg.cust_group_short_desc 
               FROM customers c 
               LEFT JOIN companies co ON c.company_code = co.company_code 
               LEFT JOIN customer_groups cg ON c.cust_group_code = cg.cust_group_code 
               ORDER BY c.customer_code`),
        query('SELECT * FROM companies WHERE enabled = 1 ORDER BY company_code'),
        query('SELECT * FROM customer_groups WHERE enabled = 1 ORDER BY cust_group_code')
      ])
      setCustomers(customersResult.data || [])
      setCompanies(companiesResult.data || [])
      setCustomerGroups(customerGroupsResult.data || [])
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setShowForm(false)
    setEditingCustomer(null)
    setFormData({
      customer_code: '',
      customer_short_desc: '',
      customer_long_desc: '',
      cust_group_code: '',
      company_code: '',
      enabled: true
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setCodeError('')
    try {
      // Only check uniqueness when creating a new customer
      if (!editingCustomer) {
        const codeExists = customers.some(
          (c) =>
            c.customer_code.toUpperCase() === formData.customer_code.toUpperCase() &&
            c.company_code === formData.company_code
        )
        if (codeExists) {
          setCodeError('Customer code must be unique for the selected company.')
          return
        }
      }
      if (editingCustomer) {
        await query(
          `UPDATE customers SET 
           customer_short_desc = @short_desc, 
           customer_long_desc = @long_desc, 
           cust_group_code = @cust_group_code,
           company_code = @company_code,
           enabled = @enabled, 
           updated_at = GETUTCDATE() 
           WHERE customer_code = @code`,
          {
            short_desc: formData.customer_short_desc,
            long_desc: formData.customer_long_desc,
            cust_group_code: formData.cust_group_code,
            company_code: formData.company_code,
            enabled: formData.enabled,
            code: editingCustomer.customer_code
          }
        )
        await logAudit('customers', editingCustomer.customer_code, 'UPDATE', editingCustomer, formData, user.username || user.id)
      } else {
        await query(
          `INSERT INTO customers (customer_code, customer_short_desc, customer_long_desc, cust_group_code, company_code, enabled) 
           VALUES (@code, @short_desc, @long_desc, @cust_group_code, @company_code, @enabled)`,
          {
            code: formData.customer_code,
            short_desc: formData.customer_short_desc,
            long_desc: formData.customer_long_desc,
            cust_group_code: formData.cust_group_code,
            company_code: formData.company_code,
            enabled: formData.enabled
          }
        )
        await logAudit('customers', formData.customer_code, 'CREATE', null, formData, user.username || user.id)
      }
      resetForm()
      await loadData()
    } catch (error) {
      console.error('Error saving customer:', error)
      alert('Error saving customer: ' + error.message)
    }
  }

  const handleEdit = (customer) => {
    setEditingCustomer(customer)
    setFormData({
      customer_code: customer.customer_code,
      customer_short_desc: customer.customer_short_desc,
      customer_long_desc: customer.customer_long_desc || '',
      cust_group_code: customer.cust_group_code,
      company_code: customer.company_code,
      enabled: customer.enabled
    })
    setShowForm(true)
  }

  const handleDelete = async (customer) => {
    if (!confirm('Are you sure you want to delete this customer?')) return
    try {
      await query('DELETE FROM customers WHERE customer_code = @code', { code: customer.customer_code })
      await logAudit('customers', customer.customer_code, 'DELETE', customer, null, user.username || user.id)
      await loadData()
    } catch (error) {
      console.error('Error deleting customer:', error)
      alert('Error deleting customer: ' + error.message)
    }
  }

  const columns = [
    { key: 'customer_code', label: 'Code' },
    { key: 'customer_short_desc', label: 'Description' },
    { key: 'cust_group_short_desc', label: 'Customer Group' },
    { key: 'company_short_desc', label: 'Company' },
    { 
      key: 'enabled', 
      label: 'Status',
      render: (value) => (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          value ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 
                  'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
        }`}>
          {value ? 'Enabled' : 'Disabled'}
        </span>
      )
    },
    { key: 'created_at', label: 'Created', render: (value) => new Date(value).toLocaleDateString() }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Customers</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage customer database
          </p>
        </div>
        {hasPermission('create', 'customers') && (
          <button onClick={() => setShowForm(true)} className="btn-primary flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Customer</span>
          </button>
        )}
      </div>

      <DataTable
        data={customers}
        columns={columns}
        onEdit={hasPermission('update', 'customers') ? handleEdit : null}
        onDelete={hasPermission('delete', 'customers') ? handleDelete : null}
      />

      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                {editingCustomer ? 'Edit Customer' : 'Add New Customer'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Customer Code</label>
                  <input type="text" maxLength="6" required disabled={editingCustomer} className="input-field"
                    value={formData.customer_code} onChange={(e) => {
                      setFormData({...formData, customer_code: e.target.value.toUpperCase()})
                      setCodeError('')
                    }}
                  />
                  {codeError && (
                    <p className="text-xs text-red-600 mt-1">{codeError}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Short Description</label>
                  <input type="text" maxLength="50" required className="input-field"
                    value={formData.customer_short_desc} onChange={(e) => setFormData({...formData, customer_short_desc: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Company</label>
                  <select required className="input-field" value={formData.company_code}
                    onChange={(e) => {
                      setFormData({ ...formData, company_code: e.target.value, cust_group_code: '' })
                    }}>
                    <option value="">Select Company</option>
                    {companies.map((company) => (
                      <option key={company.company_code} value={company.company_code}>
                        {company.company_code} - {company.company_short_desc}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Customer Group</label>
                  <select required className="input-field" value={formData.cust_group_code}
                    onChange={(e) => setFormData({...formData, cust_group_code: e.target.value})}>
                    <option value="">Select Customer Group</option>
                    {customerGroups
                      .filter((group) => group.company_code === formData.company_code)
                      .map((group) => (
                        <option key={group.cust_group_code} value={group.cust_group_code}>
                          {group.cust_group_code} - {group.cust_group_short_desc}
                        </option>
                      ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Long Description</label>
                  <textarea rows="3" className="input-field" value={formData.customer_long_desc}
                    onChange={(e) => setFormData({...formData, customer_long_desc: e.target.value})}
                  />
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="enabled" className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    checked={formData.enabled} onChange={(e) => setFormData({...formData, enabled: e.target.checked})}
                  />
                  <label htmlFor="enabled" className="ml-2 block text-sm text-gray-900 dark:text-white">
                    Enabled
                  </label>
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button type="button" onClick={resetForm} className="btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    {editingCustomer ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Customers
