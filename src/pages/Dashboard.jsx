import React, { useState, useEffect } from 'react';

export default function Dashboard({ API_BASE_URL, onLogout }) {
  const [stats, setStats] = useState({ news: 0, users: 0, premium: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem('token');
      if (!token && onLogout) return onLogout();

      try {
        const response = await fetch(`${API_BASE_URL}/admin/stats`, {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
          const data = await response.json();
          setStats(data);
        } else {
          if (response.status === 401 && onLogout) onLogout();
          setError('Не вдалося завантажити статистику');
        }
      } catch {
        setError('Помилка з\'єднання з сервером');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [API_BASE_URL, onLogout]);

  const cards = [
    {
      label: 'Всього новин',
      value: stats.news,
      icon: '📰',
      colorClass: 'purple',
      trend: 'матеріали в базі',
    },
    {
      label: 'Користувачі',
      value: stats.users,
      icon: '👥',
      colorClass: 'blue',
      trend: 'зареєстровано',
    },
    {
      label: 'Преміум',
      value: stats.premium,
      icon: '⭐',
      colorClass: 'amber',
      trend: 'активних підписок',
    },
  ];

  return (
    <div className="animated-fade-in">
      {error && <div className="alert error" style={{ margin: '0 0 16px 0' }}>{error}</div>}

      <div className="stats-grid">
        {cards.map((card) => (
          <div key={card.label} className="glass-panel stat-card">
            <div className={`stat-icon-wrap ${card.colorClass}`}>
              <span>{card.icon}</span>
            </div>
            <div className="stat-info">
              <div className="stat-label">{card.label}</div>
              {isLoading ? (
                <>
                  <div className="skeleton skeleton-value" />
                  <div className="skeleton skeleton-trend" />
                </>
              ) : (
                <>
                  <div className="stat-value">{card.value.toLocaleString('uk-UA')}</div>
                  <div className="stat-trend">{card.trend}</div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}