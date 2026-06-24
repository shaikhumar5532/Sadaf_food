const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  url: { type: String, required: true },
  mediaType: { type: String, default: "image" }
});

module.exports = mongoose.model("Gallery", gallerySchema);
