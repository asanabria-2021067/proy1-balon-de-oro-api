require('dotenv').config();
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function seed() {
  try {
    const seedPath = path.join(__dirname, '../src/infrastructure/db/migrations/002_seed.sql');
    const sql = fs.readFileSync(seedPath, 'utf8');

    await pool.query(sql);

    console.log('Seed complete');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

seed();
