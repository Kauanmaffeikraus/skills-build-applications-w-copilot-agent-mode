import express from 'express';
import Activity from '../models/Activity';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const activities = await Activity.find().populate('user');
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: 'Unable to load activities.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const activity = new Activity(req.body);
    await activity.save();
    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create activity.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id).populate('user');
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found.' });
    }
    res.json(activity);
  } catch (error) {
    res.status(500).json({ error: 'Unable to load activity.' });
  }
});

export default router;
