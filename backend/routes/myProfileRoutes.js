const express = require('express');
const router = express.Router();
const { createProfile, getProfile } = require('../controllers/myProfileController');
const protect = require('../middleware/authMiddleware');

router.get('/get', protect, getProfile);
router.post('/create', protect, createProfile);

module.exports = router;