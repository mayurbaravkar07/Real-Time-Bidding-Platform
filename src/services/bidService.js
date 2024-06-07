const prisma = require('../utils/db');

exports.getAllBidsForItem = async (itemId) => {
  return await prisma.bids.findMany({
    where: { item_id: parseInt(itemId) },
    orderBy: { created_at: 'desc' },
  });
};

exports.createBid = async (itemId, userId, bid_amount) => {
  const bid = await prisma.bids.create({
    data: {
      item_id: parseInt(itemId),
      user_id: userId,
      bid_amount,
    },
  });

  await prisma.items.update({
    where: { id: parseInt(itemId) },
    data: { current_price: bid_amount },
  });

  return bid;
};

// New function to place a bid and get previous highest bidder
exports.placeBid = async (itemId, userId, bid_amount) => {
  const previousHighestBidder = await prisma.bids.findFirst({
    where: { item_id: parseInt(itemId) },
    orderBy: { bid_amount: 'desc' },
  });

  const newBid = await this.createBid(itemId, userId, bid_amount);
  
  return {
    newBid,
    previousHighestBidder: previousHighestBidder ? previousHighestBidder.user_id : null,
  };
};

// New function to get the owner and previous highest bidder of an item
exports.getBidder = async (itemId) => {
  const item = await prisma.items.findUnique({
    where: { id: parseInt(itemId) },
  });

  const previousHighestBidder = await prisma.bids.findFirst({
    where: { item_id: parseInt(itemId) },
    orderBy: { bid_amount: 'desc' },
  });
  return {
    userId: item.user_id,
    previousHighestBidder: previousHighestBidder ? previousHighestBidder.user_id : null,
  };
};
