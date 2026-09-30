import { Router } from "express";
import { ContributeController, contributionSchema } from "../controllers/contribute.controller.js";
import { validateBody } from "../middlewares/validate.js";

const router = Router();

// POST /api/contribute - submit contribution inquiry
router.post("/", validateBody(contributionSchema), ContributeController.submitContribution);

// GET /api/contribute - list all inquiries (for admin)
router.get("/", ContributeController.listContributions);

// GET /api/contribute/:id - get specific inquiry
router.get("/:id", ContributeController.getContribution);

// PATCH /api/contribute/:id/status - update status
router.patch("/:id/status", ContributeController.updateStatus);

export default router;
