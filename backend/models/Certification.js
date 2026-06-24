const mongoose = require("mongoose");

const certificationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  issuingBody: { type: String, required: true },
  year: { type: Number, required: true },
  imageUrl: { type: String }
});

module.exports = mongoose.model("Certification", certificationSchema);
