import styles from "./Hero.module.css";
import { scrollTo } from "../utils/utils";
import avatar from "../assets/photos/avatar.png";

export default function Hero() {
  return (
    <section id="hero" className={styles["hero-section"]}>
      <div className={styles.content}>
        <h1 className={styles.title}>Hi, I am Maksymilian</h1>
        <p className={styles.description}>
          I am a passionate full-stack developer with a current focus on AWS
          technologies 🚀
        </p>
        <button
          onClick={() => scrollTo("contact")}
          className={styles["contact-button"]}
        >
          Contact Me
        </button>
      </div>
      <img src={avatar} alt="Avatar" className={styles.avatar} />
      <div className={styles.topBlur} />
      <div className={styles.bottomBlur} />
    </section>
  );
}
