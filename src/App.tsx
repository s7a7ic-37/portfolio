import "./App.css";
import { useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import CaseStudy from "./components/CaseStudy";

function App() {
  useEffect(() => {
    document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ behavior: "instant" });
  }, []);
  const path = window.location.pathname.replace(/\/$/, "");
  if (path === "/case-studies/runbook-desk") return <CaseStudy project="runbook-desk" />;
  if (path === "/case-studies/pure-news") return <CaseStudy project="pure-news" />;
  if (path === "/case-studies/opslens") return <CaseStudy project="opslens" />;
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
