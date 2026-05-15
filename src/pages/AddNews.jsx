import React, { useState } from 'react';

export default function AddNews({ API_BASE_URL, onLogout }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPremium, setIsPremium] = useState(false);
  const [sendPush, setSendPush] = useState(true);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmitNews = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: '', message: '' });
    const token = localStorage.getItem('token');

    if (!token) return onLogout();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('isPremium', isPremium);
    formData.append('notificationsEnabled', sendPush);
    for (let i = 0; i < images.length; i++) formData.append('images', images[i]);

    try {
      const response = await fetch(`${API_BASE_URL}/news`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });

      if (response.ok) {
        setStatus({ type: 'success', message: 'Новину успішно опубліковано!' });
        setTitle('');
        setContent('');
        setIsPremium(false);
        setSendPush(true);
        setImages([]);
        document.getElementById('image-upload').value = '';
      } else {
        if (response.status === 401) onLogout();
        setStatus({ type: 'error', message: 'Помилка при додаванні новини' });
      }
    } catch {
      setStatus({ type: 'error', message: 'Помилка з\'єднання з сервером' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-panel form-card animated-fade-in">
      <div className="section-header">
        <div className="section-header-inner">
          <div>
            <div className="section-h">Новий матеріал</div>
            <div className="section-sub">Заповніть форму та опублікуйте статтю</div>
          </div>
        </div>
      </div>

      {status.message && (
        <div style={{ padding: '20px 28px 0' }}>
          <div className={`alert ${status.type}`} style={{ margin: 0 }}>
            {status.message}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmitNews}>
        <div className="form-body">

          {/* ---- CONTENT ---- */}
          <div className="form-section-title">Контент</div>

          <div className="form-group">
            <label>Заголовок *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="glass-input"
              placeholder="Введіть заголовок новини..."
            />
          </div>

          <div className="form-group">
            <label>Текст новини *</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="glass-input tall"
              placeholder="Напишіть текст статті тут..."
            />
          </div>

          {/* ---- MEDIA ---- */}
          <div className="form-section-title">Медіа</div>

          <div className="form-group">
            <label>Зображення (до 30 шт.)</label>
            <label className="file-upload-zone">
              <input
                id="image-upload"
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
              />
              <div className="file-upload-icon">🖼️</div>
              <div className="file-upload-label-text">
                Перетягніть файли або <strong>оберіть вручну</strong>
              </div>
              {images.length > 0 && (
                <div className="file-count-badge">
                  ✓ Обрано файлів: {images.length}
                </div>
              )}
            </label>
          </div>

          {/* ---- SETTINGS ---- */}
          <div className="form-section-title">Налаштування</div>

          <div className="toggle-row">
            <div
              className="toggle-item"
              onClick={() => setIsPremium(!isPremium)}
            >
              <div className="toggle-item-left">
                <div className="toggle-item-icon gold">⭐</div>
                <div className="toggle-item-info">
                  <div className="toggle-item-title">Преміум контент</div>
                  <div className="toggle-item-sub">Тільки для підписників PRO</div>
                </div>
              </div>
              <div className={`toggle-switch ${isPremium ? 'on' : ''}`}>
                <div className="toggle-handle" />
              </div>
            </div>

            <div
              className="toggle-item"
              onClick={() => setSendPush(!sendPush)}
            >
              <div className="toggle-item-left">
                <div className="toggle-item-icon indigo">🔔</div>
                <div className="toggle-item-info">
                  <div className="toggle-item-title">Push-сповіщення</div>
                  <div className="toggle-item-sub">Сповістити всіх користувачів</div>
                </div>
              </div>
              <div className={`toggle-switch ${sendPush ? 'on' : ''}`}>
                <div className="toggle-handle" />
              </div>
            </div>
          </div>

          {/* ---- SUBMIT ---- */}
          <div style={{ marginTop: '28px' }}>
            <button
              type="submit"
              disabled={isLoading}
              className="glass-btn primary submit-btn"
            >
              {isLoading ? (
                <>
                  <div className="btn-spinner" />
                  Публікація...
                </>
              ) : (
                '🚀 Опублікувати новину'
              )}
            </button>
          </div>

        </div>
      </form>
    </div>
  );
}