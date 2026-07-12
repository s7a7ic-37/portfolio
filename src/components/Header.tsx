import { useState } from "react";
import styles from "./Header.module.css";

const links = [
  ["About", "about"],
  ["Projects", "projects"],
  ["Skills", "skills"],
  ["Contact", "contact"],
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.inner + " section-wrap"}>
        <a className={styles.brand} href="#hero" onClick={() => setIsMenuOpen(false)} aria-label="Maksymilian Pasiecki, home">
          <span className={styles.brandMark}>MP</span>
          <span>Maksymilian Pasiecki</span>
        </a>
        <button
          className={styles.menuToggle}
          type="button"
          aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span></span><span></span>
        </button>
        <nav id="primary-navigation" className={isMenuOpen ? styles.nav + " " + styles.navOpen : styles.nav} aria-label="Primary navigation">
          {links.map(([label, target]) => (
            <a key={target} href={"#" + target} onClick={() => setIsMenuOpen(false)}>{label}</a>
          ))}
        </nav>
      </div>
    </header>
  );
}
