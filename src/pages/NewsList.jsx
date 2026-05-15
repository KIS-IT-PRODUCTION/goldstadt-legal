import React, { useState, useEffect } from 'react';

export default function NewsList({ API_BASE_URL }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/news`);
      const data = await response.json();
      setNews(Array.isArray(data) ? data : []);
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
      description: item.content || '',
      isPremium: item.isPremium || false,
    });
    setPreviewImage(item.images && item.images[0] ? item.images[0] : '');
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
      }
    } catch (error) {
      console.error('Помилка видалення:', error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
      setSelectedNews((prev) => ({ ...prev, newImage: file }));
    }
  };

  const handleUpdate = async () => {
    if (!selectedNews) return;
    setIsUpdating(true);
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('title', selectedNews.title);
      formData.append('description', selectedNews.description);
      formData.append('isPro', selectedNews.isPremium);
      if (selectedNews.newImage) formData.append('image', selectedNews.newImage);

      const response = await fetch(`${API_BASE_URL}/news/${selectedNews._id}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });

      if (response.ok) {
        await fetchNews();
        closeModal();
      } else {
        const errorData = await response.json();
        alert(`Помилка: ${errorData.message}`);
      }
    } catch {
      alert('Помилка оновлення');
    } finally {
      setIsUpdating(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNews(null);
    setPreviewImage(null);
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
                    src={item.images && item.images[0] ? item.images[0] : ''}
                    className="table-img-preview"
                    alt="preview"
                    onError={(e) => { e.target.style.background = 'rgba(255,255,255,0.05)'; e.target.src = ''; }}
                  />
                </td>
                <td className="title-cell">{item.title}</td>
                <td style={{ color: 'rgba(255,255,255,0.35)', fontSize: '13px' }}>
                  {new Date(item.createdAt).toLocaleDateString('uk-UA')}
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
              {/* Image section */}
              <div className="edit-image-section">
                {previewImage && (
                  <img src={previewImage} alt="Preview" className="large-preview" />
                )}
                <label className="file-upload-label">
                  <span>📷 Змінити фото</span>
                  <input type="file" onChange={handleFileChange} hidden />
                </label>
              </div>

              {/* Grid fields */}
              <div className="form-grid" style={{ marginBottom: '16px' }}>
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
                  value={selectedNews.description}
                  onChange={(e) => setSelectedNews({ ...selectedNews, description: e.target.value })}
                  placeholder="Текст новини..."
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