const prisma = require('../utils/db');
const transporterUtility=require('../utils/transporter');
require('dotenv').config();

exports.getNotifications = async (userId) => {
  return await prisma.notification.findMany({
    where: { user_id: userId },
    orderBy: { created_at: 'desc' },
  });
};

 exports.markNotificationsRead = async (userId) => {
  await prisma.notification.updateMany({
    where: { user_id: userId, is_read: false },
    data: { is_read: true },
  });
};

 const sendNotificationWithMail = async (userId, message) => {
  await prisma.notification.create({
    data: {
      user_id: userId,
      message,
      is_read: false,
    },
  });

  const user = await prisma.user.findUnique({
    where: { id: userId }, // Corrected the field to search by
  });

  if (!user) {
    throw new Error('User not found');
  }

  const mailOptions = {
    to: user.email,
    from: process.env.EMAIL,
    subject: 'Notification on your Bid',
    text: message
  };

  await transporterUtility.transporter.sendMail(mailOptions);

  return 'Password reset email sent'
};

module.exports={
  sendNotificationWithMail
}

