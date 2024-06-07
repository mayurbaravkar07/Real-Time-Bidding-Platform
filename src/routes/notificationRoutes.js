const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const authenticateToken = require('../middlewares/authMiddleware');

router.get('/', authenticateToken, notificationController.getNotifications);
router.post('/mark-read', authenticateToken, notificationController.markNotificationsRead);

module.exports = router;
