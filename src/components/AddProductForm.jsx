import React, { useState } from 'react';

function AddProductForm({ onAddProduct, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Electronics',
    price: '',
    quantity: '',
    rating: '',
    description: '',
    specifications: '',
    image: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.quantity || !formData.description || !formData.specifications || !formData.rating) {
      alert('Pakipunan ang lahat ng fields!');
      return;
    }

    let finalImage = formData.image.trim();
    if (!finalImage) {
      finalImage = '/Tablet.jpg';
    }

    onAddProduct({
      ...formData,
      image: finalImage,
      id: Date.now(),
      price: Number(formData.price),
      quantity: Number(formData.quantity),
      rating: Number(formData.rating)
    });

    onClose();
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999
  };

  const modalStyle = {
    backgroundColor: '#181818',
    border: '1px solid #facc15',
    borderRadius: '10px',
    width: '90%',
    maxWidth: '550px',
    padding: '24px',
    boxSizing: 'border-box',
    color: '#ffffff'
  };

  const fieldGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    marginBottom: '12px',
    width: '100%',
    boxSizing: 'border-box'
  };

  const labelStyle = {
    fontSize: '0.85rem',
    color: '#a1a1aa',
    fontWeight: 'bold'
  };

  const inputStyle = {
    backgroundColor: '#262626',
    border: '1px solid #333333',
    color: '#ffffff',
    padding: '10px 12px',
    borderRadius: '6px',
    fontSize: '0.9rem',
    width: '100%',
    boxSizing: 'border-box',
    outline: 'none'
  };

  const rowStyle = {
    display: 'flex',
    gap: '12px',
    width: '100%'
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <h3 style={{ color: '#facc15', marginTop: 0, marginBottom: '18px', fontSize: '1.25rem' }}>Add New Product</h3>
        
        <form onSubmit={handleSubmit}>
          <div style={fieldGroupStyle}>
            <label style={labelStyle}>Product Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. iPhone 16" style={inputStyle} />
          </div>

          <div style={fieldGroupStyle}>
            <label style={labelStyle}>Category</label>
            <select name="category" value={formData.category} onChange={handleChange} style={inputStyle}>
              <option value="Smartphones">Smartphones</option>
              <option value="Accessories">Accessories</option>
              <option value="Audio">Audio</option>
              <option value="Electronics">Electronics</option>
              <option value="Computers">Computers</option>
              <option value="Wearables">Wearables</option>
              <option value="Gadgets">Gadgets</option>
            </select>
          </div>

          <div style={rowStyle}>
            <div style={{ ...fieldGroupStyle, flex: 1 }}>
              <label style={labelStyle}>Price (₱)</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="0" style={inputStyle} />
            </div>
            <div style={{ ...fieldGroupStyle, flex: 1 }}>
              <label style={labelStyle}>Quantity</label>
              <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} placeholder="0" style={inputStyle} />
            </div>
          </div>

          <div style={rowStyle}>
            <div style={{ ...fieldGroupStyle, flex: 1 }}>
              <label style={labelStyle}>Rating (1-5)</label>
              <input type="number" step="0.1" max="5" name="rating" value={formData.rating} onChange={handleChange} placeholder="4.5" style={inputStyle} />
            </div>
            <div style={{ ...fieldGroupStyle, flex: 1 }}>
              <label style={labelStyle}>Image File Path</label>
              <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="URL" style={inputStyle} />
            </div>
          </div>

          <div style={fieldGroupStyle}>
            <label style={labelStyle}>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="2" placeholder="Brief description..." style={{ ...inputStyle, resize: 'vertical' }}></textarea>
          </div>

          <div style={fieldGroupStyle}>
            <label style={labelStyle}>Specifications</label>
            <input type="text" name="specifications" value={formData.specifications} onChange={handleChange} placeholder="Specs..." style={inputStyle} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
            <button type="button" onClick={onClose} style={{ backgroundColor: 'transparent', color: '#a1a1aa', border: '1px solid #333', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' }}>Cancel</button>
            <button type="submit" style={{ backgroundColor: '#facc15', color: '#000000', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Save Product</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProductForm;