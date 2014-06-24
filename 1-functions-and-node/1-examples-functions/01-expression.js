// 1-functions/01-expression.js
var fn = function foo() {
  return 2;
};
fn(); // => 2

var fn2 = function getFn() {
  return fn;
}

console.log(fn2()()) // => 2