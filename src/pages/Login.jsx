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
        setStatus({ type: 'error', message: 'Неверные данные или отсутствуют права админа.' });
      }
    } catch {
      setStatus({ type: 'error', message: 'Ошибка соединения с сервером.' });
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.loginCard}>
        <div style={styles.loginHeader}>
          <h2 style={styles.title}>Admin Portal</h2>
          <p style={styles.subtitle}>Войдите для доступа к панели управления</p>
        </div>

        {status.message && (
          <div style={{
            ...styles.alert,
            backgroundColor: status.type === 'error' ? '#ffe3e3' : '#e3fcef',
            color: status.type === 'error' ? '#dc3545' : '#198754',
            borderColor: status.type === 'error' ? '#f5c2c2' : '#a3cfbb'
          }}>
            {status.type === 'error' ? '⚠️ ' : '✅ '}
            {status.message}
          </div>
        )}

        <form onSubmit={handleLogin} style={styles.loginForm}>
          <div style={styles.inputWrapper}>
            <label style={styles.label}>Email-Adresse</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="admin@goldstadtaktuell.de" 
              required 
              style={styles.input}
            />
          </div>

          <div style={styles.inputWrapper}>
            <label style={styles.label}>Passwort</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="••••••••" 
              required 
              style={styles.input}
            />
          </div>

          <button 
            type="submit" 
            disabled={authLoading} 
            style={{
              ...styles.button,
              opacity: authLoading ? 0.7 : 1,
              cursor: authLoading ? 'not-allowed' : 'pointer'
            }}
          >
            {authLoading ? (
              <span style={styles.loadingFlex}>
                <span style={styles.spinner}></span> Проверка...
              </span>
            ) : 'Войти'}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    width: '100%',
    backgroundColor: '#f4f6f9',
    backgroundLinearGradient: '135deg, #f5f7fa 0%, #c3cfe2 100%',
    boxSizing: 'border-box',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
  },
  loginCard: {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.02)',
    maxWidth: '420px',
    width: '100%',
    boxSizing: 'border-box',
    border: '1px solid #e9ecef',
  },
  loginHeader: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  title: {
    color: '#1a73e8',
    fontSize: '28px',
    fontWeight: '700',
    margin: '0 0 10px 0',
  },
  subtitle: {
    color: '#6c757d',
    fontSize: '14px',
    margin: 0,
    lineHeight: '1.5'
  },
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#495057',
  },
  input: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '12px 16px',
    fontSize: '15px',
    borderRadius: '8px',
    border: '1px solid #ced4da',
    backgroundColor: '#fff',
    color: '#212529',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    ':focus': {
      borderColor: '#1a73e8',
      boxShadow: '0 0 0 3px rgba(26, 115, 232, 0.15)'
    }
  },
  button: {
    backgroundColor: '#1a73e8',
    color: '#ffffff',
    padding: '14px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '16px',
    fontWeight: '600',
    boxShadow: '0 4px 6px rgba(26, 115, 232, 0.15)',
    transition: 'background-color 0.2s, transform 0.1s',
    marginTop: '10px',
  },
  alert: {
    padding: '12px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    marginBottom: '20px',
    border: '1px solid',
    textAlign: 'left',
    lineHeight: '1.4'
  },
  loadingFlex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px'
  },
  spinner: {
    width: '16px',
    height: '16px',
    border: '2px solid rgba(255,255,255,0.3)',
    borderTop: '2px solid #fff',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  }
};