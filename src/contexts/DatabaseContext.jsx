import React, { createContext, useContext, useEffect, useState } from 'react'

// Base API host — allow override via Vite env (VITE_API_URL); default to provided backend URL (no trailing slash)
const API_URL = (import.meta.env.REACT_APP_API_URL || 'https://mbgo-api-byf3dhb4fhfbc6cz.southeastasia-01.azurewebsites.net').replace(/\/$/, '')

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
    console.log('🔄 Initializing database schema...')
    const schema = {
      tables: [
        // ... your existing table definitions ...
      ]
    }

    try {
      const url = `${API_URL || ''}/api/database/schema`
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(schema)
      })

      const contentType = (res.headers.get('content-type') || '').toLowerCase()
      const text = await res.text()
      if (!text) throw new Error(`Empty response from ${url} (status ${res.status})`)

      // If server returned HTML (error page or index.html), surface a helpful message
      if (!contentType.includes('application/json') || text.trim().startsWith('<')) {
        const snippet = text.trim().slice(0, 300).replace(/\s+/g, ' ')
        throw new Error(`Expected JSON from ${url} but received ${contentType || 'unknown'} (status ${res.status}). Response snippet: ${snippet}`)
      }

      let data
      try { data = JSON.parse(text) } catch (parseErr) {
        const err = new Error(`Invalid JSON response from ${url}: ${parseErr.message}`)
        err.raw = text
        err.status = res.status
        throw err
      }

      if (res.ok && data.success) {
        console.log('✅ Database schema initialized successfully')
        setInitialized(true)
      } else {
        const message = data?.error || `Schema init failed (status ${res.status})`
        console.error('❌ Failed to initialize database schema:', message)
        setError(message)
      }
    } catch (err) {
      console.error('❌ Error initializing database:', err)
      setError(err.message || String(err))
    }
  }

  const query = async (sql, params = {}) => {
    const url = `${API_URL || ''}/api/database/query`
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: sql, params })
      })

      const contentType = (res.headers.get('content-type') || '').toLowerCase()
      const text = await res.text()
      if (!text) throw new Error(`Empty response from ${url} (status ${res.status})`)

      if (!contentType.includes('application/json') || text.trim().startsWith('<')) {
        const snippet = text.trim().slice(0, 300).replace(/\s+/g, ' ')
        throw new Error(`Expected JSON from ${url} but received ${contentType || 'unknown'} (status ${res.status}). Response snippet: ${snippet}`)
      }

      let result
      try { result = JSON.parse(text) } catch (parseErr) {
        const err = new Error(`Invalid JSON response from ${url}: ${parseErr.message}`)
        err.raw = text
        err.status = res.status
        throw err
      }

      if (!res.ok || !result.success) {
        const message = result?.error || `Database query failed (status ${res.status})`
        console.error('❌ Query error:', message)
        const err = new Error(message)
        err.raw = result
        throw err
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
