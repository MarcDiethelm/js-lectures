Node and Express.js
=======================

While Node.js gives us all the tools to build web servers from scratch, it is not desirable to do this for every project.
One of the most popular projects on Github, Express.js, is a "web application framework" that takes away most this work,
so a developer can focus on building an server-side MVC architecture.

## Packages: basic install

Like all published Node.js software Express.js is built as a Module which can be installed as a NPM package.

To use Express.js as a framework in your project, install it with

```sh
npm install express
# or just
npm i express
```

This will install the version tagged as 'latest' from npm.

In general packages that are supposed to be run on the command line are installed with the global flag. Express comes with a command line tool, so here's how to install that.

```sh
npm i -g express
```

To install a specific version write your command like this.

```sh
npm i express@3.3.8
```

NPM installs local packages and their dependencies to a folder called `node_modules`. Typically dependencies are installed to another `node_modules` folder in the package.

A locally installed module can be 'required' like a native Node module, meaning no path is needed.

```js
var express = require('express');
```

Express provides a function that is used as a callback for Node's `http.createServer`. This function let's you use a fully featured web server.

```js
var http = require('http');
var express = require('express');
var app = express();

http.createServer(app).listen(3000);
```


The most important concepts in Express are known as **middlewares** and **routes**.

## Middlewares

Middlewares in Express are a series of asynchronous callbacks that are executed for every request until a middleware sends a response. Express middlewares provide and simplify the basic functionality of a web server like request logging,  parsing data from URL query and cookies, sessions, compressing the response stream and so on.

Middlewares are added to the stack with

```js
app.use([path='/'], callbackFn);
```

Custom middlewares can be added in the same way. Note the optional `path` param. Middleware functions are only invoked if `req.url` starts with `path`.

A middleware function looks like a regular request callback but enhanced with an additional argument `next`, which is used to pass execution to the next middleware in the stack.

```js
app.use(function(req, res, next) {
	// do middleware stuff, e.g
	req.user = 'Marc';
	return next();
});
```

### Error handling

Until version 4 Express came bundled with Connect which provided many 'standard' middlewares by default. These middlewares must now be [installed separately](https://github.com/senchalabs/connect#middleware).

A middleware that takes 4 arguments is an [error handler](http://expressjs.com/guide.html#error-handling). As expected the error is the first argument. Like other middlewares the error handlers are called in the order they were added.

```js
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.send(500, 'Something broke!');
});
```

## Routes

Routing means performing different actions depending on the request URI. Express routes also URI-specific middlewares but with additional features.

The recommended syntax for defining a route is this:

```js
app.routes('/products')
	.all(function(req, res, next) {
		// something to do for all HTTP verbs
	})
	.get(function(req, res, next) {
		res.json({});
	})
	.post(function(req, res, next) {
		// create a new product
	})
;
```

You can specify url fragments that you want to have easy access to. Here's an example with an alternate route syntax.

```js
app.get('products/:id/image', function(req, res, next) {
	var prodId = req.params.id;
});
```

A route can have multiple middlewares.

```js
app.post('products/:id/image', checkLogin, products.load, function(req, res, next) {

});
```

Usually the route definitions are externalized in a custom module.

## MVC: Controller

Not just the routes can be externalized, but also the callbacks themselves. It's good practice to bundle them in a module as function properties of an object (methods). That module is then effectively a controller for a certain route.


```js
// routes.js
var products = require('./controllers/products');
module.exports = function(app) {
	app.routes('/products/:id')
		.get(products.getOne)
		.post(products.createOne)
	;
};
```
```js
// controllers/products.js
var products = {
	getOne: function getOneProduct(req, res, next) {
		// get a product from db and respond
	},
	createOne: function getOneProduct(req, res, next) {
		// create a product in db and respond
	}
};
module.exports = products;
```



## MVC: Model

In programming a data model is an abstraction that wraps and simplifies the handling of data.

### Sessions

HTTP and by extension the web is **stateless**. Nothing is remembered between requests.
But web applications obviously need a way to remember things between requests of a user. The purpose of sessions is to associate a set of data with a single user. The user is identified with a browser cookie, set by the server.

[Reading](http://expressjs.com/4x/api.html#req.cookies) and [setting](http://expressjs.com/4x/api.html#res.cookie) cookies in Express is as easy as

```js
var cookieValue = req.cookies.name;
res.cookie(name, value, [options]);
```

A model/session will usually be stored persistently in a type of database. The Node community will often rely on NoSQL key-value stores, which play nicely with JSON data.

A very simple implementation of a persistent datastore is [NeDB](https://github.com/louischatriot/nedb). While it's limited in comparison to full database software like MongoDB and MySQL it's very useful for quick setups that don't handle huge amounts of data, because it's completely Node-based.

After installing NeDB with npm we're good to go.

```js
var Datastore = require('nedb')
  , db = new Datastore({ filename: 'path/to/datafile', autoload: true });
```

In NoSQL databases each entry is called a **document**. Inserting a document is straight-forward. In NeDB all datatypes are native to JS.

```js
var doc = {
	hello: 'world'
   ,n: 5
   ,today: new Date
   ,nedbIsAwesome: true
   ,notthere: null
   ,notToBeSaved: undefined  // Will not be saved
   ,fruits: [ 'apple', 'orange', 'pear' ]
   ,infos: { name: 'nedb' }
};

db.insert(doc, function (err, newDoc) {   // Callback is optional
  // newDoc is the newly inserted document, including its _id
  // newDoc has no key called notToBeSaved since its value was undefined
});
```

We can now save the id in a cookie. Next time the user makes a request we can get his data from the datastore.

```js
db.findOne({ _id: 'id1' }, function (err, doc) {
  // If no document is found, doc is null
});
```

**Note:** We must take care not to create new sessions over and over for clients that don't accept cookies, e.g. web crawlers.

Our model, a useful abstraction for handling this data, will be a very simple one.

Here's an example how to **use** a session model:

```js

var sessionModel = require('./models/session.js');
var cookieOptions = {
	path	: '/'
   ,httpOnly: true
   ,maxAge	: 7 * 24 * 3600 * 1000   // a week for example
};
app.use(express.cookieParser()); // installed dependency
app.use(setSession);

// Set up some routes
// [...]

// getSession middleware
function getSession(req, res, next) {
	if (!req.cookies.sessionId) return next();

	sessionModel.findById(req.cookies.sessionId, function(err, session) {
		return next();
	});
}

// setSession middleware
function setSession(req, res, next) {
	sessionModel.set(req, function(err, session) {
		if (!req.cookies.sessionId) {
			res.cookie('sessionId', session._id, cookieOptions);
		}
		return next();
	});
}
```

`models/session.js` is a custom module that wraps the specific database operations so we can access them as functions. You should know how to do this by now...

The `set` method could look like this:

```js
function set(req, callback) {
	var session = req.session || {};
	session.lastVisit = new Date;
	session.ip = req.ip;
	db.insert(session, callback);
}
```

**Note:** A real-world model for a NoSQL DB will often enforce datatypes according to a predefined *[schema](http://mongoosejs.com/docs/guide.html)* and more importantly escape any special JS characters like `' " \ ; { }` before insertion. This prevents [injection attacks](https://www.owasp.org/index.php/Testing_for_NoSQL_injection).

**Exercise:** Create an Express application with a *homepage* and a *subpage*. Just `res.write` the page content. Greet the user with her IP address and the time and date of her last pageload. You can use `date.toUTCString()`. Use this file structure:

```
controllers
  --default.js
models
  --session.js
views
  --home.hbs
  --subpage.hbs
server.js
routes.js
```
Solution: to do

Of course [there are modules](https://github.com/expressjs/session) that provide most of this functionality in a safe way and a lot more. But it's important to understand the basic concepts.


## MVC: View

So far we have only served *static* files (and written directly to the request stream.) Very often a webpage will contain dynamic parts or needs to be assembled dynamically from different parts. Doing this with string concatenation very quickly becomes unmaintainable. Views are a mechanism that allows combining content with dynamic data and some limited logic. This process is called rendering.

Let's take a look at a simple view template written in [Handlebars](http://handlebarsjs.com/)

```hbs
// views/simple.js
<head>
	<title>{{title}}</title
</head>
<body>
	<select>
	{{#each characters}}
		<option value="{{@index}}">{{this.rank}} {{this.name}}</option>
	{{/each}}
	</select>
</body>
```

Note the variables and control structures in the curly braces or "handlebars". The output in double braces is automatically HTML-escaped. To get non-escaped output use triple braces.

This template would be rendered with data like this.

```js
var context = {
	 title: 'Hello'
	,characters: [
		 { name: 'Kirk', rank: 'Captain' }
		,{ name: 'Spock', rank: 'Lieutenant' }
	]
}
var templateFn = Handlebars.compile(source);
var html       = templateFn(context);
```

The data is is called the context of the view (or of the template).

**Note:** A template rendering engine like Handlebars can be used in the browser and on the server. The template compilation, meaning converting the source into an optimized template function is usually performed by the server for performance reasons. This is called precompilation.

Express.js let's render views quite simply inside a controller by wrapping the template engine's render function with `res.render`. Calling `res.render` also automatically sends a response.

But first we must tell Express what to do:

```js
// 2-examples-view/server.js
var hbs = require('hbs'); // hbs is a Node wrapper for Handlebars.js
var express = require('express')
var app = express();

app.set('view engine', 'hbs'); // use hbs's render function for .hbs files
app.set('views', 'path/to/views');

app.routes('/')
	.all(function(req, res, next) {
		res.locals.layout = 'default';
		next();
	})
	.get(function(req, res, next) {
		res.render('home',  // render file path/to/views/home.hbs
		{
			// context
		});
	});
```

Since the basic HTML document rarely changes, there exists in hbs the concept of a *layout*: A base document that the view is rendered in.

To use a layout we add a `layout` property to the context, which specifies the file to use. Inside the layout the view is rendered in place of the variable `{{{body}}}`.

To set a context for all templates we can use `app.locals` or to set the context for a request we can use `res.locals`.

- exercise / homework: put it all together
- homework: use contrib middlewares
