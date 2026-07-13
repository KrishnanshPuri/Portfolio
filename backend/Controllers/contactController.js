const ContactMessage = require('../Models/contactModel');

const listContactMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ created_at: -1 }).limit(500);
    res.json(messages);
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const createContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const newMessage = new ContactMessage({
      name,
      email,
      subject,
      message
    });

    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
   
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    console.error('Error saving contact message:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  listContactMessages,
  createContactMessage
};