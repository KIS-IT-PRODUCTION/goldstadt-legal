import React from 'react';

export default function Support() {
  return (
    <div style={styles.pageBackground}>
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.title}>Support & Kontakt</h1>
          <p style={styles.subtitle}>Wir sind hier, um Ihnen zu helfen!</p>
        </header>

        <section style={styles.section}>
          <h2 style={styles.heading}>Brauchen Sie Hilfe?</h2>
          <p style={styles.text}>
            Wenn Sie technische Probleme mit der <strong>Goldstadtaktuell</strong> App haben, Feedback geben möchten oder Fragen haben, kontaktieren Sie uns bitte direkt per E-Mail. Unser Support-Team wird sich so schnell wie möglich bei Ihnen melden.
          </p>
          <div style={styles.contactBox}>
            <span style={styles.icon}>✉️</span>
            <strong>E-Mail Support: </strong> 
            {/* ВАЖЛИВО: Замініть goldstadtaktuell.app@gmail.com
 на вашу реальну пошту */}
            <a href="mailto:goldstadtaktuell.app@gmail.com
" style={styles.link}>goldstadtaktuell.app@gmail.com
</a>
          </div>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>Löschung Ihrer Daten anfordern</h2>
          <p style={styles.text}>
            Gemäß der DSGVO und den Richtlinien von Google Play haben Sie das Recht, die Löschung Ihrer persönlichen Daten zu verlangen. Obwohl unsere App grundsätzlich keine zwingenden Nutzerkonten erfordert, können Sie uns jederzeit kontaktieren, um sicherzustellen, dass alle eventuell mit Ihnen verknüpften Daten (z. B. frühere Support-Anfragen) vollständig gelöscht werden.
          </p>
          <p style={styles.text}>
            Klicken Sie auf den untenstehenden Button, um eine automatische Anfrage zur Datenlöschung an unser Team zu senden:
          </p>
          
          {/* ВАЖЛИВО: Замініть goldstadtaktuell.app@gmail.com
 на вашу реальну пошту */}
          <a 
            href="mailto:goldstadtaktuell.app@gmail.com
?subject=Anforderung zur Datenlöschung (Goldstadtaktuell)&body=Sehr geehrtes Support-Team,%0D%0A%0D%0Ahiermit fordere ich die vollständige Löschung all meiner gespeicherten Daten im Zusammenhang mit der Goldstadtaktuell App an.%0D%0A%0D%0A[Bitte fügen Sie hier ggf. weitere Informationen hinzu, damit wir Ihre Anfrage zuordnen können, z.B. Ihre E-Mail]%0D%0A%0D%0AMit freundlichen Grüßen" 
            style={styles.button}
          >
            🗑️ Datenlöschung anfordern
          </a>
        </section>
      </div>
    </div>
  );
}

// Стилі, що відповідають дизайну Політики конфіденційності
const styles = {
  pageBackground: {
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
    padding: '40px 20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
  container: {
    backgroundColor: '#ffffff',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    border: '1px solid #e9ecef',
  },
  header: {
    borderBottom: '2px solid #f1f3f5',
    paddingBottom: '20px',
    marginBottom: '30px',
    textAlign: 'center',
  },
  title: {
    color: '#212529',
    fontSize: '32px',
    margin: '0 0 10px 0',
    fontWeight: '700',
  },
  subtitle: {
    color: '#6c757d',
    fontSize: '16px',
    margin: '0',
  },
  section: {
    marginBottom: '40px',
  },
  heading: {
    color: '#1a73e8',
    fontSize: '22px',
    marginBottom: '15px',
    fontWeight: '600',
  },
  text: {
    color: '#495057',
    fontSize: '16px',
    lineHeight: '1.6',
    margin: '0 0 15px 0',
  },
  contactBox: {
    backgroundColor: '#f1f8ff',
    borderLeft: '4px solid #1a73e8',
    padding: '15px 20px',
    borderRadius: '4px',
    marginTop: '20px',
    fontSize: '16px',
    color: '#212529',
  },
  icon: {
    marginRight: '10px',
  },
  link: {
    color: '#1a73e8',
    textDecoration: 'none',
    fontWeight: '600',
  },
  button: {
    display: 'inline-block',
    backgroundColor: '#dc3545', // Червоний колір для кнопки видалення
    color: '#ffffff',
    padding: '12px 24px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '16px',
    marginTop: '10px',
    transition: 'background-color 0.2s',
    boxShadow: '0 2px 4px rgba(220, 53, 69, 0.3)',
  }
};