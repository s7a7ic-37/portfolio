const skills = ["JavaScript", "TypeScript", "React", "Node.js", "Express", "PostgreSQL", "HTML & CSS", "Vite", "Jest", "Git"];

export default function Skills() {
  return (
    <section id="skills" className="skills-section">
      <div className="section-wrap">
        <p className="eyebrow">Tools & approach</p>
        <h2 className="section-title">A practical full-stack toolkit.</h2>
        <p className="section-intro">I use the simplest parts of the stack that solve the job, and keep the code easy to understand and change.</p>
        <p className="section-intro">Currently extending that toolkit through OpsLens: Python, DuckDB SQL and scikit-learn, with explicit baselines and time-based evaluation.</p>
        <div className="skill-layout">
          <div className="skill-list" aria-label="Technologies used in selected projects">
            {skills.map((skill) => <span key={skill}>{skill}</span>)}
          </div>
          <aside className="work-note">
            <h3>How I approach a build</h3>
            <p>Start with the user’s task. Check the data shape and edge cases. Make failure states useful. Leave a short explanation so the next person can run and extend the project.</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
