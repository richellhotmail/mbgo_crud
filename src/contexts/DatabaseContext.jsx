import React, { createContext, useContext, useEffect } from 'react'

const DatabaseContext = createContext()

export function useDatabase() {
  const context = useContext(DatabaseContext)
  if (!context) {
    throw new Error('useDatabase must be used within a DatabaseProvider')
  }
  return context
}

export function DatabaseProvider({ children }) {
  const API_BASE = 'https://builder-api.empromptu.ai'
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer 9e4ad5280dba789c2d4f1a819d0d08b7',
    'X-Generated-App-ID': '0b5b1860-9b4f-48d5-bec3-a39c9dbcc59c',
    'X-Usage-Key': '97c6ffe313d977b765c43c3454daf443'
  }

  useEffect(() => {
    initializeDatabase()
  }, [])

  const initializeDatabase = async () => {
    const schema = {
      tables: [
        {
          name: 'companies',
          columns: [
            { name: 'company_code', type: 'varchar(2)', nullable: false },
            { name: 'company_short_desc', type: 'varchar(50)', nullable: false },
            { name: 'company_long_desc', type: 'text', nullable: true },
            { name: 'company_image', type: 'bytea', nullable: true },
            { name: 'enabled', type: 'boolean', nullable: false, default: 'true' },
            { name: 'created_at', type: 'timestamptz', default: 'now()' },
            { name: 'updated_at', type: 'timestamptz', default: 'now()' }
          ]
        },
        {
          name: 'product_groups',
          columns: [
            { name: 'prod_grp_code', type: 'varchar(2)', nullable: false },
            { name: 'prod_grp_short_desc', type: 'varchar(50)', nullable: false },
            { name: 'prod_grp_long_desc', type: 'text', nullable: true },
            { name: 'prod_grp_image', type: 'bytea', nullable: true },
            { name: 'enabled', type: 'boolean', nullable: false, default: 'true' },
            { name: 'created_at', type: 'timestamptz', default: 'now()' },
            { name: 'updated_at', type: 'timestamptz', default: 'now()' }
          ]
        },
        {
          name: 'products',
          columns: [
            { name: 'product_code', type: 'varchar(5)', nullable: false },
            { name: 'product_short_desc', type: 'varchar(50)', nullable: false },
            { name: 'product_long_desc', type: 'text', nullable: true },
            { name: 'product_image', type: 'bytea', nullable: true },
            { name: 'prod_grp_code', type: 'varchar(3)', nullable: false },
            { name: 'price_zone_1', type: 'numeric(10,2)', nullable: true, default: '0' },
            { name: 'price_zone_2', type: 'numeric(10,2)', nullable: true, default: '0' },
            { name: 'price_zone_3', type: 'numeric(10,2)', nullable: true, default: '0' },
            { name: 'price_zone_4', type: 'numeric(10,2)', nullable: true, default: '0' },
            { name: 'price_zone_5', type: 'numeric(10,2)', nullable: true, default: '0' },
            { name: 'price_zone_6', type: 'numeric(10,2)', nullable: true, default: '0' },
            { name: 'price_zone_7', type: 'numeric(10,2)', nullable: true, default: '0' },
            { name: 'price_zone_8', type: 'numeric(10,2)', nullable: true, default: '0' },
            { name: 'price_zone_9', type: 'numeric(10,2)', nullable: true, default: '0' },
            { name: 'price_zone_10', type: 'numeric(10,2)', nullable: true, default: '0' },
            { name: 'company_code', type: 'varchar(2)', nullable: false },
            { name: 'enabled', type: 'boolean', nullable: false, default: 'true' },
            { name: 'created_at', type: 'timestamptz', default: 'now()' },
            { name: 'updated_at', type: 'timestamptz', default: 'now()' }
          ]
        },
        {
          name: 'customer_groups',
          columns: [
            { name: 'cust_group_code', type: 'varchar(3)', nullable: false },
            { name: 'cust_group_short_desc', type: 'varchar(50)', nullable: false },
            { name: 'cust_group_long_desc', type: 'text', nullable: true },
            { name: 'cust_group_image', type: 'bytea', nullable: true },
            { name: 'company_code', type: 'varchar(2)', nullable: false },
            { name: 'enabled', type: 'boolean', nullable: false, default: 'true' },
            { name: 'created_at', type: 'timestamptz', default: 'now()' },
            { name: 'updated_at', type: 'timestamptz', default: 'now()' }
          ]
        },
        {
          name: 'customers',
          columns: [
            { name: 'customer_code', type: 'varchar(6)', nullable: false },
            { name: 'customer_short_desc', type: 'varchar(50)', nullable: false },
            { name: 'customer_long_desc', type: 'text', nullable: true },
            { name: 'customer_image', type: 'bytea', nullable: true },
            { name: 'cust_group_code', type: 'varchar(3)', nullable: false },
            { name: 'company_code', type: 'varchar(2)', nullable: false },
            { name: 'enabled', type: 'boolean', nullable: false, default: 'true' },
            { name: 'created_at', type: 'timestamptz', default: 'now()' },
            { name: 'updated_at', type: 'timestamptz', default: 'now()' }
          ]
        },
        {
          name: 'audit_trail',
          columns: [
            { name: 'id', type: 'uuid', nullable: false, default: 'gen_random_uuid()' },
            { name: 'table_name', type: 'varchar(50)', nullable: false },
            { name: 'record_id', type: 'varchar(50)', nullable: false },
            { name: 'action', type: 'varchar(10)', nullable: false },
            { name: 'old_values', type: 'jsonb', nullable: true },
            { name: 'new_values', type: 'jsonb', nullable: true },
            { name: 'user_id', type: 'varchar(50)', nullable: false },
            { name: 'timestamp', type: 'timestamptz', default: 'now()' }
          ]
        },
        {
          name: 'users',
          columns: [
            { name: 'id', type: 'uuid', nullable: false, default: 'gen_random_uuid()' },
            { name: 'username', type: 'varchar(50)', nullable: false },
            { name: 'password_hash', type: 'varchar(255)', nullable: false },
            { name: 'role', type: 'varchar(20)', nullable: false },
            { name: 'name', type: 'varchar(100)', nullable: false },
            { name: 'enabled', type: 'boolean', nullable: false, default: 'true' },
            { name: 'created_at', type: 'timestamptz', default: 'now()' },
            { name: 'updated_at', type: 'timestamptz', default: 'now()' }
          ]
        }
      ],
      indexes: [
        { table: 'companies', columns: ['company_code'], name: 'companies_pkey', unique: true },
        { table: 'product_groups', columns: ['prod_grp_code'], name: 'product_groups_pkey', unique: true },
        { table: 'products', columns: ['product_code'], name: 'products_pkey', unique: true },
        { table: 'customer_groups', columns: ['cust_group_code'], name: 'customer_groups_pkey', unique: true },
        { table: 'customers', columns: ['customer_code'], name: 'customers_pkey', unique: true },
        { table: 'audit_trail', columns: ['id'], name: 'audit_trail_pkey', unique: true },
        { table: 'users', columns: ['id'], name: 'users_pkey', unique: true },
        { table: 'users', columns: ['username'], name: 'users_username_uq', unique: true }
      ]
    }

    try {
      const response = await fetch(`${API_BASE}/database/schema`, {
        method: 'POST',
        headers,
        body: JSON.stringify(schema)
      })
      
      if (response.status === 200 || response.status === 304) {
        console.log('Database schema initialized successfully')
      } else {
        console.error('Failed to initialize database schema')
      }
    } catch (error) {
      console.error('Error initializing database:', error)
    }
  }

  const query = async (sql, params = []) => {
    try {
      const response = await fetch(`${API_BASE}/database/query`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          query: sql,
          params
        })
      })
      
      const result = await response.json()
      return result
    } catch (error) {
      console.error('Database query error:', error)
      throw error
    }
  }

  const logAudit = async (tableName, recordId, action, oldValues, newValues, userId) => {
    try {
      await query(
        `INSERT INTO audit_trail (table_name, record_id, action, old_values, new_values, user_id) 
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [tableName, recordId, action, JSON.stringify(oldValues), JSON.stringify(newValues), userId]
      )
    } catch (error) {
      console.error('Error logging audit trail:', error)
    }
  }

  const value = {
    query,
    logAudit
  }

  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  )
}
