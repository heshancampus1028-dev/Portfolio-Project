const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

// GET /api/projects  -> list all projects (newest first)
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch projects", error: err.message });
  }
});

// GET /api/projects/:id -> get a single project
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch project", error: err.message });
  }
});

// POST /api/projects -> create a new project
router.post("/", async (req, res) => {
  try {
    const { title, description, technologies, link } = req.body;

    const techArray = Array.isArray(technologies)
      ? technologies
      : (technologies || "")
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean);

    const newProject = new Project({
      title,
      description,
      technologies: techArray,
      link,
    });

    const saved = await newProject.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: "Failed to create project", error: err.message });
  }
});

// PUT /api/projects/:id -> update an existing project
router.put("/:id", async (req, res) => {
  try {
    const { title, description, technologies, link } = req.body;

    const techArray = Array.isArray(technologies)
      ? technologies
      : (technologies || "")
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean);

    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      { title, description, technologies: techArray, link },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: "Project not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Failed to update project", error: err.message });
  }
});

// DELETE /api/projects/:id -> delete a project
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete project", error: err.message });
  }
});

module.exports = router;
