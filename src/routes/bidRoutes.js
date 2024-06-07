const express = require('express');
const router = express.Router();
const bidController = require('../controllers/bidController');
const authenticateToken = require('../middlewares/authMiddleware');

router.get('/:itemId/bids', bidController.getAllBidsForItem);
router.post('/:itemId/bid', authenticateToken, bidController.placeNewBid);

module.exports = router;
