const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const statusCheckSchema = new mongoose.Schema({
  id: {
    type: String,
    default: () => uuidv4(),
    unique: true
  },
  client_name: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: () => new Date()
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

module.exports = mongoose.model('StatusCheck', statusCheckSchema, 'status_checks');