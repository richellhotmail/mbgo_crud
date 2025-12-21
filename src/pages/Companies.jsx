import React, { useState, useEffect } from 'react'
import { useDatabase } from '../contexts/DatabaseContext'
import { useAuth } from '../contexts/AuthContext'
import DataTable from '../components/DataTable'
import LoadingSpinner from '../components/LoadingSpinner'
import { Plus } from 'lucide-react'

function Companies() {
  const { query, logAudit } = useDatabase()
  const { user, hasPermission } = useAuth()
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingCompany, setEditingCompany] = useState(null)
  const [formData, setFormData] = useState({
    company_code: '',
    company_short_desc: '',
    company_long_desc: '',
    enabled: true
  })
  const [codeError, setCodeError] = useState('')

  useEffect(() => {
    loadCompanies()
  }, [])

  const loadCompanies = async () => {
    try {
      const result = await query('SELECT * FROM companies ORDER BY company_code')
      setCompanies(result.data || [])
    } catch (error) {
      console.error('Error loading companies:', error)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setShowForm(false)
    setEditingCompany(null)
    setFormData({
      company_code: '',
      company_short_desc: '',
      company_long_desc: '',
      enabled: true
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setCodeError('')
    try {
      // Only check uniqueness when creating a new company
      if (!editingCompany) {
        const codeExists = companies.some(
          (c) => c.company_code.toUpperCase() === formData.company_code.toUpperCase()
        )
        if (codeExists) {
          setCodeError('Company code must be unique.')
          return
        }
      }
      if (editingCompany) {
        await query(
          `UPDATE companies SET 
           company_short_desc = @short_desc, 
           company_long_desc = @long_desc, 
           enabled = @enabled, 
           updated_at = GETUTCDATE() 
           WHERE company_code = @code`,
          {
            short_desc: formData.company_short_desc,
            long_desc: formData.company_long_desc,
            enabled: formData.enabled,
            code: editingCompany.company_code
          }
        )
        await logAudit('companies', editingCompany.company_code, 'UPDATE', editingCompany, formData, user.username || user.id)
      } else {
        await query(
          `INSERT INTO companies (company_code, company_short_desc, company_long_desc, enabled) 
           VALUES (@code, @short_desc, @long_desc, @enabled)`,
          {
            code: formData.company_code,
            short_desc: formData.company_short_desc,
            long_desc: formData.company_long_desc,
            enabled: formData.enabled
          }
        )
        await logAudit('companies', formData.company_code, 'CREATE', null, formData, user.username || user.id)
      }
      // Close modal and reload data on successful submission
      resetForm();
      await loadCompanies()
    } catch (error) {
      console.error('Error saving company:', error)
      alert('Error saving company: ' + error.message)
    }
  }

  const handleEdit = (company) => {
    setEditingCompany(company)
    setFormData({
      company_code: company.company_code,
      company_short_desc: company.company_short_desc,
      company_long_desc: company.company_long_desc || '',
      enabled: company.enabled
    })
    setShowForm(true)
  }

  const handleDelete = async (company) => {
    if (!confirm('Are you sure you want to delete this company?')) return
    
    try {
      await query('DELETE FROM companies WHERE company_code = @code', { code: company.company_code })
      await logAudit('companies', company.company_code, 'DELETE', company, null, user.username || user.id)
      await loadCompanies()
    } catch (error) {
      console.error('Error deleting company:', error)
      alert('Error deleting company: ' + error.message)
    }
  }

  const columns = [
    { key: 'company_code', label: 'Code' },
    { key: 'company_short_desc', label: 'Short Description' },
    { key: 'company_long_desc', label: 'Long Description' },
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Companies</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage company information
          </p>
        </div>
        
        {hasPermission('create', 'companies') && (
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Company</span>
          </button>
        )}
      </div>

      <DataTable
        data={companies}
        columns={columns}
        onEdit={hasPermission('update', 'companies') ? handleEdit : null}
        onDelete={hasPermission('delete', 'companies') ? handleDelete : null}
      />

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                {editingCompany ? 'Edit Company' : 'Add New Company'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Company Code
                  </label>
                  <input
                    type="text"
                    maxLength="2"
                    required
                    disabled={editingCompany}
                    className="input-field"
                    value={formData.company_code}
                    onChange={(e) => {
                      setFormData({ ...formData, company_code: e.target.value.toUpperCase() })
                      setCodeError('')
                    }}
                  />
                  {codeError && (
                    <p className="text-xs text-red-600 mt-1">{codeError}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Short Description
                  </label>
                  <input
                    type="text"
                    maxLength="50"
                    required
                    className="input-field"
                    value={formData.company_short_desc}
                    onChange={(e) => setFormData({...formData, company_short_desc: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Long Description
                  </label>
                  <textarea
                    rows="3"
                    className="input-field"
                    value={formData.company_long_desc}
                    onChange={(e) => setFormData({...formData, company_long_desc: e.target.value})}
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="enabled"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    checked={formData.enabled}
                    onChange={(e) => setFormData({...formData, enabled: e.target.checked})}
                  />
                  <label htmlFor="enabled" className="ml-2 block text-sm text-gray-900 dark:text-white">
                    Enabled
                  </label>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    {editingCompany ? 'Update' : 'Create'}
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

export default Companies
