import styles from "./Projects.module.css";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface ProjectsProps {
  setActiveSection: React.Dispatch<React.SetStateAction<string>>;
}

export default function Projects({ setActiveSection }: ProjectsProps) {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(
    function handleInViewChange() {
      if (inView) {
        setActiveSection("projects");
      }
    },
    [inView, setActiveSection]
  );

  return (
    <div ref={ref} id="projects" className={styles["projects-section"]}>
      Projects Section
    </div>
  );
}
