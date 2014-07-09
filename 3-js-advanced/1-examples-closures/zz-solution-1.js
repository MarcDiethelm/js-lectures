// Exercise 1
// Again write code that counts from 0 to 50 and logs the numbers to the console. But now wait for 0.1s between each
// number. Oh, and don't use any global variables!

// There are quite a few variations to the solution, but they all involve recursion (a function calling itself), while
// using the outer scope for counting.
// The solution here uses a counter variable in an outer function to keep the counting function 'private'.

(function() {

	var count = 0;

	(function countDelayed() {
		console.log(count);
		count++;
		if (count > 50) return;
		setTimeout(countDelayed, 100);
	})();

})();

// Without using an outer function.

(function countDelayed(_count) {
	var count = _count || 0;
	console.log(count);
	count++;
	if (count > 50) return;
	setTimeout(function() {
		countDelayed(count);
	}, 100);
})();