import express from 'express';
import User from '../models/User';
import Team from '../models/Team';

const router = express.Router();

router.get('/users', async (req, res) => {
  try {
    const users = await User.find().sort({ points: -1 }).limit(10);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Unable to load user leaderboard.' });
  }
});

router.get('/teams', async (req, res) => {
  try {
    const teams = await Team.find().sort({ points: -1 }).limit(10);
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: 'Unable to load team leaderboard.' });
  }
});

export default router;
