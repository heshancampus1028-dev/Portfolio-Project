import { useEffect, useState } from "react";
import { getProjects } from "../api.js";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .catch(() => setError("Could not load projects. Is the server running?"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="projects-wrap">
      <div className="card projects-intro">
        <h2>Projects</h2>
        <p>Browse my latest work and see the technologies I use to bring ideas to life.</p>
      </div>

      {loading && <p className="status-text">Loading projects…</p>}
      {error && <p className="status-text error">{error}</p>}
      {!loading && !error && projects.length === 0 && (
        <p className="status-text">
          No projects yet. Add your first one from the Admin page.
        </p>
      )}

      <div className="projects-grid">
        {projects.map((project) => (
          <div className="card project-card" key={project._id}>
            <h3>{project.title}</h3>
            <p className="project-desc">{project.description}</p>
            <div className="pill-group">
              {project.technologies?.map((tech) => (
                <span className="pill" key={tech}>
                  {tech}
                </span>
              ))}
            </div>
            {project.link && (
              <a className="view-link" href={project.link} target="_blank" rel="noreferrer">
                View project
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
