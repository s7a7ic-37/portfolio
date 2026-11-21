import "./App.css";
import { lazy, Suspense, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import { isCaseStudyKey } from "./components/caseRoutes";

const CaseStudy = lazy(() => import("./components/CaseStudy"));

function App() {
  useEffect(() => {
    document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ behavior: "instant" });
  }, []);
  const path = window.location.pathname.replace(/\/$/, "");
  const caseRoute = "/case-studies/";
  const key = path.startsWith(caseRoute) ? path.slice(caseRoute.length) : "";
  if (isCaseStudyKey(key)) return (
    <Suspense fallback={<main className="section-wrap" role="status">Loading case study…</main>}>
      <CaseStudy project={key} />
    </Suspense>
  );
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
