import React from 'react';

function Success({ order, onNavigate }) {
  return (
    <div className="success-container">
      <div className="success-icon">✓</div>
      <h2>Order Placed Successfully!</h2>
      <p>Thank you for your purchase. Your order has been confirmed and will be delivered soon.</p>

      {order && (
        <>
          <div style={{ backgroundColor: '#f0f0f0', padding: '1.5rem', borderRadius: '8px', margin: '1.5rem 0' }}>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Order ID:</strong>
              <div className="order-id">{order.id}</div>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Customer Name:</strong> {order.customerName}
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Shipping Address:</strong> {order.address}
            </div>
            <div>
              <strong>Order Total:</strong> ${order.totalAmount.toFixed(2)}
            </div>
          </div>

          <p style={{ color: '#666', marginBottom: '1.5rem' }}>
            A confirmation email has been sent to your email address. You can track your order status online.
          </p>
        </>
      )}

      <button
        className="success-button"
        onClick={() => onNavigate('products')}
      >
        Continue Shopping
      </button>
    </div>
  );
}

export default Success;
