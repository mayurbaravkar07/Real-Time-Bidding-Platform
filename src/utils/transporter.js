const nodemailer = require('nodemailer');
require('dotenv').config();

 exports.transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});