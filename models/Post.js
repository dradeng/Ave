const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const fs = require('fs');
const multer = require('multer');

// Create Schema
const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  rent: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  calendar: {
    start: {
      month: {
        type: String,
        required: true,
        default: 'January'
      },
      day: {
        type: Number,
        required: true,
        default: 1
      }
    },
    end: {
      month: {
        type: String,
      },
      day: {
        type: Number,
      }
    }
  },
  avatar: {
    type: String
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  images : [
    {
      type: String,
      required: true
    }
  ],
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model('post', PostSchema);
