import avatar from "../assets/photos/avatar.webp";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.content + " section-wrap"}>
        <div className={styles.copy}>
          <p className="eyebrow">Maksymilian Pasiecki · software developer</p>
          <h1>Useful software for everyday work.</h1>
          <p className={styles.description}>
            I build practical web apps, from clear interfaces to data-aware APIs.
            My operations background keeps the real task in view.
          </p>
          <div className={styles.actions}>
            <a className={styles.primary} href="#projects">Explore selected work <span aria-hidden="true">↓</span></a>
            <a className={styles.secondary} href="#contact">Get in touch</a>
          </div>
        </div>
        <div className={styles.portrait}>
          <div className={styles.orbit} aria-hidden="true">BUILD · TEST · IMPROVE</div>
          <img src={avatar} width="660" height="660" decoding="async" alt="Illustrated portrait of Maksymilian" />
          <p><span>Currently</span> building practical tools</p>
        </div>
        <a className={styles.scroll} href="#about" aria-label="Scroll to About">↓ <span>SCROLL TO EXPLORE</span></a>
      </div>
    </section>
  );
}
