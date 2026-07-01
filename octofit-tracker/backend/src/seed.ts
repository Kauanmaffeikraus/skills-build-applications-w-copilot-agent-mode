import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { getMongoUri } from './config/db';
import User from './models/User';
import Team from './models/Team';
import Activity from './models/Activity';
import Workout from './models/Workout';

const seed = async () => {
  const mongoUri = getMongoUri();
  await mongoose.connect(mongoUri);

  await Promise.all([
    Activity.deleteMany({}),
    Workout.deleteMany({}),
    User.deleteMany({}),
    Team.deleteMany({})
  ]);

  const teams = await Team.create([
    { name: 'Aqua Sharks', description: 'Water and recovery focus.', points: 350 },
    { name: 'Iron Titans', description: 'Strength and endurance champions.', points: 420 }
  ]);

  const users = await User.create([
    { name: 'Ava Carter', email: 'ava@example.com', team: teams[0]._id, role: 'member', points: 120 },
    { name: 'Noah Reed', email: 'noah@example.com', team: teams[0]._id, role: 'captain', points: 140 },
    { name: 'Mia Brooks', email: 'mia@example.com', team: teams[1]._id, role: 'member', points: 110 },
    { name: 'Ethan Kim', email: 'ethan@example.com', team: teams[1]._id, role: 'captain', points: 170 }
  ]);

  await Team.updateOne({ _id: teams[0]._id }, { members: [users[0]._id, users[1]._id] });
  await Team.updateOne({ _id: teams[1]._id }, { members: [users[2]._id, users[3]._id] });

  await Workout.create([
    { title: 'Morning HIIT', description: 'Fast-paced interval training.', intensity: 'high', durationMinutes: 30, focusAreas: ['cardio', 'strength'] },
    { title: 'Core Stability', description: 'Build balance and core strength.', intensity: 'medium', durationMinutes: 45, focusAreas: ['core', 'flexibility'] }
  ]);

  await Activity.create([
    { user: users[0]._id, type: 'run', durationMinutes: 35, caloriesBurned: 410, notes: 'Strong pace today.' },
    { user: users[1]._id, type: 'strength', durationMinutes: 55, caloriesBurned: 520, notes: 'Heavy lifts completed.' },
    { user: users[2]._id, type: 'yoga', durationMinutes: 40, caloriesBurned: 180, notes: 'Recovery session.' }
  ]);

  await mongoose.disconnect();
  console.log('Seed data written to', mongoUri);
};

if (require.main === module) {
  seed().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
