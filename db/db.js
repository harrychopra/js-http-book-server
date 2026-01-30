import { Pool } from 'node-postgres';
import dotenv from 'dotenv';

function connect() {
  process.env.NODE_ENV ||= 'development';
  const envPath = `.env.${process.env.NODE_ENV}`;

  dotenv.config({ path: envPath });
  if (!process.env.PGDATABASE) {
    throw new Error(`Missing environment variables`);
  }

  return new Pool();
}

const db = connect();
export default db;
