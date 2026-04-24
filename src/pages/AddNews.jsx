import React, { useState } from 'react';

export default function AddNews({ API_BASE_URL, onLogout }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPremium, setIsPremium] = useState(false);
  const [sendPush, setSendPush] = useState(true); // Новий стан для Push
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

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
    formData.append('notificationsEnabled', sendPush); // Передаємо вибір на бекенд
    
    for (let i = 0; i < images.length; i++) formData.append('images', images[i]);

    try {
      const response = await fetch(`${API_BASE_URL}/news`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });

      if (response.ok) {
        setStatus({ type: 'success', message: 'Новину успішно додано та опубліковано!' });
        setTitle(''); setContent(''); setIsPremium(false); setSendPush(true); setImages([]);
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
    <div className="glass-panel form-card">
      {status.message && <div className={`alert ${status.type}`}>{status.message}</div>}
      <form onSubmit={handleSubmitNews} className="news-form">
        <div className="input-group">
          <label>Заголовок новини *</label>
          <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} required className="glass-input" placeholder="Введіть заголовок..." />
        </div>
        <div className="input-group">
          <label>Текст новини *</label>
          <textarea value={content} onChange={(e)=>setContent(e.target.value)} required className="glass-input textarea" placeholder="Напишіть статтю тут..." />
        </div>
        
        <div className="checkbox-group">
          <label className="checkbox-label" style={{marginBottom: '15px'}}>
            <input type="checkbox" checked={isPremium} onChange={(e)=>setIsPremium(e.target.checked)} className="glass-checkbox" />
            <span className="checkmark"></span>
            ⭐ Преміум контент (тільки для підписників)
          </label>

          <label className="checkbox-label">
            <input type="checkbox" checked={sendPush} onChange={(e)=>setSendPush(e.target.checked)} className="glass-checkbox" />
            <span className="checkmark"></span>
            🔔 Відправити Push-сповіщення всім користувачам
          </label>
        </div>

        <div className="input-group">
          <label>Зображення (до 30 шт.)</label>
          <input id="image-upload" type="file" multiple accept="image/*" onChange={(e)=>setImages(e.target.files)} className="glass-file-input" />
        </div>
        <button type="submit" disabled={isLoading} className="glass-btn primary submit-btn">
          {isLoading ? 'Публікація...' : 'Опублікувати новину'}
        </button>
      </form>
    </div>
  );
}