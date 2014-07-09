// primitive
var string = 'blue';
// object
var object = {};

console.log(typeof object.toString); // => function
console.log(typeof object.valueOf); // => function
console.log(typeof string.length); // => number (when accessing a primitive like an object, it is converted to object to get a result)