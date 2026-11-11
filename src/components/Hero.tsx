import styles from "./Hero.module.css";
import runbookPreview from "../assets/photos/project-runbook.png";
import opsPreview from "../assets/photos/project-opslens.webp";

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.content + " section-wrap"}>
        <div className={styles.copy}>
          <p className="eyebrow">Junior software developer</p>
          <h1>Web apps,<br />APIs and data tools.</h1>
          <div className={styles.actions}>
            <a className={styles.primary} href="#projects">View projects <span aria-hidden="true">↓</span></a>
            <a className={styles.secondary} href="#contact">Contact</a>
          </div>
        </div>
        <div className={styles.showcase} role="group" aria-label="Selected project previews">
          <figure className={styles.mainPreview}>
            <img src={runbookPreview} alt="Runbook Desk support case and review screen" />
            <figcaption>Runbook Desk</figcaption>
          </figure>
          <figure className={styles.sidePreview}>
            <img src={opsPreview} alt="OpsLens retail demand dashboard" />
            <figcaption>OpsLens</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
