const { pool } = require("../config/database");

const createTable = async () => {
  const query = `
  CREATE TABLE IF NOT EXISTS homes (
       id SERIAL PRIMARY KEY,
      namber INT UNIQUE NOT NULL,
      are TEXT NOT NULL,
      floor INT,
      number_of_rooms SMALLINT
     
    )
   
  `;

  try {
    await pool.query(query);
    console.log("homes jadvali muvaffaqiyatli yaratildi!");
  } catch (error) {
    console.error("Jadval yaratishda xatolik:", error.message);
  }
};

module.exports = { createTable };
