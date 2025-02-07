import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import { config } from "./config/index.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { requestLogger } from "./middleware/requestLogger.js";
import aiRoutes from "./routes/ai.routes.js";

const app = express();

// Security middleware
app.use(helmet());

// Compression
app.use(compression());

// Rate limiting
app.use(rateLimit(config.rateLimiting));

// Basic middleware
app.use(cors(config.cors));
app.use(express.json());
app.use(requestLogger);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: config.env,
  });
});

// Routes
app.use("/api", aiRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: {
      message: "Not Found",
      status: 404,
      path: req.path,
    },
  });
});

// Error handling
app.use(errorHandler);

// Start server
const server = app.listen(config.port, config.host, () => {
  console.log(`Server running at http://${config.host}:${config.port}`);
  console.log(`Environment: ${config.env}`);
});

// Graceful shutdown
const shutdown = (signal) => {
  console.log(`${signal} signal received: closing HTTP server`);
  server.close(() => {
    console.log("HTTP server closed");
    process.exit(0);
  });

  // Force close after 10s
  setTimeout(() => {
    console.log("Forcing shutdown after timeout");
    process.exit(1);
  }, 10000);
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  shutdown("UNCAUGHT_EXCEPTION");
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});
