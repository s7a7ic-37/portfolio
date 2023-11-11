import styles from "./Contact.module.css";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface ContactProps {
  setActiveSection: React.Dispatch<React.SetStateAction<string>>;
}

export default function Contact({ setActiveSection }: ContactProps) {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(
    function handleInViewChange() {
      if (inView) {
        setActiveSection("contact");
      }
    },
    [inView, setActiveSection]
  );

  return (
    <div ref={ref} id="contact" className={styles["contact-section"]}>
      Contact Section
    </div>
  );
}
