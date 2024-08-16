const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/AuthMiddleware');

router.get('/protected', authMiddleware, async (req, res) => {
  try {
    res.send(`Welcome, ${req.user.name}!`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error accessing protected route');
  }
});

module.exports = router;
