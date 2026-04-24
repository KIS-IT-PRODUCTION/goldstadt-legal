import React, { useState, useEffect } from 'react';
import AdminStyles from './AdminStyles';
import Login from './Login';
import Dashboard from './Dashboard';
import AddNews from './AddNews';
import Notifications from './Notifications';

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const API_BASE_URL = 'https://goldstadtaktuell-backend-production.up.railway.app/api'; 

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token && role === 'admin') setIsLoggedIn(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
  };

  // --- ЕКРАН АВТОРИЗАЦІЇ ---
  if (!isLoggedIn) {
    return (
      <div className="admin-wrapper glass-bg">
        <AdminStyles />
        <Login onLoginSuccess={() => setIsLoggedIn(true)} API_BASE_URL={API_BASE_URL} />
      </div>
    );
  }

  // --- ДИНАМІЧНИЙ ЗАГОЛОВОК ---
  const getHeaderTitle = () => {
    switch(activeTab) {
      case 'dashboard': return 'Статистика (Огляд)';
      case 'add-news': return 'Публікація нового матеріалу';
      case 'notifications': return 'Управління Push-сповіщеннями';
      default: return 'Панель управління';
    }
  };

  // --- ЕКРАН АДМІНКИ ---
  return (
    <div className="admin-wrapper glass-bg layout-dashboard">
      <AdminStyles />
      
      {/* Бокова панель (Sidebar) */}
      <aside className="glass-panel sidebar">
        <div className="sidebar-brand">
            <img style={{ width: '40px', height: '40px' }} src="/goldstadt-legal/favicon.png" alt="" />
          <span>Goldstadt Admin</span>
        </div>
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} 
            onClick={() => setActiveTab('dashboard')}
          >
            📊 <span className="nav-text">Дашборд</span>
          </button>
          
          <button 
            className={`nav-item ${activeTab === 'add-news' ? 'active' : ''}`} 
            onClick={() => setActiveTab('add-news')}
          >
            ✍️ <span className="nav-text">Додати новину</span>
          </button>

          {/* Новий розділ сповіщень */}
          <button 
            className={`nav-item ${activeTab === 'notifications' ? 'active' : ''}`} 
            onClick={() => setActiveTab('notifications')}
          >
            🔔 <span className="nav-text">Сповіщення</span>
          </button>
        </nav>
        
        <button onClick={handleLogout} className="glass-btn logout-btn">
          🚪 <span className="nav-text">Вийти</span>
        </button>
      </aside>

      {/* Основна частина */}
      <div className="main-area">
        {/* Верхня панель (Header) */}
        <header className="glass-panel topbar">
          <h2 className="topbar-title">{getHeaderTitle()}</h2>
          <div className="admin-profile">
            <div className="avatar-glass">А</div>
            <span className="profile-name">Адміністратор</span>
          </div>
        </header>

        {/* Динамічний контент (Рендеримо відповідний компонент) */}
        <main className="content">
          {activeTab === 'dashboard' && <Dashboard API_BASE_URL={API_BASE_URL} onLogout={handleLogout} />}
          {activeTab === 'add-news' && <AddNews API_BASE_URL={API_BASE_URL} onLogout={handleLogout} />}
          {activeTab === 'notifications' && <Notifications API_BASE_URL={API_BASE_URL} onLogout={handleLogout} />}
        </main>
      </div>
    </div>
  );
}