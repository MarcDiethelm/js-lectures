Node.js Basics
==============

## Web Server

A **web server** is a specialized software **program** that
- receives an **HTTP request** from a **client**.
- performs certain actions based on the **request URI**
- serves an **HTTP response** based on the request and actions

The most common action a server will perform is read from a file or database and **serve** the **content** to the client. The content will usually be HTML. A typical web server must be able to handle thousands of requests per second.

Note: Often the **hardware** running the server software is itself called a web server.

## URI

Every HTTP request begins with an URI (universal resource identifier).

Only a subset of URIs called URLs refer to a static resources on the server file system. URIs can address any kind of resource (data), including resources that are dynamically created on the server.

## Classic web server model

A classic web server consists of the server program to serve static files and separate **server-side scripting** process to create dynamical resources. Typically server-side scripting means embedding scripts in HTML source code. Scripts which can control server functions to a varying degree via APIs.

The first implementation of SSS was in JavaScript running on top of Netscape's Java-based Enterprise Server, which has since vanished. More modern examples are Perl CGI, JSP, PHP, ASP, etc.

Historically there have been a few attempts to bring back server-side JavaScript. Obviously it seems more efficient to use the same language in the browser and the server. Those attempts all followed the classical model and none of them were successful.

This has led to a division between frontend and server-side programming. Consequently as the requirements of frontend engineering have progressed, satisfying those requirements on the server has become more and more difficult. For example providing real-time upload data to a browser to build a client-side upload progress bar had become a really difficult problem.

### Blocking I/O

A classic web server is blocked from further processing while it waits for reponses from the file system or databases (input/output).

## Node.js

Node.js is based on the idea that a web server can be just a library, basically a function that is invoked each time a request is received. As it turned out JavaScript is ideal for this, because of its support of anonymous functions and closures.

```js
// 2-examples-node/01-server-1.js
require('http').createServer(function (req, res) {
	res.end('Hello World!');
}).listen(3000);
```

This example is very simple web server written in Node.js.

### Characteristics

- **Event-based, asynchronous I/O**  
  Like Ajax in the browser, every I/O operation is implemented with a callback. The process is only 'busy' while there is something to do. Nothing is blocked while waiting for I/O.
- **Streams**  
  Data is handled in small chunks as they are read instead of waiting for a whole source to be loaded in to memory. Availability of new chunks is signalled by sending events.
- **Clean, consistent API**  
  Including pattern for error handling.  
  No DOM or browser API.
- **Modules**  
  Common JS, npm
- **Can be hard to debug**  
  Code that is triggered by events usually has limited stack traces.

#### Strengths
- Fast concurrent network operations
- Data streaming
- Real-time data
- Data APIs

#### Weaknesses
- Heavy computing

## Async Programming

Asynchronous programming means that code can be inactive until some trigger event reactivates execution. Execution then continues in a callback.

In principle it's the same as in the browser.

```js
// addEventListener requires a callback as 2nd argument
document.querySelector('button').addEventListener('click', onClick);

function onClick(event) {
  // callback function, only called WHEN there is an event
}
```

This DOM example shows a function that is only **invoked** when the user clicks a button. The click is a form of *input* that triggers an **event**. The `onClick` function is immediately registered as an *event handler*, but only executed **asynchronously**. An event handler is a form of a callback.

The same can be written using anonymous callbacks.

```js
$('button').on('click', function(ev) {
	// callback function, only called WHEN there is an event
});
```

Here's Node.js again.

```js
// 2-examples-node/01-server-1b.js
var http = require('http');
http.createServer(function(req, res) {
	res.writeHead(200);
	res.end('You requested ' + req.url);
}).listen(3000);
```

Writing many sequential async tasks using only a pattern of inline anonymous callbacks can quickly lead to problems ("Callback Hell"). It's a good idea to work with named functions, that are kept small.

There are additional approaches to solving problems with async programming including usage of async helper libraries like Async.js and Q (Promises).

Here's the http server written with a more descriptive syntax, without an inline callback.

```js
// 2-examples-node/01-server-2.js
var http = require('http');
var server = http.createServer();

var onRequest = function handleRequest(req,res) {
	res.writeHead(200);
	res.end('You requested '+ req.url);
};

server
	.listen(3000)
	.on('request', onRequest)
;
```

Again `onRequest` is a callback that is only invoked once a request is received.


## Modules

Node.js uses a pattern of modules, JS files that encapsulate and provide additional functionality. The pattern used is called Common JS. Some modules are built-in and provide native APIs, but most are created in "userland" and can be installed with NPM.

NPM is the Node Package Manager and is bundled with Node installations. It is a command line tool built with Node.

Every module has a `module` property that references itself. `module.exports` is the entry point into a module.

```js
// In the module
module.exports = myExportedObject;
```

```js
// Requiring a module
var myModule = require('moduleName');
```

`myModule` now has the modules' `myExportedObject` as its value.

`myExportedObject` can be any JS object. It often is a function so we can pass arguments into the object, when initializing it.

```js
// In the module post.js
module.exports = function(config) {
	return {
		get: function(id) {
			return config.postName + ' ' + id;
		}
	}
};
```

```js
// 2-examples-node/02-modules.js
var config = { postName: 'Post' };
// Requiring custom module posts.js in the current directory
var posts = require('./posts')(config);
console.log(posts.get('42'));
```

With this system it is possible to create, publish and install modules with ease.

**Exercise 1:** Write a module that logs integer numbers to the console. The start and ending number is passed into the module when requiring it. solution: 2-examples-node/solution-1/index.js


## API and error handling

Node has a rich API suitable for server-side programming.

Here is a typical example of Node.js coding using the async file system function `readFile`.

```js
// 2-examples-node/03-api.js
var fs = require('fs');

fs.readFile(path, function(err, content) {
	if (err) return console.error(err);
	console.log(content.toString());
});
```

Some of Node's async conventions are visible in this example:

- The callback is always the last argument.
- The callback's first argument is always `err`, but `err` is only defined if there was an error.
- If there was an error the callback *returns early*, meaning it does not execute further statements.
- The callback does not throw an exception, because exceptions are not suitable for async programming. (The callback could however use an error callback or emit an error event.)

Like most async functions in Node `readFile` also has a synchronous variant `readFileSync` which blocks further execution until it either returns the file content or throws an exception.

**Exercise 2**: Write a module that you can pass a filename. Use the filename to create a file with fs.writeFile, then read it, then delete it. Use the [API reference](http://nodejs.org/api/). solution: 2-examples-node/solution-2/index.js

**Exercise 3:** Write a server that handles two URIs differently. The following functionality should be in a module: `/numbers` makes the server write numbers to the console, `/file` makes the server create a file with `fs.writeFile`, then read it, then delete it. Ideally send the responses from the module. Bonus: Send the file content to the browser for `/file`.  solution: 2-examples-node/solution-3/index.js


## Links

- Node API Reference
  - http://nodejs.org/api/
- Node Package Manager
  - http://npmjs.org/
- NPM Cheat Sheet
  - http://browsenpm.org/help
- Node Coding Tutorials
  - http://nodeschool.io/
- Node: Up and Running (online book)
	- http://chimera.labs.oreilly.com/books/1234000001808/index.html
