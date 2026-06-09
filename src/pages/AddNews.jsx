import React, { useState, useRef, useEffect } from 'react';

export default function AddNews({ API_BASE_URL, onLogout }) {
  const [title, setTitle] = useState('');
  const [isPremium, setIsPremium] = useState(false);
  const [sendPush, setSendPush] = useState(true);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      if (!editorRef.current.innerHTML.trim() || editorRef.current.innerHTML === '<br>') {
        editorRef.current.innerHTML = '<p><br></p>';
      }
    }
    
    if (typeof document !== 'undefined') {
      try {
        document.execCommand('defaultParagraphSeparator', false, 'p');
      } catch (e) {
        console.warn('defaultParagraphSeparator error:', e);
      }
    }
  }, []);

  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  const applyStyle = (command, value = null) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const addLink = () => {
    const url = window.prompt('Введіть посилання (URL):', 'https://');
    if (url) {
      applyStyle('createLink', url);
    }
  };

  const handleSubmitNews = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: '', message: '' });
    const token = localStorage.getItem('token');

    if (!token) return onLogout();

    let htmlContent = editorRef.current ? editorRef.current.innerHTML : '';

    // Перетворюємо випадкові <div> від браузера у нормальні <p>
    htmlContent = htmlContent
      .replace(/<div>/gi, '<p>')
      .replace(/<\/div>/gi, '</p>')
      // Видаляємо дубльовані порожні параграфи
      .replace(/<p><br><\/p><p><br><\/p>/gi, '<p><br></p>');

    const cleanText = htmlContent.replace(/<[^>]*>/g, '').trim();
    
    if (!cleanText && !htmlContent.includes('<img') && !htmlContent.includes('<iframe')) {
      setStatus({ type: 'error', message: 'Текст новини не може бути порожнім' });
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', htmlContent);
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
        if (editorRef.current) {
          editorRef.current.innerHTML = '<p><br></p>';
        }
        setIsPremium(false);
        setSendPush(true);
        setImages([]);
        const fileInput = document.getElementById('image-upload');
        if (fileInput) fileInput.value = '';
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
      <style>{`
        .custom-editor p {
          margin-top: 0 !important;
          margin-bottom: 14px !important;
          line-height: 1.5;
        }
        .custom-editor p:last-child {
          margin-bottom: 0 !important;
        }
      `}</style>

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
            
            <div style={toolbarStyle}>
              <button type="button" onClick={() => applyStyle('bold')} style={toolBtnStyle} title="Жирний">
                <strong>B</strong>
              </button>
              <button type="button" onClick={() => applyStyle('italic')} style={toolBtnStyle} title="Курсив">
                <em>I</em>
              </button>
              <button type="button" onClick={() => applyStyle('underline')} style={toolBtnStyle} title="Підкреслений">
                <u>U</u>
              </button>
              <button type="button" onClick={addLink} style={toolBtnStyle} title="Додати посилання">
                🔗 Посилання
              </button>
              <button type="button" onClick={() => applyStyle('unlink')} style={toolBtnStyle} title="Прибрати посилання">
                ❌
              </button>
            </div>

            <div
              ref={editorRef}
              contentEditable
              className="glass-input tall custom-editor"
              style={editorStyle}
              placeholder="Напишите текст статьи тут..."
            />
          </div>

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

          <div className="form-section-title">Налаштування</div>

          <div className="toggle-row">
            <div className="toggle-item" onClick={() => setIsPremium(!isPremium)}>
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

            <div className="toggle-item" onClick={() => setSendPush(!sendPush)}>
              <div className="toggle-item-left">
                <div className="toggle-item-icon indigo">🔔</div>
                <div className="toggle-item-info">
                  <div className="toggle-item-title">Push-сповіщення</div>
                  <div className="toggle-item-sub">Сповістити всіх користувавців</div>
                </div>
              </div>
              <div className={`toggle-switch ${sendPush ? 'on' : ''}`}>
                <div className="toggle-handle" />
              </div>
            </div>
          </div>

          <div style={{ marginTop: '28px' }}>
            <button type="submit" disabled={isLoading} className="glass-btn primary submit-btn">
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

const toolbarStyle = {
  display: 'flex',
  gap: '6px',
  background: 'rgba(0, 0, 0, 0.25)',
  padding: '8px',
  borderRadius: '8px 8px 0 0',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderBottom: 'none',
  flexWrap: 'wrap'
};

const toolBtnStyle = {
  background: 'rgba(255, 255, 255, 0.08)',
  border: 'none',
  color: '#fff',
  padding: '6px 12px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px',
  transition: 'background 0.2s',
};

const editorStyle = {
  borderRadius: '0 0 8px 8px',
  minHeight: '200px',
  height: 'auto',
  overflowY: 'auto',
  backgroundColor: 'rgba(0,0,0,0.15)',
  color: '#fff',
  padding: '14px',
  outline: 'none',
  borderTop: 'none',
  textAlign: 'left'
};