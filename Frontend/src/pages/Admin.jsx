import { useEffect, useState } from "react";
import { getProjects, createProject, updateProject, deleteProject } from "../api.js";

const emptyForm = { title: "", description: "", technologies: "", link: "" };

export default function Admin() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState("");

  const loadProjects = () => {
    getProjects()
      .then(setProjects)
      .catch(() => setStatus("Could not load projects. Is the server running?"));
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    try {
      if (editingId) {
        await updateProject(editingId, form);
        setStatus("Project updated successfully.");
      } else {
        await createProject(form);
        setStatus("Project saved successfully.");
      }
      handleReset();
      loadProjects();
    } catch (err) {
      setStatus("Something went wrong while saving the project.");
    }
  };

  const handleEdit = (project) => {
    setEditingId(project._id);
    setForm({
      title: project.title || "",
      description: project.description || "",
      technologies: (project.technologies || []).join(", "),
      link: project.link || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this project?")) return;
    try {
      await deleteProject(id);
      loadProjects();
      if (editingId === id) handleReset();
    } catch (err) {
      setStatus("Could not delete the project.");
    }
  };

  return (
    <section className="admin-wrap">
      <div className="card admin-form-card">
        <h3>{editingId ? "Update Project" : "Add / Update Project"}</h3>
        <form onSubmit={handleSubmit}>
          <label className="field-label" htmlFor="title">
            Project Title
          </label>
          <input
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Project title"
            required
          />

          <label className="field-label" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Short project description"
            rows={3}
            required
          />

          <label className="field-label" htmlFor="technologies">
            Technologies (comma separated)
          </label>
          <input
            id="technologies"
            name="technologies"
            value={form.technologies}
            onChange={handleChange}
            placeholder="React, MongoDB, Express"
          />

          <label className="field-label" htmlFor="link">
            Project Link
          </label>
          <input
            id="link"
            name="link"
            value={form.link}
            onChange={handleChange}
            placeholder="https://github.com/username/project"
          />

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              Save Project
            </button>
            <button type="button" className="btn-secondary" onClick={handleReset}>
              Reset
            </button>
          </div>

          {status && <p className="status-text">{status}</p>}
        </form>
      </div>

      <div className="card admin-list-card">
        <h3>Projects</h3>
        {projects.length === 0 && <p className="status-text">No projects yet.</p>}
        <div className="admin-project-list">
          {projects.map((project) => (
            <div className="admin-project-row" key={project._id}>
              <div className="admin-project-info">
                <div className="admin-project-header">
                  <h4>{project.title}</h4>
                  <div className="row-actions">
                    <button className="tag-btn edit" onClick={() => handleEdit(project)}>
                      Edit
                    </button>
                    <button className="tag-btn delete" onClick={() => handleDelete(project._id)}>
                      Delete
                    </button>
                  </div>
                </div>
                <p className="project-desc">{project.description}</p>
                <p className="tech-line">{(project.technologies || []).join("")}</p>
                {project.link && <p className="link-line">{project.link}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
