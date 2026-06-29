const express = require("express");
const dashboardController = require("../controllers/dashboardController");
const { requireAuth } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/dashboard", requireAuth, dashboardController.renderDashboard);
router.post("/daily-logs", requireAuth, dashboardController.createDailyLog);
router.post("/triggers", requireAuth, dashboardController.createTrigger);
router.post("/contacts", requireAuth, dashboardController.createEmergencyContact);

module.exports = router;
