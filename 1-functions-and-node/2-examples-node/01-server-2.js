var http = require('http');
var server = http.createServer();

var onRequest = function handleRequest(req,res) {
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.end('Hello World!');
};

server
	.listen(3000)
	.on('request', onRequest)
;

console.log('Server running on port 3000');