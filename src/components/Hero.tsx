import avatar from "../assets/photos/avatar.webp";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.content + " section-wrap"}>
        <div className={styles.copy}>
          <p className="eyebrow">Maksymilian Pasiecki · software developer</p>
          <h1>Useful software.<br />Thoughtful engineering.</h1>
          <p className={styles.description}>
            React interfaces, reliable APIs and data tools that show their
            working. I bring an operations mindset: understand the task,
            make the next step clear, and check that it works.
          </p>
          <div className={styles.actions}>
            <a className={styles.primary} href="#projects">Explore selected work <span aria-hidden="true">↓</span></a>
            <a className={styles.secondary} href="#contact">Get in touch</a>
          </div>
          <div className={styles.proof}><span><b>INTERFACES</b> Clear, responsive workflows</span><span><b>APIS & DATA</b> Tested, explainable decisions</span></div>
        </div>
        <div className={styles.portrait}>
          <div className={styles.orbit} aria-hidden="true">BUILD · TEST · IMPROVE</div>
          <img src={avatar} width="660" height="660" decoding="async" alt="Illustrated portrait of Maksymilian" />
          <p><span>Currently</span> building practical tools</p>
        </div>
      </div>
    </section>
  );
}
