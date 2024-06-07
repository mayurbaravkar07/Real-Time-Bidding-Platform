const itemService = require('../services/itemService');
const { uploadOnCloudinary } = require('../utils/cloudinary');
const uploadMiddleware = require('../middlewares/uploadMiddleware');

exports.createItem = [
  uploadMiddleware.single('image'),  // Use the upload middleware to handle file uploads
  async (req, res) => {
    try {
      const { name, description, starting_price, end_time } = req.body;
      const userId = req.user.id;
      
      // Initialize image_url to null
      let image_url = null;

      // If a file was uploaded, upload it to Cloudinary
      if (req.file) {
        const response = await uploadOnCloudinary(req.file.path);
        if (response) {
          image_url = response.url;
        } else {
          return res.status(500).json({ error: 'Image upload failed' });
        }
      }

      // Create the item with the provided data and the Cloudinary URL
      const item = await itemService.createItem(name, description, starting_price, end_time, image_url, userId);
      
      // Respond with the created item
      res.status(201).json(item);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Could not create item' });
    }
  }
];
exports.getAllItems = async (req, res, next) => {
  try {
    if (res.paginatedResult) {
      return res.json(res.paginatedResult);
    }
    const items = await itemService.getAllItems();
    res.json(items);
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getItemById = async (req, res) => {
  try {
    const item = await itemService.getItemById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch item' });
  }
};



exports.updateItem = async (req, res) => {
    try {
     
      const { id } = req.params;
      const data = req.body;
      const user = await userService.getUserProfile(req.user.id);
      if(user.role==="admin"){
      const item = await itemService.updateItem(id, data);
      res.json(item);
      }else{
        return res.status(403).json({ error: "Forbidden: You are not authorized to update this item" });
      }
      
    } catch (error) {
      
      res.status(500).json({ error: 'Could not update item' });
    }
  };
  
  exports.deleteItem = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await userService.getUserProfile(req.user.id);
      if(user.role==="admin"){
        await itemService.deleteItem(id);
        res.status(204).json({ message: 'Item deleted' });
        }else{
          return res.status(403).json({ error: "Forbidden: You are not authorized to Delete this item" });
        }

     
      
    } catch (error) {
      
      res.status(500).json({ error: 'Could not delete item' });
    }
  };
  

  exports.searchItems = async (req, res) => {
    try {
        const { query, status } = req.query;
        const items = await itemService.searchItems({ query, status });
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};