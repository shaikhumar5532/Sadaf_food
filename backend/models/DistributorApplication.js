const mongoose = require("mongoose");

const distributorApplicationSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  ownerName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  experience: { type: String },
  investmentCapacity: { type: String },
  address: { type: String, required: true },
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("DistributorApplication", distributorApplicationSchema);
