import pg from "pg";
const { Pool } = pg;
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }, 
  });

  pool.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error('Error executing query:', err.stack);
    } else {
      console.log('Connected to the database:', res.rows);
    }
  });
  export default pool;
