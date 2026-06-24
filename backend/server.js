require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();

/* ===========================
   DATABASE MODES & CONFIG
   =========================== */
const JWT_SECRET = process.env.JWT_SECRET || "sfppl_super_secret_jwt_key_2026";

const User = require("./models/User");
const Product = require("./models/Product");
const Job = require("./models/Job");
const Application = require("./models/Application");
const Category = require("./models/Category");
const Testimonial = require("./models/Testimonial");
const News = require("./models/News");
const Gallery = require("./models/Gallery");
const Certification = require("./models/Certification");
const ContactMessage = require("./models/ContactMessage");
const DistributorApplication = require("./models/DistributorApplication");

/* ===========================
   MIDDLEWARE
   =========================== */
app.use(cors());
app.use(express.json());

/* ===========================
   AUTH MIDDLEWARES
   =========================== */
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(403).json({ message: "Access token is missing" });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid or expired token" });
    req.user = decoded;
    next();
  });
};

const verifyAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Requires administrator privileges" });
  }
  next();
};

const verifyAdminOrEmployee = (req, res, next) => {
  if (req.user?.role !== "admin" && req.user?.role !== "employee") {
    return res.status(403).json({ message: "Requires administrator or employee privileges" });
  }
  next();
};

/* ===========================
   DATABASE CONNECTION
   =========================== */
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/sfppl_db")
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    seedDatabase();
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

/* ===========================
   ROOT TEST ROUTE
   =========================== */
app.get("/", (req, res) => {
  res.send("✅ SFPPL Enterprise API running successfully");
});

/* ===========================
   AUTHENTICATION APIs
   =========================== */

// SIGNUP
app.post("/api/auth/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    // Secure password hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user"
    });

    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: "24h" });

    res.json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOGIN
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password credentials" });
    }

    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: "24h" });

    res.json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET CURRENT USER PROFILE
app.get("/api/auth/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ===========================
   CATEGORY APIs
   =========================== */
app.get("/api/categories", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/categories", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/categories/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ===========================
   PRODUCT APIs
   =========================== */
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/products", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/products/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/products/:id", verifyToken, verifyAdmin, async (req, res) => {
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
app.get("/api/jobs", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/jobs", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json({ success: true, job });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/jobs/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Job listing deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ===========================
   JOB APPLICATION APIs
   =========================== */
app.post("/api/apply", async (req, res) => {
  try {
    const { name, email, resumeLink, message, jobId } = req.body;
    if (!name || !email || !resumeLink || !jobId) {
      return res.status(400).json({ message: "Required application fields missing" });
    }
    const application = await Application.create({ name, email, resumeLink, message, jobId });
    res.json({ success: true, application });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/applications", verifyToken, verifyAdminOrEmployee, async (req, res) => {
  try {
    const applications = await Application.find().populate("jobId").sort({ createdAt: -1 });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ===========================
   TESTIMONIAL APIs
   =========================== */
app.get("/api/testimonials", async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/testimonials", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const testimonial = await Testimonial.create(req.body);
    res.status(201).json(testimonial);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ===========================
   NEWS APIs
   =========================== */
app.get("/api/news", async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/news", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const newsItem = await News.create(req.body);
    res.status(201).json(newsItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ===========================
   GALLERY APIs
   =========================== */
app.get("/api/gallery", async (req, res) => {
  try {
    const galleryItems = await Gallery.find();
    res.json(galleryItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/gallery", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const item = await Gallery.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ===========================
   CERTIFICATION APIs
   =========================== */
app.get("/api/certifications", async (req, res) => {
  try {
    const certifications = await Certification.find();
    res.json(certifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/certifications", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const certification = await Certification.create(req.body);
    res.status(201).json(certification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ===========================
   CONTACT APIs
   =========================== */
app.post("/api/contacts", async (req, res) => {
  try {
    const contact = await ContactMessage.create(req.body);
    res.json({ success: true, contact });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/contacts", verifyToken, verifyAdminOrEmployee, async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ===========================
   DISTRIBUTOR APIs
   =========================== */
app.post("/api/distributors", async (req, res) => {
  try {
    const application = await DistributorApplication.create(req.body);
    res.json({ success: true, application });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/distributors", verifyToken, verifyAdminOrEmployee, async (req, res) => {
  try {
    const applications = await DistributorApplication.find().sort({ createdAt: -1 });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/distributors/:id/status", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const application = await DistributorApplication.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(application);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ===========================
   DATABASE SEEDING FUNCTION
   =========================== */
async function seedDatabase() {
  try {
    // 1. Seed Admin User
    const adminCount = await User.countDocuments({ role: "admin" });
    if (adminCount === 0) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash("admin123", salt);
      await User.create({
        name: "SFPPL Admin Portal",
        email: "admin@sfppl.com",
        password: hashedPassword,
        role: "admin"
      });
      console.log("🌱 Admin User Seeded: admin@sfppl.com / admin123");
    }

    // Check if old categories exist and clear them to upgrade database
    const hasOldCategories = await Category.findOne({ name: "Grains" });
    if (hasOldCategories) {
      console.log("🧹 Detected legacy database schemas. Clearing tables for new Litchi, Makhana & Fish catalogs...");
      await Category.deleteMany({});
      await Product.deleteMany({});
      await Testimonial.deleteMany({});
      await Gallery.deleteMany({});
    }

    // 2. Seed Categories
    const categoryCount = await Category.countDocuments();
    if (categoryCount === 0) {
      await Category.create([
        { name: "Litchi", slug: "litchi" },
        { name: "Makhana", slug: "makhana" },
        { name: "Fish", slug: "fish" }
      ]);
      console.log("🌱 Product Categories Seeded: Litchi, Makhana, Fish");
    }

    // 3. Seed Products
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      await Product.create([
        // Litchi category (4 products)
        {
          name: "Fresh Shahi Litchi",
          category: "Litchi",
          price: 150,
          image: "https://images.unsplash.com/photo-1628294895522-fd3f2c5ebd7e?q=80&w=600",
          description: "Sweet Shahi Litchis harvested daily from our organic orchards in Muzaffarpur, Bihar."
        },
        {
          name: "Shahi Litchi Pulp / Juice",
          category: "Litchi",
          price: 95,
          image: "https://images.unsplash.com/photo-1589733901241-5e5148685df5?q=80&w=600",
          description: "Pure Shahi Litchi nectar, zero artificial sugar, pasteurized for safety."
        },
        {
          name: "Premium Litchi Honey",
          category: "Litchi",
          price: 280,
          image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=600",
          description: "100% natural raw honey harvested from honeybees feeding exclusively in litchi orchards."
        },
        {
          name: "Sun-Dried Dehydrated Litchi",
          category: "Litchi",
          price: 320,
          image: "https://images.unsplash.com/photo-1596003906949-67221c37965c?q=80&w=600",
          description: "Naturally dehydrated sweet litchi nuts, an export-grade local delicacy."
        },

        // Makhana category (4 products)
        {
          name: "Premium Organic Makhana (Fox Nuts)",
          category: "Makhana",
          price: 450,
          image: "https://images.unsplash.com/photo-1608797178974-15b35a61d121?q=80&w=600",
          description: "Crispy and highly nutritious grade-A fox nuts, carefully handpicked and processed."
        },
        {
          name: "Spiced Roasted Makhana",
          category: "Makhana",
          price: 120,
          image: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?q=80&w=600",
          description: "Healthy snacks roasted in native cow ghee and coated with natural spices."
        },
        {
          name: "Chocolate Coated Sweet Makhana",
          category: "Makhana",
          price: 160,
          image: "https://images.unsplash.com/photo-1548907040-4d42b521a5e0?q=80&w=600",
          description: "Puffed makhanas covered in premium dark chocolate glaze for a healthy sweet treat."
        },
        {
          name: "Himalayan Pink Salt Makhana",
          category: "Makhana",
          price: 110,
          image: "https://images.unsplash.com/photo-1608797178974-15b35a61d121?q=80&w=600",
          description: "Crisp puffed fox nuts salted lightly with handground Himalayan pink mineral salt."
        },

        // Fish category (4 products)
        {
          name: "Fresh Rohu Fish",
          category: "Fish",
          price: 220,
          image: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?q=80&w=600",
          description: "Freshwater Rohu fish harvested daily from our bio-floc aquaculture ponds."
        },
        {
          name: "Fresh Katla Fish",
          category: "Fish",
          price: 260,
          image: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?q=80&w=600",
          description: "Freshwater Katla fish, packed in clean ice for safe transit."
        },
        {
          name: "Boneless Fish Fillets (Rohu)",
          category: "Fish",
          price: 350,
          image: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?q=80&w=600",
          description: "Cleaned, deboned skinless freshwater Rohu fillets ready for culinary preparation."
        },
        {
          name: "Freshwater Prawns (Jhinga)",
          category: "Fish",
          price: 490,
          image: "https://images.unsplash.com/photo-1559737605-de68b2d463d1?q=80&w=600",
          description: "Aquaculture fresh river prawns harvested daily under strict quality controls."
        }
      ]);
      console.log("🌱 Products Catalog Seeded");
    }

    // 4. Seed Testimonials
    const testCount = await Testimonial.countDocuments();
    if (testCount === 0) {
      await Testimonial.create([
        {
          author: "Rajesh Kumar",
          role: "Northeast Distribution Lead",
          rating: 5,
          comment: "SFPPL has consistently provided the best grade of Muzaffarpur Makhana. Safe packaging and excellent delivery schedules since 2018."
        },
        {
          author: "Ananya Mishra",
          role: "Corporate Catering Director",
          rating: 5,
          comment: "Their freshwater fish supply is extremely clean and fresh. Outstanding cold chain support."
        },
        {
          author: "David Miller",
          role: "Export Purchase Partner",
          rating: 4,
          comment: "FSSAI ISO compliance makes SFPPL Shahi Litchi products standard fit for overseas food networks."
        }
      ]);
      console.log("🌱 Testimonials Seeded");
    }

    // 5. Seed News
    const newsCount = await News.countDocuments();
    if (newsCount === 0) {
      await News.create([
        {
          title: "SFPPL Commences Fully Automated Cleaning Facility",
          summary: "New state-of-the-art sorting machines installed at Muzaffarpur plant.",
          content: "SADAF FOOD PROCESSORS PRIVATE LIMITED has successfully commissioned a new high-speed optical sorting and automated packaging machinery line. This increases capacity to 50 Metric Tons per day, ensuring Zero Human Contact process safety standards.",
          author: "Irshad Alam (Managing Director)",
          image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600"
        },
        {
          title: "SFPPL Wins National Swachh Food processing Innovation Award",
          summary: "Honored for eco-friendly processing and community contribution in Bihar.",
          content: "In recognition of outstanding safety practices and low emissions manufacturing, SFPPL was awarded the Swachh Food Innovation trophy this year. The directors thanked local farmers and workers for their relentless quality focus.",
          author: "Zinat Jahan (Board Director)",
          image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600"
        }
      ]);
      console.log("🌱 News Feed Seeded");
    }

    // 6. Seed Gallery
    const galleryCount = await Gallery.countDocuments();
    if (galleryCount === 0) {
      await Gallery.create([
        {
          title: "Modern Makhana Sorting Facility",
          category: "factory",
          url: "https://images.unsplash.com/photo-1565034946487-077786996e27?q=80&w=600"
        },
        {
          title: "Litchi Processing & Cleaning",
          category: "factory",
          url: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=600"
        },
        {
          title: "Fish Cold Storage Containment",
          category: "products",
          url: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?q=80&w=600"
        },
        {
          title: "Farmer Training Meet 2025",
          category: "events",
          url: "https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=600"
        }
      ]);
      console.log("🌱 Media Gallery Seeded");
    }

    // 7. Seed Certifications
    const certCount = await Certification.countDocuments();
    if (certCount === 0) {
      await Certification.create([
        {
          name: "ISO 22000:2018 Certified",
          issuingBody: "International Standards Authority",
          year: 2021,
          imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600"
        },
        {
          name: "FSSAI Central Food Safety License",
          issuingBody: "Food Safety Standards Authority of India",
          year: 2012,
          imageUrl: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=600"
        },
        {
          name: "HACCP Compliance Standard",
          issuingBody: "Global Hazard and Critical Quality Council",
          year: 2019,
          imageUrl: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=600"
        }
      ]);
      console.log("🌱 Certifications Seeded");
    }

    // 8. Seed Jobs
    const jobCount = await Job.countDocuments();
    if (jobCount === 0) {
      await Job.create([
        {
          title: "Quality Assurance Inspector",
          location: "Muzaffarpur, Bihar",
          type: "Full-Time",
          description: "Oversee grain purity audits, ensure strict adherence to HACCP guidelines, and review batch packing numbers."
        },
        {
          title: "Operations & Logistics Supervisor",
          location: "Muzaffarpur, Bihar",
          type: "Full-Time",
          description: "Direct distributor order fulfillment, coordinate vehicle dispatches, and optimize warehouse inventories."
        },
        {
          title: "Regional Sales Manager",
          location: "Patna, Bihar",
          type: "Full-Time",
          description: "Establish relationships with new regional wholesalers, register retail distributors, and meet sales growth targets."
        }
      ]);
      console.log("🌱 Jobs Catalog Seeded");
    }
  } catch (err) {
    console.error("❌ Seeding database error:", err.message);
  }
}

/* ===========================
   SERVER START
   =========================== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
