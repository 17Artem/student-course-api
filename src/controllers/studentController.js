const pool = require("../db");

exports.createStudent = async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email required" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO student(name,email) VALUES($1,$2) RETURNING *",
      [name, email]
    );

    res.json(result.rows[0]);
  } catch (err) {
    if (err.code === "23505") {
      return res.status(400).json({ error: "Email already exists" });
    }
    res.status(500).json({ error: err.message });
  }
};

exports.getStudents = async (req, res) => {
  const result = await pool.query("SELECT * FROM student");
  res.json(result.rows);
};

exports.updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const result = await pool.query(
    "UPDATE student SET name=$1, email=$2 WHERE id=$3 RETURNING *",
    [name, email, id]
  );

  res.json(result.rows[0]);
};

exports.deleteStudent = async (req, res) => {
  const { id } = req.params;

  await pool.query("DELETE FROM student WHERE id=$1", [id]);

  res.json({ message: "Deleted" });
};