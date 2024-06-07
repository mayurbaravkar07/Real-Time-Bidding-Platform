const notificationService = require('../services/notificationService');

exports.getNotifications = async (req, res) => {
  try {
    const notifications = await notificationService.getNotifications(req.user.userId);
    res.json(notifications);
   
  } catch (error) {
    
   res.status(500).json({ error: 'Could not fetch notifications' });
  }
};

exports.markNotificationsRead = async (req, res) => {
  try {
    await notificationService.markNotificationsRead(req.user.userId);
    res.json({ message: 'Notifications marked as read' });
  } catch (error) {
   
    res.status(500).json({ error: 'Could not mark notifications as read' });
  }
};
