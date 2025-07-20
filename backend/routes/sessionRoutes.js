const express = require("express");
const router = express.Router();
const {
  createSession,
  getUserSessions,
  updateSessionStatus,
  getAllSessions,
} = require("../controllers/sessionController");

// Create a new skill session (user requests a session)
// router.post('/', authenticate, createSession);
router.post("/", createSession);

// Get all sessions for a logged-in user (teacher or learner)
router.get("/my-sessions",  getUserSessions);

// Admin/teacher can update session status (e.g., completed, cancelled)
router.patch("/:id/status",  updateSessionStatus);

// (Optional) Admin route - get all sessions in the system
router.get("/",  getAllSessions);

module.exports = router;
