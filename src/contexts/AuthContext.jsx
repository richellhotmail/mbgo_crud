import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (username, password) => {
    // Simulate API call
    if (username === 'admin' && password === 'admin') {
      const userData = {
        id: 1,
        username: 'admin',
        role: 'admin',
        name: 'Administrator'
      }
      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
      return { success: true }
    } else if (username === 'manager' && password === 'manager') {
      const userData = {
        id: 2,
        username: 'manager',
        role: 'manager',
        name: 'Manager'
      }
      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
      return { success: true }
    } else if (username === 'staff' && password === 'staff') {
      const userData = {
        id: 3,
        username: 'staff',
        role: 'staff',
        name: 'Staff Member'
      }
      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
      return { success: true }
    }
    return { success: false, error: 'Invalid credentials' }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const hasPermission = (action, resource) => {
    if (!user) return false
    
    const permissions = {
      admin: {
        create: true,
        read: true,
        update: true,
        delete: true,
        audit: true,
        reports: true
      },
      manager: {
        create: true,
        read: true,
        update: true,
        delete: false,
        audit: true,
        reports: true
      },
      staff: {
        create: false,
        read: true,
        update: false,
        delete: false,
        audit: false,
        reports: false
      }
    }
    
    return permissions[user.role]?.[action] || false
  }

  const value = {
    user,
    login,
    logout,
    hasPermission,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
