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
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ title, message }),
      });

      if (response.ok) {
        setStatus({ type: 'success', message: 'Сповіщення успішно надіслано всім користувачам!' });
        setTitle('');
        setMessage('');
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
    <div className="glass-panel form-card animated-fade-in">
      <div className="section-header">
        <div className="section-header-inner">
          <div>
            <div className="section-h">Push-сповіщення</div>
            <div className="section-sub">Відправити повідомлення всім користувачам</div>
          </div>
        </div>
      </div>

      <div className="notif-info-box">
        <span className="notif-info-icon">📡</span>
        <span>
          Повідомлення буде доставлено всім зареєстрованим користувачам, у яких увімкнені дозволи на сповіщення.
          Використовуйте цей інструмент відповідально — часті сповіщення знижують engagement.
        </span>
      </div>

      {status.message && (
        <div style={{ padding: '0 28px 4px' }}>
          <div className={`alert ${status.type}`} style={{ margin: 0 }}>
            {status.message}
          </div>
        </div>
      )}

      <form onSubmit={handleSendNotification}>
        <div className="form-body" style={{ paddingTop: '16px' }}>

          <div className="form-section-title">Повідомлення</div>

          <div className="form-group">
            <label>Заголовок *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="glass-input"
              placeholder="Наприклад: Важливе оновлення!"
            />
          </div>

          <div className="form-group">
            <label>Текст повідомлення *</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="glass-input tall"
              style={{ minHeight: '130px' }}
              placeholder="Введіть текст, який побачать користувачі..."
            />
          </div>

          <div style={{ marginTop: '8px' }}>
            <button
              type="submit"
              disabled={isLoading}
              className="glass-btn primary submit-btn"
            >
              {isLoading ? (
                <>
                  <div className="btn-spinner" />
                  Відправка...
                </>
              ) : (
                '🚀 Відправити зараз'
              )}
            </button>
          </div>

        </div>
      </form>
    </div>
  );
}