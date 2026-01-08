import React, { createContext, useContext, useEffect, useState } from 'react'

const DatabaseContext = createContext()

export function useDatabase() {
  const context = useContext(DatabaseContext)
  if (!context) {
    throw new Error('useDatabase must be used within a DatabaseProvider')
  }
  return context
}

export function DatabaseProvider({ children }) {
  const [initialized, setInitialized] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    // initializeDatabase()
  }, [])

  /**
   * GENERIC QUERY FUNCTION
   * ✅ Uses relative URL (works on Azure)
   */
  const query = async (sql, params = {}) => {
    try {
      const response = await fetch('/api/database/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: sql,
          params
        })
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Database query failed')
      }

      return result
    } catch (err) {
      console.error('❌ Database query error:', err)
      throw err
    }
  }

  /**
   * AUDIT TRAIL
   */
  const logAudit = async (
    tableName,
    recordId,
    action,
    oldValues,
    newValues,
    userId
  ) => {
    try {
      await query(
        `INSERT INTO audit_trail
         (table_name, record_id, action, old_values, new_values, user_id)
         VALUES (@tableName, @recordId, @action, @oldValues, @newValues, @userId)`,
        {
          tableName,
          recordId,
          action,
          oldValues: JSON.stringify(oldValues),
          newValues: JSON.stringify(newValues),
          userId
        }
      )

      console.log(`📝 Audit logged: ${action} on ${tableName}`)
    } catch (err) {
      console.error('❌ Error logging audit trail:', err)
    }
  }

  const value = {
    query,
    logAudit,
    initialized,
    error
  }

  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  )
}
