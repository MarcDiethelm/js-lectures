var http = require('http');
var hbs = require('hbs'); // install first
var express = require('express'); // install first
var app = express();

app.set('view engine', 'hbs'); // use hbs's render function for .hbs files
app.set('views', 'views');

app.use(function(req, res, next) {
	console.log(req.method, req.url);
	next();
});

app.route('/')
	.all(function(req, res, next) {
		res.locals.layout = 'default';
		next();
	})
	.get(function(req, res, next) {
		res.render('home',  // render file path/to/views/home.hbs
			{
				 title: 'Hello'
				,characters: [
					 { name: 'Kirk', rank: 'Captain' }
					,{ name: 'Spock', rank: 'Lieutenant' }
				]
			});
	});

http.createServer(app).listen(3000);

console.log('http server listening port %d\n', 3000);