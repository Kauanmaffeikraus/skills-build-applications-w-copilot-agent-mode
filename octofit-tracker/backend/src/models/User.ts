import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  role: { type: String, default: 'member' },
  points: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('User', UserSchema);
