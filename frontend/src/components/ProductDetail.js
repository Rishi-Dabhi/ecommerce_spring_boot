import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

function ProductDetail({ product, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    onClose();
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= product.quantity) {
      setQuantity(value);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="product-detail">
          <div className="product-detail-image">
            {product.imageUrl ? (
              <img src={product.imageUrl} alt={product.name} />
            ) : (
              <span>📦</span>
            )}
          </div>
          <h2>{product.name}</h2>
          <div className="product-detail-price">£{product.price.toFixed(2)}</div>
          <p className="product-detail-description">{product.description}</p>
          <div className="product-detail-stock">
            <strong>Stock Available:</strong> {product.quantity} items
          </div>

          {product.quantity > 0 ? (
            <>
              <div className="quantity-selector">
                <label htmlFor="quantity">Quantity:</label>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  max={product.quantity}
                  value={quantity}
                  onChange={handleQuantityChange}
                />
              </div>
              <div className="modal-buttons">
                <button className="btn-primary" onClick={handleAddToCart}>
                  🛒 Add {quantity} to Cart
                </button>
                <button className="btn-secondary" onClick={onClose}>
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <div className="error">Out of Stock</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
