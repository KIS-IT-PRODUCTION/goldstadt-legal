import React, { useState, useRef, useEffect } from 'react';

export default function AddNews({ API_BASE_URL, onLogout }) {
  const [title, setTitle] = useState('');
  const [isPremium, setIsPremium] = useState(false);
  const [sendPush, setSendPush] = useState(true);
  const [isScheduled, setIsScheduled] = useState(false); 
  const [scheduledAt, setScheduledAt] = useState('');   
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  
  // Состояние для хранения списка уже запланированных новостей
  const [scheduledList, setScheduledList] = useState([]);

  const editorRef = useRef(null);

  // Функция загрузки списка запланированных новостей
  const fetchScheduledNews = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const response = await fetch(`${API_BASE_URL}/news/admin/scheduled`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setScheduledList(data);
      }
    } catch (err) {
      console.error('Не удалось загрузить список запланированных новостей', err);
    }
  };

  useEffect(() => {
    fetchScheduledNews();

    if (editorRef.current) {
      if (!editorRef.current.innerHTML.trim() || editorRef.current.innerHTML === '<br>') {
        editorRef.current.innerHTML = '<p><br></p>';
      }
    }

    try {
      document.execCommand('defaultParagraphSeparator', false, 'p');
    } catch (e) {
      console.warn('defaultParagraphSeparator error:', e);
    }
  }, []);

  /**
   * Очистка вставленного HTML-текста
   */
  const sanitizePastedHtml = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const walk = (node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        node.removeAttribute('style');
        node.removeAttribute('class');
        node.removeAttribute('id');
        node.removeAttribute('bgcolor');
        node.removeAttribute('color');
        node.removeAttribute('face');
        node.removeAttribute('size');
        node.removeAttribute('width');
        node.removeAttribute('height');
        node.removeAttribute('align');
        node.removeAttribute('valign');
        node.removeAttribute('data-start');
        node.removeAttribute('data-end');

        const tag = node.tagName.toLowerCase();
        const unwrapTags = ['span', 'font', 'div'];
        if (unwrapTags.includes(tag) && !['b', 'i', 'u', 'a', 'strong', 'em'].includes(tag)) {
          // Будет обработано позже
        }
      }
      Array.from(node.childNodes).forEach(walk);
    };

    walk(doc.body);

    doc.body.querySelectorAll('div, section, article, header, footer, li').forEach((el) => {
      const p = doc.createElement('p');
      p.innerHTML = el.innerHTML;
      el.replaceWith(p);
    });

    doc.body.querySelectorAll('o\\:p, [class^="Mso"]').forEach((el) => el.remove());

    doc.body.querySelectorAll('span, font').forEach((el) => {
      const frag = doc.createDocumentFragment();
      Array.from(el.childNodes).forEach((c) => frag.appendChild(c));
      el.replaceWith(frag);
    });

    const allowedTags = new Set(['p', 'br', 'b', 'strong', 'i', 'em', 'u', 'a', 'ul', 'ol', 'li']);
    doc.body.querySelectorAll('*').forEach((el) => {
      if (!allowedTags.has(el.tagName.toLowerCase())) {
        const frag = doc.createDocumentFragment();
        Array.from(el.childNodes).forEach((c) => frag.appendChild(c));
        el.replaceWith(frag);
      }
    });

    doc.body.querySelectorAll('a').forEach((a) => {
      const href = a.getAttribute('href');
      Array.from(a.attributes).forEach((attr) => a.removeAttribute(attr.name));
      if (href) a.setAttribute('href', href);
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener noreferrer');
    });

    let result = doc.body.innerHTML;
    result = result.replace(/(<p[^>]*>\s*(<br\s*\/?>\s*)?<\/p>\s*){2,}/gi, '<p><br></p>');
    result = result.replace(/^(\s*<p[^>]*>\s*(<br\s*\/?>\s*)?<\/p>\s*)+/gi, '');
    result = result.replace(/(\s*<p[^>]*>\s*(<br\s*\/?>\s*)?<\/p>\s*)+$/gi, '');

    return result || '<p><br></p>';
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const clipboardData = e.clipboardData || window.clipboardData;
    let html = clipboardData.getData('text/html');
    const plainText = clipboardData.getData('text/plain');

    let sanitized;
    if (html) {
      sanitized = sanitizePastedHtml(html);
    } else {
      sanitized = plainText
        .split(/\n\n+/)
        .map((block) => `<p>${block.replace(/\n/g, '<br>')}</p>`)
        .join('') || '<p><br></p>';
    }

    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    const range = selection.getRangeAt(0);
    range.deleteContents();

    const frag = range.createContextualFragment(sanitized);
    range.insertNode(frag);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
  };

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
    const url = window.prompt('Введите ссылку (URL):', 'https://');
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

    if (isScheduled && !scheduledAt) {
      setStatus({ type: 'error', message: 'Пожалуйста, выберите дату и время публикации' });
      setIsLoading(false);
      return;
    }

    let htmlContent = editorRef.current ? editorRef.current.innerHTML : '';
    htmlContent = htmlContent
      .replace(/<div>/gi, '<p>')
      .replace(/<\/div>/gi, '</p>')
      .replace(/<p><br><\/p><p><br><\/p>/gi, '<p><br></p>');

    const cleanText = htmlContent.replace(/<[^>]*>/g, '').trim();

    if (!cleanText && !htmlContent.includes('<img') && !htmlContent.includes('<iframe')) {
      setStatus({ type: 'error', message: 'Текст новости не может быть пустым' });
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', htmlContent);
    formData.append('isPremium', isPremium);
    formData.append('notificationsEnabled', sendPush);
    
    // Переводим локальное время инпута в ISO формат с таймзоной вашего ПК
    if (isScheduled && scheduledAt) {
      const isoDate = new Date(scheduledAt).toISOString();
      formData.append('scheduledAt', isoDate);
    }

    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/news`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (response.ok) {
        setStatus({ type: 'success', message: isScheduled ? 'Новость успешно запланирована!' : 'Новость успешно опубликована!' });
        setTitle('');
        if (editorRef.current) {
          editorRef.current.innerHTML = '<p><br></p>';
        }
        setIsPremium(false);
        setSendPush(true);
        setIsScheduled(false);
        setScheduledAt('');
        setImages([]);
        const fileInput = document.getElementById('image-upload');
        if (fileInput) fileInput.value = '';
        
        // Сразу обновляем список запланированных постов ниже
        fetchScheduledNews();
      } else {
        if (response.status === 401) onLogout();
        setStatus({ type: 'error', message: 'Ошибка при добавлении новости' });
      }
    } catch {
      setStatus({ type: 'error', message: 'Ошибка соединения с сервером' });
    } finally {
      setIsLoading(false);
    }
  };

  // Красивое форматирование даты для вывода в списке
  const formatScheduledDate = (dateString) => {
    const d = new Date(dateString);
    return d.toLocaleString('ru-RU', {
      day: '2-digit',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      
      {/* ОСНОВНАЯ ФОРМА ДОБАВЛЕНИЯ */}
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
          .custom-editor * {
            background-color: transparent !important;
            color: inherit !important;
            font-family: inherit !important;
            font-size: inherit !important;
          }
          .custom-editor b, .custom-editor strong { font-weight: bold !important; }
          .custom-editor i, .custom-editor em   { font-style: italic !important; }
          .custom-editor u    { text-decoration: underline !important; }
          .custom-editor a    { color: #7eb3ff !important; text-decoration: underline; }
          
          .datetime-wrapper {
            margin-top: 15px;
            padding: 15px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 8px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            animation: fadeIn 0.3s ease;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-5px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .scheduled-container {
            padding: 24px;
          }
          .scheduled-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 16px;
            background: rgba(255, 255, 255, 0.04);
            border-radius: 8px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            margin-bottom: 10px;
          }
          .scheduled-info {
            display: flex;
            flex-direction: column;
            gap: 4px;
          }
          .scheduled-title {
            font-size: 15px;
            font-weight: 500;
            color: #fff;
          }
          .scheduled-time {
            font-size: 12px;
            color: #eab308;
            display: flex;
            align-items: center;
            gap: 4px;
          }
          .scheduled-badge {
            font-size: 11px;
            padding: 3px 8px;
            border-radius: 4px;
            background: rgba(234, 179, 8, 0.15);
            color: #eab308;
            border: 1px solid rgba(234, 179, 8, 0.3);
          }
          .scheduled-badge.premium {
            background: rgba(212, 175, 55, 0.15);
            color: #d4af37;
            border: 1px solid rgba(212, 175, 55, 0.3);
          }
          .scheduled-empty {
            text-align: center;
            color: rgba(255, 255, 255, 0.3);
            font-size: 14px;
            padding: 20px 0;
          }
        `}</style>

        <div className="section-header">
          <div className="section-header-inner">
            <div>
              <div className="section-h">Новый материал</div>
              <div className="section-sub">Заполните форму и опубликуйте статью</div>
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
                placeholder="Введите заголовок новости..."
              />
            </div>

            <div className="form-group">
              <label>Текст новости *</label>

              <div style={toolbarStyle}>
                <button type="button" onClick={() => applyStyle('bold')} style={toolBtnStyle} title="Жирный">
                  <strong>B</strong>
                </button>
                <button type="button" onClick={() => applyStyle('italic')} style={toolBtnStyle} title="Курсив">
                  <em>I</em>
                </button>
                <button type="button" onClick={() => applyStyle('underline')} style={toolBtnStyle} title="Подчеркнутый">
                  <u>U</u>
                </button>
                <button type="button" onClick={addLink} style={toolBtnStyle} title="Добавить ссылку">
                  🔗 Ссылка
                </button>
                <button type="button" onClick={() => applyStyle('unlink')} style={toolBtnStyle} title="Убрать ссылку">
                  ❌
                </button>
              </div>

              <div
                ref={editorRef}
                contentEditable
                className="glass-input tall custom-editor"
                style={editorStyle}
                placeholder="Напишите текст статьи тут..."
                onPaste={handlePaste}
              />
            </div>

          <div className="form-section-title">Медиа</div>

            <div className="form-group">
              <label>Изображения (до 30 шт.)</label>
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
                  Перетащите файлы или <strong>выберите вручную</strong>
                </div>
                {images.length > 0 && (
                  <div className="file-count-badge">
                    ✓ Выбрано файлов: {images.length}
                  </div>
                )}
              </label>
            </div>

            <div className="form-section-title">Настройки</div>

            <div className="toggle-row">
              <div className="toggle-item" onClick={() => setIsPremium(!isPremium)}>
                <div className="toggle-item-left">
                  <div className="toggle-item-icon gold">⭐</div>
                  <div className="toggle-item-info">
                    <div className="toggle-item-title">Премиум контент</div>
                    <div className="toggle-item-sub">Только для подписчиков PRO</div>
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
                    <div className="toggle-item-title">Push-уведомление</div>
                    <div className="toggle-item-sub">Оповестить всех пользователей</div>
                  </div>
                </div>
                <div className={`toggle-switch ${sendPush ? 'on' : ''}`}>
                  <div className="toggle-handle" />
                </div>
              </div>

              <div className="toggle-item" onClick={() => setIsScheduled(!isScheduled)}>
                <div className="toggle-item-left">
                  <div className="toggle-item-icon" style={{ backgroundColor: 'rgba(234, 179, 8, 0.15)', color: '#eab308' }}>📅</div>
                  <div className="toggle-item-info">
                    <div className="toggle-item-title">Отложенная публикация</div>
                    <div className="toggle-item-sub">Опубликовать по расписанию</div>
                  </div>
                </div>
                <div className={`toggle-switch ${isScheduled ? 'on' : ''}`}>
                  <div className="toggle-handle" />
                </div>
              </div>
            </div>

            {isScheduled && (
              <div className="datetime-wrapper">
                <div className="form-group" style={{ margin: 0 }}>
                  <label style={{ marginBottom: '8px', display: 'block' }}>Дата и время публикации *</label>
                  <input
                    type="datetime-local"
                    value={scheduledAt}
                    onChange={(e) => setScheduledAt(e.target.value)}
                    required={isScheduled}
                    className="glass-input"
                    style={{ colorScheme: 'dark' }} 
                  />
                </div>
              </div>
            )}

            <div style={{ marginTop: '28px' }}>
              <button type="submit" disabled={isLoading} className="glass-btn primary submit-btn">
                {isLoading ? (
                  <>
                    <div className="btn-spinner" />
                    Сохранение...
                  </>
                ) : (
                  isScheduled ? '📅 Запланировать публикацию' : '🚀 Опубликовать новость'
                )}
              </button>
            </div>

          </div>
        </form>
      </div>

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
  flexWrap: 'wrap',
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
  textAlign: 'left',
};