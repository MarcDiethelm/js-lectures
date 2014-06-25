var fs = require('fs');

module.exports = function(filename, text, callback) {

	fs.writeFile(filename, text, function(err) {
		if (err) return handleError(err);

		fs.readFile(filename, {encoding: 'utf8'}, function(err, content) {
			if (err) return handleError(err);
			console.log(content);

			fs.unlink(filename, function(err) {
				if (err) return handleError(err);
				if (callback) callback(err, content);
			});
		});
	});
};

function handleError(err) {
	console.error(err);
}