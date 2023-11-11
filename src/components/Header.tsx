import styles from "./Header.module.css";
import logo from "../assets/photos/logo.png";
import { scrollTo } from "../utils/utils";
import { useState } from "react";

interface HeaderProps {
  activeSection: string;
}

export default function Header({ activeSection }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleButtonClick = (section: string) => {
    scrollTo(section);
    toggleMenu();
  };

  const handleLogoClick = (section: string) => {
    scrollTo(section);
  };

  const toggleMenu = () => {
    setIsMenuOpen((open: boolean) => !open);
  };

  const overlayClassNames = `${styles["overlay"]} ${
    isMenuOpen ? styles["overlay--open"] : ""
  }
  `;

  const menuClassNames = `${styles.menu} ${
    isMenuOpen ? styles["is-menu-open"] : ""
  }`;

  return (
    <div className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.navbar_inner}>
          <div className={styles.logo}>
            <a onClick={() => handleLogoClick("about")}>
              <img src={logo} alt="logo" />
            </a>
          </div>
          <div className={overlayClassNames} onClick={toggleMenu}></div>
          <div className={menuClassNames}>
            <ul>
              <li className={activeSection === "about" ? styles.current : ""}>
                <button onClick={() => handleButtonClick("about")}>
                  About
                </button>
              </li>
              <li
                className={activeSection === "projects" ? styles.current : ""}
              >
                <button onClick={() => handleButtonClick("projects")}>
                  Projects
                </button>
              </li>
              <li className={activeSection === "skills" ? styles.current : ""}>
                <button onClick={() => handleButtonClick("skills")}>
                  Skills
                </button>
              </li>
              <li className={activeSection === "contact" ? styles.current : ""}>
                <button onClick={() => handleButtonClick("contact")}>
                  Contact
                </button>
              </li>
            </ul>
          </div>
          <svg
            onClick={toggleMenu}
            className={styles["menu-toggle"]}
            width="35"
            height="35"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </div>
      </div>
    </div>
  );
}
