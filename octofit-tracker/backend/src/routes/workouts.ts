import express from 'express';
import Workout from '../models/Workout';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error: 'Unable to load workouts.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const workout = new Workout(req.body);
    await workout.save();
    res.status(201).json(workout);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create workout.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found.' });
    }
    res.json(workout);
  } catch (error) {
    res.status(500).json({ error: 'Unable to load workout.' });
  }
});

export default router;
