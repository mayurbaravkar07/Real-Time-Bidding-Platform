const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../utils/db');


const register = async (username, password, email,role) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
      email,
      role,
    },
  });
};

const login = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !await bcrypt.compare(password, user.password)) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET);
  return { token, user };
};

module.exports = {
  register,
  login,
};
