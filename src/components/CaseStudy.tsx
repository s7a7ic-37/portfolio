import { useEffect } from "react";
import { studies } from "./studyData";
import type { CaseStudyKey } from "./studyData";
import styles from "./CaseStudy.module.css";

export default function CaseStudy({ project }: { project: CaseStudyKey }) {
  const study = studies[project];
  useEffect(() => {
    document.title = `${study.title} — project case study`;
    document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ behavior: "instant" });
  }, [study.title]);
  const sourceLink = (path: string) => path.startsWith("https:") ? path : `${study.source}/blob/${study.revision}/${path}`;
  return (
    <div className={styles.page}>
      <a className={styles.skip} href="#case-content">Skip to case study</a>
      <header className={styles.header}><a href="/#projects">← All projects</a><span>Maksymilian Pasiecki</span></header>
      <main id="case-content" tabIndex={-1} className={styles.content}>
        <p className={styles.eyebrow}>Project case study</p>
        <h1>{study.title}</h1><p className={styles.subtitle}>{study.subtitle}</p>
        <p className={styles.stack}>{study.stack}</p>
        <div className={styles.links}><a href={study.live}>Open project ↗</a><a href={study.source}>Browse source ↗</a></div>
        <section><h2>Overview</h2><p>{study.problem}</p></section>
        <section><h2>How it works</h2><ol className={styles.flow}>{study.flow.map(step => <li key={step}>{step}</li>)}</ol></section>
        <section><h2>A few details</h2>{study.decisions.map(item => <article className={styles.decision} key={item.title}><h3>{item.title}</h3><p>{item.text}</p><a href={sourceLink(item.path)}>View code ↗</a></article>)}</section>
        <section><h2>Tests</h2><p>{study.proof}</p><div className={styles.proofLinks}>{study.checks.map(check => <a key={check.label} href={sourceLink(check.path)}>{check.label} ↗</a>)}</div></section>
        <section><h2>Try it</h2><p>{study.demo}</p></section>
        <section><h2>Limits and my contribution</h2><p>{study.limits}</p><p>{study.contribution}</p></section>
      </main>
      <footer className={styles.footer}><a href="/#projects">← All projects</a><a href={study.source}>Source ↗</a></footer>
    </div>
  );
}
