const express = require('express');
const router = express.Router();
const { myProfile } = require('../controllers/myProfileController');
const protect = require('../middleware/authMiddleware');

router.post('/create', protect, myProfile);

module.exports = router;