import React from 'react';

export default function AdminStyles() {
  return (
    <style dangerouslySetInnerHTML={{__html: `
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');

      *, *::before, *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        scrollbar-width: thin;
        scrollbar-color: rgba(139, 92, 246, 0.3) transparent;
      }

      ::-webkit-scrollbar { width: 5px; height: 5px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: rgba(139, 92, 246, 0.3); border-radius: 10px; }
      ::-webkit-scrollbar-thumb:hover { background: rgba(139, 92, 246, 0.6); }

      /* ============ ROOT & BACKGROUND ============ */
      .admin-wrapper {
        position: fixed; top: 0; left: 0;
        width: 100%; height: 100%;
        z-index: 9999;
        font-family: 'DM Sans', sans-serif;
        color: #e2e8f0;
        overflow: hidden;
        background: #06070f;
      }

      .glass-bg {
        background:
          radial-gradient(ellipse 80% 50% at 20% 0%, rgba(99, 66, 199, 0.15) 0%, transparent 60%),
          radial-gradient(ellipse 60% 40% at 80% 100%, rgba(56, 103, 214, 0.12) 0%, transparent 60%),
          radial-gradient(ellipse 40% 60% at 60% 40%, rgba(168, 85, 247, 0.05) 0%, transparent 50%),
          #06070f;
      }

      /* ============ LAYOUT ============ */
      .layout-dashboard {
        display: flex;
        width: 100%; height: 100%;
        padding: 12px;
        gap: 12px;
      }

      /* ============ SIDEBAR ============ */
      .sidebar {
        width: 260px;
        min-width: 260px;
        display: flex;
        flex-direction: column;
        padding: 24px 16px;
        gap: 8px;
        border-radius: 20px;
        border: 1px solid rgba(255,255,255,0.06);
        background: rgba(255,255,255,0.025);
        backdrop-filter: blur(40px);
        overflow: hidden;
        position: relative;
      }

      .sidebar::before {
        content: '';
        position: absolute;
        top: -80px; left: -80px;
        width: 200px; height: 200px;
        background: radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%);
        pointer-events: none;
      }

      .sidebar-brand {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 8px 12px 24px;
        border-bottom: 1px solid rgba(255,255,255,0.06);
        margin-bottom: 8px;
      }

      .brand-icon {
        width: 38px; height: 38px;
        border-radius: 12px;
        background: linear-gradient(135deg, #7c3aed, #4f46e5);
        display: flex; align-items: center; justify-content: center;
        font-size: 18px;
        box-shadow: 0 8px 20px rgba(124, 58, 237, 0.4);
        flex-shrink: 0;
        overflow: hidden;
      }

      .brand-icon img {
        width: 100%; height: 100%;
        object-fit: cover;
        border-radius: 12px;
      }

      .brand-name {
        font-family: 'Syne', sans-serif;
        font-weight: 700;
        font-size: 15px;
        color: #fff;
        line-height: 1.2;
      }

      .brand-tag {
        font-size: 11px;
        color: rgba(255,255,255,0.35);
        font-weight: 400;
      }

      .sidebar-nav {
        display: flex;
        flex-direction: column;
        gap: 4px;
        flex: 1;
      }

      .nav-item {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 11px 14px;
        border-radius: 12px;
        border: 1px solid transparent;
        background: transparent;
        color: rgba(255,255,255,0.45);
        font-family: 'DM Sans', sans-serif;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        text-align: left;
        position: relative;
        overflow: hidden;
      }

      .nav-item:hover {
        color: rgba(255,255,255,0.85);
        background: rgba(255,255,255,0.05);
        border-color: rgba(255,255,255,0.07);
      }

      .nav-item.active {
        background: linear-gradient(135deg, rgba(124, 58, 237, 0.25), rgba(79, 70, 229, 0.15));
        border-color: rgba(139, 92, 246, 0.3);
        color: #c4b5fd;
      }

      .nav-item.active .nav-icon {
        filter: drop-shadow(0 0 6px rgba(167, 139, 250, 0.6));
      }

      .nav-icon { font-size: 17px; width: 22px; text-align: center; flex-shrink: 0; }
      .nav-text { flex: 1; }

      .nav-badge {
        background: linear-gradient(135deg, #7c3aed, #4f46e5);
        color: white;
        font-size: 10px;
        font-weight: 700;
        padding: 2px 7px;
        border-radius: 20px;
        letter-spacing: 0.3px;
      }

      .sidebar-spacer { flex: 1; }

      .logout-btn {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 11px 14px;
        border-radius: 12px;
        border: 1px solid rgba(239, 68, 68, 0.15);
        background: rgba(239, 68, 68, 0.05);
        color: rgba(239, 68, 68, 0.6);
        font-family: 'DM Sans', sans-serif;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        text-align: left;
        margin-top: 8px;
      }

      .logout-btn:hover {
        background: rgba(239, 68, 68, 0.12);
        border-color: rgba(239, 68, 68, 0.3);
        color: #f87171;
      }

      /* ============ MAIN AREA ============ */
      .main-area {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 12px;
        overflow: hidden;
        min-width: 0;
      }

      /* ============ TOPBAR ============ */
      .topbar {
        height: 72px;
        min-height: 72px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 28px;
        border-radius: 20px;
        border: 1px solid rgba(255,255,255,0.06);
        background: rgba(255,255,255,0.025);
        backdrop-filter: blur(40px);
        flex-shrink: 0;
      }

      .topbar-left { display: flex; align-items: center; gap: 16px; }

      .topbar-title {
        font-family: 'Syne', sans-serif;
        font-size: 18px;
        font-weight: 700;
        color: #fff;
        letter-spacing: -0.3px;
      }

      .topbar-subtitle {
        font-size: 12px;
        color: rgba(255,255,255,0.3);
        font-weight: 400;
      }

      .admin-profile {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 6px 14px 6px 6px;
        border-radius: 40px;
        background: rgba(255,255,255,0.04);
        border: 1px solid rgba(255,255,255,0.07);
        cursor: pointer;
        transition: all 0.2s;
      }

      .admin-profile:hover {
        background: rgba(255,255,255,0.07);
        border-color: rgba(255,255,255,0.12);
      }

      .avatar-glass {
        width: 34px; height: 34px;
        border-radius: 50%;
        background: linear-gradient(135deg, #7c3aed, #4f46e5);
        display: flex; align-items: center; justify-content: center;
        font-family: 'Syne', sans-serif;
        font-weight: 700;
        font-size: 13px;
        color: white;
        box-shadow: 0 4px 12px rgba(124, 58, 237, 0.35);
      }

      .profile-name {
        font-size: 13px;
        font-weight: 500;
        color: rgba(255,255,255,0.7);
      }

      /* ============ CONTENT ============ */
      .content {
        flex: 1;
        overflow-y: auto;
        overflow-x: hidden;
        padding: 2px 4px 4px 2px;
      }

      /* ============ GLASS PANEL ============ */
      .glass-panel {
        background: rgba(255, 255, 255, 0.025);
        backdrop-filter: blur(40px) saturate(180%);
        -webkit-backdrop-filter: blur(40px) saturate(180%);
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 20px;
      }

      /* ============ DASHBOARD ============ */
      .stats-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
        margin-bottom: 16px;
      }

      .stat-card {
        padding: 28px;
        display: flex;
        align-items: center;
        gap: 20px;
        position: relative;
        overflow: hidden;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        animation: cardSlideIn 0.5s ease backwards;
      }

      .stat-card:nth-child(1) { animation-delay: 0.05s; }
      .stat-card:nth-child(2) { animation-delay: 0.1s; }
      .stat-card:nth-child(3) { animation-delay: 0.15s; }

      @keyframes cardSlideIn {
        from { opacity: 0; transform: translateY(16px); }
        to { opacity: 1; transform: translateY(0); }
      }

      .stat-card:hover {
        transform: translateY(-3px);
        box-shadow: 0 20px 40px rgba(0,0,0,0.3);
      }

      .stat-card::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 60%);
        pointer-events: none;
      }

      .stat-icon-wrap {
        width: 56px; height: 56px;
        border-radius: 16px;
        display: flex; align-items: center; justify-content: center;
        font-size: 22px;
        flex-shrink: 0;
        position: relative;
      }

      .stat-icon-wrap.purple {
        background: linear-gradient(135deg, rgba(124,58,237,0.25), rgba(79,70,229,0.15));
        border: 1px solid rgba(139,92,246,0.25);
        box-shadow: 0 8px 24px rgba(124,58,237,0.2);
      }

      .stat-icon-wrap.blue {
        background: linear-gradient(135deg, rgba(59,130,246,0.25), rgba(37,99,235,0.15));
        border: 1px solid rgba(96,165,250,0.25);
        box-shadow: 0 8px 24px rgba(59,130,246,0.2);
      }

      .stat-icon-wrap.amber {
        background: linear-gradient(135deg, rgba(245,158,11,0.25), rgba(217,119,6,0.15));
        border: 1px solid rgba(251,191,36,0.25);
        box-shadow: 0 8px 24px rgba(245,158,11,0.2);
      }

      .stat-info { flex: 1; min-width: 0; }

      .stat-label {
        font-size: 12px;
        font-weight: 500;
        color: rgba(255,255,255,0.35);
        text-transform: uppercase;
        letter-spacing: 0.8px;
        margin-bottom: 6px;
      }

      .stat-value {
        font-family: 'Syne', sans-serif;
        font-size: 36px;
        font-weight: 800;
        color: #fff;
        line-height: 1;
        letter-spacing: -1px;
      }

      .stat-trend {
        font-size: 12px;
        color: rgba(255,255,255,0.3);
        margin-top: 6px;
        font-weight: 400;
      }

      /* Skeleton loading */
      .skeleton {
        background: linear-gradient(90deg,
          rgba(255,255,255,0.04) 25%,
          rgba(255,255,255,0.08) 50%,
          rgba(255,255,255,0.04) 75%
        );
        background-size: 200% 100%;
        animation: shimmer 1.6s ease infinite;
        border-radius: 8px;
      }

      @keyframes shimmer {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }

      .skeleton-value { width: 80px; height: 36px; }
      .skeleton-trend { width: 100px; height: 14px; margin-top: 6px; }

      /* ============ TABLE ============ */
      .content-card { padding: 8px; }

      .table-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 20px 16px;
      }

      .table-title {
        font-family: 'Syne', sans-serif;
        font-size: 16px;
        font-weight: 700;
        color: #fff;
      }

      .table-count {
        font-size: 13px;
        color: rgba(255,255,255,0.3);
        font-weight: 400;
        margin-left: 8px;
      }

      .admin-table {
        width: 100%;
        border-collapse: collapse;
      }

      .admin-table thead tr th {
        padding: 10px 16px;
        font-size: 11px;
        font-weight: 600;
        color: rgba(255,255,255,0.3);
        text-transform: uppercase;
        letter-spacing: 0.8px;
        text-align: left;
        border-bottom: 1px solid rgba(255,255,255,0.05);
      }

      .admin-table thead tr th:last-child { text-align: right; }

      .admin-table tbody tr {
        transition: all 0.15s ease;
        animation: rowFadeIn 0.4s ease backwards;
      }

      .admin-table tbody tr:nth-child(1) { animation-delay: 0.05s; }
      .admin-table tbody tr:nth-child(2) { animation-delay: 0.1s; }
      .admin-table tbody tr:nth-child(3) { animation-delay: 0.15s; }
      .admin-table tbody tr:nth-child(4) { animation-delay: 0.2s; }
      .admin-table tbody tr:nth-child(5) { animation-delay: 0.25s; }

      @keyframes rowFadeIn {
        from { opacity: 0; transform: translateX(-8px); }
        to { opacity: 1; transform: translateX(0); }
      }

      .admin-table tbody tr:hover { background: rgba(255,255,255,0.025); }

      .admin-table tbody tr td {
        padding: 14px 16px;
        border-bottom: 1px solid rgba(255,255,255,0.04);
        font-size: 14px;
        color: rgba(255,255,255,0.75);
        vertical-align: middle;
      }

      .table-img-preview {
        width: 48px; height: 48px;
        border-radius: 12px;
        object-fit: cover;
        border: 1px solid rgba(255,255,255,0.08);
        display: block;
      }

      .title-cell {
        max-width: 280px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: 500;
        color: rgba(255,255,255,0.88) !important;
      }

      .actions-cell { text-align: right; }

      .status-badge {
        display: inline-flex;
        align-items: center;
        padding: 4px 10px;
        border-radius: 20px;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.5px;
      }

      .status-badge.pro {
        background: linear-gradient(135deg, rgba(245,158,11,0.2), rgba(217,119,6,0.12));
        border: 1px solid rgba(251,191,36,0.3);
        color: #fbbf24;
      }

      .status-badge.free {
        background: rgba(255,255,255,0.05);
        border: 1px solid rgba(255,255,255,0.08);
        color: rgba(255,255,255,0.4);
      }

      .icon-btn {
        width: 34px; height: 34px;
        border-radius: 10px;
        border: 1px solid rgba(255,255,255,0.08);
        background: rgba(255,255,255,0.03);
        cursor: pointer;
        display: inline-flex; align-items: center; justify-content: center;
        font-size: 14px;
        transition: all 0.15s ease;
        margin-left: 6px;
      }

      .icon-btn:hover { transform: translateY(-1px); }
      .icon-btn.edit:hover { background: rgba(99,102,241,0.15); border-color: rgba(99,102,241,0.3); }
      .icon-btn.delete:hover { background: rgba(239,68,68,0.12); border-color: rgba(239,68,68,0.25); }

      /* ============ MODAL ============ */
      .modal-overlay {
        position: fixed;
        inset: 0;
        background: rgba(6, 7, 15, 0.88);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        animation: overlayFadeIn 0.25s ease;
      }

      @keyframes overlayFadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      .modal-content.expanded {
        width: 100%;
        max-width: 780px;
        max-height: 90vh;
        display: flex;
        flex-direction: column;
        border: 1px solid rgba(255,255,255,0.1);
        background: rgba(12, 14, 28, 0.97);
        box-shadow: 0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(139,92,246,0.1);
        overflow: hidden;
        border-radius: 24px;
        animation: modalSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1);
      }

      @keyframes modalSlideUp {
        from { opacity: 0; transform: translateY(24px) scale(0.98); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }

      .modal-header {
        padding: 24px 28px;
        border-bottom: 1px solid rgba(255,255,255,0.07);
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-shrink: 0;
      }

      .modal-header h3 {
        font-family: 'Syne', sans-serif;
        font-size: 18px;
        font-weight: 700;
        color: #fff;
      }

      .close-x {
        width: 32px; height: 32px;
        border-radius: 8px;
        border: 1px solid rgba(255,255,255,0.08);
        background: rgba(255,255,255,0.04);
        color: rgba(255,255,255,0.5);
        font-size: 18px;
        line-height: 1;
        cursor: pointer;
        display: flex; align-items: center; justify-content: center;
        transition: all 0.15s;
      }

      .close-x:hover {
        background: rgba(255,255,255,0.08);
        color: white;
      }

      .modal-body {
        padding: 28px;
        overflow-y: auto;
        flex: 1;
      }

      .modal-footer {
        padding: 20px 28px;
        border-top: 1px solid rgba(255,255,255,0.07);
        display: flex;
        gap: 10px;
        justify-content: flex-end;
        flex-shrink: 0;
      }

      /* ============ FORMS ============ */
      .form-card { padding: 0; }

      .form-body {
        padding: 28px;
      }

      .form-section-title {
        font-family: 'Syne', sans-serif;
        font-size: 13px;
        font-weight: 700;
        color: rgba(255,255,255,0.3);
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-bottom: 16px;
        margin-top: 28px;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .form-section-title:first-child { margin-top: 0; }

      .form-section-title::after {
        content: '';
        flex: 1;
        height: 1px;
        background: rgba(255,255,255,0.06);
      }

      .form-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
        margin-bottom: 0;
      }

      .form-group {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-bottom: 16px;
      }

      .form-group:last-child { margin-bottom: 0; }

      .form-group label {
        font-size: 12px;
        font-weight: 600;
        color: rgba(255,255,255,0.4);
        text-transform: uppercase;
        letter-spacing: 0.7px;
      }

      .glass-input {
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 12px;
        padding: 13px 16px;
        color: rgba(255,255,255,0.88);
        font-family: 'DM Sans', sans-serif;
        font-size: 14px;
        font-weight: 400;
        transition: all 0.2s ease;
        outline: none;
        width: 100%;
      }

      .glass-input:hover {
        border-color: rgba(255,255,255,0.13);
        background: rgba(255,255,255,0.04);
      }

      .glass-input:focus {
        border-color: rgba(139,92,246,0.5);
        background: rgba(139,92,246,0.04);
        box-shadow: 0 0 0 3px rgba(139,92,246,0.08);
      }

      .glass-input::placeholder { color: rgba(255,255,255,0.2); }

      .glass-input.tall, .glass-input.textarea {
        min-height: 160px;
        resize: vertical;
        line-height: 1.6;
      }

      /* File input */
      .file-upload-zone {
        border: 1.5px dashed rgba(255,255,255,0.1);
        border-radius: 14px;
        padding: 24px;
        text-align: center;
        background: rgba(255,255,255,0.015);
        cursor: pointer;
        transition: all 0.2s ease;
        position: relative;
        overflow: hidden;
      }

      .file-upload-zone:hover {
        border-color: rgba(139,92,246,0.35);
        background: rgba(139,92,246,0.03);
      }

      .file-upload-zone input { display: none; }

      .file-upload-icon { font-size: 28px; margin-bottom: 10px; }

      .file-upload-label-text {
        font-size: 14px;
        color: rgba(255,255,255,0.4);
        font-weight: 400;
      }

      .file-upload-label-text strong {
        color: #a78bfa;
        font-weight: 600;
        cursor: pointer;
      }

      .file-count-badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        margin-top: 10px;
        padding: 5px 12px;
        background: rgba(139,92,246,0.12);
        border: 1px solid rgba(139,92,246,0.2);
        border-radius: 20px;
        font-size: 12px;
        color: #a78bfa;
        font-weight: 500;
      }

      /* Toggle */
      .toggle-row {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .toggle-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 14px 16px;
        background: rgba(255,255,255,0.025);
        border: 1px solid rgba(255,255,255,0.07);
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.2s;
        user-select: none;
      }

      .toggle-item:hover {
        background: rgba(255,255,255,0.04);
        border-color: rgba(255,255,255,0.1);
      }

      .toggle-item-left {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .toggle-item-icon {
        width: 36px; height: 36px;
        border-radius: 10px;
        display: flex; align-items: center; justify-content: center;
        font-size: 16px;
      }

      .toggle-item-icon.gold {
        background: rgba(245,158,11,0.12);
        border: 1px solid rgba(245,158,11,0.2);
      }

      .toggle-item-icon.indigo {
        background: rgba(99,102,241,0.12);
        border: 1px solid rgba(99,102,241,0.2);
      }

      .toggle-item-info {}
      .toggle-item-title {
        font-size: 14px;
        font-weight: 500;
        color: rgba(255,255,255,0.8);
        margin-bottom: 2px;
      }

      .toggle-item-sub {
        font-size: 12px;
        color: rgba(255,255,255,0.3);
      }

      .toggle-switch {
        width: 44px; height: 24px;
        background: rgba(255,255,255,0.1);
        border-radius: 20px;
        position: relative;
        transition: all 0.25s ease;
        flex-shrink: 0;
      }

      .toggle-switch.on { background: #7c3aed; box-shadow: 0 0 12px rgba(124,58,237,0.4); }

      .toggle-handle {
        width: 18px; height: 18px;
        background: white;
        border-radius: 50%;
        position: absolute;
        top: 3px; left: 3px;
        transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      }

      .toggle-switch.on .toggle-handle { transform: translateX(20px); }

      /* Checkbox */
      .checkbox-group { display: flex; flex-direction: column; gap: 10px; }
      .checkbox-label { display: flex; align-items: center; gap: 10px; cursor: pointer; font-size: 14px; color: rgba(255,255,255,0.7); }
      .glass-checkbox { display: none; }
      .checkmark {
        width: 18px; height: 18px;
        border-radius: 6px;
        border: 1.5px solid rgba(255,255,255,0.15);
        background: rgba(255,255,255,0.03);
        display: flex; align-items: center; justify-content: center;
        flex-shrink: 0;
        transition: all 0.2s;
        position: relative;
      }

      .glass-checkbox:checked + .checkmark {
        background: #7c3aed;
        border-color: #7c3aed;
      }

      .glass-checkbox:checked + .checkmark::after {
        content: '';
        width: 4px; height: 7px;
        border: 2px solid white;
        border-top: none; border-left: none;
        transform: rotate(45deg) translate(-1px, -1px);
        display: block;
      }

      /* Image preview in modal */
      .edit-image-section { margin-bottom: 24px; }

      .large-preview {
        width: 100%; height: 220px;
        object-fit: cover;
        border-radius: 16px;
        margin-bottom: 12px;
        border: 1px solid rgba(255,255,255,0.08);
        display: block;
        background: rgba(255,255,255,0.03);
      }

      .file-upload-label {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 10px 18px;
        border-radius: 10px;
        background: rgba(255,255,255,0.04);
        border: 1px solid rgba(255,255,255,0.09);
        color: rgba(255,255,255,0.5);
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
      }

      .file-upload-label:hover {
        background: rgba(255,255,255,0.07);
        border-color: rgba(255,255,255,0.14);
        color: rgba(255,255,255,0.8);
      }

      /* ============ BUTTONS ============ */
      .glass-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 11px 22px;
        border-radius: 12px;
        border: none;
        font-family: 'DM Sans', sans-serif;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        white-space: nowrap;
      }

      .glass-btn:active { transform: scale(0.97); }
      .glass-btn:disabled { opacity: 0.5; cursor: not-allowed; }
      .glass-btn:disabled:hover { transform: none; }

      .glass-btn.primary, .glass-btn.save {
        background: linear-gradient(135deg, #7c3aed, #4f46e5);
        color: white;
        box-shadow: 0 8px 20px rgba(124,58,237,0.3);
      }

      .glass-btn.primary:hover:not(:disabled), .glass-btn.save:hover:not(:disabled) {
        transform: translateY(-1px);
        box-shadow: 0 12px 28px rgba(124,58,237,0.4);
      }

      .glass-btn.cancel {
        background: rgba(255,255,255,0.05);
        color: rgba(255,255,255,0.6);
        border: 1px solid rgba(255,255,255,0.08);
      }

      .glass-btn.cancel:hover {
        background: rgba(255,255,255,0.08);
        color: rgba(255,255,255,0.85);
      }

      .glass-btn.submit-btn {
        width: 100%;
        padding: 15px;
        font-size: 15px;
        margin-top: 8px;
      }

      .btn-spinner {
        width: 16px; height: 16px;
        border: 2px solid rgba(255,255,255,0.3);
        border-top-color: white;
        border-radius: 50%;
        animation: spin 0.7s linear infinite;
      }

      /* ============ ALERTS ============ */
      .alert {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 14px 18px;
        border-radius: 12px;
        font-size: 14px;
        font-weight: 500;
        margin: 0 28px 20px;
        animation: alertSlide 0.3s ease;
      }

      @keyframes alertSlide {
        from { opacity: 0; transform: translateY(-8px); }
        to { opacity: 1; transform: translateY(0); }
      }

      .alert.success {
        background: rgba(16,185,129,0.1);
        border: 1px solid rgba(16,185,129,0.25);
        color: #6ee7b7;
      }

      .alert.success::before { content: '✓'; font-weight: 700; color: #10b981; }

      .alert.error {
        background: rgba(239,68,68,0.1);
        border: 1px solid rgba(239,68,68,0.25);
        color: #fca5a5;
      }

      .alert.error::before { content: '✕'; font-weight: 700; color: #ef4444; }

      /* ============ LOADING ============ */
      .loader-container {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 200px;
        width: 100%;
      }

      .spinner {
        width: 36px; height: 36px;
        border: 2.5px solid rgba(139,92,246,0.15);
        border-top-color: #7c3aed;
        border-radius: 50%;
        animation: spin 0.75s linear infinite;
      }

      @keyframes spin {
        to { transform: rotate(360deg); }
      }

      /* Page loading state */
      .page-loading {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 300px;
        gap: 16px;
        color: rgba(255,255,255,0.3);
        font-size: 14px;
      }

      /* ============ LOGIN ============ */
      .login-container {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%; height: 100%;
      }

      .login-card {
        width: 100%;
        max-width: 420px;
        padding: 48px 40px;
        border-radius: 28px;
        border: 1px solid rgba(255,255,255,0.08);
        background: rgba(255,255,255,0.025);
        backdrop-filter: blur(40px);
        animation: cardSlideIn 0.5s ease;
      }

      /* ============ ANIMATIONS ============ */
      .animated-fade-in {
        animation: fadeIn 0.3s ease;
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      /* ============ NOTIFICATION PAGE ============ */
      .notif-info-box {
        padding: 16px 20px;
        border-radius: 14px;
        background: rgba(99,102,241,0.07);
        border: 1px solid rgba(99,102,241,0.15);
        margin: 0 28px 24px;
        font-size: 13.5px;
        color: rgba(255,255,255,0.5);
        line-height: 1.6;
        display: flex;
        gap: 12px;
        align-items: flex-start;
      }

      .notif-info-icon {
        font-size: 18px;
        flex-shrink: 0;
        margin-top: 1px;
      }

      /* ============ SECTION HEADERS ============ */
      .section-header {
        padding: 24px 28px 0;
        border-bottom: 1px solid rgba(255,255,255,0.05);
        margin-bottom: 0;
      }

      .section-header-inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 20px;
      }

      .section-h {
        font-family: 'Syne', sans-serif;
        font-size: 17px;
        font-weight: 700;
        color: #fff;
      }

      .section-sub {
        font-size: 13px;
        color: rgba(255,255,255,0.35);
        margin-top: 3px;
      }

      /* ============ RESPONSIVE ============ */
      @media (max-width: 900px) {
        .stats-grid { grid-template-columns: 1fr 1fr; }
        .sidebar { width: 220px; min-width: 220px; }
      }

      @media (max-width: 768px) {
        .layout-dashboard { padding: 8px; gap: 8px; flex-direction: column; }
        .sidebar { width: 100%; min-width: unset; flex-direction: row; border-radius: 16px; padding: 12px 16px; max-height: 70px; }
        .sidebar-brand { display: none; }
        .sidebar-nav { flex-direction: row; gap: 2px; }
        .nav-text, .nav-badge, .brand-tag { display: none; }
        .nav-item { padding: 8px; justify-content: center; }
        .stats-grid { grid-template-columns: 1fr; }
        .form-grid { grid-template-columns: 1fr; }
        .modal-content.expanded { max-height: 100vh; height: 100vh; border-radius: 0; }
        .logout-btn { margin-top: 0; padding: 8px; }
      }
    `}} />
  );
}