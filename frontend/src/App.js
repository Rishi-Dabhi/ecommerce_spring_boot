import React, { useState } from 'react';
import './index.css';
import { CartProvider, useCart } from './context/CartContext';
import ProductList from './components/ProductList';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Success from './pages/Success';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('products');
  const [successOrder, setSuccessOrder] = useState(null);
  const { cart } = useCart();

  const handleOrderSuccess = (order) => {
    setSuccessOrder(order);
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
      default:
        return <ProductList />;
    }
  };

  return (
    <div className="App">
      <div className="navbar">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <h1 onClick={() => setCurrentPage('products')} style={{ cursor: 'pointer' }}>
            🛍️ E-Commerce Store
          </h1>
          <div className="navbar-buttons">
            <button onClick={() => setCurrentPage('cart')}>
              🛒 Cart
              {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
            </button>
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
