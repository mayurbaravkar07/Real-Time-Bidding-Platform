const jwt = require('jsonwebtoken');
const prisma = require('../utils/db'); // Adjust the path as necessary

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  const token = authHeader.replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Retrieve user information from the database
    const dbUser = await prisma.user.findUnique({
      where: { id: decoded.userId } // Make sure your JWT contains 'userId'
    });

    if (!dbUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    req.user = dbUser; // Attach the user information to the request object
    next(); // Move to the next middleware or route handler
  } catch (err) {
    console.error("Token verification error:", err);
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = authenticateToken;
