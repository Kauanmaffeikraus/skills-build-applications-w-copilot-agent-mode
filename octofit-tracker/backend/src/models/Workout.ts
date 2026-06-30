import mongoose from 'mongoose';

const WorkoutSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  intensity: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  durationMinutes: { type: Number, required: true },
  focusAreas: [{ type: String }]
}, { timestamps: true });

export default mongoose.model('Workout', WorkoutSchema);
