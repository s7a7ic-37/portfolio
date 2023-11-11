import styles from "./About.module.css";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface AboutProps {
  setActiveSection: React.Dispatch<React.SetStateAction<string>>;
}

export default function About({ setActiveSection }: AboutProps) {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(
    function handleInViewChange() {
      if (inView) {
        setActiveSection("about");
      }
    },
    [inView, setActiveSection]
  );

  return (
    <div ref={ref} id="about" className={styles["about-section"]}>
      About Section
    </div>
  );
}
