var http = require('http');
var fs = require('fs');
var path = require('path');

var port = 3000;
var mime = {
		html    : 'text/html'
		,css    : 'text/css'
		,js     : 'application/javascript'
	};

/* le handmade static file server. nice. */

http.createServer(function(req, res) {
	var aUrl = req.url.split('?');
	var url = aUrl[0];
	// var query = aUrl[1];
	var htmlPath = './pages/';
	var assetPath = '/assets';
	var isAssetRequest = (url.indexOf(assetPath) === 0); // does url start with static path?
	var isFaviconRequest = (url === '/favicon.ico');
	var filePath;

	if (isFaviconRequest) { // we don't serve no stinking .ICO
		res.statusCode = 404;
		return res.end();
	}
	else if (isAssetRequest) {
		// url to filePath name: remove initial slash using a regular expression. there are other ways...
		filePath = url.replace(/^\//, '');
	}
	else { // html page
		if (url === '/') {
			filePath = htmlPath +'index.html';
		}
		else {
			filePath = htmlPath + url + '.html';
		}
	}

	filePath = path.normalize(filePath);

	fs.readFile(filePath, {encoding: 'utf8'}, function(err, content) {
		if (err) return handleError(err);

		extension = filePath.split('.').pop();

		res.writeHead(200, {
			'Content-Type'  : mime[extension],
			'Content-Length': content.length
		});
		res.write(content);
		res.end();
		console.log('200', req.method, url);
	});
})
.listen(port);


function handleError(req, res) {
	console.error('404', req.method, url, filePath);
	res.writeHead(404);
	res.end('404 NOT FOUND\n\n'+ url);
}

console.log('http server listening port %d\n', port);
