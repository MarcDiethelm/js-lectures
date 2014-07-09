var getPost;

(function() {
	var cache = {};

	getPost = function(id) {
		if (!cache[id]) {
			// Get the post from a backend. Not shown here.
			return cache[id] = 'This is Post #' + id;
		}
		else {
			return cache[id] + ' (cached)';
		}
	};
})();

// calling getPost in the global context
console.log(getPost(42));
console.log(getPost(42));