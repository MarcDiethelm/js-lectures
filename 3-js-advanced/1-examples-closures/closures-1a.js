function outer(a) {

	return function() {
		return a;
	};
}

var inner = outer(42);
console.log( inner() ); // => 42