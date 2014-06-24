function initPost() {
	var score = 42;

	function upvote() {
		score++;
	}
	upvote();
	console.log(score) // => 48

}
initPost();