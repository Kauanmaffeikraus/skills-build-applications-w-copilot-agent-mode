import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';

const dbFile = path.resolve(process.cwd(), '.octofit_db');
const defaultUri = 'mongodb://localhost:27017/octofit_tracker';

export const getMongoUri = (): string => {
  if (process.env.MONGODB_URI) {
    return process.env.MONGODB_URI;
  }

  if (fs.existsSync(dbFile)) {
    const value = fs.readFileSync(dbFile, 'utf-8').trim();
    return value || defaultUri;
  }

  return defaultUri;
};

export const connectDb = () => mongoose.connect(getMongoUri());
