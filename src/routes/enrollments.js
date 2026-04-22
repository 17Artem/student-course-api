const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/enrollmentController");

router.get("/", (req, res) => {
  res.json({ message: "Enrollments route works" });
});

router.post("/", ctrl.enrollStudent);
router.put("/:id/grades", ctrl.addGrades);
router.get("/:id/final", ctrl.getFinalGrade);
router.get("/gpa/:student_id", ctrl.getStudentGPA);

module.exports = router;