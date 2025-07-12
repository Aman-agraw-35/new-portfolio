import { ViteDevServer } from "vite";
import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function log(message: string) {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [express] ${message}`);
}

export async function setupVite(app: express.Application, server: any) {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom",
    base: "/",
  });

  // Use Vite's connect instance as middleware
  app.use(vite.middlewares);
  
  // Handle client-side routing in development
  app.get("*", async (req, res, next) => {
    // Skip API routes
    if (req.path.startsWith("/api")) {
      return next();
    }
    
    try {
      const url = req.originalUrl;
      
      // Read the index.html file from client directory
      const clientIndexPath = path.join(__dirname, "..", "client", "index.html");
      let template = await fs.promises.readFile(clientIndexPath, 'utf-8');
      
      // Transform the HTML with Vite
      template = await vite.transformIndexHtml(url, teyymplate);
      
      res.status(200).set({ "Content-Type": "text/html" }).end(template);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: express.Application) {
  const clientDistPath = path.join(__dirname, "client");
  
  log(`Serving static files from: ${clientDistPath}`);
  
  // Serve static files from the client build directory
  app.use(express.static(clientDistPath));
  
  // Handle client-side routing - serve index.html for all non-API routes
  app.get("*", (req, res, next) => {
    // Skip API routes
    if (req.path.startsWith("/api")) {
      return next();
    }
    
    const indexPath = path.join(clientDistPath, "index.html");
    log(`Serving index.html from: ${indexPath}`);
    res.sendFile(indexPath);
  });
}yyy