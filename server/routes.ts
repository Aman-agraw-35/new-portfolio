import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { Rating, Contact } from './db/mongodb';

export async function registerRoutes(app: Express): Promise<Server> {
  // Rating routes
  app.post('/api/ratings', async (req, res) => {
    try {
      const { rating } = req.body;
      if (!rating || rating < 1 || rating > 5) {
        return res.status(400).json({ message: 'Invalid rating value' });
      }

      const newRating = new Rating({ rating });
      await newRating.save();
      res.status(201).json(newRating);
    } catch (error) {
      console.error('Error saving rating:', error);
      res.status(500).json({ message: 'Error saving rating' });
    }
  });

  app.get('/api/ratings', async (req, res) => {
    try {
      const ratings = await Rating.find().sort({ createdAt: -1 });
      const averageRating = ratings.length > 0 
        ? ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length 
        : 0;
      res.json({ ratings, averageRating });
    } catch (error) {
      console.error('Error fetching ratings:', error);
      res.status(500).json({ message: 'Error fetching ratings' });
    }
  });

  // Contact form route
  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, message } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      const contact = new Contact({ name, email, message });
      await contact.save();
      res.status(201).json(contact);
    } catch (error) {
      console.error('Error saving contact:', error);
      res.status(500).json({ message: 'Error saving contact form' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}