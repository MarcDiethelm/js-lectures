require('http').createServer(function (req, res) {
	res.end('Hello World');
}).listen(3000);

console.log('Server running at http://localhost:3000/');