import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaHome, FaChartLine, FaShoppingCart, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import logo from '../assets/logo2.png';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center gap-2 fw-bold" to="/">
          <img src={logo} alt="Bebek Twins Store Logo" height="30" /> Bebek Twins Store
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <NavLink className="nav-link d-flex align-items-center gap-1" to="/">
                <FaHome /> Beranda
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link d-flex align-items-center gap-1" to="/shop">
                <FaShoppingCart /> Toko
              </NavLink>
            </li>
            
            {user ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link d-flex align-items-center gap-1" to="/dashboard">
                    <FaChartLine /> Dashboard
                  </NavLink>
                </li>
                <li className="nav-item ms-lg-2">
                  <button onClick={logout} className="btn btn-outline-light btn-sm d-flex align-items-center gap-1">
                    <FaSignOutAlt /> Keluar
                  </button>
                </li>
              </>
            ) : (
               <li className="nav-item ms-lg-2">
                  <NavLink className="btn btn-light text-primary btn-sm d-flex align-items-center gap-1 fw-bold" to="/login">
                    <FaUser /> Masuk
                  </NavLink>
                </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
