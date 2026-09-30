import { Router } from "express";
import healthRoutes from "./health.routes.js";
import contributeRoutes from "./contribute.routes.js";
import projectRoutes from "./project.routes.js";

const router = Router();

// Mount sub-routers
router.use("/health", healthRoutes);
router.use("/contribute", contributeRoutes);
router.use("/projects", projectRoutes);

export default router;
