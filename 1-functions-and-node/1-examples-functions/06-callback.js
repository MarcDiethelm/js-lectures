function myFunc(a, b, fn) {
	fn(a + b);
}

myFunc(2, 4, console.log);