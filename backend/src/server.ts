import { createApp } from "./app.js";
import { ENV } from "./config/env.js";
import { initializeFirebase } from "./config/firebase.js";

async function startServer() {
  // Initialize Firebase Firestore connection
  initializeFirebase();

  const app = createApp();

  const server = app.listen(ENV.PORT, () => {
    console.log(`\n=================================================`);
    console.log(`🚀 Sacred National Backend API Server Running!`);
    console.log(`🌐 Base URL: http://localhost:${ENV.PORT}`);
    console.log(`🏥 Health Check: http://localhost:${ENV.PORT}/api/health`);
    console.log(`🤝 Contribute API: http://localhost:${ENV.PORT}/api/contribute`);
    console.log(`📦 Projects API: http://localhost:${ENV.PORT}/api/projects`);
    console.log(`🌍 Environment: ${ENV.NODE_ENV}`);
    console.log(`=================================================\n`);
  });

  // Graceful shutdown handling
  const handleShutdown = (signal: string) => {
    console.log(`\nReceived ${signal}. Shutting down gracefully...`);
    server.close(() => {
      console.log("Server closed successfully.");
      process.exit(0);
    });
  };

  process.on("SIGINT", () => handleShutdown("SIGINT"));
  process.on("SIGTERM", () => handleShutdown("SIGTERM"));
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
