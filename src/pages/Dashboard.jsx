import React, { useState, useEffect } from 'react';

export default function Dashboard({API_BASE_URL, onLogout }) {
  const [stats, setStats] = useState({ news: 0, users: 0, premium: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem('token');
      if (!token && onLogout) return onLogout();

      try {
        // Робимо запит на новий бекенд-маршрут
        const response = await fetch(`${API_BASE_URL}/admin/stats`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setStats(data);
        } else {
          if (response.status === 401 && onLogout) onLogout();
          setError('Не вдалося завантажити статистику');
        }
      } catch (err) {
        setError('Помилка з\'єднання з сервером');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [API_BASE_URL, onLogout]);

  return (
    <div>
      {error && <div className="alert error">{error}</div>}
      
      <div className="stats-grid">
        <div className="glass-panel stat-card">
          <div className="stat-icon">📰</div>
          <div className="stat-info">
            <div className="stat-title">Всього новин</div>
            <div className="stat-value">
              {isLoading ? <span style={{fontSize: '20px'}}>Завантаження...</span> : stats.news}
            </div>
          </div>
        </div>
        
        <div className="glass-panel stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <div className="stat-title">Користувачі</div>
            <div className="stat-value">
              {isLoading ? <span style={{fontSize: '20px'}}>Завантаження...</span> : stats.users}
            </div>
          </div>
        </div>
        
        <div className="glass-panel stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-info">
            <div className="stat-title">Преміум</div>
            <div className="stat-value">
              {isLoading ? <span style={{fontSize: '20px'}}>Завантаження...</span> : stats.premium}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}