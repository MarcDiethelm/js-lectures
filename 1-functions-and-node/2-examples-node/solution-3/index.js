// Exercise 1
// Write a server that handles two URIs differently. The following functionality should be in a module: /numbers makes
// the server write numbers to the console, /file makes the server create a file with fs.writeFile, then read it, then
// delete it.

var http = require('http');
var router = require('./router.js');
var server = http.createServer();

var onRequest = function handleRequest(req, res) {

	if (req.url === '/numbers') {
		router.numbers(req, res);
	}
	else if (req.url === '/file') {
		router.file(req, res);
	}
	else {
		res.writeHead(404);
		res.end('404');
	}
};

server
	.listen(3000)
	.on('request', onRequest)
;

console.log('Server running on port 3000');