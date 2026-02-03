import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaSearch, FaWhatsapp } from 'react-icons/fa';
import axios from 'axios';
import produkImage from '../assets/asin.jpg';


const Shop = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/products');
        setProducts(res.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleOrder = (productName, price) => {
    const message = `Halo Admin Bebek Twins Store, saya ingin memesan *${productName}* dengan harga Rp ${price.toLocaleString()}. Apakah stok tersedia?`;
    const whatsappUrl = `https://wa.me/6282254905544?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}></div>
            <p className="mt-3 text-muted fw-bold">Memuat Produk...</p>
          </div>
        </div>
      );
  }

  return (
    <div className="container-fluid py-5 bg-light" style={{ minHeight: '100vh' }}>
      <div className="container">
        {/* Header Section */}
        <div className="row align-items-center mb-5">
            <div className="col-md-6">
                <h2 className="fw-bold text-primary mb-1">Katalog Produk</h2>
                <p className="text-muted">Dapatkan produk olahan bebek berkualitas langsung dari peternakan.</p>
            </div>
            <div className="col-md-6">
                <div className="input-group shadow-sm">
                    <span className="input-group-text bg-white border-0 ps-3">
                        <FaSearch className="text-muted" />
                    </span>
                    <input 
                        type="text" 
                        className="form-control border-0 py-3" 
                        placeholder="Cari produk (telur, daging, pupuk)..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
        </div>

        {/* Product Grid */}
        <div className="row g-4">
          {filteredProducts.map((product) => (
            <div className="col-sm-6 col-lg-3" key={product.id}>
              <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden product-card hover-shadow transition">
                <div className="position-relative">
                    <img 
                        src={produkImage} 
                        className="card-img-top object-fit-cover" 
                        alt={product.name}
                        style={{ height: '220px', width: '100%' }}
                        onError={(e) => {e.target.onerror = null; e.target.src="https://placehold.co/400x300?text=Produk"}}
                    />
                    <span className="position-absolute top-0 end-0 m-3 badge bg-white text-primary shadow-sm rounded-pill px-3 py-2">
                        {product.category}
                    </span>
                </div>
                
                <div className="card-body p-4 d-flex flex-column">
                  <h5 className="card-title fw-bold text-dark mb-2">{product.name}</h5>
                  <p className="card-text text-muted small mb-4 flex-grow-1" style={{ lineHeight: '1.6' }}>
                    {product.description}
                  </p>
                  
                  <div className="d-flex align-items-center justify-content-between mt-auto pt-3 border-top">
                    <div>
                        <small className="text-muted d-block" style={{ fontSize: '0.8rem' }}>Harga per unit</small>
                        <span className="fw-bold text-primary fs-5">Rp {product.price.toLocaleString()}</span>
                    </div>
                    <button 
                      className="btn btn-success rounded-circle shadow-sm d-flex align-items-center justify-content-center"
                      style={{ width: '45px', height: '45px' }}
                      onClick={() => handleOrder(product.name, product.price)}
                      title="Pesan via WhatsApp"
                    >
                      <FaWhatsapp className="fs-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {filteredProducts.length === 0 && (
            <div className="col-12 text-center py-5">
                <div className="py-5">
                    <FaSearch className="display-1 text-muted opacity-25 mb-3" />
                    <h4 className="text-muted fw-bold">Produk tidak ditemukan</h4>
                    <p className="text-muted">Coba cari dengan kata kunci lain.</p>
                </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
