
import { Router } from 'express';
import Rating from '../models/Rating';

const router = Router();

router.post('/ratings', async (req, res) => {
  try {
    if (!req.body.rating || req.body.rating < 1 || req.body.rating > 5) {
      return res.status(400).json({ message: 'Invalid rating value' });
    }

    const rating = new Rating({
      rating: req.body.rating
    });
    const savedRating = await rating.save();
    console.log('Rating saved:', savedRating);
    res.status(201).json(savedRating);
  } catch (error) {
    console.error('Error saving rating:', error);
    res.status(500).json({ message: 'Error saving rating' });
  }
});

router.get('/ratings', async (req, res) => {
  try {
    const ratings = await Rating.find().sort({ createdAt: -1 });
    const average = ratings.length > 0 
      ? ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length
      : 0;
    res.json({ ratings, average });
  } catch (error) {
    console.error('Error fetching ratings:', error);
    res.status(500).json({ message: 'Error fetching ratings' });
  }
});

export default router;
