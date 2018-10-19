const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');


//const upload = require('../../server').upload;

// Post model
const Message = require('../../models/Message');
// Profile model
const Profile = require('../../models/Profile');

// Validation
//const validatePostInput = require('../../validation/post');

/*######################################################*/


// @route   GET api/chats
// @desc    Get chats
// @access  Public
router.get('/', (req, res) => {
  Message.find()
    .sort({ date: -1 })
    .then(messages => res.json(messages))
    .catch(err => res.status(404).json({ nochatsfound: 'No Chats found' }));
});


// @route   POST api/chat
// @desc    Create chat
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  
  (req, res) => {

    isValid = true
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json('bad message');
    }

    const newMessage = new Message({
      content: req.body.content,
      user: req.user.id,
      //No need to add date
    });

    newMessage.save().then(message => res.json(message));
  }
);


module.exports = router;