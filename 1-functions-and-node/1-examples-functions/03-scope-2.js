var word = 'bar';

function speak(word) { // implicit local `var word = bar`
  word = 'baz'; // overwrite local `word`
  return word;
}
console.log(speak()) // => 'baz'
console.log(word) // => 'bar'