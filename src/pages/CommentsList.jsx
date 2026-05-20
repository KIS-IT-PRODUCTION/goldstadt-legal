import React, { useState, useEffect } from 'react';

export default function CommentsList({ API_BASE_URL }) {
  const [newsWithComments, setNewsWithComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchCommentsAndGroup();
  }, []);

  const fetchCommentsAndGroup = async () => {
  // 🔥 ДОДАЙ ЦЕЙ РЯДОК ДЛЯ ПЕРЕВІРКИ
  console.log("🚀 Фронтенд: Спроба зробити запит до бекенду за адресою:", `${API_BASE_URL}/news/comments-control/all`);
  
  setLoading(true);
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/news/comments-control/all`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    // 🔥 ДОДАЙ ЦЕЙ РЯДОК ДЛЯ ПЕРЕВІРКИ СТАТУСУ ВІДПОВІДІ
    console.log("📡 Статус відповіді бекенду:", response.status);

    if (response.ok) {
      const flatComments = await response.json();
      // 🔥 ДИВИМОСЯ, ЩО САМЕ ПРИЛЕТІЛО З БАЗИ
      console.log("📦 Отримані дані коментарів з бази:", flatComments);
      
      const grouped = flatComments.reduce((acc, comment) => {
        const newsId = comment.newsId;
        if (!acc[newsId]) {
          acc[newsId] = { id: newsId, title: comment.newsTitle || 'Стаття без назви', comments: [] };
        }
        acc[newsId].comments.push(comment);
        return acc;
      }, {});

      setNewsWithComments(Object.values(grouped));
    }
  } catch (error) {
    console.error('❌ Помилка завантаження коментарів:', error);
  } finally {
    setLoading(false);
  }
};

  const handleDeleteComment = async (newsId, commentId) => {
    if (!window.confirm('Ви впевнені, що хочете видалити цей коментар?')) return;
    try {
      const token = localStorage.getItem('token');
      // 🔥 ВИПРАВЛЕНО: Змінено URL на новий метод видалення
     const response = await fetch(`${API_BASE_URL}/news/comments-control/${newsId}/${commentId}`, {
  method: 'DELETE',
  headers: { 'Authorization': `Bearer ${token}` }
});

      if (response.ok) {
        // Оновлюємо дерево стейту локально
        setNewsWithComments(prevNews => 
          prevNews.map(newsItem => {
            if (newsItem.id === newsId) {
              return {
                ...newsItem,
                comments: newsItem.comments.filter(c => c._id !== commentId)
              };
            }
            return newsItem;
          }).filter(newsItem => newsItem.comments.length > 0) // Якщо коментарів немає — прибираємо картку статті
        );
      } else {
        alert('Не вдалося видалити коментар');
      }
    } catch (error) {
      console.error('Помилка при видаленні коментаря:', error);
    }
  };

  // Розумна фільтрація
  const filteredNews = newsWithComments.map(newsItem => {
    const matchedComments = newsItem.comments.filter(c => {
      const query = searchQuery.toLowerCase();
      return (
        c.text?.toLowerCase().includes(query) ||
        c.user?.name?.toLowerCase().includes(query) ||
        c.user?.email?.toLowerCase().includes(query)
      );
    });

    const isTitleMatch = newsItem.title?.toLowerCase().includes(searchQuery.toLowerCase());
    
    return {
      ...newsItem,
      comments: isTitleMatch ? newsItem.comments : matchedComments
    };
  }).filter(newsItem => newsItem.comments.length > 0);

  const totalCommentsCount = filteredNews.reduce((sum, item) => sum + item.comments.length, 0);

  return (
    <div className="glass-panel content-card animated-fade-in">
      <div className="section-header">
        <div className="section-header-inner" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div className="section-h">
              Модерація за статтями
              {!loading && (
                <span className="table-count">{totalCommentsCount} коментарів</span>
              )}
            </div>
            <div className="section-sub">Коментарі згруповані по матеріалах</div>
          </div>
          
          <div style={{ maxWidth: '350px', width: '100%' }}>
            <input 
              type="text" 
              className="glass-input" 
              placeholder="🔍 Шукати статтю, текст або автора..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ padding: '10px 14px', fontSize: '13px' }}
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="loader-container" style={{ minHeight: '280px' }}>
          <div className="spinner" />
        </div>
      ) : filteredNews.length === 0 ? (
        <div className="page-loading">
          <span style={{ fontSize: '32px' }}>💬</span>
          <span>Нічого не знайдено за вашим запитом</span>
        </div>
      ) : (
        <div className="comments-by-news-container" style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '10px' }}>
          {filteredNews.map((newsItem) => (
            <div 
              key={newsItem.id} 
              className="news-comments-block" 
              style={{ 
                background: 'rgba(255, 255, 255, 0.02)', 
                borderRadius: '12px', 
                border: '1px solid rgba(255, 255, 255, 0.06)',
                overflow: 'hidden'
              }}
            >
              <div 
                style={{ 
                  background: 'rgba(255, 255, 255, 0.03)', 
                  padding: '14px 20px', 
                  borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#ffd700', letterSpacing: '0.3px' }}>
                  📰 {newsItem.title}
                </span>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: '20px' }}>
                  ID: {newsItem.id.slice(-6)}
                </span>
              </div>

              <table className="admin-table" style={{ margin: 0, background: 'transparent', border: 'none' }}>
                <thead>
                  <tr style={{ background: 'transparent' }}>
                    <th style={{ paddingLeft: '20px', width: '25%' }}>Користувач</th>
                    <th style={{ width: '55%' }}>Текст коментаря</th>
                    <th style={{ width: '15%' }}>Дата</th>
                    <th style={{ textAlign: 'right', paddingRight: '20px', width: '5%' }}>Дії</th>
                  </tr>
                </thead>
                <tbody>
                  {newsItem.comments.map((comment) => (
                    <tr key={comment._id} style={{ background: 'transparent' }}>
                      <td style={{ paddingLeft: '20px' }}>
                        <div style={{ fontWeight: 500, color: '#fff', fontSize: '13px' }}>{comment.user?.name || 'Анонім'}</div>
                        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>{comment.user?.email || '---'}</div>
                      </td>
                      
                      <td style={{ whiteSpace: 'normal', wordBreak: 'break-word', color: 'rgba(255,255,255,0.85)', fontSize: '13px', lineHeight: '1.45', paddingRight: '15px' }}>
                        {comment.text}
                      </td>
                      
                      <td style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px', whiteSpace: 'nowrap' }}>
                        {comment.createdAt ? new Date(comment.createdAt).toLocaleString('uk-UA', { dateStyle: 'short', timeStyle: 'short' }) : '---'}
                      </td>
                      
                      <td className="actions-cell" style={{ paddingRight: '20px' }}>
                        <button 
                          className="icon-btn delete" 
                          title="Видалити коментар" 
                          onClick={() => handleDeleteComment(newsItem.id, comment._id)}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}