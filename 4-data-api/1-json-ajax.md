JSON and Ajax
========


## JSON

[JSON](http://json.org/) is a data exchange format. It is used to store and send data such as in [DOM storage](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Storage), cookies and HTTP requests. JSON is often used in Ajax techniques and has pretty much replaced XML in that role.

JSON stands for JavaScript Object Notation and is derived from JS object literal syntax. There are some notable differences however:

- all identifiers and all strings are written between double quotes
- the only allowed data types are: String, Number, Boolean, Array, Object and null.
- there is no defined representation for Date, Error, Regular Expression, and Function objects.
- there are no comments
- trailing commas are forbidden

Note: JSON itself does not specify how dates should be represented, but Javascript does. You should use the format emitted by Date's toJSON method: `2012-04-23T18:25:43.511Z`. Valid JSON can also be written using an array literal.

JSON has been formalized as a standard and its content type is `application/json`. JSON can be converted to JavaScript objects using JS's `eval` function, however this is considered unsafe. All [modern](http://caniuse.com/#feat=json) browsers and Node.js provide [native JSON support](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON#) via the `JSON.parse` and `JSON.stringify` methods.

Usage:
```js
var foo = {};
foo.bar = "new property";
foo.baz = 3;
foo.date = (new Date).toJSON();

var jsonString = JSON.stringify(foo);
var jsObject = JSON.parse(jsonString);

jsObject.date = new Date(jsObject.date);
```

JSON is usually encoded as UTF-8.

## Ajax

Ajax as a name is not a technology, but rather a buzzword. It has replaced the earlier *Dynamic HTML* (via scripting) while making asynchronous operation common place. Ajax stands for *asynchronous JavaScript + XML`*. Despite the name JSON is the preferred way of transferring data.

Asynchronous in this context means that a web page loaded in the browser is able to incrementally request data from the server to update itself, without re-loading the whole page. And of course it means working with JS callbacks.

Historically different techniques have been used to achieve async operations.

- Trickery with images. Setting the `img.src` property in HTML DOM starts an async request.
- 1996: iframes, where designed by Microsoft to load async content (full HTML documents)
- 1999: Microsoft released the first ActiveX based version of the XMLHttpRequest API.

### Drawbacks

An immediate drawback of Ajax apps is the fact that their current state often isn't reflected anywhere, meaning the state cannot be bookmarked, easily restored, navigated with the bowser's "back" and "forward" buttons, "seen" by non-JS clients (like search engines and some screen readers).

Since the hash portion of an URIs is not sent to servers, the application state is often represented in the hash portion of the URI.

#### Deep linking

In order to represent the dynamically created application states HTML5 [introduced](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Manipulating_the_browser_history#Adding_and_modifying_history_entries) the `history.pushState()` and `history.replaceState()` methods, which allow you to add and modify history entries, respectively (with or without hash).

User navigation through the history results in a `window.popstate` event, which can be used to restore specific app states.

#### Server-side rendering as a fallback

For agents (clients) that don't support JavaScript there should be a scheme in place to send appropriate content to them. Either one serves them a representative subset of the requested resource, which is not ideal since URLs should result in uniform resources. Or one uses a so-called headless browser, server-side, to render the correct resource, that a typical browser would see.

The most well-known example of a headless browser is [Phantom.js](http://phantomjs.org/). A purely Node.js based alternative is [Zombie.js](http://zombie.labnotes.org/).

### CORS (Cross-site security)

Cross-site HTTP requests initiated from within scripts have been subject to restrictions, because of security reasons. For example HTTP requests made using the XMLHttpRequest object by default are subject to the same-origin policy. This means that a web application using XHR could only make HTTP requests to the domain it was loaded from, and not to other domains.

The new standards to allow this kind of cross-site resource usage are called [Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS) or CORS.

In its simplest form the server needs to explicitly allow other domains to access its resources via the `Access-Control-Allow-Origin` HTTP header.

### Interaction patterns

1. Starting with the fist Ajax implementations, the norm was to only execute an action in the client once the server responded with some kind of "OK" status. With the consequence that the async nature of the application was obvious o the user because of the resulting delay. This requires the use of throbbers to indicate an ongoing network operation, while the user waits for feedback. If something goes wrong an error message needs to be shown to the user.

2. A more modern pattern, in the spirit of user-centered Design, is to immediately execute the desired action in the frontend. Not having to deal with errors is the expected case after all. In the exceptional case of an error we can roll back to the previous state. In this pattern a throbber and error message isn't always necessary, but may still be useful. Because in some cases we can just expect the user to try again, with a better chance of success.

### XMLHttpRequest

The current API for making async requests in the browser is a native version of `XMLHttpRequest`, which is often abbreviated to *XHR*. Unknown at first it started gaining traction when Google based its new Gmail application on it. Originally a Microsoft API, it was adopted by Mozilla, Apple, and Google and later standardized by the W3C. It's not pretty.

Here is a very simple example of 'classic' XHR for modern browsers (IE7+).
```js
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
	if (4 === xhr.readyState) {
		if (httpRequest.status === 200) {
			alert(httpRequest.responseText);
		} else {
			alert('There was a problem with the request.');
		}
	}
};
xhr.open('GET', url);
xhr.send();
```

The xhr object exposes the state of the request in the readyState property. A callback can be registered for `onreadystatechange` events.

Handling all kinds of requests we typically want to be able to make (e.g. HTTP methods, sending data, setting headers), with all the possible failure modes (e.g. server or security errors, timeouts, malformed data, unstable connections) in all the different browsers (especially old IE versions) is an overwhelming task and almost nobody uses the `XMLHttpRequest` API directly.

The fact that early DOM libraries like Prototype and later jQuery which wrapped the browser XHR APIs and simplified Ajax implementations was a big boost for those libraries on one hand and for Ajax on the other hand. Nowadays de-facto standard for XHR usage in the browser is jQuery.ajax.

**Exercise**

Live-code a clean Ajax app together  
Result: Todo

### jQuery.ajax

...

#### Content negotiation

...

## WebSocket

In the Ajax model every client server interaction is a classic request-response interaction initiated by the client. This model has its limits:

- server cannot initiate a message to communicate a server event
- every request opens a new connection first, which takes time and resources

This makes it hard to build real-time applications (like online games) using Ajax. Historically the workaround for these problems has been *long-polling*, where every client checks the server for updates in a pre-defined interval.

WebSocket is a new protocol on top of TCP that enables full bi-directional, always-on communication between clients and a server. Since it is a relatively new and also somewhat complex API, frameworks have sprung up to simplify WebSocket-style communication for different platforms, including older browsers. The most well-known of which is [Socket.io](http://socket.io) based on Node.js.

To get a feel for Socket.io and WebSocket in general, I recommend playing with the [Get Started: Chat application](http://socket.io/get-started/chat/). It's quite easy to use.
