import { Pool } from 'pg';

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

export async function initializeDatabase() {
    const client = await pool.connect();
    try {
      await client.query("CREATE EXTENSION IF NOT EXISTS vector");
  
      await client.query(`
        CREATE TABLE IF NOT EXISTS essenceEmbeddings (
          id SERIAL PRIMARY KEY,
          essenceId TEXT NOT NULL,
          content TEXT NOT NULL,
          embedding vector(1536)
        )
      `);
    } finally {
      client.release();
    }
  }