import mongoose from 'mongoose';

import { MONGO_DB_URI } from '$env/static/private';

const connectDb = async () => {
  const ret = await mongoose.connect(MONGO_DB_URI);
  const connection = ret.connection;
  const mongoDbClient = connection.getClient();

  return mongoDbClient;
}

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

export const mongoDbClient = connectDb();

export default db;
