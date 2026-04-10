const express = require('express');
const router = express.Router();
const { getRecommendation, chat } = require('../controllers/aiController');
const { protect } = require('../middleware/auth');

router.post('/recommendation', protect, getRecommendation);
router.post('/chat', protect, chat);

module.exports = router;
