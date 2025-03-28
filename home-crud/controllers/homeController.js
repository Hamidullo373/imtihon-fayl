const { pool } = require("../config/database");

const getAllHomes = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM homes");
    res.json({
      message: "success",
      allHomesCount: result.rowCount,
      data: result.rows,
    });
  } catch (error) {
    res.status(500).json({ message: "Server xatosi", error: error.message });
  }
};

const getHomeById = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM homes WHERE id = $1", [
      req.params.id,
    ]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Home topilmadi" });
    }
    res.json({
      message: "success",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ message: "Server xatosi", error: error.message });
  }
};

const createHome = async (req, res) => {
  const { namber, are, floor, number_of_rooms } = req.body;
  if (!namber || !are || !floor || !number_of_rooms) {
    return res
      .status(400)
      .json({ message: "Barcha maydonlar talab qilinadi!" });
  }

  try {
    const query = `
      INSERT INTO homes (namber, are, floor, number_of_rooms)
      VALUES ($1, $2, $3, $4) RETURNING *
    `;
    const values = [namber, are, floor, number_of_rooms];
    const result = await pool.query(query, values);

    res.status(201).json({
      message: "success",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ message: "Server xatosi", error: error.message });
  }
};

const deleteHome = async (req, res) => {
  try {
    const result = await pool.query("DELETE FROM homes WHERE id = $1", [
      req.params.id,
    ]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Home topilmadi" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Server xatosi", error: error.message });
  }
};

const patchHome = async (req, res) => {
  const updates = Object.entries(req.body);
  if (updates.length === 0) {
    return res.status(400).json({ message: " ma'lumot kiritilishi shart" });
  }

  const setClause = updates
    .map(([key], index) => `${key} = $${index + 1}`)
    .join(", ");
  const values = [...updates.map(([, value]) => value), req.params.id];

  try {
    const query = `UPDATE homes SET ${setClause} WHERE id = $${values.length} RETURNING *`;
    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Home topilmadi" });
    }

    res.json({
      message: "success",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ message: "Server xatosi", error: error.message });
  }
};

module.exports = {
  getAllHomes,
  getHomeById,
  createHome,
  deleteHome,
  patchHome,
};
