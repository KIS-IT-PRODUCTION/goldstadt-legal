import React, { useState } from 'react';

export default function Notifications({ API_BASE_URL, onLogout }) {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleSendNotification = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: '', message: '' });
    const token = localStorage.getItem('token'); 
    
    if (!token) return onLogout();

    try {
      const response = await fetch(`${API_BASE_URL}/notifications`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ title, message }),
      });

      if (response.ok) {
        setStatus({ type: 'success', message: 'Сповіщення успішно надіслано всім користувачам!' });
        setTitle(''); setMessage('');
      } else {
        if (response.status === 401) onLogout();
        setStatus({ type: 'error', message: 'Помилка при відправці сповіщення.' });
      }
    } catch {
      setStatus({ type: 'error', message: 'Помилка з\'єднання з сервером.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-panel form-card">
      <h3 style={{marginTop: 0, marginBottom: '20px'}}>Відправити сповіщення</h3>
      <p style={{color: 'rgba(255,255,255,0.7)', marginBottom: '30px'}}>
        Цей інструмент відправить push-сповіщення всім зареєстрованим користувачам додатку (у кого увімкнені дозволи).
      </p>

      {status.message && <div className={`alert ${status.type}`}>{status.message}</div>}
      
      <form onSubmit={handleSendNotification} className="news-form">
        <div className="input-group">
          <label>Заголовок сповіщення *</label>
          <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} required className="glass-input" placeholder="Наприклад: Важливе оновлення!" />
        </div>
        <div className="input-group">
          <label>Текст повідомлення *</label>
          <textarea value={message} onChange={(e)=>setMessage(e.target.value)} required className="glass-input textarea" style={{minHeight: '120px'}} placeholder="Введіть текст, який побачать користувачі..." />
        </div>
        <button type="submit" disabled={isLoading} className="glass-btn primary submit-btn">
          {isLoading ? 'Відправка...' : '🚀 Відправити зараз'}
        </button>
      </form>
    </div>
  );
}