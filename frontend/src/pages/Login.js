import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // ✅ Import the CSS file

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        email,
        password
      });

      const token = res.data.token;
      if (!token) {
        setMessage('❌ Login failed. No token received.');
        return;
      }

      localStorage.setItem('token', token);
      setMessage('✅ Login successful!');

      const protectedRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/enquiry/user`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log('Protected data:', protectedRes.data);
      navigate('/enquiry');
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      setMessage('❌ Login failed. Check credentials or try again.');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit">Log In</button>
        </form>
        {message && <p className="status-message">{message}</p>}
      </div>
    </div>
  );
}

export default Login;
