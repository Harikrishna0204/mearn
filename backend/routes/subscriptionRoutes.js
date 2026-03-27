const express = require("express");
const router = express.Router();

const {
  addSubscription,
  getSubscriptions,
  deleteSubscription,
} = require("../controllers/subscriptionController");

// ✅ ADD subscription
router.post("/", addSubscription);

// ✅ GET all subscriptions
router.get("/", getSubscriptions);

// ✅ DELETE subscription
router.delete("/:id", deleteSubscription);

module.exports = router;