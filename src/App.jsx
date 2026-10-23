import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import AddProductForm from './components/AddProductForm';
import { initialProducts } from './data/products';
import './App.css';

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Smartphones', 'Accessories', 'Audio', 'Electronics', 'Computers', 'Wearables', 'Gadgets'];

  const handleUpdateQuantity = (id, delta) => {
    setProducts(products.map(p => {
      if (p.id === id) {
        const newQty = p.quantity + delta;
        return { ...p, quantity: newQty < 0 ? 0 : newQty };
      }
      return p;
    }));

    if (selectedProduct && selectedProduct.id === id) {
      const newQty = selectedProduct.quantity + delta;
      setSelectedProduct({ ...selectedProduct, quantity: newQty < 0 ? 0 : newQty });
    }
  };

  const handleAddProduct = (newProduct) => {
    setProducts([newProduct, ...products]);
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
    setSelectedProduct(null);
  };

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart!`);
    setSelectedProduct(null);
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const overallTotal = products.reduce((sum, p) => sum + (p.price * p.quantity), 0);
  const featuredProducts = products.slice(0, 5);

  return (
    <div className="app-container">
      <Navbar 
        cartCount={cart.length} 
        overallTotal={overallTotal} 
        onNavigate={(target) => {
          if (target === 'products') {
            const el = document.getElementById('product-list-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }} 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="hero-banner">
        <div className="hero-text-content">
          <h2>Upgrade Your Tech</h2>
          <p>Latest gadgets, better life. Find the best electronics at the best prices.</p>
          <button className="btn-yellow shop-now-btn" onClick={() => window.scrollTo({ top: 500, behavior: 'smooth' })}>
            Shop Now →
          </button>
        </div>
        
        <div className="hero-images-group">
          <img src="/tech-bundle.jpg" alt="Tech Bundle Mockup" className="hero-single-img" />
        </div>
      </div>

      <section id="featured-products-section" style={{ marginBottom: '30px' }}>
        <h2 className="section-title">Featured Products</h2>
        <div className="featured-grid">
          {featuredProducts.map(product => (
            <div 
              key={product.id} 
              className="product-card"
              onClick={() => setSelectedProduct(product)}
              style={{ cursor: 'pointer' }}
            >
              <img src={product.image} alt={product.name} className="card-img" />
              <div className="card-name">{product.name}</div>
              <div className="card-price">₱{product.price.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </section>

      <div id="product-list-section">
        <ProductList 
          products={filteredProducts} 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          onOpenAddModal={() => setIsAddModalOpen(true)}
          onSelectProduct={(product) => setSelectedProduct(product)}
        />
      </div>

      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content product-detail-modal" onClick={(e) => e.stopPropagation()}>
            <div className="detail-modal-body">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="detail-modal-img" />
              
              <div className="detail-modal-info">
                <h3>{selectedProduct.name}</h3>
                <p className="detail-meta">Category: {selectedProduct.category} | Rating: ⭐ {selectedProduct.rating}</p>
                <p className="detail-desc">{selectedProduct.description}</p>
                <p className="detail-specs"><strong>Specs:</strong> {selectedProduct.specifications}</p>
                
                <div className="detail-price">₱{selectedProduct.price.toLocaleString()}</div>
                
                <div className="detail-qty-row">
                  <span>Quantity:</span>
                  <div className="qty-controls">
                    <button className="qty-btn" onClick={() => handleUpdateQuantity(selectedProduct.id, -1)}>-</button>
                    <span>{selectedProduct.quantity}</span>
                    <button className="qty-btn" onClick={() => handleUpdateQuantity(selectedProduct.id, 1)}>+</button>
                  </div>
                </div>

                <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#facc15', marginTop: '8px' }}>
                  Subtotal: ₱{(selectedProduct.price * selectedProduct.quantity).toLocaleString()}
                </div>

                <div className="detail-modal-actions">
                  <button className="btn-yellow" onClick={() => handleAddToCart(selectedProduct)}>Add to Cart</button>
                  <button 
                    style={{ backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: '700', cursor: 'pointer' }} 
                    onClick={() => handleDeleteProduct(selectedProduct.id)}
                  >
                    Delete Product
                  </button>
                  <button className="btn-cancel" onClick={() => setSelectedProduct(null)}>Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isAddModalOpen && (
        <AddProductForm 
          onAddProduct={handleAddProduct} 
          onClose={() => setIsAddModalOpen(false)} 
        />
      )}
    </div>
  );
}

export default App;