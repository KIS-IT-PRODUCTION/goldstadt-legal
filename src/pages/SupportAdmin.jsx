import React, { useState, useEffect } from 'react';

export default function SupportAdmin({ API_BASE_URL }) {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTickets();
  }, []);

  // Отримання списку всіх запитів
  const fetchTickets = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/support/admin/all`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setTickets(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Помилка завантаження сапорту:', error);
    } finally {
      setLoading(false);
    }
  };

  // Зміна статусу запиту (New -> In Progress -> Resolved)
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/support/admin/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        const updated = await response.json();
        // Оновлюємо стейт локально, щоб не перезавантажувати всю таблицю
        setTickets(tickets.map(t => t._id === id ? { ...t, status: updated.data.status } : t));
        if (selectedTicket && selectedTicket._id === id) {
          setSelectedTicket({ ...selectedTicket, status: updated.data.status });
        }
      } else {
        alert('Не вдалося оновити статус');
      }
    } catch (error) {
      console.error('Помилка оновлення статусу:', error);
    }
  };

  // Видалення запиту із системи
  const handleDeleteTicket = async (id) => {
    if (!window.confirm('Ви впевнені, що хочете видалити це звернення?')) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/support/admin/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        setTickets(tickets.filter(t => t._id !== id));
        if (isModalOpen) closeModal();
      } else {
        alert('Не вдалося видалити звернення');
      }
    } catch (error) {
      console.error('Помилка видалення тикету:', error);
    }
  };

  const openTicketDetails = (ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTicket(null);
  };

  // Допоміжна функція для CSS класів статусів
  const getStatusClass = (status) => {
    switch (status) {
      case 'New': return 'free'; // Червоний / Блакитний залежно від стилю
      case 'In Progress': return 'pro'; // Жовтий / Золотий
      case 'Resolved': return 'status-resolved'; // Зелений (додамо інлайн стиль нижче для надійності)
      default: return '';
    }
  };

  return (
    <div className="glass-panel content-card animated-fade-in">
      <div className="section-header">
        <div className="section-header-inner">
          <div>
            <div className="section-h">
              Служба підтримки
              {!loading && (
                <span className="table-count">{tickets.length} звернень</span>
              )}
            </div>
            <div className="section-sub">Керуйте запитами та допомогою користувачам</div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="loader-container" style={{ minHeight: '280px' }}>
          <div className="spinner" />
        </div>
      ) : tickets.length === 0 ? (
        <div className="page-loading">
          <span style={{ fontSize: '32px' }}>🎉</span>
          <span>Жодних звернень немає. Усі задоволені!</span>
        </div>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Статус</th>
              <th>Користувач / Email</th>
              <th>Телефон</th>
              <th>Повідомлення</th>
              <th>Дата</th>
              <th style={{ textAlign: 'right' }}>Дії</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket._id} style={{ cursor: 'pointer' }} onClick={() => openTicketDetails(ticket)}>
                <td>
                  <span className={`status-badge ${getStatusClass(ticket.status)}`} style={{
                    backgroundColor: ticket.status === 'Resolved' ? 'rgba(52, 199, 89, 0.2)' : undefined,
                    color: ticket.status === 'Resolved' ? '#34c759' : undefined
                  }}>
                    {ticket.status === 'New' && '🆕 New'}
                    {ticket.status === 'In Progress' && '⏳ In Progress'}
                    {ticket.status === 'Resolved' && '✅ Resolved'}
                  </span>
                </td>
                <td>
                  <div style={{ fontWeight: 500 }}>{ticket.user?.name || 'Видалений юзер'}</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>{ticket.user?.email || '---'}</div>
                </td>
                <td style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)' }}>
                  {ticket.phoneNumber || 'Не вказано'}
                </td>
                <td className="title-cell" style={{ maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {ticket.text}
                </td>
                <td style={{ color: 'rgba(255,255,255,0.35)', fontSize: '13px' }}>
                  {new Date(ticket.createdAt).toLocaleDateString('uk-UA')}
                </td>
                <td className="actions-cell" onClick={(e) => e.stopPropagation()}>
                  <button className="icon-btn edit" title="Переглянути" onClick={() => openTicketDetails(ticket)}>👁️</button>
                  <button className="icon-btn delete" title="Видалити запит" onClick={() => handleDeleteTicket(ticket._id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* МOДАЛЬНЕ ВІКНО ДЕТАЛЕЙ ЗВЕРНЕННЯ */}
      {isModalOpen && selectedTicket && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className="modal-content glass-panel" style={{ maxWidth: '600px' }}>
            <div className="modal-header">
              <h3>Деталі звернення № {selectedTicket._id.slice(-6)}</h3>
              <button className="close-x" onClick={closeModal}>&times;</button>
            </div>

            <div className="modal-body custom-scrollbar" style={{ color: '#fff' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px', background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '8px' }}>
                <div>
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', display: 'block' }}>КОРИСТУВАЧ</span>
                  <strong style={{ fontSize: '14px' }}>{selectedTicket.user?.name || 'Невідомо'}</strong>
                  <span style={{ fontSize: '12px', display: 'block', color: 'rgba(255,255,255,0.6)' }}>{selectedTicket.user?.email}</span>
                </div>
                <div>
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', display: 'block' }}>КОНТАКТНИЙ ТЕЛЕФОН</span>
                  <strong style={{ fontSize: '14px', color: '#ffd700' }}>{selectedTicket.phoneNumber || 'Не залишено'}</strong>
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '6px' }}>ТЕКСТ ПОВІДОМЛЕННЯ</span>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '8px', whiteSpace: 'pre-wrap', lineHeight: '1.5', fontSize: '14px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  {selectedTicket.text}
                </div>
              </div>

              {/* КЕРУВАННЯ СТАТУСОМ */}
              <div>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '10px' }}>ЗМІНИТИ ПОТОЧНИЙ СТАТУС</span>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    className={`glass-btn ${selectedTicket.status === 'New' ? 'save' : 'cancel'}`}
                    style={{ flex: 1, padding: '8px', fontSize: '12px' }}
                    onClick={() => handleUpdateStatus(selectedTicket._id, 'New')}
                  >
                    🆕 Нове
                  </button>
                  <button 
                    className={`glass-btn ${selectedTicket.status === 'In Progress' ? 'save' : 'cancel'}`}
                    style={{ flex: 1, padding: '8px', fontSize: '12px', borderColor: selectedTicket.status === 'In Progress' ? '#ffd700' : undefined }}
                    onClick={() => handleUpdateStatus(selectedTicket._id, 'In Progress')}
                  >
                    ⏳ В роботі
                  </button>
                  <button 
                    className="glass-btn"
                    style={{ 
                      flex: 1, 
                      padding: '8px', 
                      fontSize: '12px', 
                      backgroundColor: selectedTicket.status === 'Resolved' ? 'rgba(52, 199, 89, 0.2)' : 'rgba(255,255,255,0.05)',
                      color: selectedTicket.status === 'Resolved' ? '#34c759' : '#fff',
                      borderColor: selectedTicket.status === 'Resolved' ? '#34c759' : 'rgba(255,255,255,0.1)'
                    }}
                    onClick={() => handleUpdateStatus(selectedTicket._id, 'Resolved')}
                  >
                    ✅ Вирішено
                  </button>
                </div>
              </div>

            </div>

            <div className="modal-footer" style={{ marginTop: '20px', justifyContent: 'space-between' }}>
              <button className="glass-btn delete" style={{ backgroundColor: 'rgba(255, 59, 48, 0.15)', color: '#ff3b30' }} onClick={() => handleDeleteTicket(selectedTicket._id)}>
                🗑️ Видалити звернення
              </button>
              <button className="glass-btn cancel" onClick={closeModal}>Закрити</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}