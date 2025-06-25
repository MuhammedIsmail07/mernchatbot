const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET /api/users - Get all users
router.get('/', async (req, res) => {
  try {
    // First, ensure hardcoded users exist in database
    const hardcodedUsers = [
      { id: 'user1', name: 'Alice Johnson', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
      { id: 'user2', name: 'Bob Smith', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
      { id: 'user3', name: 'Carol Davis', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' }
    ];

    // Upsert hardcoded users
    for (const userData of hardcodedUsers) {
      await User.findOneAndUpdate(
        { id: userData.id },
        userData,
        { upsert: true, new: true }
      );
    }

    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

module.exports = router;