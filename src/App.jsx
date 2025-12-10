import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { DatabaseProvider } from './contexts/DatabaseContext'
import Layout from './components/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Companies from './pages/Companies'
import ProductGroups from './pages/ProductGroups'
import Products from './pages/Products'
import CustomerGroups from './pages/CustomerGroups'
import Customers from './pages/Customers'
import AuditTrail from './pages/AuditTrail'
import Reports from './pages/Reports'
import LoadingSpinner from './components/LoadingSpinner'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  
  if (loading) {
    return <LoadingSpinner />
  }
  
  if (!user) {
    return <Navigate to="/login" replace />
  }
  
  return children
}

function AppRoutes() {
  const { user } = useAuth()
  
  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
      <Route path="/" element={
        <ProtectedRoute>
          <Layout>
            <Dashboard />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/companies" element={
        <ProtectedRoute>
          <Layout>
            <Companies />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/product-groups" element={
        <ProtectedRoute>
          <Layout>
            <ProductGroups />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/products" element={
        <ProtectedRoute>
          <Layout>
            <Products />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/customer-groups" element={
        <ProtectedRoute>
          <Layout>
            <CustomerGroups />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/customers" element={
        <ProtectedRoute>
          <Layout>
            <Customers />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/audit-trail" element={
        <ProtectedRoute>
          <Layout>
            <AuditTrail />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/reports" element={
        <ProtectedRoute>
          <Layout>
            <Reports />
          </Layout>
        </ProtectedRoute>
      } />
    </Routes>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <DatabaseProvider>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <AppRoutes />
          </div>
        </DatabaseProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
