const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

const methodOverride = require('method-override');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config

const mongoURI = require('./config/keys').mongoURI;


//THIS IS THE ORIGINAL WAY TO CONNECT TO MONGODB
//THIS HAS TO GO AFTER CREATE CONNECITON OR CONN.ONCE THROWS AN ERROR
//CREATE CONNECTION WAS SOLELY DONE FOR GRIDFS AND UPLOADING PICS

//COMMENT ABOVE IS OLD^^
//Draden moved create connection to api post
//Originally had it here and tried to export it, but it didnt
//work well so just moved all the code over
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


// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
