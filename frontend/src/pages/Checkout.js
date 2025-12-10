import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

function Checkout({ onNavigate, onOrderSuccess }) {
  const { cart, getCartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!formData.customerName || !formData.address || !formData.cardNumber) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      // Create order items list
      const items = cart.map(item => ({
        productId: item.id,
        quantity: item.cartQuantity
      }));

      // Create order request
      const orderData = {
        customerName: formData.customerName,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        zipCode: formData.zipCode,
        cardLastFour: formData.cardNumber.slice(-4),
        itemsJson: JSON.stringify(items),
        totalAmount: getCartTotal(),
        items: items
      };

      // Submit order
      const response = await fetch('http://localhost:8080/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        const order = await response.json();
        clearCart();
        onOrderSuccess(order);
        onNavigate('success');
      } else {
        alert('Failed to place order. Please try again.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('An error occurred while placing your order.');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="checkout-container" style={{ gridTemplateColumns: '1fr' }}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Your cart is empty. Please add items before checkout.</p>
          <button
            className="btn-continue"
            onClick={() => onNavigate('products')}
            style={{ marginTop: '1rem' }}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <form className="checkout-form" onSubmit={handlePlaceOrder}>
        <h2>Checkout</h2>

        <div className="form-section">
          <h3>Shipping Information</h3>
          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleInputChange}
              required
              placeholder="John Doe"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="john@example.com"
            />
          </div>
          <div className="form-group">
            <label>Address *</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              placeholder="123 Main St, Apt 4B"
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="New York"
              />
            </div>
            <div className="form-group">
              <label>Zip Code</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                placeholder="10001"
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Payment Information</h3>
          <div className="form-group">
            <label>Cardholder Name *</label>
            <input
              type="text"
              name="cardName"
              value={formData.cardName}
              onChange={handleInputChange}
              required
              placeholder="John Doe"
            />
          </div>
          <div className="form-group">
            <label>Card Number *</label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              required
              placeholder="4532 1234 5678 9010"
              maxLength="19"
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Expiry Date</label>
              <input
                type="text"
                name="cardExpiry"
                value={formData.cardExpiry}
                onChange={handleInputChange}
                placeholder="MM/YY"
                maxLength="5"
              />
            </div>
            <div className="form-group">
              <label>CVC</label>
              <input
                type="text"
                name="cardCvc"
                value={formData.cardCvc}
                onChange={handleInputChange}
                placeholder="123"
                maxLength="4"
              />
            </div>
          </div>
        </div>

        <div className="checkout-buttons">
          <button type="submit" className="btn-place-order" disabled={loading}>
            {loading ? 'Processing...' : 'Place Order'}
          </button>
          <button
            type="button"
            className="btn-cancel-order"
            onClick={() => onNavigate('cart')}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>

      <div className="checkout-summary">
        <h3>Order Summary</h3>
        <div className="checkout-item" style={{ borderBottom: 'none', paddingBottom: '0' }}>
          <span style={{ fontWeight: '600' }}>Items in Cart:</span>
        </div>
        {cart.map(item => (
          <div key={item.id} className="checkout-item">
            <div className="checkout-item-name">
              {item.name} × {item.cartQuantity}
            </div>
            <div className="checkout-item-price">
              ${(item.price * item.cartQuantity).toFixed(2)}
            </div>
          </div>
        ))}

        <div className="checkout-totals">
          <div className="checkout-total-row">
            <span>Subtotal:</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </div>
          <div className="checkout-total-row">
            <span>Shipping:</span>
            <span className="success" style={{ padding: 0, margin: 0, color: '#27ae60' }}>
              FREE
            </span>
          </div>
          <div className="checkout-total-amount">
            <span>Total:</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
