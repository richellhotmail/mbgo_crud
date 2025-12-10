import React, { useState, useEffect } from 'react'
import { useDatabase } from '../contexts/DatabaseContext'
import LoadingSpinner from '../components/LoadingSpinner'
import { BarChart3, PieChart, TrendingUp, Download } from 'lucide-react'

function Reports() {
  const { query } = useDatabase()
  const [loading, setLoading] = useState(true)
  const [reportData, setReportData] = useState({
    summary: {
      totalCompanies: 0,
      totalProductGroups: 0,
      totalProducts: 0,
      totalCustomerGroups: 0,
      totalCustomers: 0,
      enabledProducts: 0,
      disabledProducts: 0
    },
    productsByGroup: [],
    customersByGroup: [],
    recentActivity: []
  })

  useEffect(() => {
    loadReportData()
  }, [])

  const loadReportData = async () => {
    try {
      const [
        summaryResult,
        productsByGroupResult,
        customersByGroupResult,
        recentActivityResult
      ] = await Promise.all([
        // Summary statistics
        Promise.all([
          query('SELECT COUNT(*) as count FROM companies WHERE enabled = true'),
          query('SELECT COUNT(*) as count FROM product_groups WHERE enabled = true'),
          query('SELECT COUNT(*) as count FROM products WHERE enabled = true'),
          query('SELECT COUNT(*) as count FROM customer_groups WHERE enabled = true'),
          query('SELECT COUNT(*) as count FROM customers WHERE enabled = true'),
          query('SELECT COUNT(*) as count FROM products WHERE enabled = true'),
          query('SELECT COUNT(*) as count FROM products WHERE enabled = false')
        ]),
        
        // Products by group
        query(`SELECT pg.prod_grp_short_desc as group_name, COUNT(p.product_code) as count
               FROM product_groups pg
               LEFT JOIN products p ON pg.prod_grp_code = p.prod_grp_code
               WHERE pg.enabled = true
               GROUP BY pg.prod_grp_code, pg.prod_grp_short_desc
               ORDER BY count DESC`),
        
        // Customers by group
        query(`SELECT cg.cust_group_short_desc as group_name, COUNT(c.customer_code) as count
               FROM customer_groups cg
               LEFT JOIN customers c ON cg.cust_group_code = c.cust_group_code
               WHERE cg.enabled = true
               GROUP BY cg.cust_group_code, cg.cust_group_short_desc
               ORDER BY count DESC`),
        
        // Recent activity from audit trail
        query(`SELECT table_name, action, COUNT(*) as count, MAX(timestamp) as last_activity
               FROM audit_trail
               WHERE timestamp >= NOW() - INTERVAL '30 days'
               GROUP BY table_name, action
               ORDER BY last_activity DESC
               LIMIT 10`)
      ])

      const [
        totalCompanies,
        totalProductGroups,
        totalProducts,
        totalCustomerGroups,
        totalCustomers,
        enabledProducts,
        disabledProducts
      ] = summaryResult

      setReportData({
        summary: {
          totalCompanies: totalCompanies.data[0]?.count || 0,
          totalProductGroups: totalProductGroups.data[0]?.count || 0,
          totalProducts: totalProducts.data[0]?.count || 0,
          totalCustomerGroups: totalCustomerGroups.data[0]?.count || 0,
          totalCustomers: totalCustomers.data[0]?.count || 0,
          enabledProducts: enabledProducts.data[0]?.count || 0,
          disabledProducts: disabledProducts.data[0]?.count || 0
        },
        productsByGroup: productsByGroupResult.data || [],
        customersByGroup: customersByGroupResult.data || [],
        recentActivity: recentActivityResult.data || []
      })
    } catch (error) {
      console.error('Error loading report data:', error)
    } finally {
      setLoading(false)
    }
  }

  const exportToCSV = (data, filename) => {
    if (!data || data.length === 0) return

    const headers = Object.keys(data[0])
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => `"${row[header] || ''}"`).join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `${filename}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
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
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reports</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Business intelligence and analytics dashboard
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                  Total Companies
                </dt>
                <dd className="text-lg font-medium text-gray-900 dark:text-white">
                  {reportData.summary.totalCompanies}
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <PieChart className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                  Total Products
                </dt>
                <dd className="text-lg font-medium text-gray-900 dark:text-white">
                  {reportData.summary.totalProducts}
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                  Total Customers
                </dt>
                <dd className="text-lg font-medium text-gray-900 dark:text-white">
                  {reportData.summary.totalCustomers}
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <BarChart3 className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                  Active Products
                </dt>
                <dd className="text-lg font-medium text-gray-900 dark:text-white">
                  {reportData.summary.enabledProducts}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Products by Group */}
        <div className="card p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Products by Group
            </h3>
            <button
              onClick={() => exportToCSV(reportData.productsByGroup, 'products-by-group')}
              className="btn-secondary flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
          
          <div className="space-y-3">
            {reportData.productsByGroup.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-900 dark:text-white">
                  {item.group_name || 'Unassigned'}
                </span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full"
                      style={{
                        width: `${Math.max((item.count / Math.max(...reportData.productsByGroup.map(p => p.count))) * 100, 5)}%`
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {item.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customers by Group */}
        <div className="card p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Customers by Group
            </h3>
            <button
              onClick={() => exportToCSV(reportData.customersByGroup, 'customers-by-group')}
              className="btn-secondary flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
          
          <div className="space-y-3">
            {reportData.customersByGroup.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-900 dark:text-white">
                  {item.group_name || 'Unassigned'}
                </span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{
                        width: `${Math.max((item.count / Math.max(...reportData.customersByGroup.map(c => c.count))) * 100, 5)}%`
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {item.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Recent Activity (Last 30 Days)
          </h3>
          <button
            onClick={() => exportToCSV(reportData.recentActivity, 'recent-activity')}
            className="btn-secondary flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Table
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Count
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Last Activity
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {reportData.recentActivity.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {item.table_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      item.action === 'CREATE' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                      item.action === 'UPDATE' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                      item.action === 'DELETE' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                      'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                    }`}>
                      {item.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {item.count}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {new Date(item.last_activity).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Reports
