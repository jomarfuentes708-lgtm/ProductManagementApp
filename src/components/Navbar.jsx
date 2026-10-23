import React from 'react';

function Navbar({ cartCount, onNavigate, searchQuery, onSearchChange }) {
  const handleProductsClick = () => {
    onNavigate('products');
    const featuredSection = document.getElementById('featured-products-section');
    if (featuredSection) {
      featuredSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHomeClick = () => {
    onNavigate('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <div className="nav-brand"></div>
        <div className="nav-links">
          <button className="nav-link-btn" onClick={handleHomeClick}>Home</button>
          <button className="nav-link-btn" onClick={handleProductsClick}>Products</button>
        </div>
      </div>
      
      <div className="nav-right">
        <div className="search-bar-container">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text" 
            placeholder="Search for products..." 
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="navbar-search-input"
          />
        </div>

        <div className="cart-icon-container" onClick={() => alert(`Cart Items: ${cartCount}`)}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#facc15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;