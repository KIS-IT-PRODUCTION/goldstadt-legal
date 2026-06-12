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
        setStatus({ type: 'success', message: 'Уведомление успешно отправлено всем пользователям!' });
        setTitle('');
        setMessage('');
      } else {
        if (response.status === 401) onLogout();
        setStatus({ type: 'error', message: 'Ошибка при отправке уведомления.' });
      }
    } catch {
      setStatus({ type: 'error', message: 'Ошибка соединения с сервером.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-panel form-card animated-fade-in">
      <div className="section-header">
        <div className="section-header-inner">
          <div>
            <div className="section-h">Push-уведомления</div>
            <div className="section-sub">Отправить сообщение всем пользователям</div>
          </div>
        </div>
      </div>

      <div className="notif-info-box">
        <span className="notif-info-icon">📡</span>
        <span>
          Сообщение будет доставлено всем зарегистрированным пользователям, у которых включены разрешения на уведомления.
          Используйте этот инструмент ответственно — частые уведомления снижают engagement.
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

          <div className="form-section-title">Сообщение</div>

          <div className="form-group">
            <label>Заголовок *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="glass-input"
              placeholder="Например: Важное обновление!"
            />
          </div>

          <div className="form-group">
            <label>Текст сообщения *</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="glass-input tall"
              style={{ minHeight: '130px' }}
              placeholder="Введите текст, который увидят пользователи..."
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
                  Отправка...
                </>
              ) : (
                '🚀 Отправить сейчас'
              )}
            </button>
          </div>

        </div>
      </form>
    </div>
  );
}