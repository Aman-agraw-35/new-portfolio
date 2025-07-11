// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/routes/ratings.ts
import { Router } from "express";

// server/models/Rating.ts
import mongoose from "mongoose";
var ratingSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
var Rating_default = mongoose.model("Rating", ratingSchema);

// server/routes/ratings.ts
var router = Router();
router.post("/ratings", async (req, res) => {
  try {
    const rating = new Rating_default({
      rating: req.body.rating
    });
    await rating.save();
    res.status(201).json(rating);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.get("/ratings", async (req, res) => {
  try {
    const ratings = await Rating_default.find();
    const average = ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length;
    res.json({ ratings, average });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
var ratings_default = router;

// server/routes/contacts.ts
import { Router as Router2 } from "express";

// server/models/Contact.ts
import mongoose2 from "mongoose";
var contactSchema = new mongoose2.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
var Contact_default = mongoose2.model("Contact", contactSchema);

// server/routes/contacts.ts
var router2 = Router2();
router2.post("/contacts", async (req, res) => {
  try {
    const contact = new Contact_default({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message
    });
    await contact.save();
    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
var contacts_default = router2;

// server/routes.ts
async function registerRoutes(app2) {
  app2.use("/api", ratings_default);
  app2.use("/api", contacts_default);
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path, { dirname as dirname2 } from "path";
import { fileURLToPath as fileURLToPath2 } from "url";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
var __filename = fileURLToPath(import.meta.url);
var __dirname = dirname(__filename);
var vite_config_default = defineConfig({
  root: resolve(__dirname, "client"),
  // ✅ Vite builds from the client folder
  plugins: [
    react(),
    tsconfigPaths(),
    runtimeErrorOverlay(),
    themePlugin()
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "client", "src"),
      "@shared": resolve(__dirname, "shared")
    }
  },
  build: {
    outDir: resolve(__dirname, "client", "dist"),
    // ✅ Matches what Express serves
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(__dirname, "client", "index.html")
    }
  },
  server: {
    watch: {
      usePolling: true
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var __filename2 = fileURLToPath2(import.meta.url);
var __dirname2 = dirname2(__filename2);
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path.resolve(__dirname2, "..", "client", "index.html");
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path.resolve(__dirname2, "..", "client", "dist");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
  log("Serving static files from " + distPath);
}

// server/db.ts
import mongoose3 from "mongoose";
import dotenv from "dotenv";
dotenv.config();
var MONGODB_URI = "mongodb+srv://ghost:ghostishere@cluster0.llqvm.mongodb.net/";
var connectDB = async () => {
  try {
    await mongoose3.connect(MONGODB_URI);
    console.log("\u2705 MongoDB Connected Successfully");
    mongoose3.connection.on("error", (err) => {
      console.error("\u274C MongoDB connection error:", err);
    });
    mongoose3.connection.on("disconnected", () => {
      console.log("\u26A0\uFE0F MongoDB disconnected");
    });
  } catch (error) {
    console.error("\u274C MongoDB connection error:", error);
    process.exit(1);
  }
};
var db_default = connectDB;

// server/index.ts
var app = express2();
db_default();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path2 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path2.startsWith("/api")) {
      let logLine = `${req.method} ${path2} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    console.error("Error:", err);
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const PORT = 80;
  server.listen(PORT, "0.0.0.0", () => {
    log(`Server is running on port ${PORT}`);
  });
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
