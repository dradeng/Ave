const stream = require('stream');
const uuidv4 = require('uuid/v4');
const s3 = require('../config/s3.js');
 
exports.doUpload = (req, res) => {
	const s3Client = s3.s3Client;
	const params = s3.uploadParams;
	
	console.log('IN AWS');
	console.log(req.files);

	params.Key = req.files[0].originalname;

	console.log('IN AWS PAST KEY');
	console.log(req.files[0].originalname);
	console.log('IN AWS PAST key');
	console.log(params.Key);

	params.Body = req.files[0].buffer;
	
	console.log('IN AWS PAST BUFFER');
	console.log(req.files[0].buffer);
	console.log('IN AWS PAST buffer');
	console.log(params.Body);

	s3Client.upload(params, (err, data) => {
		if (err) {
			res.status(500).json({error:"Error -> " + err});
		}
		res.json({message: 'File uploaded successfully! -> keyname = ' + req.files[0].originalname});
	});
}
