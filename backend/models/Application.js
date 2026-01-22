const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  name: String,
  email: String,
  resumeLink: String,
  message: String,

  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job"   // 🔥 RELATION
  },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Application", applicationSchema);
