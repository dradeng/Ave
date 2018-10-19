const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ChatSchema = new Schema({
  user1: {
      type: Schema.Types.ObjectId,
      ref: 'users'
  },
  user2: {
      type: Schema.Types.ObjectId,
      ref: 'users'
  },
  messages: [
    {
      type: Schema.Types.ObjectId,
    ref: 'message'
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Message = mongoose.model('chats', ChatSchema);
