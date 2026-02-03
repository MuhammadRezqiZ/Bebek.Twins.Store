import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    const result = await login(username, password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="container-fluid px-0 d-flex justify-content-center align-items-center" style={{ minHeight: '80vh', width: '100%' }}>
      <div className="card border-0 shadow-lg p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="card-body">
          <h3 className="text-center text-primary fw-bold mb-4">Masuk Dashboard</h3>
          
          {error && <div className="alert alert-danger">{error}</div>}
          
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input 
                type="text" 
                className="form-control" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required 
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input 
                type="password" 
                className="form-control" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 py-2 fw-bold">Masuk</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
