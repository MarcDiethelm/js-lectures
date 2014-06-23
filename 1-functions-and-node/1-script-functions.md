# JS Functions revisited

## Function declaration

Functions are **code blocks** that can be repeatedly **called** or "invoked" as required.

- A function is declared with the `function` keyword.  
- A function declaration defines a function's **parameters**, variables that are passed into the function when the function is called. Parameters are positional.  
- A function always **returns** a value. The return value can be set with the `return` keyword. If not set the value is the `undefined` value.
- The return value can be assigned to a variable.



```js
function myFunc(a, b) {
  return a + b;
}
myFunc(2, 4) === 6 // true
var c = myFunc(2, 4); // assign to a new variable
```

### Function expression

Functions can be assigned to variables and returned by other functions.

```js
var fn = function foo() {
  return 2;
};
fn(); // => 2

var fn2 = function getFn() {
  return fn;
}

fn2()() // => 2
```

Of course function can call other functions, including themselves.

### Anonymous functions

So far we have only seen **named functions**. But a function can be defined without naming it.

```js
var fn = function() {}; // function expression

(function() {
  var privateValue = 'private';
})();
```

The second function is an example of an *IIFE*, an *immediately invoked function expression*. It is used for encapsulation and has to do with function scope.


## Function scope

Functions have a **local execution context** aka scope.  
Variables declared in a function are local to the function.

```js
var word = 'bar';

function speak() {
  var word = 'baz';
  return word;
}
speak() // eval => 'baz'
word // eval => 'bar'
```

Function arguments (the value of function params) are implicit var declarations.

```js
var word = 'bar';

function speak(word) { // implicit local `var word = bar`
  word = 'baz'; // overwrite local `word`
  return word;
}
speak(word) // => 'baz'
eval(word) // => 'bar'
```

### Hoisting

It's important to note that variable declarations are *hoisted*, meaning they are always executed first.

```js
var myvar = 'global variable';

function func() {
    console.log(myvar);   // => undefined
    var myvar = 'local variable';
    console.log(myvar); // => 'local variable'
}
func();
```

JS behaves as if you had written it like this:

```js
function func() {
  var myvar; // same as: var myvar = undefined
  console.log(myvar);
  myvar = "local variable";
  console.log(myvar);
}
```

Best practice: *Always declare your variables first!*


### Nested functions

In JavaScript functions can be nested, meaning functions can be defined inside other functions.

Variables that are declared in an outer function and used in an inner function are inherited and non-local to the inner function.

```js
function initPost() {
    var score = 42;

    function upvote() {
        score++;
    }
    upvote();
    console.log(score) // => 43
}
initPost();
```


## Callbacks

Functions can be passed to other functions as parameters.

```js
function myFunc(a, b, fn) {
    fn(a + b);
}

myFunc(2, 4, console.log);
```

This should be familiar from typical jQuery examples.

```js
$('button').on('click', function(ev) {
  // callback function, only called WHEN there is an event
});
```

## Links

- Functions and function scope
  - https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions_and_function_scope
- IIFE (and closures)
    - http://benalman.com/news/2010/11/immediately-invoked-function-expression/
- Hoisting  
  - http://www.kenneth-truyers.net/2013/04/20/javascript-hoisting-explained/
