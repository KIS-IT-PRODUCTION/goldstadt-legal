import React, { useState, useEffect } from 'react';

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  // Стан для перемикання вкладок у меню (dashboard або add-news)
  const [activeTab, setActiveTab] = useState('dashboard');

  // Форма новин
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPremium, setIsPremium] = useState(false);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // ⚠️ УВАГА: Замініть на ваш реальний домен бекенду після деплою
  const API_BASE_URL = 'http://localhost:3000/api'; 

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token && role === 'admin') setIsLoggedIn(true);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok && data.user?.role === 'admin') {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.user.role);
        setIsLoggedIn(true);
      } else {
        setStatus({ type: 'error', message: 'Невірні дані або відсутні права адміністратора.' });
      }
    } catch {
      setStatus({ type: 'error', message: 'Помилка з\'єднання з сервером.' });
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
  };

  const handleSubmitNews = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: '', message: '' });
    const token = localStorage.getItem('token'); 
    
    if (!token) return handleLogout();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('isPremium', isPremium);
    for (let i = 0; i < images.length; i++) formData.append('images', images[i]);

    try {
      const response = await fetch(`${API_BASE_URL}/news`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });

      if (response.ok) {
        setStatus({ type: 'success', message: 'Новину успішно додано!' });
        setTitle(''); setContent(''); setIsPremium(false); setImages([]);
        document.getElementById('image-upload').value = '';
      } else {
        if (response.status === 401) handleLogout();
        setStatus({ type: 'error', message: 'Помилка при додаванні новини' });
      }
    } catch {
      setStatus({ type: 'error', message: 'Помилка з\'єднання з сервером' });
    } finally {
      setIsLoading(false);
    }
  };

  // --- ЕКРАН АВТОРИЗАЦІЇ ---
  if (!isLoggedIn) {
    return (
      <div className="admin-wrapper glass-bg">
        <GlassStyles />
        <div className="glass-panel login-card">
          <div className="login-header">
            <h2>Admin Portal</h2>
            <p>Увійдіть для доступу до панелі управління</p>
          </div>
          {status.message && <div className={`alert ${status.type}`}>{status.message}</div>}
          <form onSubmit={handleLogin} className="login-form">
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" required className="glass-input"/>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Пароль" required className="glass-input"/>
            <button type="submit" disabled={authLoading} className="glass-btn primary">
              {authLoading ? 'Перевірка...' : 'Увійти'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- ЕКРАН ДАШБОРДУ ---
  return (
    <div className="admin-wrapper glass-bg layout-dashboard">
      <GlassStyles />
      
      {/* Бокова панель (Sidebar) */}
      <aside className="glass-panel sidebar">
        <div className="sidebar-brand">
          <span className="brand-icon">💠</span> 
          <span>Goldstadt Admin</span>
        </div>
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} 
            onClick={() => { setActiveTab('dashboard'); setStatus({type:'', message:''}); }}
          >
            📊 <span className="nav-text">Дашборд</span>
          </button>
          <button 
            className={`nav-item ${activeTab === 'add-news' ? 'active' : ''}`} 
            onClick={() => { setActiveTab('add-news'); setStatus({type:'', message:''}); }}
          >
            ✍️ <span className="nav-text">Додати новину</span>
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
          <h2 className="topbar-title">
            {activeTab === 'dashboard' ? 'Статистика (Огляд)' : 'Публікація нового матеріалу'}
          </h2>
          <div className="admin-profile">
            <div className="avatar-glass">А</div>
            <span className="profile-name">Адміністратор</span>
          </div>
        </header>

        {/* Контентна частина */}
        <main className="content">
          {status.message && (
            <div className={`alert ${status.type}`}>
              {status.message}
            </div>
          )}

          {activeTab === 'dashboard' && (
            <div className="stats-grid">
              <div className="glass-panel stat-card">
                <div className="stat-icon">📰</div>
                <div className="stat-info">
                  <div className="stat-title">Всього новин</div>
                  <div className="stat-value">---</div>
                </div>
              </div>
              <div className="glass-panel stat-card">
                <div className="stat-icon">👥</div>
                <div className="stat-info">
                  <div className="stat-title">Користувачі</div>
                  <div className="stat-value">---</div>
                </div>
              </div>
              <div className="glass-panel stat-card">
                <div className="stat-icon">⭐</div>
                <div className="stat-info">
                  <div className="stat-title">Преміум</div>
                  <div className="stat-value">---</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'add-news' && (
            <div className="glass-panel form-card">
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
                  <label className="checkbox-label">
                    <input type="checkbox" checked={isPremium} onChange={(e)=>setIsPremium(e.target.checked)} className="glass-checkbox" />
                    <span className="checkmark"></span>
                    ⭐ Преміум контент (тільки для підписників)
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
          )}
        </main>
      </div>
    </div>
  );
}

// Вбудовані стилі для Liquid Glass та Адаптивності
const GlassStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap');

    * {
      box-sizing: border-box;
    }

    .admin-wrapper {
      /* ВИПРАВЛЕННЯ: Жорстко фіксуємо на весь екран, ігноруючи відступи #root */
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 9999;
      margin: 0;
      padding: 0;

      font-family: 'Inter', -apple-system, sans-serif;
      color: #ffffff;
      overflow: hidden; /* Ховаємо загальний скрол сторінки */
    }

    /* Анімований фон для ефекту Liquid */
    .glass-bg {
      background: linear-gradient(135deg, #0f172a, #312e81, #4c1d95, #0f172a);
      background-size: 400% 400%;
      animation: gradientShift 15s ease infinite;
    }

    @keyframes gradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    /* Базовий клас для скла */
    .glass-panel {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
      border-radius: 20px;
    }

    /* --- Логін Екран --- */
    .admin-wrapper:not(.layout-dashboard) {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
    }

    .login-card {
      padding: 40px;
      width: 100%;
      max-width: 420px;
      text-align: center;
    }

    .login-header h2 { margin: 0 0 10px; font-weight: 700; font-size: 28px; }
    .login-header p { color: rgba(255,255,255,0.7); margin-bottom: 30px; }
    .login-form { display: flex; flex-direction: column; gap: 20px; }

    /* --- Дашборд Layout --- */
    .layout-dashboard {
      display: flex;
      width: 100%;
      height: 100%;
    }

    .sidebar {
      width: 280px;
      margin: 15px;
      display: flex;
      flex-direction: column;
      border-radius: 24px;
      z-index: 10;
    }

    .sidebar-brand {
      padding: 30px 25px;
      font-size: 20px;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 12px;
      border-bottom: 1px solid rgba(255,255,255,0.05);
    }

    .sidebar-nav {
      flex: 1;
      padding: 20px 15px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .nav-item {
      background: transparent;
      border: none;
      color: rgba(255,255,255,0.7);
      padding: 15px 20px;
      border-radius: 12px;
      text-align: left;
      font-size: 16px;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 12px;
      font-weight: 600;
    }

    .nav-item:hover {
      background: rgba(255,255,255,0.1);
      color: #fff;
      transform: translateX(5px);
    }

    .nav-item.active {
      background: linear-gradient(135deg, rgba(59, 130, 246, 0.5), rgba(147, 51, 234, 0.5));
      color: #fff;
      border: 1px solid rgba(255,255,255,0.2);
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    }

    .logout-btn {
      margin: 15px;
      background: rgba(239, 68, 68, 0.2) !important;
      border: 1px solid rgba(239, 68, 68, 0.3) !important;
      color: #fff !important;
    }
    .logout-btn:hover {
      background: rgba(239, 68, 68, 0.4) !important;
    }

    .main-area {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      padding: 15px 15px 15px 0;
    }

    .topbar {
      height: 75px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 30px;
      margin-bottom: 20px;
      border-radius: 20px;
      flex-shrink: 0;
    }

    .topbar-title { margin: 0; font-size: 20px; font-weight: 600; }
    
    .admin-profile { display: flex; align-items: center; gap: 12px; }
    .avatar-glass { width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, #3b82f6, #8b5cf6); display: flex; align-items: center; justify-content: center; font-weight: bold; border: 2px solid rgba(255,255,255,0.5); }
    .profile-name { font-weight: 600; font-size: 14px; color: rgba(255,255,255,0.9); }

    .content {
      flex: 1;
      overflow-y: auto;
      padding-right: 5px;
    }
    
    /* Кастомізація скроллбару */
    .content::-webkit-scrollbar { width: 6px; }
    .content::-webkit-scrollbar-track { background: transparent; }
    .content::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 10px; }

    /* --- Компоненти UI --- */
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; }
    .stat-card { padding: 25px; display: flex; align-items: center; gap: 20px; transition: transform 0.3s ease; }
    .stat-card:hover { transform: translateY(-5px); background: rgba(255,255,255,0.08); }
    .stat-icon { font-size: 40px; background: rgba(255,255,255,0.1); width: 70px; height: 70px; display: flex; align-items: center; justify-content: center; border-radius: 16px; }
    .stat-title { color: rgba(255,255,255,0.6); font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
    .stat-value { font-size: 32px; font-weight: 700; margin-top: 5px; }

    .form-card { padding: 40px; max-width: 800px; margin: 0 auto; }
    .news-form { display: flex; flex-direction: column; gap: 25px; }
    .input-group label { display: block; margin-bottom: 10px; font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.8); }

    .glass-input {
      width: 100%;
      padding: 15px 20px;
      border-radius: 12px;
      background: rgba(0, 0, 0, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #fff;
      font-size: 16px;
      transition: all 0.3s ease;
      font-family: inherit;
    }
    .glass-input::placeholder { color: rgba(255,255,255,0.3); }
    .glass-input:focus { outline: none; border-color: rgba(59, 130, 246, 0.8); background: rgba(0,0,0,0.3); box-shadow: 0 0 15px rgba(59, 130, 246, 0.3); }
    .glass-input.textarea { min-height: 200px; resize: vertical; }

    .glass-file-input {
      width: 100%;
      padding: 12px;
      border-radius: 12px;
      background: rgba(0,0,0,0.2);
      border: 1px dashed rgba(255,255,255,0.3);
      color: rgba(255,255,255,0.8);
      cursor: pointer;
    }
    .glass-file-input::file-selector-button {
      background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: #fff; padding: 8px 16px; border-radius: 8px; margin-right: 15px; cursor: pointer; transition: 0.3s;
    }
    .glass-file-input::file-selector-button:hover { background: rgba(255,255,255,0.2); }

    /* Кастомний чекбокс */
    .checkbox-label { display: flex; align-items: center; gap: 12px; cursor: pointer; font-weight: 600; user-select: none; }
    .glass-checkbox { display: none; }
    .checkmark { width: 24px; height: 24px; background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; display: flex; align-items: center; justify-content: center; transition: 0.2s; }
    .glass-checkbox:checked ~ .checkmark { background: #3b82f6; border-color: #3b82f6; }
    .glass-checkbox:checked ~ .checkmark::after { content: '✓'; color: white; font-weight: bold; }

    .glass-btn {
      width: 100%;
      padding: 16px;
      border-radius: 12px;
      border: none;
      font-size: 16px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
    }
    .glass-btn.primary {
      background: linear-gradient(135deg, #3b82f6, #2563eb);
      color: white;
      box-shadow: 0 4px 15px rgba(37, 99, 235, 0.4);
    }
    .glass-btn.primary:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(37, 99, 235, 0.6); }
    .glass-btn:disabled { background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.4); cursor: not-allowed; box-shadow: none; }

    .alert { padding: 15px 20px; border-radius: 12px; margin-bottom: 25px; font-weight: 600; backdrop-filter: blur(10px); }
    .alert.success { background: rgba(16, 185, 129, 0.2); border: 1px solid rgba(16, 185, 129, 0.3); color: #34d399; }
    .alert.error { background: rgba(239, 68, 68, 0.2); border: 1px solid rgba(239, 68, 68, 0.3); color: #f87171; }

    /* --- МЕДІА ЗАПИТИ ДЛЯ МОБІЛЬНИХ (АДАПТИВНІСТЬ) --- */
    @media (max-width: 768px) {
      .layout-dashboard {
        flex-direction: column;
      }

      .sidebar {
        width: auto;
        margin: 10px;
        flex-direction: row;
        border-radius: 16px;
        padding: 10px;
        justify-content: space-between;
        align-items: center;
      }

      .sidebar-brand { border: none; padding: 10px; }
      .sidebar-brand span:not(.brand-icon) { display: none; } 

      .sidebar-nav {
        flex-direction: row;
        padding: 0;
        gap: 5px;
        justify-content: center;
      }

      .nav-item { padding: 10px 15px; }
      .nav-text { display: none; }

      .logout-btn { margin: 0; padding: 10px 15px; width: auto; }

      .main-area { padding: 0 10px 10px 10px; }
      
      .topbar { padding: 0 20px; height: 65px; margin-bottom: 15px; }
      .topbar-title { font-size: 16px; }
      .profile-name { display: none; }

      .form-card { padding: 25px; }
      
      .stats-grid { grid-template-columns: 1fr; }
    }
  `}} />
);