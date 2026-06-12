import React, { useState, useEffect } from 'react';

export default function SupportAdmin({ API_BASE_URL }) {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTickets();
  }, []);

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
        setTickets(tickets.map(t => t._id === id ? { ...t, status: updated.data.status } : t));
        if (selectedTicket && selectedTicket._id === id) {
          setSelectedTicket({ ...selectedTicket, status: updated.data.status });
        }
      } else {
        alert('Не удалось обновить статус');
      }
    } catch (error) {
      console.error('Помилка оновлення статусу:', error);
    }
  };

  const handleDeleteTicket = async (id) => {
    if (!window.confirm('Вы уверены, что хотите удалить это обращение?')) return;
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
        alert('Не удалось удалить обращение');
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

  const getStatusClass = (status) => {
    switch (status) {
      case 'New': return 'free';
      case 'In Progress': return 'pro';
      case 'Resolved': return 'status-resolved';
      default: return '';
    }
  };

  return (
    <div className="glass-panel content-card animated-fade-in">
      <div className="section-header">
        <div className="section-header-inner">
          <div>
            <div className="section-h">
              Служба поддержки
              {!loading && (
                <span className="table-count">{tickets.length} обращений</span>
              )}
            </div>
            <div className="section-sub">Управляйте запросами и помощью пользователям</div>
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
          <span>Обращений нет. Все довольны!</span>
        </div>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Статус</th>
              <th>Пользователь / Email</th>
              <th>Телефон</th>
              <th>Сообщение</th>
              <th>Дата</th>
              <th style={{ textAlign: 'right' }}>Действия</th>
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
                    {ticket.status === 'New' && '🆕 Новое'}
                    {ticket.status === 'In Progress' && '⏳ В работе'}
                    {ticket.status === 'Resolved' && '✅ Решено'}
                  </span>
                </td>
                <td>
                  <div style={{ fontWeight: 500 }}>{ticket.user?.name || 'Удаленный юзер'}</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>{ticket.user?.email || '---'}</div>
                </td>
                <td style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)' }}>
                  {ticket.phoneNumber || 'Не указан'}
                </td>
                <td className="title-cell" style={{ maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {ticket.text}
                </td>
                <td style={{ color: 'rgba(255,255,255,0.35)', fontSize: '13px' }}>
                  {new Date(ticket.createdAt).toLocaleDateString('ru-RU')}
                </td>
                <td className="actions-cell" onClick={(e) => e.stopPropagation()}>
                  <button className="icon-btn edit" title="Просмотреть" onClick={() => openTicketDetails(ticket)}>👁️</button>
                  <button className="icon-btn delete" title="Удалить запрос" onClick={() => handleDeleteTicket(ticket._id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isModalOpen && selectedTicket && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className="modal-content glass-panel" style={{ maxWidth: '600px' }}>
            <div className="modal-header">
              <h3>Детали обращения № {selectedTicket._id.slice(-6)}</h3>
              <button className="close-x" onClick={closeModal}>&times;</button>
            </div>

            <div className="modal-body custom-scrollbar" style={{ color: '#fff' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px', background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '8px' }}>
                <div>
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', display: 'block' }}>ПОЛЬЗОВАТЕЛЬ</span>
                  <strong style={{ fontSize: '14px' }}>{selectedTicket.user?.name || 'Неизвестно'}</strong>
                  <span style={{ fontSize: '12px', display: 'block', color: 'rgba(255,255,255,0.6)' }}>{selectedTicket.user?.email}</span>
                </div>
                <div>
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', display: 'block' }}>КОНТАКТНЫЙ ТЕЛЕФОН</span>
                  <strong style={{ fontSize: '14px', color: '#ffd700' }}>{selectedTicket.phoneNumber || 'Не оставлен'}</strong>
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '6px' }}>ТЕКСТ СООБЩЕНИЯ</span>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '8px', whiteSpace: 'pre-wrap', lineHeight: '1.5', fontSize: '14px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  {selectedTicket.text}
                </div>
              </div>

              <div>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '10px' }}>ИЗМЕНИТЬ ТЕКУЩИЙ СТАТУС</span>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    className={`glass-btn ${selectedTicket.status === 'New' ? 'save' : 'cancel'}`}
                    style={{ flex: 1, padding: '8px', fontSize: '12px' }}
                    onClick={() => handleUpdateStatus(selectedTicket._id, 'New')}
                  >
                    🆕 Новое
                  </button>
                  <button 
                    className={`glass-btn ${selectedTicket.status === 'In Progress' ? 'save' : 'cancel'}`}
                    style={{ flex: 1, padding: '8px', fontSize: '12px', borderColor: selectedTicket.status === 'In Progress' ? '#ffd700' : undefined }}
                    onClick={() => handleUpdateStatus(selectedTicket._id, 'In Progress')}
                  >
                    ⏳ В работе
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
                    ✅ Решено
                  </button>
                </div>
              </div>

            </div>

            <div className="modal-footer" style={{ marginTop: '20px', justifyContent: 'space-between' }}>
              <button className="glass-btn delete" style={{ backgroundColor: 'rgba(255, 59, 48, 0.15)', color: '#ff3b30' }} onClick={() => handleDeleteTicket(selectedTicket._id)}>
                🗑️ Удалить обращение
              </button>
              <button className="glass-btn cancel" onClick={closeModal}>Закрыть</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}