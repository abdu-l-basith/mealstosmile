import { Router } from "express";
import { ProjectController } from "../controllers/project.controller.js";

const router = Router();

// GET /api/projects - list all projects
router.get("/", ProjectController.listProjects);

// GET /api/projects/:slug - get specific project
router.get("/:slug", ProjectController.getProjectBySlug);

export default router;
