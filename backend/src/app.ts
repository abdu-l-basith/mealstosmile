import express, { Express } from "express";
import cors from "cors";
import apiRoutes from "./routes/index.js";
import { notFound } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { ENV } from "./config/env.js";

export function createApp(): Express {
  const app = express();

  // CORS configuration
  const allowedOrigins = [
    ENV.FRONTEND_URL,
    "http://localhost:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3000",
  ];

  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (e.g. mobile apps, curl, server-to-server)
        if (!origin || allowedOrigins.includes(origin) || ENV.NODE_ENV === "development") {
          return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS"));
      },
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  // Request body parsing
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Basic request logger
  app.use((req, res, next) => {
    const start = Date.now();
    res.on("finish", () => {
      const duration = Date.now() - start;
      console.log(`[HTTP] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
    });
    next();
  });

  // Welcome / Root endpoint
  app.get("/", (req, res) => {
    res.json({
      message: "Sacred National - Meal to Smile API Server",
      version: "1.0.0",
      docs: "/api/health",
    });
  });

  // API router
  app.use("/api", apiRoutes);

  // 404 Not Found handler
  app.use(notFound);

  // Centralized Error handler
  app.use(errorHandler);

  return app;
}
