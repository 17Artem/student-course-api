const request = require("supertest");
const app = require("../src/app");

describe("Enrollment", () => {

  let student, course, enrollment;

  it("create student", async () => {
  const res = await request(app).post("/students").send({
    name: "Test",
    email: "test" + Date.now() + "@test.com"
  });

  expect(res.statusCode).toBe(200); 
  expect(res.body.id).toBeDefined(); 

  student = res.body.id;
  });

  it("create course", async () => {
    const res = await request(app).post("/courses").send({
      course_name: "Math",
      instructor: "Prof",
      credit_hours: 3
    });
    course = res.body.id;
  });

  it("enroll", async () => {
    const res = await request(app).post("/enrollments").send({
      student_id: student,
      course_id: course
    });
    enrollment = res.body.id;
    expect(res.statusCode).toBe(200);
  });

  it("add grades valid", async () => {
    const res = await request(app)
      .put(`/enrollments/${enrollment}/grades`)
      .send({
        assignment1: 90,
        assignment2: 80,
        midterm_exam: 85,
        final_exam: 90,
        final_project: 95
      });

    expect(res.statusCode).toBe(200);
  });

  it("fail grades >100", async () => {
    const res = await request(app)
      .put(`/enrollments/${enrollment}/grades`)
      .send({
        assignment1: 200
      });

    expect(res.statusCode).toBe(500);
  });

  it("get final grade", async () => {
    const res = await request(app)
      .get(`/enrollments/${enrollment}/final`);

    expect(res.body.final_grade).toBeDefined();
  });

  it("get GPA", async () => {
    const res = await request(app)
      .get(`/enrollments/gpa/${student}`);

    expect(res.body.gpa).toBeDefined();
  });

});