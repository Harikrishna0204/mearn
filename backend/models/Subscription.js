const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  userId: String,
  name: String,
  planType: String,
  price: Number,
  renewalDate: Date,
  image: String,
  url: String,  // ✅ URL to open platform
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Subscription", subscriptionSchema);