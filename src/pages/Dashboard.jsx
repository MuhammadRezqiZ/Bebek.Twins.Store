import React, { useState, useEffect, useContext } from 'react';
import { FaFeather, FaEgg, FaMoneyBillWave, FaBoxOpen, FaPlus, FaCalendarAlt } from 'react-icons/fa';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [history, setHistory] = useState([]);
  const [ternak, setTernak] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }

    if (user) {
      const fetchData = async () => {
        try {
          setDataLoading(true);
          const token = user.accessToken;
          const config = { headers: { Authorization: `Bearer ${token}` } };
          
          const statsRes = await axios.get('http://localhost:5001/api/stats', config);
          setStats(statsRes.data.data);

          const historyRes = await axios.get('http://localhost:5001/api/production', config);
          setHistory(historyRes.data.data);

          const ternakRes = await axios.get('http://localhost:5001/api/ternak', config);
          setTernak(ternakRes.data.data);
        } catch (error) {
          console.error("Error fetching data:", error);
          setError("Gagal mengambil data dari server. Pastikan server berjalan.");
        } finally {
          setDataLoading(false);
        }
      };
      fetchData();
    }
  }, [user, authLoading, navigate]);

  if (authLoading || dataLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}></div>
          <p className="mt-3 text-muted fw-bold">Memuat Dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger shadow-sm rounded-3 border-0">
          <h4 className="alert-heading fw-bold">Terjadi Kesalahan!</h4>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-5">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold text-dark mb-0">Dashboard Peternakan</h2>
          <span className="text-muted small"><FaCalendarAlt className="me-2"/>{new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
        
        {/* Stats Cards */}
        <div className="row g-4 mb-5">
          <div className="col-md-3 col-sm-6">
            <div className="card border-0 shadow-sm rounded-4 h-100 overflow-hidden bg-primary text-white position-relative">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <h6 className="card-title text-white-50 text-uppercase fw-bold small mb-1">Total Bebek</h6>
                    <h2 className="fw-bold mb-0">{stats.totalDucks.toLocaleString()}</h2>
                  </div>
                  <div className="p-3 bg-white bg-opacity-10 rounded-circle">
                    <FaFeather className="fs-4" />
                  </div>
                </div>
                <div className="mt-3">
                  <span className="badge bg-white bg-opacity-20 fw-normal">Ekor</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="card border-0 shadow-sm rounded-4 h-100 overflow-hidden bg-warning text-dark position-relative">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <h6 className="card-title text-black-50 text-uppercase fw-bold small mb-1">Produksi Hari Ini</h6>
                    <h2 className="fw-bold mb-0">{stats.dailyProduction.toLocaleString()}</h2>
                  </div>
                  <div className="p-3 bg-black bg-opacity-10 rounded-circle">
                    <FaEgg className="fs-4" />
                  </div>
                </div>
                <div className="mt-3">
                  <span className="badge bg-black bg-opacity-10 text-dark fw-normal">Butir</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="card border-0 shadow-sm rounded-4 h-100 overflow-hidden bg-success text-white position-relative">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <h6 className="card-title text-white-50 text-uppercase fw-bold small mb-1">Pendapatan Bulan Ini</h6>
                    <h2 className="fw-bold mb-0">Rp {stats.monthlyRevenue.toLocaleString()}</h2>
                  </div>
                  <div className="p-3 bg-white bg-opacity-10 rounded-circle">
                    <FaMoneyBillWave className="fs-4" />
                  </div>
                </div>
                <div className="mt-3">
                  <span className="badge bg-white bg-opacity-20 fw-normal">Estimasi</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="card border-0 shadow-sm rounded-4 h-100 overflow-hidden bg-info text-white position-relative">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <h6 className="card-title text-white-50 text-uppercase fw-bold small mb-1">Stok Pakan</h6>
                    <h2 className="fw-bold mb-0">{stats.feedStock}</h2>
                  </div>
                  <div className="p-3 bg-white bg-opacity-10 rounded-circle">
                    <FaBoxOpen className="fs-4" />
                  </div>
                </div>
                <div className="mt-3">
                  <span className="badge bg-white bg-opacity-20 fw-normal">Kg</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4">
          {/* Data Kelompok Ternak */}
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-header bg-white py-4 px-4 border-0 d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-0 fw-bold text-dark">Data Kelompok Ternak</h5>
                  <p className="text-muted small mb-0">Monitoring status populasi bebek</p>
                </div>
                <button className="btn btn-primary rounded-pill px-3 d-flex align-items-center gap-2">
                  <FaPlus className="fs-7" />
                  <span>Tambah Batch</span>
                </button>
              </div>
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th className="border-0 py-3 ps-4 text-secondary text-uppercase fw-bold small">Nama Kelompok</th>
                      <th className="border-0 py-3 text-secondary text-uppercase fw-bold small">Jenis</th>
                      <th className="border-0 py-3 text-center text-secondary text-uppercase fw-bold small">Populasi</th>
                      <th className="border-0 py-3 text-center text-secondary text-uppercase fw-bold small">Umur</th>
                      <th className="border-0 py-3 pe-4 text-center text-secondary text-uppercase fw-bold small">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ternak.length > 0 ? (
                      ternak.map((item) => (
                        <tr key={item.id}>
                          <td className="fw-bold ps-4 text-dark">{item.nama_kelompok}</td>
                          <td className="text-muted">{item.jenis_bebek}</td>
                          <td className="text-center fw-bold text-primary">{item.jumlah_saat_ini} <span className="text-muted fw-normal small">Ekor</span></td>
                          <td className="text-center">{item.umur_minggu} <span className="text-muted small">Minggu</span></td>
                          <td className="text-center pe-4">
                            <span className={`badge rounded-pill px-3 py-2 ${item.status === 'aktif' ? 'bg-success-subtle text-success' : 'bg-secondary-subtle text-secondary'}`}>
                              {item.status.toUpperCase()}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center py-5 text-muted">
                          <div className="d-flex flex-column align-items-center">
                            <FaFeather className="fs-1 mb-3 opacity-25" />
                            <p className="mb-0">Belum ada data ternak</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Riwayat Produksi */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-header bg-white py-4 px-4 border-0">
                <h5 className="mb-0 fw-bold text-dark">Riwayat Produksi</h5>
                <p className="text-muted small mb-0">5 hari terakhir</p>
              </div>
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th className="border-0 py-3 ps-4 text-secondary text-uppercase fw-bold small">Tanggal</th>
                      <th className="border-0 py-3 pe-4 text-end text-secondary text-uppercase fw-bold small">Hasil (Butir)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.length > 0 ? (
                      history.map((item) => (
                        <tr key={item.id}>
                          <td className="ps-4 text-dark">{new Date(item.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
                          <td className="text-end pe-4 fw-bold text-warning-emphasis">{item.total_eggs}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="2" className="text-center py-5 text-muted">
                          <div className="d-flex flex-column align-items-center">
                            <FaEgg className="fs-1 mb-3 opacity-25" />
                            <p className="mb-0">Belum ada data produksi</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
