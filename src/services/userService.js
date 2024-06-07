const prisma = require('../utils/db');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const transporterUtility=require('../utils/transporter');
require('dotenv').config();


 exports.getUserProfile = async (userId) => {
  return await prisma.user.findUnique({
    where: { id: userId },
  });
};


const jwt = require('jsonwebtoken');

exports.sendPasswordResetEmail = async (email, host) => {
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    throw new Error('User not found');
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  const mailOptions = {
    to: user.email,
    from: process.env.EMAIL,
    subject: 'Password Reset',
    text: `Please click on the following link, or paste it into your browser to complete the process: http://${host}/user/reset-password/${token}`
  };

  await transporterUtility.transporter.sendMail(mailOptions);

  return 'Password reset email sent';
};


exports.resetPassword = async (token, newPassword) => {
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      throw new Error('Password reset token is invalid or has expired');
    }
  
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    });
  
    if (!user) {
      throw new Error('User not found');
    }
  
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
  
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword
      }
    });
  
    return 'Password has been reset';
  };
  
