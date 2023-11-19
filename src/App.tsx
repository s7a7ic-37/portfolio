import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import { useState } from "react";

function App() {
  const [activeSection, setActiveSection] = useState("about");

  return (
    <>
      <Header activeSection={activeSection} />
      <Hero />
      <About setActiveSection={setActiveSection} />
      <Projects setActiveSection={setActiveSection} />
      <Skills setActiveSection={setActiveSection} />
      <Contact setActiveSection={setActiveSection} />
    </>
  );
}

export default App;
