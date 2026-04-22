const request = require("supertest");
const app = require("../src/app");

describe("Courses API", () => {

  let courseId;

  it("create course", async () => {
  const res = await request(app).post("/courses").send({
    course_name: "Math",
    instructor: "Prof",
    credit_hours: 3
  });

  expect(res.statusCode).toBe(200);
  expect(res.body.id).toBeDefined();

  expect(res.body.id).toBeDefined();
    courseId = res.body.id;
    });

  it("fail without fields", async () => {
    const res = await request(app).post("/courses").send({
      course_name: "Math"
    });

    expect(res.statusCode).toBe(400);
  });

  it("get all courses", async () => {
    const res = await request(app).get("/courses");
    expect(res.statusCode).toBe(200);
  });

  it("get course by id", async () => {
    const res = await request(app).get(`/courses/${courseId}`);
    expect(res.statusCode).toBe(200);
  });

  it("update course", async () => {
    const res = await request(app)
      .put(`/courses/${courseId}`)
      .send({
        course_name: "Updated",
        instructor: "Prof",
        credit_hours: 4
      });

    expect(res.statusCode).toBe(200);
  });

  it("delete course", async () => {
    const res = await request(app).delete(`/courses/${courseId}`);
    expect(res.statusCode).toBe(200);
  });

});