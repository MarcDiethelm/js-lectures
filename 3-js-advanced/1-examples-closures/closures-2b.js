// Execute something with a delay

function speak(words) {
	console.log(words);
}

function speakLater(words) {
	 // setTimeout requires a function as its first parameter
	setTimeout(function() { // closure
		speak(words);
	}, 1000);
}

speakLater('hello world'); // => 'hello world'