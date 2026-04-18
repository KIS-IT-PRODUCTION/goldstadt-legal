import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div style={styles.pageBackground}>
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.title}>Datenschutzerklärung</h1>
          <p style={styles.date}>Zuletzt aktualisiert: April 2026</p>
        </header>

        <section style={styles.section}>
          <h2 style={styles.heading}>1. Einleitung</h2>
          <p style={styles.text}>
            Willkommen bei <strong>Goldstadtaktuell</strong>. Der Schutz Ihrer persönlichen Daten ist uns ein sehr wichtiges Anliegen. Diese Datenschutzerklärung erklärt transparent, welche Informationen wir erfassen, wie wir sie verwenden und wie wir sie schützen, wenn Sie unsere mobile Anwendung (die "App") nutzen.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>2. Datenerfassung und -nutzung</h2>
          <p style={styles.text}>
            Unsere App ist grundsätzlich so konzipiert, dass Sie die Nachrichten lesen können, ohne persönliche Daten (wie Name, E-Mail-Adresse oder Telefonnummer) angeben zu müssen.
          </p>
          <ul style={styles.list}>
            <li style={styles.listItem}>
              <strong>Keine automatische Erfassung personenbezogener Daten:</strong> Wir sammeln nicht heimlich Ihre persönlichen Informationen.
            </li>
            <li style={styles.listItem}>
              <strong>Technische Daten:</strong> Um die App bereitzustellen, kommuniziert sie mit unseren Servern. Dabei können anonymisierte technische Daten (wie Betriebssystemversion, Gerätemodell) verarbeitet werden, um die Darstellung zu optimieren.
            </li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>3. App-Berechtigungen</h2>
          <p style={styles.text}>
            Um ordnungsgemäß zu funktionieren, benötigt die Goldstadtaktuell-App bestimmte Berechtigungen auf Ihrem Gerät:
          </p>
          <ul style={styles.list}>
            <li style={styles.listItem}>
              <strong>Netzwerkzugriff (Internet):</strong> Zwingend erforderlich, um aktuelle Nachrichten, Artikel und Bilder in Echtzeit zu laden.
            </li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>4. Drittanbieter-Dienste</h2>
          <p style={styles.text}>
            Die App kann Dienste von Drittanbietern nutzen (z. B. Google Play-Dienste), die möglicherweise eigene Daten erfassen, um beispielsweise Absturzberichte zu generieren. Diese Daten sind anonymisiert und helfen uns, die Stabilität der App zu verbessern.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>5. Kontakt</h2>
          <p style={styles.text}>
            Wenn Sie Fragen, Anmerkungen oder Bedenken bezüglich dieser Datenschutzerklärung haben, stehen wir Ihnen gerne zur Verfügung. Bitte besuchen Sie dazu unsere <a href="#/support" style={styles.link}>Support-Seite</a>.
          </p>
        </section>
      </div>
    </div>
  );
}

// Сучасні стилі для гарного вигляду сторінки
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
  },
  title: {
    color: '#212529',
    fontSize: '32px',
    margin: '0 0 10px 0',
    fontWeight: '700',
  },
  date: {
    color: '#6c757d',
    fontSize: '14px',
    margin: '0',
    fontStyle: 'italic',
  },
  section: {
    marginBottom: '30px',
  },
  heading: {
    color: '#1a73e8', // Приємний синій колір для заголовків
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
  list: {
    paddingLeft: '20px',
    color: '#495057',
    lineHeight: '1.6',
  },
  listItem: {
    marginBottom: '10px',
  },
  link: {
    color: '#1a73e8',
    textDecoration: 'none',
    fontWeight: '500',
  }
};