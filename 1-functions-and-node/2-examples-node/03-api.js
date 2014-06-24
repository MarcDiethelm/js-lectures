var fs = require('fs');
var path = __filename; // Use this file

fs.readFile(path, function(err, content) {
	if (err) return console.error(err);
	console.log('content of file: %s\n', path);
	console.log(content.toString());
});