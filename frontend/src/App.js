import React, { useState } from 'react';
import './index.css';
import { CartProvider, useCart } from './context/CartContext';
import ProductList from './components/ProductList';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import ManagerLogin from './pages/ManagerLogin';
import ManagerDashboard from './pages/ManagerDashboard';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('products');
  const [successOrder, setSuccessOrder] = useState(null);
  const [managerLoggedIn, setManagerLoggedIn] = useState(!!localStorage.getItem('managerToken'));
  const { cart } = useCart();

  const handleOrderSuccess = (order) => {
    setSuccessOrder(order);
  };

  const handleManagerLoginSuccess = (token) => {
    localStorage.setItem('managerToken', token);
    setManagerLoggedIn(true);
    setCurrentPage('manager-dashboard');
  };

  const handleManagerLogout = () => {
    setManagerLoggedIn(false);
    localStorage.removeItem('managerToken');
    setCurrentPage('products');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'products':
        return <ProductList />;
      case 'cart':
        return <Cart onNavigate={setCurrentPage} />;
      case 'checkout':
        return <Checkout onNavigate={setCurrentPage} onOrderSuccess={handleOrderSuccess} />;
      case 'success':
        return <Success order={successOrder} onNavigate={setCurrentPage} />;
      case 'manager-login':
        return <ManagerLogin onLoginSuccess={handleManagerLoginSuccess} onCancel={() => setCurrentPage('products')} />;
      case 'manager-dashboard':
        return <ManagerDashboard onLogout={handleManagerLogout} />;
      default:
        return <ProductList />;
    }
  };

  return (
    <div className="App">
      <div className="navbar">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <h1 onClick={() => setCurrentPage(managerLoggedIn ? 'manager-dashboard' : 'products')} style={{ cursor: 'pointer' }}>
            🛍️ E-Commerce Store
          </h1>
          <div className="navbar-buttons">
            {managerLoggedIn && (
              <button onClick={() => setCurrentPage('manager-dashboard')} className="dashboard-btn">
                📊 Dashboard
              </button>
            )}
            {!managerLoggedIn && (
              <button onClick={() => setCurrentPage('manager-login')} className="manager-btn">
                👨‍💼 Manager
              </button>
            )}
            {!managerLoggedIn && (
              <button onClick={() => setCurrentPage('cart')}>
                🛒 Cart
                {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="container">
        {renderPage()}
      </div>
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;
