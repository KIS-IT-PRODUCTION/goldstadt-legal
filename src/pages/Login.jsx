import React, { useState } from 'react';

export default function Login({ onLoginSuccess, API_BASE_URL }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok && data.user?.role === 'admin') {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.user.role);
        onLoginSuccess();
      } else {
        setStatus({ type: 'error', message: 'Невірні дані або відсутні права.' });
      }
    } catch {
      setStatus({ type: 'error', message: 'Помилка з\'єднання з сервером.' });
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <div className="glass-panel login-card">
      <div className="login-header">
        <h2>Admin Portal</h2>
        <p>Увійдіть для доступу до панелі управління</p>
      </div>
      {status.message && <div className={`alert ${status.type}`}>{status.message}</div>}
      <form onSubmit={handleLogin} className="login-form">
        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" required className="glass-input"/>
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Пароль" required className="glass-input"/>
        <button type="submit" disabled={authLoading} className="glass-btn primary">
          {authLoading ? 'Перевірка...' : 'Увійти'}
        </button>
      </form>
    </div>
  );
}