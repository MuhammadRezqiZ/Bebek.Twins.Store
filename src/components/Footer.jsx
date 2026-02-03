import React from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5>Bebek Twins Store</h5>
            <p className="small text-white-50">
              Penyedia telur bebek berkualitas langsung dari peternakan kami. Segar, bergizi, dan terjangkau.
            </p>
          </div>
          <div className="col-md-4 mb-3">
            <h5>Kontak Kami</h5>
            <ul className="list-unstyled text-white-50">
              <li>Alamat: Jl. Raya Peternakan No. 123</li>
              <li>Email: info@bebektwins.com</li>
              <li>Telepon: +62 812-3456-7890</li>
            </ul>
          </div>
          <div className="col-md-4 mb-3">
            <h5>Ikuti Kami</h5>
            <div className="d-flex gap-3">
              <a href="#" className="text-white fs-4"><FaFacebook /></a>
              <a href="#" className="text-white fs-4"><FaInstagram /></a>
              <a href="#" className="text-white fs-4"><FaWhatsapp /></a>
            </div>
          </div>
        </div>
        <hr className="border-secondary" />
        <div className="text-center small text-white-50">
          &copy; {new Date().getFullYear()} Bebek Twins Store. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
