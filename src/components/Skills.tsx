import styles from "./Skills.module.css";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface SkillsProps {
  setActiveSection: React.Dispatch<React.SetStateAction<string>>;
}

export default function Skills({ setActiveSection }: SkillsProps) {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(
    function handleInViewChange() {
      if (inView) {
        setActiveSection("skills");
      }
    },
    [inView, setActiveSection]
  );

  return (
    <div ref={ref} id="skills" className={styles["skills-section"]}>
      Skills Section
    </div>
  );
}
