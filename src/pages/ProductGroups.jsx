import React, { useState, useEffect } from 'react'
import { useDatabase } from '../contexts/DatabaseContext'
import { useAuth } from '../contexts/AuthContext'
import DataTable from '../components/DataTable'
import LoadingSpinner from '../components/LoadingSpinner'
import { Plus } from 'lucide-react'

function ProductGroups() {
  const { query, logAudit } = useDatabase()
  const { user, hasPermission } = useAuth()
  const [productGroups, setProductGroups] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingGroup, setEditingGroup] = useState(null)
  const [formData, setFormData] = useState({
    prod_grp_code: '',
    prod_grp_short_desc: '',
    prod_grp_long_desc: '',
    enabled: true
  })

  useEffect(() => {
    loadProductGroups()
  }, [])

  const loadProductGroups = async () => {
    try {
      const result = await query('SELECT * FROM product_groups ORDER BY prod_grp_code')
      setProductGroups(result.data || [])
    } catch (error) {
      console.error('Error loading product groups:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      if (editingGroup) {
        await query(
          `UPDATE product_groups SET 
           prod_grp_short_desc = $1, 
           prod_grp_long_desc = $2, 
           enabled = $3, 
           updated_at = now() 
           WHERE prod_grp_code = $4`,
          [
            formData.prod_grp_short_desc,
            formData.prod_grp_long_desc,
            formData.enabled,
            editingGroup.prod_grp_code
          ]
        )
        
        await logAudit(
          'product_groups',
          editingGroup.prod_grp_code,
          'UPDATE',
          editingGroup,
          formData,
          user.id
        )
      } else {
        await query(
          `INSERT INTO product_groups (prod_grp_code, prod_grp_short_desc, prod_grp_long_desc, enabled) 
           VALUES ($1, $2, $3, $4)`,
          [
            formData.prod_grp_code,
            formData.prod_grp_short_desc,
            formData.prod_grp_long_desc,
            formData.enabled
          ]
        )
        
        await logAudit(
          'product_groups',
          formData.prod_grp_code,
          'CREATE',
          null,
          formData,
          user.id
        )
      }
      
      setShowForm(false)
      setEditingGroup(null)
      setFormData({
        prod_grp_code: '',
        prod_grp_short_desc: '',
        prod_grp_long_desc: '',
        enabled: true
      })
      loadProductGroups()
    } catch (error) {
      console.error('Error saving product group:', error)
    }
  }

  const handleEdit = (group) => {
    setEditingGroup(group)
    setFormData({
      prod_grp_code: group.prod_grp_code,
      prod_grp_short_desc: group.prod_grp_short_desc,
      prod_grp_long_desc: group.prod_grp_long_desc || '',
      enabled: group.enabled
    })
    setShowForm(true)
  }

  const handleDelete = async (group) => {
    if (!confirm('Are you sure you want to delete this product group?')) return
    
    try {
      await query('DELETE FROM product_groups WHERE prod_grp_code = $1', [group.prod_grp_code])
      await logAudit('product_groups', group.prod_grp_code, 'DELETE', group, null, user.id)
      loadProductGroups()
    } catch (error) {
      console.error('Error deleting product group:', error)
    }
  }

  const columns = [
    { key: 'prod_grp_code', label: 'Code' },
    { key: 'prod_grp_short_desc', label: 'Short Description' },
    { key: 'prod_grp_long_desc', label: 'Long Description' },
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Product Groups</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage product group categories
          </p>
        </div>
        
        {hasPermission('create', 'product_groups') && (
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Product Group</span>
          </button>
        )}
      </div>

      <DataTable
        data={productGroups}
        columns={columns}
        onEdit={hasPermission('update', 'product_groups') ? handleEdit : null}
        onDelete={hasPermission('delete', 'product_groups') ? handleDelete : null}
      />

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                {editingGroup ? 'Edit Product Group' : 'Add New Product Group'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Product Group Code
                  </label>
                  <input
                    type="text"
                    maxLength="2"
                    required
                    disabled={editingGroup}
                    className="input-field"
                    value={formData.prod_grp_code}
                    onChange={(e) => setFormData({...formData, prod_grp_code: e.target.value.toUpperCase()})}
                  />
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
                    value={formData.prod_grp_short_desc}
                    onChange={(e) => setFormData({...formData, prod_grp_short_desc: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Long Description
                  </label>
                  <textarea
                    rows="3"
                    className="input-field"
                    value={formData.prod_grp_long_desc}
                    onChange={(e) => setFormData({...formData, prod_grp_long_desc: e.target.value})}
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
                    onClick={() => {
                      setShowForm(false)
                      setEditingGroup(null)
                      setFormData({
                        prod_grp_code: '',
                        prod_grp_short_desc: '',
                        prod_grp_long_desc: '',
                        enabled: true
                      })
                    }}
                    className="btn-secondary"
                  >
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

export default ProductGroups
