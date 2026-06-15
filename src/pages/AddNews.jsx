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

    try {
      document.execCommand('defaultParagraphSeparator', false, 'p');
    } catch (e) {
      console.warn('defaultParagraphSeparator error:', e);
    }
  }, []);

  /**
   * Sanitize pasted HTML: strip all styles/classes/colors but keep
   * bold, italic, underline, links, and paragraph/line-break structure.
   */
  const sanitizePastedHtml = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const walk = (node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        // Remove all inline styles (kills white background, font colors, etc.)
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

        // Replace non-semantic wrappers with their children inline
        const unwrapTags = ['span', 'font', 'div'];
        if (unwrapTags.includes(tag) && !['b', 'i', 'u', 'a', 'strong', 'em'].includes(tag)) {
          // We'll handle div -> p conversion below; for span/font just unwrap later
        }
      }
      Array.from(node.childNodes).forEach(walk);
    };

    walk(doc.body);

    // Convert common block elements to <p>
    doc.body.querySelectorAll('div, section, article, header, footer, li').forEach((el) => {
      const p = doc.createElement('p');
      p.innerHTML = el.innerHTML;
      el.replaceWith(p);
    });

    // Word-specific: remove empty <o:p> leftovers and MSO comments
    doc.body.querySelectorAll('o\\:p, [class^="Mso"]').forEach((el) => el.remove());

    // Unwrap span and font (now safe to do after block conversion)
    doc.body.querySelectorAll('span, font').forEach((el) => {
      const frag = doc.createDocumentFragment();
      Array.from(el.childNodes).forEach((c) => frag.appendChild(c));
      el.replaceWith(frag);
    });

    // Strip any remaining disallowed tags but keep their text
    const allowedTags = new Set(['p', 'br', 'b', 'strong', 'i', 'em', 'u', 'a', 'ul', 'ol', 'li']);
    doc.body.querySelectorAll('*').forEach((el) => {
      if (!allowedTags.has(el.tagName.toLowerCase())) {
        const frag = doc.createDocumentFragment();
        Array.from(el.childNodes).forEach((c) => frag.appendChild(c));
        el.replaceWith(frag);
      }
    });

    // Keep only href on <a> tags
    doc.body.querySelectorAll('a').forEach((a) => {
      const href = a.getAttribute('href');
      Array.from(a.attributes).forEach((attr) => a.removeAttribute(attr.name));
      if (href) a.setAttribute('href', href);
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener noreferrer');
    });

    // Collapse multiple consecutive empty <p> into one
    let result = doc.body.innerHTML;
    result = result.replace(/(<p[^>]*>\s*(<br\s*\/?>\s*)?<\/p>\s*){2,}/gi, '<p><br></p>');

    // Remove leading/trailing empty paragraphs
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
      // Plain text: convert newlines to paragraphs
      sanitized = plainText
        .split(/\n\n+/)
        .map((block) => `<p>${block.replace(/\n/g, '<br>')}</p>`)
        .join('') || '<p><br></p>';
    }

    // Insert at cursor position
    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    const range = selection.getRangeAt(0);
    range.deleteContents();

    const frag = range.createContextualFragment(sanitized);
    range.insertNode(frag);

    // Move cursor to end of inserted content
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
    for (let i = 0; i < images.length; i++) formData.append('images', images[i]);

    try {
      const response = await fetch(`${API_BASE_URL}/news`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (response.ok) {
        setStatus({ type: 'success', message: 'Новость успешно опубликована!' });
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
        setStatus({ type: 'error', message: 'Ошибка при добавлении новости' });
      }
    } catch {
      setStatus({ type: 'error', message: 'Ошибка соединения с сервером' });
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
        /* Ensure pasted content never brings its own background or color */
        .custom-editor * {
          background-color: transparent !important;
          color: inherit !important;
          font-family: inherit !important;
          font-size: inherit !important;
        }
        /* But keep bold/italic/underline visible */
        .custom-editor b,
        .custom-editor strong { font-weight: bold !important; }
        .custom-editor i,
        .custom-editor em   { font-style: italic !important; }
        .custom-editor u    { text-decoration: underline !important; }
        .custom-editor a    { color: #7eb3ff !important; text-decoration: underline; }
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
          </div>

          <div style={{ marginTop: '28px' }}>
            <button type="submit" disabled={isLoading} className="glass-btn primary submit-btn">
              {isLoading ? (
                <>
                  <div className="btn-spinner" />
                  Публикация...
                </>
              ) : (
                '🚀 Опубликовать новость'
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