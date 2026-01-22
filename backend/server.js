require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/* ===========================
   MODELS
=========================== */
const User = require("./models/User");
const Product = require("./models/Product");
const Job = require("./models/Job");
const Application = require("./models/Application");

/* ===========================
   MIDDLEWARE
=========================== */
app.use(cors());
app.use(express.json());

/* ===========================
   DATABASE CONNECTION
=========================== */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err.message));

/* ===========================
   ROOT TEST ROUTE
=========================== */
app.get("/", (req, res) => {
  res.send("✅ SFPPL API running successfully");
});

/* ===========================
   AUTH APIs
=========================== */

// SIGNUP
app.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, password });
    res.json({ success: true, user });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOGIN
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ success: true, user });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ===========================
   PRODUCT APIs
=========================== */

// GET ALL PRODUCTS
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE PRODUCT
app.put("/api/products/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE PRODUCT
app.delete("/api/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ===========================
   CAREER / JOB APIs
=========================== */

// GET ALL JOBS
app.get("/api/jobs", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE JOB (ADMIN)
app.post("/api/jobs", async (req, res) => {
  try {
    const { title, location, type, description } = req.body;

    if (!title || !location || !type || !description) {
      return res.status(400).json({ message: "All job fields required" });
    }

    const job = await Job.create(req.body);
    res.json({ success: true, job });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ===========================
   JOB APPLICATION APIs
=========================== */

// APPLY FOR JOB
app.post("/api/apply", async (req, res) => {
  try {
    const { name, email, resumeLink, message, jobId } = req.body;

    if (!name || !email || !resumeLink || !jobId) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const application = await Application.create({
      name,
      email,
      resumeLink,
      message,
      jobId
    });

    res.json({ success: true, application });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔥 GET ALL APPLICATIONS WITH JOB DETAILS (POPULATE)
app.get("/api/applications", async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("jobId"); // 🔥 MAGIC LINE

    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ===========================
   SERVER START
=========================== */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
