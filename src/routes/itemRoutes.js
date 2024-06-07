const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const authenticateToken = require('../middlewares/authMiddleware');
const prisma = require('../utils/db');
const paginatedResult=require('../middlewares/paginatedResult');

router.get('/', itemController.getAllItems);
router.get('/paginated',paginatedResult(prisma.items), itemController.getAllItems);
router.get('/byId/:id', itemController.getItemById);
router.post('/create', authenticateToken, itemController.createItem);
router.get('/search', itemController.searchItems);
router.put('/update/:id', authenticateToken, itemController.updateItem);
router.delete('/delete/:id', authenticateToken, itemController.deleteItem);

module.exports = router;
