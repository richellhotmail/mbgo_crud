import React, { useState, useEffect } from 'react'
import { useDatabase } from '../contexts/DatabaseContext'
import DataTable from '../components/DataTable'
import LoadingSpinner from '../components/LoadingSpinner'
import { Calendar, Filter } from 'lucide-react'

function AuditTrail() {
  const { query } = useDatabase()
  const [auditLogs, setAuditLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    table_name: '',
    action: '',
    user_id: '',
    date_from: '',
    date_to: ''
  })

  useEffect(() => {
    loadAuditLogs()
  }, [])

  const loadAuditLogs = async () => {
    try {
      let sql = 'SELECT * FROM audit_trail WHERE 1=1'
      const params = []
      let paramIndex = 1

      if (filters.table_name) {
        sql += ` AND table_name = $${paramIndex}`
        params.push(filters.table_name)
        paramIndex++
      }

      if (filters.action) {
        sql += ` AND action = $${paramIndex}`
        params.push(filters.action)
        paramIndex++
      }

      if (filters.user_id) {
        sql += ` AND user_id = $${paramIndex}`
        params.push(filters.user_id)
        paramIndex++
      }

      if (filters.date_from) {
        sql += ` AND timestamp >= $${paramIndex}`
        params.push(filters.date_from)
        paramIndex++
      }

      if (filters.date_to) {
        sql += ` AND timestamp <= $${paramIndex}`
        params.push(filters.date_to + ' 23:59:59')
        paramIndex++
      }

      sql += ' ORDER BY timestamp DESC LIMIT 1000'

      const result = await query(sql, params)
      setAuditLogs(result.data || [])
    } catch (error) {
      console.error('Error loading audit logs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const applyFilters = () => {
    setLoading(true)
    loadAuditLogs()
  }

  const clearFilters = () => {
    setFilters({
      table_name: '',
      action: '',
      user_id: '',
      date_from: '',
      date_to: ''
    })
    setLoading(true)
    setTimeout(() => loadAuditLogs(), 100)
  }

  const columns = [
    { 
      key: 'timestamp', 
      label: 'Timestamp',
      render: (value) => new Date(value).toLocaleString()
    },
    { key: 'table_name', label: 'Table' },
    { key: 'record_id', label: 'Record ID' },
    { 
      key: 'action', 
      label: 'Action',
      render: (value) => (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          value === 'CREATE' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
          value === 'UPDATE' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
          value === 'DELETE' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
          'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
        }`}>
          {value}
        </span>
      )
    },
    { key: 'user_id', label: 'User' }
  ]

  const handleView = (log) => {
    const details = {
      id: log.id,
      table: log.table_name,
      record: log.record_id,
      action: log.action,
      user: log.user_id,
      timestamp: new Date(log.timestamp).toLocaleString(),
      oldValues: log.old_values ? JSON.stringify(log.old_values, null, 2) : 'N/A',
      newValues: log.new_values ? JSON.stringify(log.new_values, null, 2) : 'N/A'
    }

    alert(`Audit Log Details:\n\nID: ${details.id}\nTable: ${details.table}\nRecord: ${details.record}\nAction: ${details.action}\nUser: ${details.user}\nTimestamp: ${details.timestamp}\n\nOld Values:\n${details.oldValues}\n\nNew Values:\n${details.newValues}`)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Audit Trail</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Track all data changes and user activities
        </p>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex items-center space-x-2 mb-4">
          <Filter className="h-5 w-5 text-gray-500" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Filters</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Table
            </label>
            <select
              className="input-field"
              value={filters.table_name}
              onChange={(e) => handleFilterChange('table_name', e.target.value)}
            >
              <option value="">All Tables</option>
              <option value="companies">Companies</option>
              <option value="product_groups">Product Groups</option>
              <option value="products">Products</option>
              <option value="customer_groups">Customer Groups</option>
              <option value="customers">Customers</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Action
            </label>
            <select
              className="input-field"
              value={filters.action}
              onChange={(e) => handleFilterChange('action', e.target.value)}
            >
              <option value="">All Actions</option>
              <option value="CREATE">Create</option>
              <option value="UPDATE">Update</option>
              <option value="DELETE">Delete</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              User ID
            </label>
            <input
              type="text"
              className="input-field"
              value={filters.user_id}
              onChange={(e) => handleFilterChange('user_id', e.target.value)}
              placeholder="Enter user ID"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              From Date
            </label>
            <input
              type="date"
              className="input-field"
              value={filters.date_from}
              onChange={(e) => handleFilterChange('date_from', e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              To Date
            </label>
            <input
              type="date"
              className="input-field"
              value={filters.date_to}
              onChange={(e) => handleFilterChange('date_to', e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 mt-4">
          <button
            onClick={clearFilters}
            className="btn-secondary"
          >
            Clear Filters
          </button>
          <button
            onClick={applyFilters}
            className="btn-primary"
          >
            Apply Filters
          </button>
        </div>
      </div>

      <DataTable
        data={auditLogs}
        columns={columns}
        onView={handleView}
        searchable={false}
      />
    </div>
  )
}

export default AuditTrail
