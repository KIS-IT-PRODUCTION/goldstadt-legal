import React, { useState, useEffect } from 'react';

export default function NewsList({ API_BASE_URL }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [previewImages, setPreviewImages] = useState([]); // Масив для підтримки кількох фото

  useEffect(() => {
    fetchNews();
  }, []);

  const getImageUrl = (path) => {
    if (!path) return 'https://placehold.co/100x100?text=No+Image';
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    
    let cleanPath = path.replace(/\\/g, '/');
    if (cleanPath.startsWith('/')) cleanPath = cleanPath.substring(1);
    
    let base = API_BASE_URL;
    if (base.endsWith('/')) base = base.slice(0, -1);
    if (base.endsWith('/api')) base = base.slice(0, -4);
    
    return `${base}/${cleanPath}`;
  };

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/news?page=1&limit=200`);
      const data = await response.json();
      const newsArray = Array.isArray(data) ? data : (data.data && Array.isArray(data.data) ? data.data : []);
      setNews(newsArray);
    } catch (error) {
      console.error('Помилка завантаження:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (item) => {
    setSelectedNews({
      _id: item._id,
      title: item.title || '',
      content: item.content || '',
      isPremium: item.isPremium === true || String(item.isPremium).toLowerCase() === 'true',
      existingImages: item.images || []
    });
    
    if (item.images && item.images.length > 0) {
      setPreviewImages(item.images.map(img => getImageUrl(img)));
    } else {
      setPreviewImages([]);
    }
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Ви впевнені, що хочете видалити цю новину?')) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/news/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        setNews(news.filter((item) => item._id !== id));
      } else {
        alert('Не вдалося видалити новину');
      }
    } catch (error) {
      console.error('Помилка видалення:', error);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      // Очищаємо попередні створені локальні Blob-посилання, щоб не забивати пам'ять
      previewImages.forEach(url => {
        if (url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });

      const localUrls = files.map(file => URL.createObjectURL(file));
      setPreviewImages(localUrls);
      
      setSelectedNews((prev) => ({ ...prev, newImages: files }));
    }
  };

  const handleUpdate = async () => {
    if (!selectedNews) return;
    setIsUpdating(true);
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      
      formData.append('title', selectedNews.title);
      formData.append('content', selectedNews.content); 
      formData.append('isPremium', String(selectedNews.isPremium)); 

      // Якщо обрано нові зображення, додаємо їх
      if (selectedNews.newImages && selectedNews.newImages.length > 0) {
        selectedNews.newImages.forEach((file) => {
          formData.append('images', file); // Ключ збігається з налаштуваннями Multer (upload.array('images'))
        });
      }

      // Перевіряємо заголовки: у разі надсилання FormData ні в якому разі не пишіть 'Content-Type'
      const headers = {
        'Authorization': `Bearer ${token}`
      };

      const response = await fetch(`${API_BASE_URL}/news/${selectedNews._id}`, {
        method: 'PUT', // Якщо бекенд не прийме PUT з FormData, змініть тут локально на 'POST' для перевірки
        headers: headers,
        body: formData,
      });

      if (response.ok) {
        await fetchNews();
        closeModal();
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('Бекенд повернув помилку:', errorData);
        alert(`Помилка оновлення: ${errorData.message || response.statusText || response.status}`);
      }
    } catch (err) {
      console.error('Критична помилка запиту оновлення:', err);
      alert('Помилка з\'єднання з сервером при оновленні');
    } finally {
      setIsUpdating(false);
    }
  };

  const closeModal = () => {
    // Чистимо Blob посилання
    previewImages.forEach(url => {
      if (url.startsWith('blob:')) {
        URL.revokeObjectURL(url);
      }
    });
    setIsModalOpen(false);
    setSelectedNews(null);
    setPreviewImages([]);
  };

  return (
    <div className="glass-panel content-card animated-fade-in">
      <div className="section-header">
        <div className="section-header-inner">
          <div>
            <div className="section-h">
              Новини
              {!loading && (
                <span className="table-count">{news.length} матеріалів</span>
              )}
            </div>
            <div className="section-sub">Керуйте опублікованими матеріалами</div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="loader-container" style={{ minHeight: '280px' }}>
          <div className="spinner" />
        </div>
      ) : news.length === 0 ? (
        <div className="page-loading">
          <span style={{ fontSize: '32px' }}>📭</span>
          <span>Новин ще немає</span>
        </div>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Статус</th>
              <th>Прев'ю</th>
              <th>Заголовок</th>
              <th>Дата</th>
              <th style={{ textAlign: 'right' }}>Дії</th>
            </tr>
          </thead>
          <tbody>
            {news.map((item) => (
              <tr key={item._id}>
                <td>
                  <span className={`status-badge ${item.isPremium ? 'pro' : 'free'}`}>
                    {item.isPremium ? '⭐ PRO' : 'FREE'}
                  </span>
                </td>
                <td>
                  <img
                    src={item.images && item.images.length > 0 ? getImageUrl(item.images[0]) : ''}
                    className="table-img-preview"
                    alt="preview"
                    onError={(e) => { 
                      e.target.style.background = 'rgba(255,255,255,0.05)'; 
                      e.target.src = 'https://placehold.co/50x50?text=No+Photo'; 
                    }}
                  />
                </td>
                <td className="title-cell">{item.title}</td>
                <td style={{ color: 'rgba(255,255,255,0.35)', fontSize: '13px' }}>
                  {item.createdAt ? new Date(item.createdAt).toLocaleDateString('uk-UA') : '---'}
                </td>
                <td className="actions-cell">
                  <button className="icon-btn edit" title="Редагувати" onClick={() => handleEditClick(item)}>✏️</button>
                  <button className="icon-btn delete" title="Видалити" onClick={() => handleDelete(item._id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* MODAL */}
      {isModalOpen && selectedNews && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className="modal-content expanded glass-panel">
            <div className="modal-header">
              <h3>Редагування матеріалу</h3>
              <button className="close-x" onClick={closeModal}>&times;</button>
            </div>

            <div className="modal-body custom-scrollbar">
              <label style={{ display: 'block', marginBottom: '8px', color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>
                Медіафайли матеріалу ({previewImages.length})
              </label>
              
              <div className="edit-image-section" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {previewImages.length > 0 && (
                  <div className="images-preview-grid" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '8px' }}>
                    {previewImages.map((src, idx) => (
                      <img 
                        key={idx} 
                        src={src} 
                        alt={`Preview ${idx}`} 
                        className="large-preview" 
                        style={{ width: '110px', height: '110px', objectFit: 'cover', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }} 
                      />
                    ))}
                  </div>
                )}
                <label className="file-upload-label" style={{ alignSelf: 'flex-start' }}>
                  <span>📷 Завантажити нові фото (замінити поточні)</span>
                  <input type="file" onChange={handleFileChange} multiple accept="image/*" hidden />
                </label>
              </div>

              <div className="form-grid" style={{ marginBottom: '16px', marginTop: '16px' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>Заголовок</label>
                  <input
                    className="glass-input"
                    value={selectedNews.title}
                    onChange={(e) => setSelectedNews({ ...selectedNews, title: e.target.value })}
                    placeholder="Заголовок новини"
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>Статус доступу</label>
                  <div
                    className="toggle-item"
                    style={{ padding: '11px 14px' }}
                    onClick={() => setSelectedNews({ ...selectedNews, isPremium: !selectedNews.isPremium })}
                  >
                    <div className="toggle-item-left">
                      <div className="toggle-item-icon gold" style={{ width: 30, height: 30, borderRadius: 8, fontSize: 13 }}>⭐</div>
                      <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>
                        {selectedNews.isPremium ? 'Тільки PRO' : 'Для всіх'}
                      </span>
                    </div>
                    <div className={`toggle-switch ${selectedNews.isPremium ? 'on' : ''}`}>
                      <div className="toggle-handle" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Опис / Зміст</label>
                <textarea
                  className="glass-input tall"
                  value={selectedNews.content}
                  onChange={(e) => setSelectedNews({ ...selectedNews, content: e.target.value })}
                  placeholder="Текст новини..."
                  style={{ minHeight: '160px' }}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button className="glass-btn cancel" onClick={closeModal}>Скасувати</button>
              <button
                className="glass-btn save"
                onClick={handleUpdate}
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <>
                    <div className="btn-spinner" style={{ borderColor: 'rgba(0,0,0,0.2)', borderTopColor: '#06070f' }} />
                    Збереження...
                  </>
                ) : (
                  '✓ Зберегти'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}