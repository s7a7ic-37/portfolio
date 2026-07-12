export default function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="section-wrap">
        <p className="eyebrow">Contact</p>
        <div className="contact-grid">
          <div>
            <h2 className="section-title">Let’s talk about useful software.</h2>
            <p className="section-intro">I’m open to connecting with people building thoughtful products and practical tools.</p>
            <div className="contact-links">
              <a href="https://github.com/s7a7ic-37">GitHub ↗</a>
              <a href="https://www.linkedin.com/in/maksymilian-pasiecki/">LinkedIn ↗</a>
            </div>
          </div>
        </div>
        <p className="footer-note">© {new Date().getFullYear()} Maksymilian Pasiecki · Built with React and Vite</p>
      </div>
    </section>
  );
}
