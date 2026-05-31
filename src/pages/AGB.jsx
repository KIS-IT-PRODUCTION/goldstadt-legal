import React from 'react';

export default function AGB() {
  return (
    <div style={styles.container}>
      <h1 style={styles.mainTitle}>NUTZUNGSBEDINGUNGEN</h1>
      <h2 style={styles.subtitle}>GoldstadtAktuell</h2>
      
      <p style={styles.introText}>
        Bitte lesen Sie die folgenden, für jeden Nutzer der App „GoldstadtAktuell“ (im Folgenden "App" genannt) 
        geltenden Nutzungsbedingungen durch. Durch Nutzung dieser Website erklären Sie konkludent Ihr Einverständnis 
        mit diesen Nutzungsbedingungen. Der Inhaber der Website behält sich das Recht vor, die Informationen in dieser 
        App jederzeit ohne vorherige Ankündigung zu ändern, zu streichen oder zu ergänzen.
      </p>

      <div style={styles.divider} />

      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>§ 1 Geltungsbereich</h3>
        <p style={styles.paragraph}>
          1. Die nachfolgenden Bedingungen gelten für die Nutzung der App GoldstadtAktuell (nachfolgend "App"). 
          Für die Nutzung der App ist wichtig, dass Sie als Nutzer/in die nachfolgenden Bestimmungen akzeptieren.
        </p>
        <p style={styles.paragraph}>
          2. Durch die Nutzung unserer App sind Sie mit den Nutzungsbedingungen unserer App einverstanden. 
          Durch Ihr Einverständnis garantieren Sie uns, dass Sie keine Beiträge erstellen werden, die gegen die 
          Nutzungsbedingung verstoßen.
        </p>
        <p style={styles.paragraph}>
          3. Gegenstand von GoldstadtAktuell ist Folgendes:<br />
          <strong>Aktuelle Nachrichten über Vorfälle in der Stadt Pforzheim und dem Enzkreis.</strong>
        </p>
      </section>

      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>§ 2 Kontaktdaten und rechtliche Hinweise</h3>
        <p style={styles.paragraph}>
          Sollten Sie Fragen bezüglich unserer Website haben, können Sie uns unter folgenden Kontaktdaten erreichen:
        </p>
        <div style={styles.addressBlock}>
          <strong>Igor Myroshnichenko</strong><br />
          Friedrich-Ebert-Str. 23<br />
          75175 Pforzheim<br />
          Telefon: +4917645917902<br />
          E-Mail: kamera@goldstadt-tv.de
        </div>
        <p style={styles.paragraph}>
          Verantwortlich für redaktionelle Inhalte gemäß § 55 Absatz 2 RStV: <em>Igor Myroshnichenko</em>
        </p>
      </section>

      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>§ 3 Verfügbarkeit der App</h3>
        <p style={styles.paragraph}>
          1. GoldstadtAktuell hat eine Verfügbarkeit von 24 Stunden am Tag. Es kann jedoch vorkommen, dass es aufgrund 
          von Wartungen, die für das Systems erforderlich sind, zu Unterbrechungen der Verfügbarkeit kommt. Unterbrechungen 
          der Verfügbarkeit können unter Anderem aufgrund höherer Gewalt oder anderen, von GoldstadtAktuell nicht zu 
          vertretenden Ursachen, wie zum Beispiel Vorsatz oder grobe Fahrlässigkeit vorkommen.
        </p>
        <p style={styles.paragraph}>
          2. Igor Myroshnichenko weist darauf hin:<br />
          • dass es technisch unmöglich ist, die App frei von Fehlern jedweder Art zur Verfügung zu stellen und dass Igor Myroshnichenko deshalb keinerlei Verantwortung dafür übernimmt,<br />
          • dass Fehler zur zeitweisen Abschaltung der App führen können,<br />
          • dass die Verfügbarkeit dieser App von außerhalb des Einflussbereichs von Igor Myroshnichenko liegenden Bedingungen und Leistungen abhängig ist, wie z.B. den Übertragungskapazitäten und Telefonverbindungen zwischen den einzelnen Beteiligten. In diesen Bereich fallende Störungen haben wir nicht zu verantworten.
        </p>
      </section>

      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>§ 4 Diskussionsforen</h3>
        <p style={styles.paragraph}>
          Soweit Igor Myroshnichenko zeitweise oder dauerhaft in der App Diskussionsforen anbietet, wird von den Teilnehmern 
          der Diskussionsforen erwartet, dass sie die üblichen Kommunikationsregeln wie gegenseitigen Respekt beachten. 
          Besucher dürfen keine beleidigenden, eventuell herabwürdigenden, unflätigen, anstößigen, diffamierenden oder 
          obszönen Materialien oder Materialien, die die geistigen Eigentumsrechte Dritter verletzen, verbreiten oder veröffentlichen.
        </p>
      </section>

      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>§ 5 Elektronische Kommunikation</h3>
        <p style={styles.paragraph}>
          Wenn Sie einen Dienst von GoldstadtAktuell nutzen oder E-Mails, Textnachrichten oder andere Mitteilungen von Ihrem 
          Computer oder Ihrem mobilen Gerät an uns senden, kommunizieren Sie mit uns elektronisch. Wir werden mit Ihnen auf 
          verschiedene Art und Weise elektronisch kommunizieren, z.B. über E-Mail, Textnachrichten oder auch durch die 
          Veröffentlichung elektronischer Nachrichten oder sonstiger Kommunikation auf unserer Website oder im Rahmen sonstiger 
          Dienste von GoldstadtAktuell. Für vertragliche Zwecke stimmen Sie zu, elektronische Kommunikation von uns zu erhalten 
          und dass alle Zustimmungen, Benachrichtigungen, Veröffentlichungen und andere Kommunikation, die wir Ihnen elektronisch 
          mitteilen insofern keine Schriftform erfordern, es sei denn zwingend anzuwendende gesetzliche Vorschriften erfordern 
          eine andere Form der Kommunikation.
        </p>
      </section>

      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>§ 6 Urheberrecht und Datenbankrechte</h3>
        <p style={styles.paragraph}>
          1. Der gesamte Inhalt, der in einem Dienst von GoldstadtAktuell enthalten oder durch ihn bereitgestellt wird, wie Text, 
          Grafik, Logos, Button-Icons, Bilder, Audio-Clips, digitale Downloads und Datensammlungen, ist Eigentum von GoldstadtAktuell 
          oder von Dritten, die Inhalte zuliefern in der App bereitstellen und ist durch deutsches Urheberrecht und Datenbankrecht geschützt.
        </p>
        <p style={styles.paragraph}>
          2. Auch der Gesamtbestand der Inhalte, der in einem Dienst von GoldstadtAktuell enthalten oder durch ihn bereitgestellt wird, 
          ist ausschließliches Eigentum von GoldstadtAktuell und ist durch deutsches Urheberrecht und Datenbankrecht geschützt.
        </p>
        <p style={styles.paragraph}>
          3. Sie dürfen ohne unsere ausdrückliche schriftliche Zustimmung nicht Teile eines Dienstes von GoldstadtAktuell systematisch 
          extrahieren und/oder wiederverwenden. Insbesondere dürfen Sie ohne die ausdrückliche schriftliche Zustimmung von 
          GoldstadtAktuell kein Data Mining, keine Robots oder ähnliche Datensammel- und Extraktionsprogramme einsetzen, um irgendwelche 
          wesentlichen Teile eines Dienstes von GoldstadtAktuell zur Wiederverwendung zu extrahieren (gleichgültig ob einmalig oder 
          mehrfach). Sie dürfen ferner ohne die ausdrückliche schriftliche Zustimmung von GoldstadtAktuell keine eigene Datenbank 
          herstellen und/oder veröffentlichen, die wesentliche Teile eines Dienstes von GoldstadtAktuell beinhaltet.
        </p>
      </section>

      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>§ 7 Patente</h3>
        <p style={styles.paragraph}>
          Alle Patente die auf GoldstadtAktuell angemeldet sind, sind auch auf alle Dienste und sonstige Produkte von GoldstadtAktuell 
          anwendbar. Es kann vorkommen, dass die jeweiligen Patente unter einem oder mehreren Patenten betrieben werden.
        </p>
      </section>

      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>§ 8 Ihr Konto</h3>
        <p style={styles.paragraph}>1. Der Zugang zu einigen (kostenpflichtigen) Diensten der App, setzt die Erstellung eines Kontos voraus.</p>
        <p style={styles.paragraph}>2. Die Erstellung eines Kontos ist nur voll geschäftsfähigen Personen gestattet, denen das Anmeldeformular in der App bereit gestellt wird.</p>
        <p style={styles.paragraph}>3. Der Nutzer verpflichtet sich dazu, keine falschen Angaben zu seiner Person zu machen. Des Weiteren verpflichtet sich der Nutzer dazu, seine Angaben regelmäßig zu kontrollieren, um die Richtigkeit dieser zu gewährleisten.</p>
        <p style={styles.paragraph}>
          4. Wenn Sie einen Dienst von GoldstadtAktuell nutzen, sind Sie für die Sicherstellung der Vertraulichkeit Ihres Kontos, Passworts und für die Beschränkung des Zugangs zu Ihrem Computer und Ihren mobilen Geräten verantwortlich. Soweit unter anwendbarem Recht zulässig, erklären Sie sich damit einverstanden, für alle Aktivitäten verantwortlich zu sein, die über Ihr Konto oder Passwort vorgenommen werden. Sie sollten alle erforderlichen Schritte unternehmen, um sicherzustellen, dass Ihr Passwort geheim gehalten und sicher aufbewahrt wird und Sie sollten uns unverzüglich informieren, wenn Sie Anlass zur Sorge haben, dass ein Dritter Kenntnis von Ihrem Passwort erlangt hat oder das Passwort unautorisiert genutzt wird oder dies wahrscheinlich ist. Sie sind dafür verantwortlich, sicherzustellen, dass Ihre Angaben an uns korrekt und vollständig sind und dass Sie uns von jeglichen Änderungen hinsichtlich der von Ihnen gegebenen Informationen in Kenntnis setzen. Sie können einige der Informationen, die Sie uns gegeben haben, auf unserer Website einsehen und aktualisieren.
        </p>
        <p style={styles.paragraph}>5. Der Nutzer kann seinen Benutzernamen und sein Passwort nachträglich jederzeit ändern.</p>
        <p style={styles.paragraph}>6. Sie dürfen einen Dienst von GoldstadtAktuell nicht in einer Weise verwenden, die dazu geeignet ist, die Dienste oder den Zugang von GoldstadtAktuell zu unterbrechen, zu beschädigen oder in sonstiger Art zu beeinträchtigen.</p>
        <p style={styles.paragraph}>7. Des Weiteren dürfen Sie die Dienste von GoldstadtAktuell nicht für betrügerische oder in Verbindung mit einer Straftat, rechtswidrigem Aktivitäten, Belästigungen oder Unannehmlichkeiten verwenden.</p>
        <p style={styles.paragraph}>8. Wir behalten uns das Recht vor, Ihnen die Dienste auf der Website vorzuenthalten oder Mitgliedskonten zu schließen. Das gilt insbesondere für den Fall, dass Sie gegen anwendbares Recht, vertragliche Vereinbarungen oder unsere Richtlinien verstoßen.</p>
        <p style={styles.paragraph}>
          <strong>9. Die Nutzer dieser App können ihr Konto jederzeit löschen, indem Sie die Funktion „Konto löschen“ direkt in den App-Einstellungen ausführen. Das Konto des Nutzers sowie alle damit verbundenen Daten werden unverzüglich und unwiderruflich gelöscht.</strong>
        </p>
      </section>

      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>§ 9 Ansprüche aus Immaterialgüterrechten</h3>
        <p style={styles.paragraph}>
          GoldstadtAktuell respektiert die Immaterialgürechte Dritter. Wenn Sie der Auffassung sind, dass Ihre Immaterialgürechte 
          in einer Art genutzt wurden, der Anlass zur Befürchtung einer Verletzung gibt, folgen Sie bitte unserem Verfahren 
          zur Mitteilung an GoldstadtAktuell über eine Rechtsverletzung.
        </p>
      </section>

      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>§ 10 Haftung</h3>
        <p style={styles.paragraph}>
          1. Wir bemühen uns stets sicherzustellen, dass die Dienste von GoldstadtAktuell ohne Unterbrechungen verfügbar und Übermittlungen 
          fehlerfrei sind. Durch die Beschaffenheit des Internets kann dies jedoch nicht garantiert werden. Auch Ihr Zugriff auf die 
          Dienste von GoldstadtAktuell kann gelegentlich unterbrochen oder beschränkt sein, um Instandsetzungen, Wartungen oder die 
          Einführung neuer Einrichtungen zu ermöglichen. Wir versuchen die Häufigkeit und Dauer jeder dieser vorübergehenden 
          Unterbrechungen oder Beschränkungen zu begrenzen.
        </p>
        <p style={styles.paragraph}>
          2. GoldstadtAktuell haftet unbeschränkt, soweit die Schadensursache auf einer vorsätzlichen oder grob fahrlässigen 
          Pflichtverletzung von GoldstadtAktuell oder eines gesetzlichen Vertreters oder Erfüllungsgehilfen von GoldstadtAktuell beruht.
        </p>
        <p style={styles.paragraph}>
          3. Ferner haftet GoldstadtAktuell für die leicht fahrlässige Verletzung von wesentlichen Pflichten. Wesentlich sind Pflichten, 
          deren Verletzung die Erreichung des Vertragszwecks gefährdet oder deren Erfüllung die ordnungsgemäße Durchführung des Vertrages 
          überhaupt erst ermöglicht und auf deren Einhaltung Sie regelmäßig vertrauen. In diesem Fall haftet GoldstadtAktuell jedoch nur 
          für den vorhersehbaren, vertragstypischen Schaden. GoldstadtAktuell haftet nicht für die leicht fahrlässige Verletzung anderer 
          als der in den vorstehenden Sätzen genannten Pflichten.
        </p>
        <p style={styles.paragraph}>
          4. Die vorstehenden Haftungsbeschränkungen gelten nicht bei Verletzung von Leben, Körper und Gesundheit, für einen Mangel 
          nach Übernahme einer Garantie für die Beschaffenheit des Produktes und bei arglistig verschwiegenen Mängeln. Die Haftung 
          nach dem Produkthaftungsgesetz bleibt unberührt.
        </p>
        <p style={styles.paragraph}>
          5. Soweit die Haftung von GoldstadtAktuell ausgeschlossen oder beschränkt ist, gilt dies auch für die persönliche Haftung 
          von Arbeitnehmern, Vertretern und Erfüllungsgehilfen.
        </p>
      </section>

      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>§ 11 Links zu anderen Websites</h3>
        <p style={styles.paragraph}>
          1. Für Links, die nicht von Igor Myroshnichenko betrieben werden und sich auf deren Webseite befinden, haben wir 
          keinerlei Möglichkeit, den Inhalt dieser App zu kontrollieren, da diese völlig unabhängig von uns ist.
        </p>
        <p style={styles.paragraph}>
          2. Aus diesem Grund übernehmen wir keinerlei Verantwortung für die Inhalte dieser App und die Folgen ihrer Verwendung 
          durch die Besucher dieser. Das Aufrufen aller über Links erreichbaren Webseiten geschieht auf eigene Gefahr. Es erfolgt 
          kein gesonderter Hinweis, wenn Benutzer die Website verlassen. Wir bitten Sie aber, uns umgehend auf rechtswidrige und 
          zweifelhafte Inhalte der verlinkten Website aufmerksam zu machen.
        </p>
        <p style={styles.paragraph}>
          3. Andere Webseiten verfügen möglicherweise über einen Link zu den Webseiten oder Apps von Igor Myroshnichenko. 
          Ein solcher Link erfordert unsere vorherige Zustimmung.
        </p>
      </section>

      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>§ 12 Datenschutz</h3>
        <p style={styles.paragraph}>1. Es kann vorkommen, dass Daten und Informationen der Besucher und Nutzer (Datum, Uhrzeit, aufgerufene Seite) über den Zugriff auf dem Server gespeichert werden. Wir weisen darauf hin, dass - ohne Einwilligung - keine personenbezogenen (z. B. Name, Anschrift oder E-Mail-Adresse) Daten gespeichert werden.</p>
        <p style={styles.paragraph}>2. Sollten personenbezogene Daten erhoben werden, verpflichten wir uns dazu, das vorherige Einverständnis des Nutzers der Website einzuholen. Wir verpflichten uns dazu, keine Daten an Dritte weiterzugeben, es sei denn der Besucher oder Nutzer willigt vorher ein.</p>
        <p style={styles.paragraph}>3. Wir weisen darauf hin, dass die Übertragung von Daten im Internet (z. B. per E-Mail) Sicherheitslücken aufweisen kann. Demnach kann ein fehlerfreier und störungsfreier Schutz der Daten Dritter nicht vollständig gewährleistet werden. Diesbezüglich ist unsere Haftung ausgeschlossen.</p>
        <p style={styles.paragraph}>4. Dritte sind nicht dazu berechtigt, Kontaktdaten für gewerbliche Aktivitäten zu nutzen.</p>
        <p style={styles.paragraph}>5. Der Nutzer hat das Recht auf Auskunft. Sie haben jederzeit das Recht, von uns über den Sie betreffenden Datenbestand vollständig und unentgeltlich Auskunft zu erhalten.</p>
        <p style={styles.paragraph}>6. Des Weiteren besteht ein Recht auf Berichtigung/Löschung von Daten/ Einschränkung der Verarbeitung für den Nutzer.</p>
        <p style={styles.paragraph}>7. Weitere Angaben werden separat in der Datenschutzrichtlinie gemacht.</p>
      </section>

      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>§ 13 Cookies</h3>
        <p style={styles.paragraph}>1. Zur Anzeige des Produktangebotes kann es vorkommen, dass wir Cookies einsetzen. Bei Cookies handelt es sich um kleine Textdateien, die lokal im Zwischenspeicher des Internet-Browsers des Seitenbesuchers gespeichert werden.</p>
        <p style={styles.paragraph}>2. Zahlreiche Internetseiten und Server verwenden Cookies. Viele Cookies enthalten eine sogenannte Cookie-ID. Eine Cookie-ID ist eine eindeutige Kennung des Cookies. Sie besteht aus einer Zeichenfolge, durch welche Internetseiten und Server dem konkreten Internetbrowser zugeordnet werden können, in dem das Cookie gespeichert wurde. Dies ermöglicht es den besuchten Internetseiten und Servern, den individuellen Browser der betroffenen Person von anderen Internetbrowsern, die andere Cookies enthalten, zu unterscheiden. Ein bestimmter Internetbrowser kann über die eindeutige Cookie-ID wiedererkannt und identifiziert werden.</p>
        <p style={styles.paragraph}>3. Durch den Einsatz von Cookies kann den Nutzern dieser Internetseite nutzerfreundlichere Services bereitstellen, die ohne die Cookie-Setzung nicht möglich wären.</p>
        <p style={styles.paragraph}>4. Wir weisen Sie darauf hin, dass einige dieser Cookies von unserem Server auf Ihr Computersystem überspielt werden, wobei es sich dabei meist um so genannte sitzungsbezogene Cookies handelt. Sitzungsbezogene Cookies zeichnen sich dadurch aus, dass diese automatisch nach Ende der wieder von Ihrer Festplatte gelöscht werden. Andere Cookies verbleiben auf Ihrem System und ermöglichen es uns, Ihr System bei Ihrem nächsten Besuch wieder zu erkennen (sog. dauerhafte Cookies).</p>
        <p style={styles.paragraph}>5. Sie können der Speicherung von Cookies widersprechen, hierzu steht Ihnen ein Banner zu Verfügung dem Sie widersprechen/annehmen können.</p>
        <p style={styles.paragraph}>6. Selbstverständlich können Sie Ihr System so einstellen, dass keine Cookies auf der Festplatte abgelegt werden bzw. bereits abgelegte Cookies wieder gelöscht werden. Die Anweisungen bezüglich der Verhinderung sowie Löschung von Cookies können Sie der Hilfefunktion Ihres Systems oder Softwareherstellers entnehmen.</p>
      </section>

      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>§ 14 Änderungen der Nutzungsbedingungen</h3>
        <p style={styles.paragraph}>
          Wir behalten uns das Recht vor, Änderungen an Diensten von GoldstadtAktuell, Regelwerken, Bedingungen einschließlich dieser 
          Nutzungsbedingungen jederzeit vorzunehmen. Sie unterliegen den Allgemeinen Geschäftsbedingungen, Vertragsbedingungen und 
          Nutzungsbedingungen, die zu dem Zeitpunkt in Kraft sind, an dem Sie die Dienste von GoldstadtAktuell nutzen. Falls eine dieser 
          Bedingungen für unwirksam, nichtig oder aus irgendeinem Grund für undurchsetzbar gehalten wird, gilt diese Regelung als 
          abtrennbar und beeinflusst die Gültigkeit und Durchsetzbarkeit aller verbleibenden Regelungen nicht.
        </p>
      </section>

      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>§ 15 Kein Verzicht</h3>
        <p style={styles.paragraph}>
          Wenn Sie diese Nutzungsbedingungen verletzen und wir unternehmen hiergegen nichts, sind wir weiterhin berechtigt, 
          von unseren Rechten bei jeder anderen Gelegenheit, in der Sie diese Nutzungsbedingungen verletzen, Gebrauch zu machen.
        </p>
      </section>

      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>§ 16 Gerichtsstand und anwendbares Recht</h3>
        <p style={styles.paragraph}>
          1. Für Meinungsverschiedenheiten und Streitigkeiten anlässlich dieses Vertrages gilt ausschließlich das Recht der 
          Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.
        </p>
        <p style={styles.paragraph}>
          2. Alleiniger Gerichtsstand bei Bestellungen von Kaufleuten, juristischen Personen des öffentlichen Rechts oder 
          öffentlich-rechtlichen Sondervermögen ist der Sitz des Anbieters.
        </p>
      </section>

      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>§ 17 Schlussbestimmungen</h3>
        <p style={styles.paragraph}>1. Die Vertragssprache ist deutsch.</p>
        <p style={styles.paragraph}>2. Wenn Sie diese allgemeinen Nutzungsbedingungen verletzen und wir unternehmen hiergegen nichts, sind wir weiterhin berechtigt, von unseren Rechten bei jeder anderen Gelegenheit, in der Sie diese Nutzungsbedingungen verletzen, Gebrauch zu machen.</p>
        <p style={styles.paragraph}>3. Wir behalten uns das Recht vor, Änderungen an unserer Website, Regelwerken, Bedingungen einschließlich dieser Nutzungsbedingungen jederzeit vorzunehmen. Falls eine Regelung in diesen Nutzungsbedingungen unwirksam, nichtig oder aus irgendeinem Grund undurchsetzbar ist, gilt diese Regelung als abtrennbar und beeinflusst die Gültigkeit und Durchsetzbarkeit der verbleibenden Regelungen nicht.</p>
        <p style={styles.paragraph}>4. Die Unwirksamkeit einer Bestimmung berührt die Wirksamkeit der anderen Bestimmungen aus dem Vertrag nicht. Sollte dieser Fall eintreten, soll die Bestimmung nach Sinn und Zweck durch eine andere rechtlich zulässige Bestimmung ersetzt werden, die dem Sinn und Zweck der unwirksamen Bestimmung entspricht.</p>
      </section>
    </div>
  );
}

const styles = {
  container: { maxWidth: '850px', margin: '40px auto', padding: '0 24px', color: '#2b2d42', lineHeight: '1.7', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' },
  mainTitle: { fontSize: '32px', fontWeight: '800', textAlign: 'center', margin: '0 0 5px 0', letterSpacing: '1px', color: '#1a73e8' },
  subtitle: { fontSize: '24px', fontWeight: '600', textAlign: 'center', margin: '0 0 30px 0', color: '#4a4e69' },
  introText: { fontSize: '16px', color: '#495057', textAlign: 'justify', fontStyle: 'italic', backgroundColor: '#f1f3f5', padding: '20px', borderRadius: '12px' },
  divider: { height: '1px', backgroundColor: '#dee2e6', margin: '30px 0' },
  section: { marginBottom: '35px', backgroundColor: '#ffffff', padding: '25px', borderRadius: '12px', border: '1px solid #e9ecef', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' },
  sectionTitle: { fontSize: '20px', fontWeight: '700', color: '#212529', borderBottom: '2px solid #f1f3f5', paddingBottom: '8px', marginBottom: '15px' },
  paragraph: { fontSize: '15px', color: '#4a4a4a', margin: '0 0 12px 0', textAlign: 'justify' },
  addressBlock: { backgroundColor: '#f8f9fa', borderLeft: '4px solid #1a73e8', padding: '15px', margin: '15px 0', fontSize: '15px', color: '#333', lineHeight: '1.5' }
};