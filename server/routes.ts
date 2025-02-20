import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { Rating, Contact } from './db/mongodb';

export async function registerRoutes(app: Express): Promise<Server> {
  // Rating routes
  app.post('/api/ratings', async (req, res) => {
    try {
      const rating = new Rating({ rating: req.body.rating });
      await rating.save();
      res.status(201).json(rating);
    } catch (error) {
      res.status(500).json({ message: 'Error saving rating' });
    }
  });

  app.get('/api/ratings', async (req, res) => {
    try {
      const ratings = await Rating.find().sort({ createdAt: -1 });
      const averageRating = ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length;
      res.json({ ratings, averageRating });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching ratings' });
    }
  });

  // Contact form route
  app.post('/api/contact', async (req, res) => {
    try {
      const contact = new Contact({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
      });
      await contact.save();
      res.status(201).json(contact);
    } catch (error) {
      res.status(500).json({ message: 'Error saving contact form' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}