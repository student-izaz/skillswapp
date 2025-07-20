const express = require('express');
const router = express.Router();
const { getAllUsers, getUserProfile } = require('../controllers/userController');
// const Protect = require("../middleware/authMiddleware");

router.get('/', getAllUsers);
router.get('/me', getUserProfile);

module.exports = router;
