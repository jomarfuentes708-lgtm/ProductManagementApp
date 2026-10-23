import React from 'react';

function ProductCard({ product, onClick }) {
  const isLowStock = product.quantity < 5;

  return (
    <div className={`product-card ${isLowStock ? 'is-low-stock' : ''}`} onClick={() => onClick(product)} style={{ cursor: 'pointer' }}>
      {isLowStock && <span className="low-stock-tag">LOW STOCK</span>}
      
      <img src={product.image} alt={product.name} className="card-img" />
      
      <div className="card-name">{product.name}</div>
      <div className="card-price">₱{product.price.toLocaleString()}</div>
    </div>
  );
}

export default ProductCard;