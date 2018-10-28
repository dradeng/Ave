const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');


// Post model
const Chat = require('../../models/Chat');
// Profile model
const Profile = require('../../models/Profile');

// Validation
//const validatePostInput = require('../../validation/post');

/*######################################################*/


// @route   GET api/chats
// @desc    Get chats
// @access  Public
router.get('/', (req, res) => {
  Chat.find()
    .sort({ date: 1 })
    .then(chats => res.json(chats))
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
      return res.status(400).json('bad chat');
    }

    const newChat = new Chat({
    	user1: req.user.id,
    	user2: req.body.user2,
    	messages: []

      //No need to add date
    });

    newChat.save().then(chat => res.json(chat));
  }
);

// @route   POST api/chats/:id
// @desc    Add message to chat
// @access  Private
router.post(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {


    Chat.findById(req.params.id)
      .then(chat => {
        const newMessage = {
          content: req.body.content,
        };
        console.log(newMessage);
        // Add to comments array
        chat.messages.unshift(newMessage);
        console.log('message aobeve, lust below');
        console.log(chat.messages);
        // Save
        chat.save().then(chat => res.json(chat));
      })
      .catch(err => res.status(404).json({ chatnotfound: 'No chat found' }));
  }
);


// @route   GET api/chats/:id
// @desc    Get chat by id
// @access  Public
/*router.get('/:id', (req, res) => {
  Chat.findById(req.params.id)
    .then(chat => res.json(chat))
    .catch(err =>
      res.status(404).json({ nochatfound: 'No chat found with that ID' })
    );
});*/


module.exports = router;