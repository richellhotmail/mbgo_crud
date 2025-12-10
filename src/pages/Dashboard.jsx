import React, { useState, useEffect } from 'react'
import { useDatabase } from '../contexts/DatabaseContext'
import { Building2, Package, ShoppingCart, Users, UserCheck, TrendingUp } from 'lucide-react'
import LoadingSpinner from '../components/LoadingSpinner'

function Dashboard() {
  const { query } = useDatabase()
  const [stats, setStats] = useState({
    companies: 0,
    productGroups: 0,
    products: 0,
    customerGroups: 0,
    customers: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const [
        companiesResult,
        productGroupsResult,
        productsResult,
        customerGroupsResult,
        customersResult
      ] = await Promise.all([
        query('SELECT COUNT(*) as count FROM companies WHERE enabled = true'),
        query('SELECT COUNT(*) as count FROM product_groups WHERE enabled = true'),
        query('SELECT COUNT(*) as count FROM products WHERE enabled = true'),
        query('SELECT COUNT(*) as count FROM customer_groups WHERE enabled = true'),
        query('SELECT COUNT(*) as count FROM customers WHERE enabled = true')
      ])

      setStats({
        companies: companiesResult.data[0]?.count || 0,
        productGroups: productGroupsResult.data[0]?.count || 0,
        products: productsResult.data[0]?.count || 0,
        customerGroups: customerGroupsResult.data[0]?.count || 0,
        customers: customersResult.data[0]?.count || 0
      })
    } catch (error) {
      console.error('Error loading stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      name: 'Companies',
      value: stats.companies,
      icon: Building2,
      color: 'bg-blue-500',
      href: '/companies'
    },
    {
      name: 'Product Groups',
      value: stats.productGroups,
      icon: Package,
      color: 'bg-green-500',
      href: '/product-groups'
    },
    {
      name: 'Products',
      value: stats.products,
      icon: ShoppingCart,
      color: 'bg-purple-500',
      href: '/products'
    },
    {
      name: 'Customer Groups',
      value: stats.customerGroups,
      icon: Users,
      color: 'bg-yellow-500',
      href: '/customer-groups'
    },
    {
      name: 'Customers',
      value: stats.customers,
      icon: UserCheck,
      color: 'bg-red-500',
      href: '/customers'
    }
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
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Overview of your business data
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {statCards.map((card) => (
          <div key={card.name} className="card p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className={`${card.color} rounded-md p-3`}>
                  <card.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    {card.name}
                  </dt>
                  <dd className="text-lg font-medium text-gray-900 dark:text-white">
                    {card.value}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Recent Activity
          </h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 dark:text-white">
                  System initialized successfully
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Database schema created
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <a
              href="/companies"
              className="block p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                <Building2 className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Manage Companies
                </span>
              </div>
            </a>
            <a
              href="/products"
              className="block p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                <ShoppingCart className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Manage Products
                </span>
              </div>
            </a>
            <a
              href="/customers"
              className="block p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                <UserCheck className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Manage Customers
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
