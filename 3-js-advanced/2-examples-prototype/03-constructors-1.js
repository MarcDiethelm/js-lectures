function Person(fingers) {
	this.fingers = fingers || 10;
}

Person.prototype = {
	toes: 10
};

var individual1 = new Person;
var individual2 = new Person(9);

console.log(individual1.fingers, individual1.toes); // => 10 10
console.log(individual2.fingers, individual2.toes); // => 9 10