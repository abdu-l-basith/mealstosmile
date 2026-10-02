import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { FirestoreService } from "../services/firestore.service.js";
import { EmailService } from "../services/email.service.js";

// Validation schema for incoming contribution / inquiry submissions
export const contributionSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  whatsapp: z.string().min(7, "Valid WhatsApp number is required").max(20, "WhatsApp number is too long"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  amount: z.string().optional().or(z.literal("")),
  message: z.string().max(1000, "Message is too long").optional().or(z.literal("")),
  cause: z.string().optional(),
  source: z.string().optional(),
});

export class ContributeController {
  /**
   * POST /api/contribute
   * Handle contribution form submissions
   */
  static async submitContribution(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, whatsapp, email, amount, message, cause, source } = req.body;

      // 1. Save record to Firebase Firestore (with fallback)
      const contributionDoc = await FirestoreService.saveContribution({
        name: name.trim(),
        whatsapp: whatsapp.trim(),
        email: email?.trim() || undefined,
        amount: amount?.trim() || undefined,
        message: message?.trim() || undefined,
        cause: cause || "General Contribution",
        source: source || "Website Form",
      });

      // 2. Dispatch notification email asynchronously
      EmailService.sendContributionNotification(contributionDoc).catch((err) => {
        console.error("[EmailService] Background email error:", err);
      });

      // 3. Respond with confirmation
      return res.status(201).json({
        success: true,
        message: "Details shared, our executive will contact you soon",
        data: {
          id: contributionDoc.id,
          name: contributionDoc.name,
          cause: contributionDoc.cause,
          amount: contributionDoc.formattedAmount,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/contribute
   * List all contribution inquiries (for admin dashboard)
   */
  static async listContributions(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 50;
      const contributions = await FirestoreService.getContributions(limit);

      return res.status(200).json({
        success: true,
        count: contributions.length,
        data: contributions,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/contribute/:id
   * Get single contribution details
   */
  static async getContribution(req: Request, res: Response, next: NextFunction) {
    try {
      const id = String(req.params.id);
      const contribution = await FirestoreService.getContributionById(id);

      if (!contribution) {
        return res.status(404).json({ error: "Contribution record not found" });
      }

      return res.status(200).json({
        success: true,
        data: contribution,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * PATCH /api/contribute/:id/status
   * Update contribution status (e.g. pending -> contacted -> completed)
   */
  static async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const id = String(req.params.id);
      const { status } = req.body;

      if (!["pending", "contacted", "completed", "archived"].includes(status)) {
        return res.status(400).json({
          error: "Invalid status. Must be one of: pending, contacted, completed, archived",
        });
      }

      const updated = await FirestoreService.updateContributionStatus(id, status);
      if (!updated) {
        return res.status(404).json({ error: "Contribution record not found" });
      }

      return res.status(200).json({
        success: true,
        message: `Status updated to ${status}`,
      });
    } catch (error) {
      next(error);
    }
  }
}
