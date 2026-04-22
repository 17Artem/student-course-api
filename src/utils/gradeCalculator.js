exports.calculateFinalGrade = ({
  assignment1 = 0,
  assignment2 = 0,
  midterm_exam = 0,
  final_exam = 0,
  final_project = 0
}) => {
  return (
    assignment1 * 0.15 +
    assignment2 * 0.15 +
    midterm_exam * 0.3 +
    final_exam * 0.3 +
    final_project * 0.1
  );
};