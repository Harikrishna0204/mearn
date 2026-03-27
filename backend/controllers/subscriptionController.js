const Subscription = require("../models/Subscription"); // triggering nodemon restart

// ✅ GET all subscriptions for a user
exports.getSubscriptions = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const subs = await Subscription.find({ userId }).sort({ createdAt: -1 });
    res.json(subs);
  } catch (err) {
    console.error("GET ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ ADD subscription
exports.addSubscription = async (req, res) => {
  try {
    const { userId, name, price, renewalDate, planType, image, url } = req.body;

    // 🔍 Validation
    if (!userId || !name || price === undefined || price === null || !renewalDate) {
      return res.status(400).json({ message: "UserId, name, price, and renewal date are required" });
    }

    const newSub = new Subscription({
      userId,
      name: name.trim(),
      price,
      renewalDate,
      planType,
      image,
      url
    });

    await newSub.save();

    res.status(201).json(newSub);
  } catch (err) {
    console.error("ADD ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ DELETE subscription
exports.deleteSubscription = async (req, res) => {
  try {
    const sub = await Subscription.findById(req.params.id);

    if (!sub) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    await Subscription.findByIdAndDelete(req.params.id);

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};