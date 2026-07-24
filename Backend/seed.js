// Optional helper: run "node seed.js" to populate MongoDB with sample
// projects that match the mockup in the practical guide.
require("dotenv").config();
const mongoose = require("mongoose");
const Project = require("./models/Project");

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/portfolioDB";

const sampleProjects = [
  {
    title: "Portfolio Website",
    description:
      "A responsive portfolio to showcase work and manage projects with a simple admin dashboard.",
    technologies: ["HTML", "CSS", "JavaScript", "Node.js"],
    link: "https://github.com/username/portfolio",
  },
  {
    title: "Task Manager",
    description:
      "A productivity app for tracking tasks, deadlines, and progress across multiple projects.",
    technologies: ["Express", "MongoDB", "Mongoose"],
    link: "https://github.com/username/task-manager",
  },
  {
    title: "Weather Dashboard",
    description:
      "A clean weather dashboard that fetches forecast data from a public API with animated details.",
    technologies: ["JavaScript", "API", "CSS"],
    link: "https://github.com/username/weather-dashboard",
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    await Project.deleteMany({});
    await Project.insertMany(sampleProjects);

    console.log("Sample projects inserted successfully!");
  } catch (err) {
    console.error("Seeding error:", err.message);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
