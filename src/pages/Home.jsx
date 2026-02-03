import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaTruck, FaAward } from 'react-icons/fa';
import heroImage from '../assets/gambar1.png';
import logo from '../assets/logo2.png';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="bg-light py-5 text-center text-lg-start">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-lg-6 d-flex flex-column align-items-center text-center">
              <img src={logo} alt="Bebek Twins Store Logo" height="240" className="mb-4" />
              <h1 className="display-4 fw-bold text-primary mb-3">Telur Bebek Segar & Berkualitas</h1>
              <p className="lead text-muted mb-4">
                Langsung dari peternakan Bebek Twins Store. Kami menjamin kualitas dan kesegaran setiap butir telur untuk kebutuhan nutrisi keluarga Anda.
              </p>
              <div className="d-flex gap-3 justify-content-center">
                <Link to="/shop" className="btn btn-primary btn-lg px-4 rounded-pill">Belanja Sekarang</Link>
                <Link to="/dashboard" className="btn btn-outline-secondary btn-lg px-4 rounded-pill">Lihat Peternakan</Link>
              </div>
            </div>
            <div className="col-lg-6 mt-5 mt-lg-0">
              <div className="rounded-4 overflow-hidden shadow-lg bg-white p-3">
                 <img src={heroImage} alt="Peternakan Bebek Twins Store" className="img-fluid rounded-3" style={{width: '100%', height: 'auto', objectFit: 'cover'}} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <div className="container-fluid">
          <div className="row text-center g-4" style={{marginLeft: '20px', marginRight: '20px'}}>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm p-3">
                <div className="card-body">
                  <div className="text-primary mb-3">
                    <FaCheckCircle className="display-5" />
                  </div>
                  <h3 className="h5 fw-bold">100% Segar</h3>
                  <p className="text-muted">Telur dipanen setiap pagi dan langsung disortir untuk menjamin kesegaran maksimal.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm p-3">
                <div className="card-body">
                  <div className="text-primary mb-3">
                    <FaTruck className="display-5" />
                  </div>
                  <h3 className="h5 fw-bold">Pengiriman Cepat</h3>
                  <p className="text-muted">Layanan antar cepat ke seluruh wilayah kota untuk menjaga kualitas telur.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm p-3">
                <div className="card-body">
                  <div className="text-primary mb-3">
                    <FaAward className="display-5" />
                  </div>
                  <h3 className="h5 fw-bold">Kualitas Premium</h3>
                  <p className="text-muted">Pakan bebek berkualitas menghasilkan telur dengan kuning yang masif dan rasa gurih.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-5 text-center">
        <div className="container">
          <h2 className="fw-bold mb-3">Siap Untuk Memesan?</h2>
          <p className="lead mb-4">Dapatkan penawaran terbaik untuk pembelian grosir maupun eceran.</p>
          <Link to="/shop" className="btn btn-light btn-lg rounded-pill fw-bold text-primary">Lihat Katalog Produk</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
