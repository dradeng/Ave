const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config

const db = require('./config/keys').mongoURI;
/*
const conn = mongoose.createConnection(mongoURI);



let gfs;
conn.once('open', () => {
	gfs = Grid(conn.db, mongoose.mongo);
	gfs.collection('uploads');
	console.log('connection open');
});

const storage = new GridFsStorage({
	url: mongoURI,
	file: (req, file) => {
		return new Promise((resolve, reject) => {
			crypto.randomBytes(16, (err, buf) => {
				if (err) {
					return reject(err);
				}
				const filename = buf.toString('hex') + path.extname(file.originalname);
				const fileInfo = {
					filename: filename,
					bucketName: 'uploads'
				};
				resolve(fileInfo);

			});
		});
	}
});
const upload = multer({storage});
*/


//THIS IS THE ORIGINAL WAY TO CONNECT TO MONGODB
//THIS HAS TO GO AFTER CREATE CONNECITON OR CONN.ONCE THROWS AN ERROR
//CREATE CONNECTION WAS SOLELY DONE FOR GRIDFS AND UPLOADING PICS
mongoose
  .connect(db)
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
