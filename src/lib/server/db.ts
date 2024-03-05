import mongoose from 'mongoose';

import { DB_HOST, DB_USERNAME, DB_PASSWORD } from '$env/static/private';

import { drizzle } from "drizzle-orm/planetscale-serverless";
import { Client } from "@planetscale/database";

const client = new Client({
  host: DB_HOST,
  username: DB_USERNAME,
  password: DB_PASSWORD,
});

export const db = drizzle(client);
