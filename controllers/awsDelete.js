const stream = require('stream');
const uuidv4 = require('uuid/v4');
const s3 = require('../config/s3.js');
 
exports.doDelete = (req, res) => {
	const s3Client = s3.s3Client;
	const params = s3.uploadParams;

	/*req.body.forEach(function(entry, index) {
		console.log('NEW ENTRY');
        console.log(index, entry.name);
    });*/

	console.log('DELETE FILE '+req.files[0].fileName);

	params.Key = req.files[0].fileName;


	s3Client.deleteObject(params, function(err, data) {
      if (err) {
			res.status(500).json({error:"Error -> " + err});
		}
		res.json({message: 'File deleted successfully!'});
    });
}