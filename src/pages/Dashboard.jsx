import React, { useState, useEffect } from 'react';

export default function Dashboard({ API_BASE_URL, onLogout }) {
  const [stats, setStats] = useState({ news: 0, users: 0, premium: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Нові стани для керування користувачами
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' або 'users'
  const [usersList, setUsersList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [usersLoading, setUsersLoading] = useState(false);
  const [editingUser, setEditingUser] = useState(null); // Зберігає юзера, якого зараз редагуємо

  const token = localStorage.getItem('token');

  // Завантаження статистики
  useEffect(() => {
    const fetchStats = async () => {
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
  }, [API_BASE_URL, onLogout, token]);

  // Завантаження всіх користувачів при перемиканні на вкладку "users"
  useEffect(() => {
    if (activeTab !== 'users') return;

    const fetchUsers = async () => {
      setUsersLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/users/admin/users`, {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (response.ok && data.success) {
          setUsersList(data.users);
        } else {
          setError(data.message || 'Помилка завантаження користувачів');
        }
      } catch {
        setError('Помилка сервера при отриманні списку користувачів');
      } finally {
        setUsersLoading(false);
      }
    };

    fetchUsers();
  }, [activeTab, API_BASE_URL, token]);

  // Зміна статусу/ролі користувача адміном
  const handleUpdateUser = async (userId, updatedFields) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/admin/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedFields)
      });
      const data = await response.json();
      if (response.ok && data.success) {
        // Оновлюємо стан локально
        setUsersList(usersList.map(u => u._id === userId ? { ...u, ...updatedFields } : u));
        if (editingUser && editingUser._id === userId) {
          setEditingUser({ ...editingUser, ...updatedFields });
        }
      } else {
        alert(data.message || 'Помилка оновлення');
      }
    } catch {
      alert('Помилка зв\'язку з сервером');
    }
  };

  // Видалення користувача
  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Ви впевнені, що хочете видалити цього користувача?')) return;
    try {
      const response = await fetch(`${API_BASE_URL}/users/admin/users/${userId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        setUsersList(usersList.filter(u => u._id !== userId));
        setStats(prev => ({ ...prev, users: prev.users - 1 }));
      } else {
        alert('Не вдалося видалити користувача');
      }
    } catch {
      alert('Помилка сервера');
    }
  };

  // Фільтрація користувачів за пошуком (ім'я або пошта)
  const filteredUsers = usersList.filter(user => {
    const name = user.name ? user.name.toLowerCase() : '';
    const email = user.email ? user.email.toLowerCase() : '';
    const query = searchQuery.toLowerCase();
    return name.includes(query) || email.includes(query);
  });

  const cards = [
    { label: 'Всього новин', value: stats.news, icon: '📰', colorClass: 'purple', trend: 'матеріали в базі', id: 'dashboard' },
    { label: 'Користувачі', value: stats.users, icon: '👥', colorClass: 'blue', trend: 'зареєстровано', id: 'users' },
    { label: 'Преміум', value: stats.premium, icon: '⭐', colorClass: 'amber', trend: 'активних підписок', id: 'premium' },
  ];

  return (
    <div className="animated-fade-in" style={{ padding: '20px' }}>
      {error && <div className="alert error" style={{ margin: '0 0 16px 0' }}>{error}</div>}

      {/* Перемикач Вкладок */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <button 
          onClick={() => setActiveTab('dashboard')} 
          className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          style={tabButtonStyle(activeTab === 'dashboard')}
        >
          📈 Головна статистика
        </button>
        <button 
          onClick={() => setActiveTab('users')} 
          className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
          style={tabButtonStyle(activeTab === 'users')}
        >
          👥 Керування користувачами
        </button>
      </div>

      {/* ЕКРАН 1: СТАТИСТИКА */}
      {activeTab === 'dashboard' && (
        <div className="stats-grid">
          {cards.map((card) => (
            <div 
              key={card.label} 
              className="glass-panel stat-card" 
              onClick={() => card.id === 'users' && setActiveTab('users')}
              style={{ cursor: card.id === 'users' ? 'pointer' : 'default' }}
            >
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
      )}
      {/* ЕКРАН 2: СПИСОК КОРИСТУВАЧІВ ТА ПОШУК */}
      {activeTab === 'users' && (
        <div className="glass-panel" style={{ padding: '24px', borderRadius: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'bwtween', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
            <h2 style={{ margin: 0, color: '#fff' }}>База користувачів ({filteredUsers.length})</h2>
            
            {/* Поле Пошуку */}
            <input 
              type="text" 
              placeholder="🔍 Пошук за іменем або поштою..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={searchInpuStyle}
            />
          </div>

          {usersLoading ? (
            <div style={{ color: '#aaa', textAlign: 'center', padding: '40px' }}>Завантаження списку користувачів...</div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={tableStyle}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <th style={thStyle}>Аватар</th>
                    <th style={thStyle}>Ім'я</th>
                    <th style={thStyle}>Email</th>
                    <th style={thStyle}>Роль</th>
                    <th style={thStyle}>Преміум</th>
                    <th style={thStyle}>Дії</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', padding: '20px', color: '#aaa' }}>Нікого не знайдено</td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr key={user._id} style={trStyle}>
                        {/* Аватар */}
                        <td style={tdStyle}>
                          <img 
                            src={
                              user.avatarUrl 
                                ? (() => {
                                    if (user.avatarUrl.startsWith('http://') || user.avatarUrl.startsWith('https://')) {
                                      return user.avatarUrl;
                                    }
                                    let domain = API_BASE_URL;
                                    if (domain.endsWith('/api')) {
                                      domain = domain.slice(0, -4);
                                    }
                                    return `${domain}${user.avatarUrl}`;
                                  })()
                                : 'https://www.w3schools.com/howto/img_avatar.png'
                            } 
                            alt="Avatar" 
                            style={avatarStyle} 
                            
                            // 1. 🌟 Додаємо ліниве завантаження (зменшує купу одночасних запитів)
                            loading="lazy" 
                            
                            // 2. 🌟 Важливо для Google: приховує заголовок referer (інколи Google блокує саме через домен запиту)
                            referrerPolicy="no-referrer"
                            
                            // 3. Якщо все одно вискочить 429 або 403, підміняємо на дефолтну заглушку
                            onError={(e) => { 
                              e.target.src = 'https://www.w3schools.com/howto/img_avatar.png'; 
                            }}
                          />
                        </td>
                        {/* Ім'я */}
                        <td style={{ ...tdStyle, color: '#fff', fontWeight: '500' }}>{user.name || 'Без імені'}</td>
                        {/* Пошта */}
                        <td style={tdStyle}>{user.email}</td>
                        {/* Роль */}
                        <td style={tdStyle}>
                          <span style={badgeStyle(user.role === 'admin' ? '#d32f2f' : '#1976d2')}>
                            {user.role === 'admin' ? 'Адмін' : 'Юзер'}
                          </span>
                        </td>
                        {/* Преміум статус */}
                        <td style={tdStyle}>
                          <span style={badgeStyle(user.isPremium ? '#388e3c' : 'rgba(255,255,255,0.15)', user.isPremium ? '#fff' : '#aaa')}>
                            {user.isPremium ? '★ Premium' : 'Ні'}
                          </span>
                        </td>
                        {/* Кнопки Дій */}
                        <td style={tdStyle}>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button 
                              onClick={() => setEditingUser(user)}
                              style={{ ...actionBtnStyle, backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff' }}
                            >
                              ⚙️ Керувати
                            </button>
                            <button 
                              onClick={() => handleDeleteUser(user._id)}
                              style={{ ...actionBtnStyle, backgroundColor: 'rgba(211, 47, 47, 0.2)', color: '#ff5252' }}
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* МОДАЛЬНЕ ВІКНО КЕРУВАННЯ ЮЗЕРОМ */}
      {editingUser && (
        <div style={modalOverlayStyle}>
          <div className="glass-panel" style={modalContentStyle}>
            <h3 style={{ marginTop: 0, color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px' }}>
              Керування користувачем
            </h3>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <img 
                src={
                              editingUser.avatarUrl 
                                ? (() => {
                                    if (editingUser.avatarUrl.startsWith('http://') || editingUser.avatarUrl.startsWith('https://')) {
                                      return editingUser.avatarUrl;
                                    }
                                    let domain = API_BASE_URL;
                                    if (domain.endsWith('/api')) {
                                      domain = domain.slice(0, -4);
                                    }
                                    return `${domain}${user.avatarUrl}`;
                                  })()
                                : 'https://www.w3schools.com/howto/img_avatar.png'
                            } 
                alt="" 
                style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '18px' }}>{editingUser.name || 'Без імені'}</div>
                <div style={{ color: '#aaa', fontSize: '14px' }}>{editingUser.email}</div>
              </div>
            </div>

            {/* Зміна Ролі */}
            <div style={modalFieldStyle}>
              <label style={labelStyle}>Права доступу (Роль):</label>
              <select 
                value={editingUser.role} 
                onChange={(e) => handleUpdateUser(editingUser._id, { role: e.target.value })}
                style={selectStyle}
              >
                <option value="user">Звичайний користувач (user)</option>
                <option value="admin">Адміністратор (admin)</option>
              </select>
            </div>

            {/* Зміна Преміуму */}
            <div style={modalFieldStyle}>
              <label style={labelStyle}>Преміум-підписка:</label>
              <select 
                value={editingUser.isPremium ? 'true' : 'false'} 
                onChange={(e) => handleUpdateUser(editingUser._id, { isPremium: e.target.value === 'true' })}
                style={selectStyle}
              >
                <option value="false">Вимкнено</option>
                <option value="true">Активовано (Premium)</option>
              </select>
            </div>

            {/* Кнопка закриття */}
            <button 
              onClick={() => setEditingUser(null)}
              style={closeModalBtnStyle}
            >
              Закрити вікно
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Стилі оформлення (Inline Styles для простоти інтеграції) ---
const tabButtonStyle = (isActive) => ({
  padding: '10px 18px',
  borderRadius: '8px',
  border: 'none',
  background: isActive ? '#1976d2' : 'rgba(255,255,255,0.08)',
  color: '#fff',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'background 0.2s',
});

const searchInpuStyle = {
  padding: '8px 16px',
  borderRadius: '8px',
  border: '1px solid rgba(255,255,255,0.15)',
  background: 'rgba(0,0,0,0.2)',
  color: '#fff',
  outline: 'none',
  width: '260px'
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  textAlign: 'left',
  color: '#ccc',
};

const thStyle = {
  padding: '12px 16px',
  color: '#aaa',
  fontWeight: '600',
  fontSize: '14px',
};

const trStyle = {
  borderBottom: '1px solid rgba(255,255,255,0.05)',
};

const tdStyle = {
  padding: '12px 16px',
  fontSize: '15px',
};

const avatarStyle = {
  width: '36px',
  height: '36px',
  borderRadius: '50%',
  objectFit: 'cover',
  background: 'rgba(255,255,255,0.1)'
};

const badgeStyle = (bgColor, textColor = '#fff') => ({
  backgroundColor: bgColor,
  color: textColor,
  padding: '4px 8px',
  borderRadius: '6px',
  fontSize: '12px',
  fontWeight: '500',
});

const actionBtnStyle = {
  border: 'none',
  padding: '6px 12px',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '13px',
  fontWeight: '500',
};

const modalOverlayStyle = {
  position: 'fixed',
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.6)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
  backdropFilter: 'blur(4px)'
};

const modalContentStyle = {
  width: '400px',
  padding: '24px',
  borderRadius: '16px',
  boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
  background: 'linear-gradient(135deg, rgba(30,30,40,0.95), rgba(15,15,20,0.95))',
  border: '1px solid rgba(255,255,255,0.1)'
};

const modalFieldStyle = {
  marginBottom: '16px',
};

const labelStyle = {
  display: 'block',
  color: '#aaa',
  marginBottom: '6px',
  fontSize: '14px',
};

const selectStyle = {
  width: '100%',
  padding: '10px',
  borderRadius: '8px',
  backgroundColor: '#222',
  color: '#fff',
  border: '1px solid rgba(255,255,255,0.15)',
  outline: 'none',
};

const closeModalBtnStyle = {
  width: '100%',
  padding: '10px',
  backgroundColor: '#1976d2',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 'bold',
  marginTop: '12px',
};