import { env } from '$env/dynamic/private';
import mongoose from 'mongoose';

const MONGODB_URI = env.MONGODB_URI!;

const connectDb = async () => {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');
}

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

connectDb();

export default db;
