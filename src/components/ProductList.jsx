import React from 'react';
import ProductCard from './ProductCard';

function ProductList({ products, categories, selectedCategory, onCategoryChange, onOpenAddModal, onSelectProduct }) {
  return (
    <section style={{ marginTop: '30px' }}>
      <div className="product-list-header-row">
        <h2 className="section-title" style={{ margin: 0 }}>Product List</h2>
        
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <select 
            className="category-select" 
            value={selectedCategory} 
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <button className="btn-yellow" onClick={onOpenAddModal}>
            + Add New
          </button>
        </div>
      </div>

      <div className="product-grid">
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onClick={onSelectProduct}
          />
        ))}
      </div>
    </section>
  );
}

export default ProductList;