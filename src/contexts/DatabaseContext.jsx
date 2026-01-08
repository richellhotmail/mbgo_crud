import React, { createContext, useContext, useEffect, useState } from 'react'

// Base API host — allow override via env; default to your API and strip trailing slash
const API_URL = (process.env.REACT_APP_API_URL || 'https://mbgo-api-byf3dhb4fhfbc6cz.southeastasia-01.azurewebsites.net').replace(/\/$/, '')

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
    initializeDatabase()
  }, [])

  const initializeDatabase = async () => {
    console.log("🔄 Initializing database schema...")

    const schema = {
      tables: [
        // ... your existing table definitions ...
      ]
    }

    try {
      const response = await fetch(`${API_URL}/api/database/schema`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(schema)
      })
      const data = await response.json()
      if (data.success) {
        console.log('✅ Database schema initialized successfully')
        console.log('📊 Tables created:', schema.tables.map(t => t.name).join(', '))
        setInitialized(true)
      } else {
        console.error('❌ Failed to initialize database schema:', data.error)
        setError(data.error)
      }
    } catch (err) {
      console.error('❌ Error initializing database:', err.message)
      setError(err.message)
    }
  }

  const query = async (sql, params = {}) => {
    try {
      const response = await fetch(`${API_URL}/api/database/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: sql, params })
      })

      const result = await response.json()
      if (!result.success) {
        console.error('❌ Query error:', result.error)
        throw new Error(result.error)
      }
      return result
    } catch (err) {
      console.error('Database query error:', err)
      throw err
    }
  }

  const logAudit = async (tableName, recordId, action, oldValues, newValues, userId) => {
    try {
      await query(
        `INSERT INTO audit_trail (table_name, record_id, action, old_values, new_values, user_id) 
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
      console.error('Error logging audit trail:', err)
    }
  }

  const value = { query, logAudit, initialized, error }

  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  )
}
