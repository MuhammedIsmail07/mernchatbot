const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// GET /api/messages/:id - Get chat history between current user and specified user
router.get('/:userId/:otherUserId', async (req, res) => {
  try {
    const { userId, otherUserId } = req.params;
    
    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: otherUserId },
        { sender: otherUserId, receiver: userId }
      ]
    }).sort({ timestamp: 1 });

    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// POST /api/messages - Save a new message
router.post('/', async (req, res) => {
  try {
    const { sender, receiver, message, messageType, imageData } = req.body;

    if (!sender || !receiver || !message) {
      return res.status(400).json({ error: 'Sender, receiver, and message are required' });
    }

    const newMessage = new Message({
      sender,
      receiver,
      message,
      messageType: messageType || 'text',
      imageData: imageData || null
    });

    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ error: 'Failed to save message' });
  }
});

module.exports = router;