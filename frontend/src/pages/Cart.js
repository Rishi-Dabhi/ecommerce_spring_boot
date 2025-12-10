import React from 'react';
import { useCart } from '../context/CartContext';

function Cart({ onNavigate }) {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <div className="cart-empty">
          <h2>Your Cart is Empty</h2>
          <p>Start shopping to add items to your cart!</p>
          <button
            className="btn-continue"
            onClick={() => onNavigate('products')}
            style={{ marginTop: '1.5rem', padding: '0.8rem 2rem' }}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2 style={{ marginBottom: '2rem' }}>Shopping Cart ({cart.length} items)</h2>

      <div className="cart-items">
        {cart.map(item => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-image">
              {item.imageUrl ? (
                <img src={item.imageUrl} alt={item.name} />
              ) : (
                <span>📦</span>
              )}
            </div>
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-price">${item.price.toFixed(2)} each</div>
              <div className="cart-item-quantity">
                <label>Quantity:</label>
                <input
                  type="number"
                  min="1"
                  max={item.quantity}
                  value={item.cartQuantity}
                  onChange={(e) =>
                    updateQuantity(item.id, parseInt(e.target.value))
                  }
                />
              </div>
            </div>
            <div style={{ textAlign: 'right', marginLeft: '1rem' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem' }}>
                ${(item.price * item.cartQuantity).toFixed(2)}
              </div>
              <button
                className="cart-item-remove"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="cart-summary-row">
          <span>Subtotal:</span>
          <span>${getCartTotal().toFixed(2)}</span>
        </div>
        <div className="cart-summary-row">
          <span>Shipping:</span>
          <span>FREE</span>
        </div>
        <div className="cart-summary-row">
          <span>Tax:</span>
          <span>Calculated at checkout</span>
        </div>
        <div className="cart-summary-total">
          <span>Total:</span>
          <span>${getCartTotal().toFixed(2)}</span>
        </div>
      </div>

      <div className="cart-buttons">
        <button
          className="btn-checkout"
          onClick={() => onNavigate('checkout')}
        >
          Proceed to Checkout
        </button>
        <button
          className="btn-continue"
          onClick={() => onNavigate('products')}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default Cart;
