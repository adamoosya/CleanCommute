// routes/user.js

const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('./user');

const router = express.Router();

// Middleware to verify the JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, 'your_secret_key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.user = decoded;
    next();
  });
};

router.get('/:id', verifyToken, async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the authenticated user matches the requested user
    if (req.user.userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id/preferences', verifyToken, async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the authenticated user matches the requested user
    if (req.user.userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }

    // Update user preferences
    user.preferences = req.body.preferences;
    await user.save();

    res.status(200).json({ message: 'User preferences updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
