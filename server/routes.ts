import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import ratingsRoutes from "./routes/ratings";
import contactsRoutes from "./routes/contacts";

export async function registerRoutes(app: Express): Promise<Server> {
  app.use('/api', ratingsRoutes);
  app.use('/api', contactsRoutes);

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  const httpServer = createServer(app);

  return httpServer;
}
