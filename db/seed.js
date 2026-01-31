import db from './db.js';
import format from 'pg-format';
import seedData from './seed-data/index.js';

async function insert(data, table) {
  if (!data || data.length === 0) {
    throw Error(`No rows provided for table: ${table}`);
  }

  const cols = Object.keys(data[0]);
  const rows = data.map(row => cols.map(col => row[col] ?? null));

  const query = format('INSERT into %I (%I) VALUES %L', table, cols, rows);
  const result = await db.query(query);
  if (result.rowCount !== data.length) {
    throw new Error(
      `Expected ${data.length} inserts for table: ${table}, inserted ${result.rowCount}`,
    );
  }
}
async function seed() {
  console.log('Starting database seed...');

  try {
    await insert(seedData.authors, 'authors');
    await insert(seedData.books, 'books');
    console.log('\nSeeding complete');
  } catch (err) {
    console.error('\nSeeding failed:', err.message);
    throw err;
  }
}

seed()
  .catch(err => {
    console.error('Fatal Error:', err.message);
    console.error(err.stack);
    process.exit(1);
  })
  .finally(() => db.end());
