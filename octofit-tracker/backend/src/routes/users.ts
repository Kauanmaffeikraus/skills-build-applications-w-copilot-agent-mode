import express from 'express';
import User from '../models/User';
import Team from '../models/Team';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await User.find().populate('team');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Unable to load users.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('team');
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Unable to load user.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, email, team, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists.' });
    }

    const user = new User({ name, email, team, role });
    await user.save();

    if (team) {
      await Team.findByIdAndUpdate(team, { $addToSet: { members: user._id } });
    }

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create user.' });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Unable to update user.' });
  }
});

export default router;
