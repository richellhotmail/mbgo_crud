import React, { useState, useEffect } from 'react'
import { useDatabase } from '../contexts/DatabaseContext'
import { useAuth } from '../contexts/AuthContext'
import DataTable from '../components/DataTable'
import LoadingSpinner from '../components/LoadingSpinner'
import { Plus } from 'lucide-react'

function Products() {
  const { query, logAudit } = useDatabase()
  const { user, hasPermission } = useAuth()
  const [products, setProducts] = useState([])
  const [companies, setCompanies] = useState([])
  const [productGroups, setProductGroups] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState({
    product_code: '',
    product_short_desc: '',
    product_long_desc: '',
    prod_grp_code: '',
    company_code: '',
    price_zone_1: 0,
    price_zone_2: 0,
    price_zone_3: 0,
    price_zone_4: 0,
    price_zone_5: 0,
    price_zone_6: 0,
    price_zone_7: 0,
    price_zone_8: 0,
    price_zone_9: 0,
    price_zone_10: 0,
    enabled: true
  })
  const [codeError, setCodeError] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [productsResult, companiesResult, productGroupsResult] = await Promise.all([
        query(`SELECT p.*, c.company_short_desc, pg.prod_grp_short_desc 
               FROM products p 
               LEFT JOIN companies c ON p.company_code = c.company_code 
               LEFT JOIN product_groups pg ON p.prod_grp_code = pg.prod_grp_code 
               ORDER BY p.product_code`),
        query('SELECT * FROM companies WHERE enabled = 1 ORDER BY company_code'),
        query('SELECT * FROM product_groups WHERE enabled = 1 ORDER BY prod_grp_code')
      ])
      
      setProducts(productsResult.data || [])
      setCompanies(companiesResult.data || [])
      setProductGroups(productGroupsResult.data || [])
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setCodeError('')
    try {
      // Only check uniqueness when creating a new product
      if (!editingProduct) {
        const codeExists = products.some(
          (p) =>
            p.product_code.toUpperCase() === formData.product_code.toUpperCase() &&
            p.company_code === formData.company_code
        )
        if (codeExists) {
          setCodeError('Product code must be unique for the selected company.')
          return
        }
      }
      // prepare params with proper names and types
      const params = {
        code: formData.product_code,
        short_desc: formData.product_short_desc,
        long_desc: formData.product_long_desc,
        prod_grp_code: formData.prod_grp_code || null,
        company_code: formData.company_code || null,
        pz1: formData.price_zone_1,
        pz2: formData.price_zone_2,
        pz3: formData.price_zone_3,
        pz4: formData.price_zone_4,
        pz5: formData.price_zone_5,
        pz6: formData.price_zone_6,
        pz7: formData.price_zone_7,
        pz8: formData.price_zone_8,
        pz9: formData.price_zone_9,
        pz10: formData.price_zone_10,
        enabled: formData.enabled ? 1 : 0
      }

      if (editingProduct) {
        // add code for WHERE
        params.code = editingProduct.product_code

        console.debug('Products UPDATE params:', params)
        await query(
          `UPDATE products SET 
           product_short_desc = @short_desc, 
           product_long_desc = @long_desc, 
           prod_grp_code = @prod_grp_code,
           company_code = @company_code,
           price_zone_1 = @pz1,
           price_zone_2 = @pz2,
           price_zone_3 = @pz3,
           price_zone_4 = @pz4,
           price_zone_5 = @pz5,
           price_zone_6 = @pz6,
           price_zone_7 = @pz7,
           price_zone_8 = @pz8,
           price_zone_9 = @pz9,
           price_zone_10 = @pz10,
           enabled = @enabled, 
           updated_at = GETUTCDATE() 
           WHERE product_code = @code`,
          params
        )
        
        await logAudit(
          'products',
          editingProduct.product_code,
          'UPDATE',
          editingProduct,
          formData,
          user.id
        )
      } else {
        console.debug('Products INSERT params:', params)
        await query(
          `INSERT INTO products (
            product_code, product_short_desc, product_long_desc, prod_grp_code, company_code,
            price_zone_1, price_zone_2, price_zone_3, price_zone_4, price_zone_5,
            price_zone_6, price_zone_7, price_zone_8, price_zone_9, price_zone_10, enabled
           ) VALUES (@code, @short_desc, @long_desc, @prod_grp_code, @company_code, @pz1, @pz2, @pz3, @pz4, @pz5, @pz6, @pz7, @pz8, @pz9, @pz10, @enabled)`,
          params
        )
        
        await logAudit(
          'products',
          formData.product_code,
          'CREATE',
          null,
          formData,
          user.id
        )
      }
      // close modal, clear editing and refresh
      setShowForm(false)
      setEditingProduct(null)
      resetForm()
      await loadData()
    } catch (error) {
      console.error('Error saving product:', error)
      alert('Error saving product: ' + (error.message || error))
    }
  }

  const resetForm = () => {
    setFormData({
      product_code: '',
      product_short_desc: '',
      product_long_desc: '',
      prod_grp_code: productGroups[0]?.prod_grp_code || '',
      company_code: companies[0]?.company_code || '',
      price_zone_1: 0,
      price_zone_2: 0,
      price_zone_3: 0,
      price_zone_4: 0,
      price_zone_5: 0,
      price_zone_6: 0,
      price_zone_7: 0,
      price_zone_8: 0,
      price_zone_9: 0,
      price_zone_10: 0,
      enabled: true
    })
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setFormData({
      product_code: product.product_code,
      product_short_desc: product.product_short_desc,
      product_long_desc: product.product_long_desc || '',
      prod_grp_code: product.prod_grp_code,
      company_code: product.company_code,
      price_zone_1: product.price_zone_1 || 0,
      price_zone_2: product.price_zone_2 || 0,
      price_zone_3: product.price_zone_3 || 0,
      price_zone_4: product.price_zone_4 || 0,
      price_zone_5: product.price_zone_5 || 0,
      price_zone_6: product.price_zone_6 || 0,
      price_zone_7: product.price_zone_7 || 0,
      price_zone_8: product.price_zone_8 || 0,
      price_zone_9: product.price_zone_9 || 0,
      price_zone_10: product.price_zone_10 || 0,
      enabled: product.enabled
    })
    setShowForm(true)
  }

  const handleDelete = async (product) => {
    if (!confirm('Are you sure you want to delete this product?')) return
    
    try {
      await query('DELETE FROM products WHERE product_code = @code AND company_code = @company_code', { code: product.product_code, company_code: product.company_code })
      await logAudit('products', product.product_code, 'DELETE', product, null, user.id)
      await loadData()
    } catch (error) {
      console.error('Error deleting product:', error)
      alert('Error deleting product: ' + (error.message || error))
    }
  }

  const columns = [
    { key: 'product_code', label: 'Code' },
    { key: 'product_short_desc', label: 'Description' },
    { key: 'prod_grp_short_desc', label: 'Product Group' },
    { key: 'company_short_desc', label: 'Company' },
    { key: 'price_zone_1', label: 'Price Zone 1', render: (value) => `${parseFloat(value || 0).toFixed(2)}` },
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Products</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage product catalog with pricing zones
          </p>
        </div>
        
        {hasPermission('create', 'products') && (
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Product</span>
          </button>
        )}
      </div>

      <DataTable
        data={products}
        columns={columns}
        onEdit={hasPermission('update', 'products') ? handleEdit : null}
        onDelete={hasPermission('delete', 'products') ? handleDelete : null}
      />

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white dark:bg-gray-800">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Product Code
                    </label>
                    <input
                      type="text"
                      maxLength="5"
                      required
                      disabled={editingProduct}
                      className="input-field"
                      value={formData.product_code}
                      onChange={(e) => {
                        setFormData({ ...formData, product_code: e.target.value.toUpperCase() })
                        setCodeError('')
                      }}
                    />
                    {codeError && (
                      <p className="text-xs text-red-600 mt-1">{codeError}</p>
                    )}
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
                      value={formData.product_short_desc}
                      onChange={(e) => setFormData({...formData, product_short_desc: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Product Group
                    </label>
                    <select
                      required
                      className="input-field"
                      value={formData.prod_grp_code}
                      onChange={(e) => setFormData({...formData, prod_grp_code: e.target.value})}
                    >
                      {productGroups.map(group => (
                        <option key={group.prod_grp_code} value={group.prod_grp_code}>
                          {group.prod_grp_code} - {group.prod_grp_short_desc}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Company
                    </label>
                    <select
                      required
                      className="input-field"
                      value={formData.company_code}
                      onChange={(e) => setFormData({...formData, company_code: e.target.value})}
                    >
                      <option value="">Select Company</option>
                      {companies.map(company => (
                        <option key={company.company_code} value={company.company_code}>
                          {company.company_code} - {company.company_short_desc}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Long Description
                  </label>
                  <textarea
                    rows="3"
                    className="input-field"
                    value={formData.product_long_desc}
                    onChange={(e) => setFormData({...formData, product_long_desc: e.target.value})}
                  />
                </div>
                
                <div>
                  <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">Pricing Zones</h4>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(zone => (
                      <div key={zone}>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Zone {zone}
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          className="input-field"
                          value={formData[`price_zone_${zone}`]}
                          onChange={(e) => setFormData({...formData, [`price_zone_${zone}`]: parseFloat(e.target.value) || 0})}
                        />
                      </div>
                    ))}
                  </div>
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
                      setEditingProduct(null)
                      resetForm()
                    }}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    {editingProduct ? 'Update' : 'Create'}
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

export default Products
