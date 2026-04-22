const express = require("express");

const studentRoutes = require("./routes/students");
const courseRoutes = require("./routes/courses");
const enrollmentRoutes = require("./routes/enrollments");

const app = express();

app.use(express.json());

app.use("/students", studentRoutes);
app.use("/courses", courseRoutes);
app.use("/enrollments", enrollmentRoutes);

//  HOME PAGE
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Student Course API</title>
      <style>
        body {
          font-family: Arial;
          background: #f4f4f4;
          text-align: center;
          padding-top: 80px;
        }
        .card {
          background: white;
          padding: 20px;
          margin: 20px auto;
          width: 300px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        a {
          display: block;
          margin: 10px 0;
          text-decoration: none;
          color: white;
          background: #007bff;
          padding: 10px;
          border-radius: 6px;
        }
        a:hover {
          background: #0056b3;
        }
      </style>
    </head>
    <body>

      <h1> Student Course API</h1>
      <p>Welcome to Home Page</p>

      <div class="card">
        <a href="/students"> Students</a>
        <a href="/courses"> Courses</a>
        <a href="/enrollments"> Enrollments</a>
      </div>

    </body>
    </html>
  `);
});

module.exports = app;