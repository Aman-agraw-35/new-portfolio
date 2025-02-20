
import { Router } from 'express';
import Rating from '../models/Rating';

const router = Router();

router.post('/ratings', async (req, res) => {
  try {
    const rating = new Rating({
      rating: req.body.rating
    });
    await rating.save();
    res.status(201).json(rating);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/ratings', async (req, res) => {
  try {
    const ratings = await Rating.find();
    const average = ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length;
    res.json({ ratings, average });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
