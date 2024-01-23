const express = require("express");
const bcrypt = require("bcrypt");
const pool = require("./db/db");
const multer = require("multer");
const fs = require("fs").promises;
const app = express();
const path = require("path");
const PORT = 4000;
const cors = require("cors");

app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
  destination: (res, file, cb) => {
    const uploadPath = path.join(__dirname, "uploads");
    fs.mkdir(uploadPath, { recursive: true })
      .then(() => cb(null, uploadPath))
      .catch((err) => cb(err));
  },
  filename: (req, file, cb) => {
    const filename = file.originalname;
    cb(null, filename);
  },
});
const upload = multer({ storage: storage });

app.post("/register/admin", async (req, res) => {
  const { username, password } = req.body;
  const hashPasword = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query("SELECT * FROM users WHERE username=$1", [
      username,
    ]);

    if (result.rows.length > 0) {
      return res.status(401).json("Username already exists.");
    }

    await pool.query(
      "INSERT INTO users (username, password, role) VALUES ($1, $2, $3)",
      [username, hashPasword, "admin"]
    );

    res.status(201).json("Admin registered successfully.");
  } catch (err) {
    console.log(err);
    res.status(500).json("server error");
  }
});

app.post("/register/student", async (req, res) => {
  const { username, password } = req.body;
  const hashPasword = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query("SELECT * FROM users WHERE username=$1", [
      username,
    ]);

    if (result.rows.length > 0) {
      return res.status(401).json("Username already exists.");
    }

    await pool.query(
      "INSERT INTO users (username, password, role) VALUES($1, $2, $3)",
      [username, hashPasword, "student"]
    );

    res.status(201).json("Student registered successfully.");
  } catch (err) {
    res.status(500), json("server error");
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query("SELECT * FROM users WHERE username=$1", [
      username,
    ]);

    if (result.rows.length === 0) {
      return res.status(401).json("Invalid credentials");
    }

    const match = await bcrypt.compare(password, result.rows[0].password);

    if (!match) {
      return res.status(401).send("Invaild credentials");
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json("Server error");
  }
});

app.post("/submit-attendance", upload.single("selfie"), async (req, res) => {
  const { username, date } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE username=$1", [
      username,
    ]);

    if (result.rows.length === 0) {
      return res.status(401).json("Student not found.");
    }

    const studentId = result.rows[0].id;

    const selfie = req.file.filename;
    console.log(studentId, date, selfie);
    await pool.query(
      "INSERT INTO attendance(student_id,date,selfie) VALUES ($1, $2, $3)",
      [studentId, date, selfie]
    );

    res.status(201).send("Attendance submitted successfully.");
  } catch (err) {
    res.status(500).json("Server error");
  }
});

app.get("/attendance/:date", async (req, res) => {
  const { date } = req.params;
  try {
    const result = await pool.query(
      "SELECT COUNT(*) AS present_students FROM attendance WHERE date= $1",
      [date]
    );
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json("No attendance records for the specified date.");
    }
    const studentsCounts = result.rows[0].present_students;
    res.status(200).json(studentsCounts);
  } catch (err) {
    res.status(500).json("Server error");
  }
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
