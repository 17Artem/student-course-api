const pool = require("../db");

// ENROLL STUDENT
exports.enrollStudent = async (req, res) => {
  const { student_id, course_id } = req.body;

  if (!student_id || !course_id) {
    return res.status(400).json({ error: "student_id and course_id required" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO enrollment(student_id, course_id) VALUES($1,$2) RETURNING *",
      [student_id, course_id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ADD GRADES
exports.addGrades = async (req, res) => {
  const { id } = req.params;
  const {
    assignment1,
    assignment2,
    midterm_exam,
    final_exam,
    final_project
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE enrollment SET
        assignment1=$1,
        assignment2=$2,
        midterm_exam=$3,
        final_exam=$4,
        final_project=$5
       WHERE id=$6
       RETURNING *`,
      [assignment1, assignment2, midterm_exam, final_exam, final_project, id]
    );

    if (!result.rows.length) {
      return res.status(404).json({ error: "Enrollment not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// FINAL GRADE
exports.getFinalGrade = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM enrollment WHERE id=$1",
      [id]
    );

    if (!result.rows.length) {
      return res.status(404).json({ error: "Not found" });
    }

    const row = result.rows[0];

    const final_grade =
      row.assignment1 * 0.15 +
      row.assignment2 * 0.15 +
      row.midterm_exam * 0.3 +
      row.final_exam * 0.3 +
      row.final_project * 0.1;

    res.json({ ...row, final_grade });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GPA
exports.getStudentGPA = async (req, res) => {
  const { student_id } = req.params;

  if (!student_id) {
    return res.status(400).json({ error: "student_id required" });
  }

  try {
    const result = await pool.query(
      "SELECT * FROM enrollment WHERE student_id=$1",
      [student_id]
    );

    if (!result.rows.length) {
      return res.status(404).json({ error: "No enrollments" });
    }

    const grades = result.rows.map(r =>
      r.assignment1 * 0.15 +
      r.assignment2 * 0.15 +
      r.midterm_exam * 0.3 +
      r.final_exam * 0.3 +
      r.final_project * 0.1
    );

    const gpa = grades.reduce((a, b) => a + b, 0) / grades.length;

    res.json({ student_id, gpa });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};