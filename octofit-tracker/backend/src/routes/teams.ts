import express from 'express';
import Team from '../models/Team';
import User from '../models/User';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const teams = await Team.find().populate('members');
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: 'Unable to load teams.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate('members');
    if (!team) {
      return res.status(404).json({ error: 'Team not found.' });
    }
    res.json(team);
  } catch (error) {
    res.status(500).json({ error: 'Unable to load team.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body;
    const team = new Team({ name, description });
    await team.save();
    res.status(201).json(team);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create team.' });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!team) {
      return res.status(404).json({ error: 'Team not found.' });
    }
    res.json(team);
  } catch (error) {
    res.status(500).json({ error: 'Unable to update team.' });
  }
});

router.post('/:id/members', async (req, res) => {
  try {
    const { userId } = req.body;
    const team = await Team.findByIdAndUpdate(req.params.id, { $addToSet: { members: userId } }, { new: true });
    if (!team) {
      return res.status(404).json({ error: 'Team not found.' });
    }
    await User.findByIdAndUpdate(userId, { team: team._id });
    res.json(team);
  } catch (error) {
    res.status(500).json({ error: 'Unable to add member.' });
  }
});

export default router;
