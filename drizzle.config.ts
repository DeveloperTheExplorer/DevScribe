import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default {
  schema: './src/lib/server/models/**.model.ts',
  out: './drizzle',
  driver: 'mysql2', // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    host: process.env.DB_HOST!,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE!,
    port: Number(process.env.DB_PORT),
  },
} satisfies Config;