export default function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="section-wrap">
        <p className="eyebrow">Contact</p>
        <div className="contact-grid">
          <div>
            <h2 className="section-title">Let’s talk about useful software.</h2>
            <p className="section-intro">Open to junior software development, technical application support and data-focused opportunities. I bring hands-on project work and experience making everyday operations run clearly.</p>
            <div className="contact-links">
              <a href="https://github.com/s7a7ic-37">GitHub ↗</a>
              <a href="https://www.linkedin.com/in/maksymilian-pasiecki/">LinkedIn ↗</a>
            </div>
          </div>
        </div>
        <p className="footer-note">© {new Date().getFullYear()} Maksymilian Pasiecki · Built with React and Vite · <a href="https://github.com/s7a7ic-37/portfolio">Portfolio source ↗</a></p>
      </div>
    </section>
  );
}
