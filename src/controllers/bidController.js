const {placeBid,getBidder} = require('../services/bidService');


// const {io} = require('../../server');
const ioClient=require('socket.io-client');
const prisma = require('../utils/db');
const socket=ioClient('http://localhost:3000')

//const {io}=require('../../server');
exports.getAllBidsForItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const bids = await bidService.getAllBidsForItem(itemId);
    res.json(bids);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch bids' });
  }
};


exports.placeNewBid = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { bid_amount } = req.body;
    const userId = req.user.id; 
    const { newBid, previousHighestBidder } = await placeBid(itemId, userId, parseFloat(bid_amount));
 
    socket.emit('bid', newBid);
    
   // Send notification to item owner and previous highest bidder
    const item = await prisma.items.findUnique({
      where: { id: parseInt(itemId) },
    });
    
    const owner = await getBidder(itemId);
    const ownerNotification = `A new bid has been placed on your item: ${item.name} ${itemId}`;
    const outbidNotification = `You have been outbid on item: ${itemId}`;

    // Emit notification to the item owner
    socket.emit('notifyEvent', { userId: owner.userId, message: ownerNotification });

    // Emit notification to the previous highest bidder if they are not the current user
    if (previousHighestBidder && previousHighestBidder !== userId) {
      socket.emit('notifyEvent', { userId: previousHighestBidder, message: outbidNotification });
    }

    res.status(201).json(newBid);
  } catch (error) {
   res.status(500).json({ error: 'Could not place bids' });
  }
};
