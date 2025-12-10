import React from 'react';
import { useCart } from '../context/CartContext';

function ProductCard({ product, onViewDetails }) {
  const { addToCart } = useCart();

  const isOutOfStock = product.quantity === 0;

  return (
    <div className="product-card">
      <div className="product-image" onClick={() => onViewDetails(product)}>
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} />
        ) : (
          <span>📦</span>
        )}
      </div>
      <div className="product-info">
        <h3
          className="product-name"
          onClick={() => onViewDetails(product)}
          style={{ cursor: 'pointer' }}
        >
          {product.name}
        </h3>
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">£{product.price.toFixed(2)}</span>
          <span className="product-quantity">
            {isOutOfStock ? 'Out of Stock' : `Stock: ${product.quantity}`}
          </span>
          <button
            className="add-to-cart"
            onClick={() => addToCart(product)}
            disabled={isOutOfStock}
            title={isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
          >
            {isOutOfStock ? '❌' : '🛒'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
