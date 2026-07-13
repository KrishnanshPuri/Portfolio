const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const contactMessageSchema = new mongoose.Schema({
  id: {
    type: String,
    default: () => uuidv4(),
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 120
  },
  email: {
    type: String,
    required: true,
    trim: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  subject: {
    type: String,
    default: "",
    trim: true,
    maxlength: 160
  },
  message: {
    type: String,
    required: true,
    trim: true,
    maxlength: 4000
  },
  created_at: {
    type: String,
    default: () => new Date().toISOString()
  }
}, {
  versionKey: false,
  toJSON: {
    transform: (doc, ret) => {
      delete ret._id; 
      return ret;
    }
  }
});

module.exports = mongoose.model('ContactMessage', contactMessageSchema, 'contact_messages');