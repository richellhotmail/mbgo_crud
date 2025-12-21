import React, { useState, useEffect } from 'react'
import { useDatabase } from '../contexts/DatabaseContext'
import { useAuth } from '../contexts/AuthContext'
import DataTable from '../components/DataTable'
import LoadingSpinner from '../components/LoadingSpinner'
import { Plus } from 'lucide-react'

function CustomerGroups() {
  const { query, logAudit } = useDatabase()
  const { user, hasPermission } = useAuth()
  const [customerGroups, setCustomerGroups] = useState([])
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingGroup, setEditingGroup] = useState(null)
  const [formData, setFormData] = useState({
    cust_group_code: '',
    cust_group_short_desc: '',
    cust_group_long_desc: '',
    company_code: '',
    enabled: true
  })
  const [codeError, setCodeError] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [customerGroupsResult, companiesResult] = await Promise.all([
        query(`SELECT cg.*, c.company_short_desc 
               FROM customer_groups cg 
               LEFT JOIN companies c ON cg.company_code = c.company_code 
               ORDER BY cg.cust_group_code`),
        query('SELECT * FROM companies WHERE enabled = 1 ORDER BY company_code')
      ])
      setCustomerGroups(customerGroupsResult.data || [])
      setCompanies(companiesResult.data || [])
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setShowForm(false)
    setEditingGroup(null)
    setFormData({
      cust_group_code: '',
      cust_group_short_desc: '',
      cust_group_long_desc: '',
      company_code: '',
      enabled: true
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setCodeError('')
    try {
      // Only check uniqueness when creating a new customer group
      if (!editingGroup) {
        const codeExists = customerGroups.some(
          (g) => g.cust_group_code.toUpperCase() === formData.cust_group_code.toUpperCase()
        )
        if (codeExists) {
          setCodeError('Customer Group Code must be unique.')
          return
        }
      }
      if (editingGroup) {
        await query(
          `UPDATE customer_groups SET 
           cust_group_short_desc = @short_desc, 
           cust_group_long_desc = @long_desc, 
           company_code = @company_code,
           enabled = @enabled, 
           updated_at = GETUTCDATE() 
           WHERE cust_group_code = @code`,
          {
            short_desc: formData.cust_group_short_desc,
            long_desc: formData.cust_group_long_desc,
            company_code: formData.company_code,
            enabled: formData.enabled,
            code: editingGroup.cust_group_code
          }
        )
        await logAudit('customer_groups', editingGroup.cust_group_code, 'UPDATE', editingGroup, formData, user.username || user.id)
      } else {
        await query(
          `INSERT INTO customer_groups (cust_group_code, cust_group_short_desc, cust_group_long_desc, company_code, enabled) 
           VALUES (@code, @short_desc, @long_desc, @company_code, @enabled)`,
          {
            code: formData.cust_group_code,
            short_desc: formData.cust_group_short_desc,
            long_desc: formData.cust_group_long_desc,
            company_code: formData.company_code,
            enabled: formData.enabled
          }
        )
        await logAudit('customer_groups', formData.cust_group_code, 'CREATE', null, formData, user.username || user.id)
      }
      resetForm()
      await loadData()
    } catch (error) {
      console.error('Error saving customer group:', error)
      alert('Error saving customer group: ' + error.message)
    }
  }

  const handleEdit = (group) => {
    setEditingGroup(group)
    setFormData({
      cust_group_code: group.cust_group_code,
      cust_group_short_desc: group.cust_group_short_desc,
      cust_group_long_desc: group.cust_group_long_desc || '',
      company_code: group.company_code,
      enabled: group.enabled
    })
    setShowForm(true)
  }

  const handleDelete = async (group) => {
    if (!confirm('Are you sure you want to delete this customer group?')) return
    try {
      await query('DELETE FROM customer_groups WHERE cust_group_code = @code', { code: group.cust_group_code })
      await logAudit('customer_groups', group.cust_group_code, 'DELETE', group, null, user.username || user.id)
      await loadData()
    } catch (error) {
      console.error('Error deleting customer group:', error)
      alert('Error deleting customer group: ' + error.message)
    }
  }

  const columns = [
    { key: 'cust_group_code', label: 'Code' },
    { key: 'cust_group_short_desc', label: 'Short Description' },
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Customer Groups</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage customer group categories
          </p>
        </div>
        {hasPermission('create', 'customer_groups') && (
          <button onClick={() => setShowForm(true)} className="btn-primary flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Customer Group</span>
          </button>
        )}
      </div>

      <DataTable
        data={customerGroups}
        columns={columns}
        onEdit={hasPermission('update', 'customer_groups') ? handleEdit : null}
        onDelete={hasPermission('delete', 'customer_groups') ? handleDelete : null}
      />

      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                {editingGroup ? 'Edit Customer Group' : 'Add New Customer Group'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Customer Group Code</label>
                  <input type="text" maxLength="3" required disabled={editingGroup} className="input-field"
                    value={formData.cust_group_code} onChange={(e) => {
                      setFormData({...formData, cust_group_code: e.target.value.toUpperCase()})
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
                    value={formData.cust_group_short_desc} onChange={(e) => setFormData({...formData, cust_group_short_desc: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Company</label>
                  <select required className="input-field" value={formData.company_code}
                    onChange={(e) => setFormData({...formData, company_code: e.target.value})}>
                    <option value="">Select Company</option>
                    {companies.map((company) => (
                      <option key={company.company_code} value={company.company_code}>
                        {company.company_code} - {company.company_short_desc}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Long Description</label>
                  <textarea rows="3" className="input-field" value={formData.cust_group_long_desc}
                    onChange={(e) => setFormData({...formData, cust_group_long_desc: e.target.value})}
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
                    {editingGroup ? 'Update' : 'Create'}
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

export default CustomerGroups
