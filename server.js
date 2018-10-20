const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');

const methodOverride = require('method-override');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const messages = require('./routes/api/messages');
const chats = require('./routes/api/chats');


const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config

const mongoURI = require('./config/keys').mongoURI;
const publicPath = path.join(__dirname, '../public');
var server = http.createServer(app);
var io = socketIO(server);


mongoose
  .connect(mongoURI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));
// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);
app.use('/api/messages', messages);
app.use('/api/chats', chats);




// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;


io.on('connection', function () {
  console.log('connected to server from node backend');
});
io.on('11', function(data){
  console.log('got emit');
  console.log(data.playerID);
  console.log(data.otherVariable);
});

//Changed from app.listen to server.listen to enable socket messaging

server.listen(port, () => console.log(`Server running on port ${port}`));
