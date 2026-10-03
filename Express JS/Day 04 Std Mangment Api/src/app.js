// Import Express
const express = require("express");

// Create server app
const app = express();

// Middleware: Read JSON data from req.body
app.use(express.json());

// Temporary data storage
let students = [
  {
    id: 1,
    name: "Ali",
    age: 20,
    course: "software engineering",
    email: "ali@example.com",
  },
  {
    id: 2,
    name: "Sardar",
    age: 24,
    course: "AI",
    email: "sardar@example.com",
  },
];

// Home route
app.get("/", (req, res) => {
  res.status(200).send("Student Management API is running");
});

// Helper function: Validate student data
function validateStudent(name, age, course, email) {
  return (
    typeof name === "string" &&
    name.trim().length > 0 &&
    age !== undefined &&
    age !== null &&
    age !== "" &&
    Number.isInteger(Number(age)) &&
    Number(age) > 0 &&
    typeof course === "string" &&
    course.trim().length > 0 &&
    typeof email === "string" &&
    email.trim().length > 0
  );
}

// 1. Create Student
// POST /students
app.post("/students", (req, res) => {
  const { name, age, course, email } = req.body;

  // Validation
  if (!validateStudent(name, age, course, email)) {
    return res.status(400).json({
      success: false,
      message:
        "Valid name, positive integer age, course and email are required.",
    });
  }

  // Check duplicate email
  const emailExists = students.some(
    (student) =>
      student.email.toLowerCase() === email.trim().toLowerCase()
  );

  if (emailExists) {
    return res.status(409).json({
      success: false,
      message: "A student with this email already exists.",
    });
  }

  // Create new student
  const newStudent = {
    id:
      students.length > 0
        ? Math.max(...students.map((student) => student.id)) + 1
        : 1,
    name: name.trim(),
    age: Number(age),
    course: course.trim(),
    email: email.trim(),
  };

  students.push(newStudent);

  return res.status(201).json({
    success: true,
    message: "Student added successfully.",
    data: newStudent,
  });
});

// 2. Get All Students
// GET /students
app.get("/students", (req, res) => {
  res.status(200).json({
    success: true,
    count: students.length,
    data: students,
  });
});

// 3. Get Single Student
// GET /students/:id
app.get("/students/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid student ID.",
    });
  }

  const student = students.find((student) => student.id === id);

  if (!student) {
    return res.status(404).json({
      success: false,
      message: "Student not found.",
    });
  }

  return res.status(200).json({
    success: true,
    data: student,
  });
});

// 4. Update Student
// PUT /students/:id
app.put("/students/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid student ID.",
    });
  }

  const student = students.find((student) => student.id === id);

  if (!student) {
    return res.status(404).json({
      success: false,
      message: "Student not found.",
    });
  }

  const { name, age, course, email } = req.body;

  // Validation
  if (!validateStudent(name, age, course, email)) {
    return res.status(400).json({
      success: false,
      message:
        "Valid name, positive integer age, course and email are required.",
    });
  }

  // Check whether another student already uses this email
  const emailExists = students.some(
    (s) =>
      s.id !== id &&
      s.email.toLowerCase() === email.trim().toLowerCase()
  );

  if (emailExists) {
    return res.status(409).json({
      success: false,
      message: "Email already belongs to another student.",
    });
  }

  // Update student
  student.name = name.trim();
  student.age = Number(age);
  student.course = course.trim();
  student.email = email.trim();

  return res.status(200).json({
    success: true,
    message: "Student updated successfully.",
    data: student,
  });
});

// 5. Delete Student
// DELETE /students/:id
app.delete("/students/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid student ID.",
    });
  }

  const index = students.findIndex((student) => student.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Student not found.",
    });
  }

  const deletedStudent = students.splice(index, 1)[0];

  return res.status(200).json({
    success: true,
    message: "Student deleted successfully.",
    data: deletedStudent,
  });
});

// Export app
module.exports = app;