import React, { useState, useEffect } from 'react';
import AdminStyles from './AdminStyles';
import Login from './Login';
import Dashboard from './Dashboard';
import AddNews from './AddNews';
import Notifications from './Notifications';
import NewsList from './NewsList';
import SupportAdmin from './SupportAdmin';
import CommentsList from './CommentsList';

const NAV_ITEMS = [
  { id: 'dashboard',     icon: '📊', label: 'Дашборд' },
  { id: 'news-list',     icon: '📰', label: 'Всі новини' },
  { id: 'add-news',      icon: '✍️',  label: 'Додати новину' },
  { id: 'notifications', icon: '🔔', label: 'Сповіщення' },
  { id: 'support',       icon: '❓', label: 'Підтримка' },
  { id: 'comments',      icon: '💬', label: 'Коментарі' },
];

const HEADER_TITLES = {
  dashboard:     { title: 'Дашборд',             sub: 'Загальна статистика' },
  'news-list':   { title: 'Управління новинами',  sub: 'Редагуйте та видаляйте матеріали' },
  'support':     { title: 'Підтримка',           sub: 'Отримайте допомогу від адміністратора' },
  'add-news':    { title: 'Нова публікація',      sub: 'Заповніть форму та опублікуйте матеріал' },
  'comments':    { title: 'Коментарі',           sub: 'Модеруйте коментарі' },
  notifications: { title: 'Push-сповіщення',     sub: 'Відправте повідомлення всім користувачам' },
};

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const API_BASE_URL = "https://api.goldstadtaktuell.de/api";
  
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

  if (!isLoggedIn) {
    return (
      <div className="admin-wrapper glass-bg">
        <AdminStyles />
        <Login onLoginSuccess={() => setIsLoggedIn(true)} API_BASE_URL={API_BASE_URL} />
      </div>
    );
  }

  const header = HEADER_TITLES[activeTab] || { title: 'Панель управління', sub: '' };

  return (
    <div className="admin-wrapper glass-bg layout-dashboard">
      <AdminStyles />

      {/* ---- SIDEBAR ---- */}
      <aside className="glass-panel sidebar">
        <div className="sidebar-brand">
          <div className="brand-icon">
            <img src="/goldstadt-legal/favicon.png" alt="" onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.textContent = 'G'; }} />
          </div>
          <div>
            <div className="brand-name">Goldstadt</div>
            <div className="brand-tag">Admin Panel</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-text">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-spacer" />

        <button onClick={handleLogout} className="logout-btn">
          <span className="nav-icon">🚪</span>
          <span className="nav-text">Вийти</span>
        </button>
      </aside>

      {/* ---- MAIN ---- */}
      <div className="main-area">
        {/* Topbar */}
        <header className="glass-panel topbar">
          <div className="topbar-left">
            <div>
              <div className="topbar-title">{header.title}</div>
              <div className="topbar-subtitle">{header.sub}</div>
            </div>
          </div>
          <div className="admin-profile">
            <div className="avatar-glass">А</div>
            <span className="profile-name">Адміністратор</span>
          </div>
        </header>

        {/* Content */}
        <main className="content">
          {activeTab === 'dashboard'     && <Dashboard     API_BASE_URL={API_BASE_URL} onLogout={handleLogout} />}
          {activeTab === 'news-list'     && <NewsList      API_BASE_URL={API_BASE_URL} />}
          {activeTab === 'add-news'      && <AddNews       API_BASE_URL={API_BASE_URL} onLogout={handleLogout} />}
          {activeTab === 'notifications' && <Notifications API_BASE_URL={API_BASE_URL} onLogout={handleLogout} />}
          {activeTab === 'support'       && <SupportAdmin  API_BASE_URL={API_BASE_URL} onLogout={handleLogout} />}
          {activeTab === 'comments'      && <CommentsList  API_BASE_URL={API_BASE_URL} />}
        </main>
      </div>
    </div>
  );
}