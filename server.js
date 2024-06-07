const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const itemRoutes = require('./src/routes/itemRoutes');
const bidRoutes = require('./src/routes/bidRoutes');
const notificationRoutes = require('./src/routes/notificationRoutes');
const { handleErrors } = require('./src/middlewares/errorHandler');
const prisma =require('./src//utils/db');
const {sendNotificationWithMail}=require('./src/services/notificationService')


dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);


// Rate limiting middleware
const apiLimiter = rateLimit({
  windowMs: 20 * 60 * 1000, // 20 minutes
  max: 150, // limit each IP to 150 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});


// Apply rate limiting to all requests
app.use(apiLimiter);

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/items', itemRoutes);
app.use('/items', bidRoutes);
app.use('/notifications', notificationRoutes);

// Error handling middleware
app.use(handleErrors);



// Socket.io setup
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle new bid event
  socket.on('bid', async (data) => {
    try {

      
    //Notifying all the connected clients who are listening on 'update' event

      console.log('Bid received:', data);
      console.log("Notification and update has been sent in realtime")
      io.emit('update', data); 

   
    } catch (error) {
     console.error('Error handling bid:', error);
    }
  });


  socket.on('notifyEvent', (data) => {
    const { userId, message } = data;
    sendNotificationWithMail(userId, message);
    
  })

  socket.on('disconnect', () => {
   console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`);
});

module.exports = { io ,server};
