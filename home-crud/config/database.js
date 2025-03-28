const { Pool } = require("pg");
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const connectDB = async () => {
  try {
    await pool.query("SELECT 1+1 AS result"); // Test query
    console.log("Databasega muvaffaqiyatli ulandik!");
  } catch (error) {
    console.error("Databasega ulanishda xatolik:", error.message);
    process.exit(1);
  }
};

module.exports = { pool, connectDB };
