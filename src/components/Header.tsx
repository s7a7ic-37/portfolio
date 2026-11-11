import { useEffect, useRef, useState } from "react";
import styles from "./Header.module.css";

const links = [
  ["About", "about"],
  ["Projects", "projects"],
  ["Skills", "skills"],
  ["Contact", "contact"],
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isMenuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isMenuOpen]);

  return (
    <header className={styles.header} onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setIsMenuOpen(false);
    }}>
      <div className={styles.inner + " section-wrap"}>
        <a className={styles.brand} href="#hero" onClick={() => setIsMenuOpen(false)} aria-label="Maksymilian Pasiecki, home">
          <svg className={styles.brandMark} viewBox="0 0 40 40" aria-hidden="true">
            <rect width="40" height="40" rx="11" fill="var(--ink)" />
            <path d="M10 29h8V21h8V11" fill="none" stroke="var(--paper)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
            <circle cx="10" cy="29" r="3" fill="var(--orange)" />
            <circle cx="26" cy="11" r="3" fill="var(--paper)" />
          </svg>
          <span>Maksymilian Pasiecki</span>
        </a>
        <button
          ref={menuButton}
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
