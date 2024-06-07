const prisma = require('../utils/db');


const getAllItems = async () => {
  return await prisma.items.findMany();
};

const getItemById = async (id) => {
  const item= await prisma.items.findUnique({
    where: { id: parseInt(id) },
  });

  if (item) {
    await updateStatus(item);
}
// if (!item) {
//   throw new Error('Item not found');
// }

return item;
};

const createItem = async (name, description, starting_price, end_time, image_url,userId) => {
  return await prisma.items.create({
    data: {
      name,
      description,
      starting_price,
      user_id:userId,
      current_price: starting_price,
      end_time: new Date(end_time),
      image_url,
      created_at: new Date(),
    },
  });
};

const updateItem = async (id, data,role) => {
  
  return await prisma.items.update({
    where: { id: parseInt(id) },
    data,
  });

};

const deleteItem = async (id) => {
  return await prisma.items.delete({
    where: { id: parseInt(id) },
  });
};



const updateStatus = async (item) => {
  const now = new Date();
  let status = 'active';

  if (now >= item.end_time) {
      status = 'ended';
  }

  if (item.status !== status) {
      await prisma.items.update({
          where: { id: item.id },
          data: { status },
      });
  }

  return status;
};

const searchItems = async ({ query, status }) => {
  const where = {};

  if (query) {
      const queryWords = query.split(' ').filter(word => word.length > 0);
      
      where.OR = queryWords.map(word => ({
          OR: [
              { name: { contains: word, mode: 'insensitive' } },
              { description: { contains: word, mode: 'insensitive' } }
          ]
      }));
  }

  if (status) {
      where.status = status;
  }

  const items = await prisma.items.findMany({
      where,
  });

  await Promise.all(items.map(updateStatus));
  return items;
};


module.exports = {
  getAllItems,
  getItemById,
  createItem,
  searchItems,
  updateItem,
  deleteItem,
};
