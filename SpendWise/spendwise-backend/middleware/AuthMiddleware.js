const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (!decoded.userId) {
      return res.status(401).json({ message: 'Invalid token: userId not found' });
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: 'Invalid token or user not found' });
    }

    req.user = user;

    // Extra check after setting req.user
    if (!req.user) {
      return res.status(401).json({ message: 'Invalid token: User not found' });
    }

    next();
  } catch (error) {
    console.error('Error in auth middleware:', error);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Unauthorized: Token has expired' });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    res.status(500).json({ message: 'Internal Server Error: Authentication failed' });
  }
};

module.exports = authMiddleware;
