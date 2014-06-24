var word = 'bar';

function speak() {
  var word = 'baz';
  return word;
}
console.log(speak()) // => 'baz'
console.log(word) // => 'bar'