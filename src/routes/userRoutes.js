const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middlewares/authMiddleware')

router.get('/profile', authenticateToken, userController.getProfile);
router.post('/reset-password', userController.resetPasswordRequest);
router.post('/reset-password/:token', userController.resetPassword);

module.exports = router;
