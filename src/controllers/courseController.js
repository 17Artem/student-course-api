const pool = require("../db");

exports.createCourse = async (req, res) => {
  const { course_name, instructor, credit_hours } = req.body;

  if (!course_name || !instructor || !credit_hours) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const result = await pool.query(
    "INSERT INTO course(course_name,instructor,credit_hours) VALUES($1,$2,$3) RETURNING *",
    [course_name, instructor, credit_hours]
  );

  res.json(result.rows[0]); 
};

exports.getCourses = async (req, res) => {
  const result = await pool.query("SELECT * FROM course");
  res.json(result.rows);
};

exports.getCourseById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "id required" });
  }
  
  const result = await pool.query(
    "SELECT * FROM course WHERE id=$1",
    [id]
  );

  if (!result.rows.length) {
    return res.status(404).json({ error: "Not found" });
  }

  res.json(result.rows[0]);
};

exports.updateCourse = async (req, res) => {
  const { id } = req.params;
  const { course_name, instructor, credit_hours } = req.body;

  const result = await pool.query(
    `UPDATE course 
     SET course_name=$1, instructor=$2, credit_hours=$3 
     WHERE id=$4 RETURNING *`,
    [course_name, instructor, credit_hours, id]
  );

  res.json(result.rows[0]);
};

exports.deleteCourse = async (req, res) => {
  const { id } = req.params;

  await pool.query("DELETE FROM course WHERE id=$1", [id]);

  res.json({ message: "Course deleted" });
};