import { HashRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Support from './pages/Support';
import Admin from './pages/Admin';

// Це макет для публічних сторінок (з навігацією та футером)
function PublicLayout() {
  return (
    <div style={styles.appWrapper}>
      <nav style={styles.navbar}>
        <div style={styles.navContainer}>
          <div style={styles.brand}>
            <Link to="/" style={styles.brandLink}>📰 Goldstadtaktuell</Link>
          </div>
          <div style={styles.navLinks}>
            <Link to="/" style={styles.link}>Startseite</Link>
            <Link to="/privacy-policy" style={styles.link}>Datenschutz</Link>
            <Link to="/support-all" style={styles.link}>Support</Link>
          </div>
        </div>
      </nav>

      <main style={styles.mainContent}>
        <Outlet /> {/* Тут будуть відображатися сторінки (Home, Privacy, Support) */}
      </main>

      <footer style={styles.footer}>
        <p style={styles.footerText}>
          © {new Date().getFullYear()} Goldstadtaktuell. Alle Rechte vorbehalten.
        </p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Публічні маршрути обгорнуті в PublicLayout */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={
            <div style={styles.homeContainer}>
              <div style={styles.heroCard}>
                <h1 style={styles.heroTitle}>Goldstadtaktuell</h1>
                <p style={styles.heroSubtitle}>
                  Willkommen auf unserem offiziellen Rechts- und Support-Portal.
                </p>
                <div style={styles.actionButtons}>
                  <Link to="/privacy" style={styles.primaryButton}>🛡️ Datenschutzerklärung</Link>
                  <Link to="/support" style={styles.secondaryButton}>✉️ Support kontaktieren</Link>
                </div>
              </div>
            </div>
          } />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/support-all" element={<Support />} />
        </Route>

        {/* Адмінка винесена ОКРЕМО, без загального меню і футера */}
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    </Router>
  );
}

// Стилі публічної частини
const styles = {
  appWrapper: { display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f8f9fa', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' },
  navbar: { backgroundColor: '#ffffff', boxShadow: '0 2px 4px rgba(0,0,0,0.08)', position: 'sticky', top: 0, zIndex: 1000 },
  navContainer: { maxWidth: '1000px', margin: '0 auto', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  brand: { fontSize: '20px', fontWeight: '700' },
  brandLink: { color: '#1a73e8', textDecoration: 'none' },
  navLinks: { display: 'flex', gap: '20px' },
  link: { color: '#495057', textDecoration: 'none', fontWeight: '500', fontSize: '16px', transition: 'color 0.2s' },
  mainContent: { flex: 1 },
  homeContainer: { padding: '60px 20px', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  heroCard: { backgroundColor: '#ffffff', padding: '50px 40px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)', textAlign: 'center', maxWidth: '600px', width: '100%', border: '1px solid #e9ecef' },
  heroTitle: { color: '#212529', fontSize: '36px', margin: '0 0 15px 0', fontWeight: '800' },
  heroSubtitle: { color: '#6c757d', fontSize: '18px', lineHeight: '1.6', margin: '0 0 30px 0' },
  actionButtons: { display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' },
  primaryButton: { backgroundColor: '#1a73e8', color: '#ffffff', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', fontSize: '16px', boxShadow: '0 4px 6px rgba(26, 115, 232, 0.2)' },
  secondaryButton: { backgroundColor: '#f1f3f5', color: '#212529', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', fontSize: '16px', border: '1px solid #dee2e6' },
  footer: { backgroundColor: '#ffffff', borderTop: '1px solid #e9ecef', padding: '20px', textAlign: 'center' },
  footerText: { color: '#adb5bd', fontSize: '14px', margin: 0 }
};