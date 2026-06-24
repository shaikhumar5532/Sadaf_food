const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({
  author: { type: String, required: true },
  role: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true }
});

module.exports = mongoose.model("Testimonial", testimonialSchema);
