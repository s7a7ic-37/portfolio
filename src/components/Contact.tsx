export default function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="section-wrap">
        <p className="eyebrow">Contact</p>
        <div className="contact-grid">
          <div>
            <h2 className="section-title">Get in touch.</h2>
            <p className="section-intro">I’m looking for junior software, data and application support roles. You can find me on GitHub and LinkedIn.</p>
            <div className="contact-links">
              <a href="https://github.com/s7a7ic-37">GitHub ↗</a>
              <a href="https://www.linkedin.com/in/maksymilian-pasiecki/">LinkedIn ↗</a>
            </div>
          </div>
        </div>
        <p className="footer-note">© {new Date().getFullYear()} Maksymilian Pasiecki · <a href="https://github.com/s7a7ic-37/portfolio">Portfolio source ↗</a></p>
      </div>
    </section>
  );
}
