import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: username, password })
      });
      const data = await res.json();
      if (data.success && data.data && data.data.token) {
        localStorage.setItem('admin_token', data.data.token);
        navigate('/admin');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-charcoal-900">
      <form onSubmit={handleSubmit} className="bg-charcoal-800 p-8 rounded-xl shadow-xl w-full max-w-sm flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-gold-400 mb-2 text-center">Admin Login</h2>
        <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} className="input-dark" required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="input-dark" required />
        {error && <div className="text-red-400 text-sm text-center">{error}</div>}
        <button type="submit" className="btn-primary w-full">Login</button>
          </form>
    </div>
  );
} 