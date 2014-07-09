Objects and Prototypes
======================

In JavaScript everything is an object or a primitive value.

Objects are collections of properties as keys and values. A property can reference another object or a primitive. For simplicity let's pretend that everything is an object.

```js
// 2-examples-prototype/01-literals-1.js

// js primitives
var number = 5;
var string = 'blue';
var boolean = true;

// plain object
var object = {
	// key	: value
	number	: 5,
	string	: 'blue',
	boolean	: boolean
};

object.foo = 9;
console.log(object.foo) // => 9
console.log(object.bar) // => undefined
```

We can add properties to an object after it is created. Trying to read a property that does not exist evaluates to `undefined`.

However all the the objects have properties [we never assigned to them](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype#Properties).

```js
// 2-examples-prototype/01-literals-2.js

// primitive
var string = 'blue';
// object
var object = {};

console.log(typeof object.toString); // => function
console.log(typeof object.valueOf); // => function
console.log(typeof string.length); // => number (when accessing a primitive like an object, it is converted to object to get a result)
```
Where did those come from?


## Prototypes

Every JavaScript object also has a special additional attribute: a pointer to another object. This is called the object’s *prototype*. If you try to look up a key on an object and it is not found, JavaScript will look for it in the prototype. It it's not found there it will look in the prototypes' prototype. It will follow the “prototype chain” until the key is found, returning the value, or until the prototype is null instead of an object. In that case, it returns undefined.

In ECMAScript 5.1 (an official standardized version of JS) we can use [`Object.getPrototypeOf`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf) to go up the chain. Most browsers still support the `__proto__` property which does the same but is deprecated. To check if a property exists *directly* on an object we use [`obj.hasOwnProperty(propName)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty).

```js
// 2-examples-prototype/01-literals-3.js
var person = { fingers: 10 };

console.log(typeof person.toString); // => function
console.log(person.hasOwnProperty('toString')); // => false

console.log(Object.getPrototypeOf(person)); // => {}
console.log(person.__proto__); // => {}, same, but deprecated

console.log(Object.getPrototypeOf(person).hasOwnProperty('toString')); // => true, found it!
```

JavaScript automatically adds a prototype to the `person` object for us. But this also means that when using **literals** we have no control over what is added via the prototype chain.

```js
// examples of literals that create objects
function myFunc() {};
var obj = { a: 2 };
var arr = [2, 3, 5, 7];
```

**Note:** It's possible to change an object's prototype to another object after the object's creation. However this is very bad for performance and **should be avoided.**

Of course there are other methods of creating new objects which allow us to specify the prototype object. One of them, also available since ECMAscript 5.1, is the [`Object.create`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create) method.

### Prototypal inheritance

```js
// 2-examples-prototype/02-object-create-1.js
var person = Object.create({});
person.fingers = 10;
var individual = Object.create(person);
individual.gender = 'female';
console.log(individual.fingers, individual.gender); // => 10 female
console.log(individual.hasOwnProperty('fingers')); // => false
```

In this example `individual` inherits the `fingers` property from its `person` prototype. And because `person` was created using an object literal as its prototype we also inherited the `hasOwnProperty` method, which we saw before. `hasOwnProperty` of course proves that `taste` is a property defined further up in the prototype chain.


### Dynamic inheritance

A unique and useful feature of the prototype chain is that we can add properties on an object's prototype after the object is created. All objects using the prototype will have the property.

```js
// 2-examples-prototype/02-object-create-2.js
var person = Object.create(null);
var individual = Object.create(person);

person.toes = 10;
console.log(individual.toes); // => 10
```

**Exercise**: If you create an `apple` and `banana` object that use a `fruit` object as their prototype.
```
	fruit
  ┌───┴───┐
apple   banana
```
- Then on the `apple` object set a `color` property with value `'green'`.
- Then on the `fruit` object set a `color` property with value `'yellow'`.

Now, what's the value of `color` on `apple` and `banana`?  
<small>solution: 2-examples-prototype/02-object-create-exercise.js</small>

If the solution surprises you think about how JS searches for properties...


## Constructors

So clearly prototypes can be used for inheritance. The classic way to create objects in JS, is using constructors.
- Constructors are functions.
- Every function can be used as a constructor.
- Every function/constructor has a writeable `prototype` *property*.
- Constructors are called with the `new` keyword.
- The result is a new object, called an **instance** of the constructor.
- Inside the constructor and the new object `this` refers to the new object.

```js
// 2-examples-prototype/03-constructors-1.js
function Person(fingers) {
	this.fingers = fingers || 10;
}

Person.prototype = {
	toes: 10
};

var individual1 = new Person;
var individual2 = new Person(9);

console.log(individual1.fingers, individual1.toes); // => 10 10
console.log(individual2.fingers, individual2.toes); // => 9 10
```

**Note:** As a convention constructor names should always start with a capital letter.  
**A constructor's `prototype` property is not the same as `__proto__`!**. `prototype` defines the prototype of the new object. `__proto__` is the prototype of the constructor **function**.

Let's take another look.

```js
// 2-examples-prototype/03-constructors-1b.js
function Person() {} // constructor
Person.prototype = {}; // set up the prototype chain for new objects

var individual = new Person; // create object

console.log(individual instanceof Person); // => true
console.log(individual.__proto__ === Person.prototype); // => true
```

If we don't set the `prototype` property it defaults to an empty object. So in the example above we could leave out `Person.prototype = {};`.


##### Map of object relationships

![JavaScript objects treasure map](KFzI3.png)


### Built-in constructors

When we are using literals to create things like objects, arrays and functions JavaScript uses built-in (or "native") constructors to create them for us. However if we want we can call them ourselves.

```js
var obj = new Object;
var func = new Function('return 1 + 1');
var arr = new Array(2, 3, 5, 7, 11, 13, 17);
var err = new Error('oops');
```

You can’t delete or replace a native `prototype`, but you can edit the values of its properties, or create new ones. Don't do it, [unless you know what you're doing](http://sugarjs.com/native).


## Using it


### Constructor and function scope

How to create "private", "privileged" and "public" properties in Object instances:  
see: 2-examples-prototype/03-constructors-2.js


### Creating a complete inheritance chain

Setting up a complete inheritance chain of the following objects.
```
      Person
         │
       Worker
   ┌─────┴───────┐
Manager       Engineer
```
3-js-advanced/2-examples-prototype/03-constructors-3.js


### Enumeration and property attributes

It's possible to loop through the **enumerable** properties of an object.

```js
var obj = {
	str: 'blue',
	func: function() {
		return string;
	}
};
var key;

for (key in obj) {
	console.log(key, typeof obj[key], obj[key]);
}
```

Note that the inherited properties of `obj` like `toString` are not listed by this loop. This is because the inherited properties are not enumerable. Properties can have certain attributes that determine their behavior. Classic proprties that we create ourselves are always, **writable, enumerable and configurable**. To get more fine-grained control we need to use the new ECMAScript 5 methods like [`Object.defineProperty`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty).

Still the easiest, reliable way to check if a property exists is

```js
if (obj.prop !== undefined) {}
```


## Classes

The combination of a JS constructor and prototype can be called a class, event though the language has no concept of classes.

There are quite a few abstractions that try to make JavaScript inheritance more class-like. The most important one so far is John Resig's: [Simple JavaScript Inheritance](http://ejohn.org/blog/simple-javascript-inheritance/)



## Links

- JS prototypes & inheritance
	- http://yehudakatz.com/2011/08/12/understanding-prototypes-in-javascript/
	- http://blog.sklambert.com/javascript-prototype/
- JS objects compared to class-based inheritance & guide
	- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Details_of_the_Object_Model
- "private", "privileged" and "public" properties in Object instances
	- http://phrogz.net/js/classes/OOPinJS.html
- Object reference
	- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
