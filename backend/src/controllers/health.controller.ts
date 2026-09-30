import { Request, Response } from "express";
import { getFirestoreDb } from "../config/firebase.js";

export class HealthController {
  static getHealth(req: Request, res: Response) {
    const db = getFirestoreDb();
    const isFirestoreConnected = db !== null;

    res.status(200).json({
      status: "healthy",
      service: "sacrednat-backend",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      firestoreConnected: isFirestoreConnected,
    });
  }
}
