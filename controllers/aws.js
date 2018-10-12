const stream = require('stream');
const uuidv4 = require('uuid/v4');
const s3 = require('../config/s3.js');
 
exports.doUpload = (req, res) => {
	const s3Client = s3.s3Client;
	const params = s3.uploadParams;
	

	//Originally was req.file.originalname
	//Need to create a folder for each user
	params.Key = uuidv4();
	params.Body = req.file.buffer;
		
	s3Client.upload(params, (err, data) => {
		if (err) {
			res.status(500).json({error:"Error -> " + err});
		}
		res.json({message: 'File uploaded successfully! -> keyname = ' + req.file.originalname});
	});
}