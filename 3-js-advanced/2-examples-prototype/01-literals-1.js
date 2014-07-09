var number = 5;
var string = 'blue';
var boolean = true;

// plain object
var obj = {
	number: 5,
	string: 'blue',
	boolean: boolean
};

obj.foo = 9;
console.log(obj.foo); // => 9
console.log(obj.bar); // => undefined