var numbers = require('../solution-1/numbers');
var file = require('../solution-2/file');

module.exports = {

	numbers: function(req, res) {
		numbers(0, 50);
		res.writeHead(200);
		res.end();
	},

	file: function(req, res) {
		file('foo.text', 'Hello', function(err, content) {
			if (err) {
				res.writeHead(500);
			}
			else {
				res.writeHead(200);
				res.write(content);
			}
			res.end();
		});
	}
};