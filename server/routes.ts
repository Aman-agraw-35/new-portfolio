import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import ratingsRoutes from "./routes/ratings";

export async function registerRoutes(app: Express): Promise<Server> {
  app.use('/api', ratingsRoutes);

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  const httpServer = createServer(app);

  return httpServer;
}
