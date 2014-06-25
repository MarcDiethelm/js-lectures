// Exercise 1
// Write a program that logs all integer numbers from 0 to 50 using only functions without
// using an array or a loop (`for`, `while`).

// There are quite a few variations to the solution, but they all involve recursion (a function calling itself), while
// using the outer scope for counting.
// The solutions here use the global scope. You could easily wrapp them in an outer function, to keep the counting function private.

var count = 0;

function solution1a() {
	console.log(count);
	if (count !== 50) {
		count = count + 1;
		solution1a();
	}
}

//solution1a();

// Or better

var countB = 0;

function solution1b() {
	console.log(countB);
	countB = countB + 1;
	if (countB > 50) { return; }
	solution1b();
}

solution1b();

// Or a little more shorthand ;)

var i = 0;

(function solution1c() {
	console.log(i++); // increments i by 1, but evaluates to i
	i > 50 || solution1c();
})();

