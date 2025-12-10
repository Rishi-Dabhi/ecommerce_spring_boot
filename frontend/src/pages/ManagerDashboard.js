import React, { useState, useEffect } from 'react';

function ManagerDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    imageUrl: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (activeTab === 'products') {
      fetchProducts();
    } else if (activeTab === 'orders') {
      fetchOrders();
    }
  }, [activeTab]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/manager/products');
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/manager/orders');
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
    setFormData({
      name: '',
      description: '',
      price: '',
      quantity: '',
      imageUrl: '',
    });
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product.id);
    setShowForm(true);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      imageUrl: product.imageUrl,
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const method = editingProduct ? 'PUT' : 'POST';
      const url = editingProduct
        ? `http://localhost:8080/api/manager/products/${editingProduct}`
        : 'http://localhost:8080/api/manager/products';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          quantity: parseInt(formData.quantity),
          imageUrl: formData.imageUrl,
        }),
      });

      if (response.ok) {
        setSuccessMessage(editingProduct ? 'Product updated successfully!' : 'Product added successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
        setEditingProduct(null);
        setShowForm(false);
        setFormData({
          name: '',
          description: '',
          price: '',
          quantity: '',
          imageUrl: '',
        });
        fetchProducts();
      }
    } catch (err) {
      console.error('Error saving product:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/manager/products/${productId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSuccessMessage('Product deleted successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
        fetchProducts();
      }
    } catch (err) {
      console.error('Error deleting product:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="manager-dashboard">
      <div className="dashboard-header">
        <h2>Manager Dashboard</h2>
        <button onClick={onLogout} className="logout-btn">
          Logout
        </button>
      </div>

      <div className="dashboard-tabs">
        <button
          className={`tab-button ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          Manage Products
        </button>
        <button
          className={`tab-button ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          View Orders
        </button>
      </div>

      {successMessage && <div className="success-message">{successMessage}</div>}

      {activeTab === 'products' && (
        <div className="products-section">
          <div className="section-header">
            <h3>Products Management</h3>
            {!showForm && (
              <button onClick={handleAddProduct} className="add-product-btn">
                + Add New Product
              </button>
            )}
          </div>

          {showForm && (
            <div className="product-form-container">
              <h4>{editingProduct ? 'Edit Product' : 'Add New Product'}</h4>
              <form onSubmit={handleSaveProduct}>
                <div className="form-group">
                  <label htmlFor="name">Product Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description:</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleFormChange}
                    rows="4"
                    required
                  ></textarea>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="price">Price (£):</label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleFormChange}
                      step="0.01"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="quantity">Quantity:</label>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="imageUrl">Image URL:</label>
                  <input
                    type="url"
                    id="imageUrl"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="form-buttons">
                  <button type="submit" disabled={loading}>
                    {loading ? 'Saving...' : editingProduct ? 'Update Product' : 'Add Product'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingProduct(null);
                      setShowForm(false);
                      setFormData({
                        name: '',
                        description: '',
                        price: '',
                        quantity: '',
                        imageUrl: '',
                      });
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {!showForm && (
            <div className="products-list">
              {loading ? (
                <p>Loading products...</p>
              ) : products.length === 0 ? (
                <p>No products available</p>
              ) : (
                <table className="products-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>£{product.price.toFixed(2)}</td>
                        <td>{product.quantity}</td>
                        <td className="actions">
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="edit-btn"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="delete-btn"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="orders-section">
          <h3>Orders</h3>
          {loading ? (
            <p>Loading orders...</p>
          ) : orders.length === 0 ? (
            <p>No orders yet</p>
          ) : (
            <div className="orders-list">
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer Name</th>
                    <th>Email</th>
                    <th>Total Amount</th>
                    <th>Address</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>#{order.id}</td>
                      <td>{order.customerName}</td>
                      <td>{order.email}</td>
                      <td>${order.totalAmount.toFixed(2)}</td>
                      <td>{order.address}, {order.city}</td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ManagerDashboard;
