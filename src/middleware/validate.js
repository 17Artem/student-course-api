exports.validateStudent = (req, res, next) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email required" });
  }

  next();
};

exports.validateGrades = (req, res, next) => {
  const grades = Object.values(req.body);

  for (let g of grades) {
    if (g < 0 || g > 100) {
      return res.status(400).json({ error: "Grades must be 0-100" });
    }
  }

  next();
};