import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import connectDB from "./db";

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware for logging API response time
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }
      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    console.error("Error:", err);
  });

  // Setup Vite for development mode, otherwise serve static files
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Run the app on PORT 80 (for AWS compatibility)
  const PORT = 80;
  server.listen(PORT, "0.0.0.0", () => {
    log(`Server is running on port ${PORT}`);
  });

  // Graceful Shutdown Handling
  process.on("SIGTERM", () => {
    log("SIGTERM received. Shutting down server.");
    server.close(() => {
      process.exit(0);
    });
  });

  process.on("SIGINT", () => {
    log("SIGINT received. Exiting...");
    server.close(() => {
      process.exit(0);
    });
  });
})();
