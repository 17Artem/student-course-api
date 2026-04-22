const request = require("supertest");
const app = require("../src/app");

describe("Student API", () => {

  let studentId;

  it("create student", async () => {
  const res = await request(app).post("/students").send({
    name: "Artem",
    email: "artem" + Date.now() + "@test.com" // ✅ уникальный
  });

  expect(res.statusCode).toBe(200);
  studentId = res.body.id;
  });

  it("fail without email", async () => {
    const res = await request(app).post("/students").send({
      name: "Test"
    });

    expect(res.statusCode).toBe(400);
  });

  it("get students", async () => {
    const res = await request(app).get("/students");
    expect(res.statusCode).toBe(200);
  });

  it("update student", async () => {
    const res = await request(app)
      .put(`/students/${studentId}`)
      .send({ name: "Updated", email: "new@test.com" });

    expect(res.statusCode).toBe(200);
  });

  it("delete student", async () => {
    const res = await request(app).delete(`/students/${studentId}`);
    expect(res.statusCode).toBe(200);
  });

});