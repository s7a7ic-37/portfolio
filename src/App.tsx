import "./App.css";
import { useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import CaseStudy from "./components/CaseStudy";
import { isCaseStudyKey } from "./components/studyData";

function App() {
  useEffect(() => {
    document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ behavior: "instant" });
  }, []);
  const path = window.location.pathname.replace(/\/$/, "");
  const caseRoute = "/case-studies/";
  const key = path.startsWith(caseRoute) ? path.slice(caseRoute.length) : "";
  if (isCaseStudyKey(key)) return <CaseStudy project={key} />;
  return (
    <div className="site-shell">
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}

export default App;
