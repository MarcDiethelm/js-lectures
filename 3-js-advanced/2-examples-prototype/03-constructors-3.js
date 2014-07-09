function Person(name, surname, age) {
	this.name = name;
	this.surname = surname;
	this.fullname = function() {
		return this.name +' '+ this.surname;
	}
}

// Not setting Person.prototype: it will be an empty object, which in turn inherits from Object.prototype

function Worker(name, surname, projects) {
	this.base = Person; // create a method, holding the Person constructor
	this.base(name, surname); // invoke Person in the Worker context, sets the Person properties here
	this.projects = projects || [];
}
Worker.prototype = new Person; // Set up the prototype chain, provides dynamic inheritance


function Manager(name, surname, projects) {
	//this.base = Worker;
	//this.base(name, surname);
	// don't create method, same effect:
	Worker.call(this, name, surname, projects); // Invoke Worker but set `this` to the local `this`
	this.computer = 'pc';
}
Manager.prototype = new Worker;


function Engineer(name, surname, projects, computer) {
	Worker.call(this, name, surname, projects);
	this.computer = computer || 'mac';
}
Engineer.prototype = new Worker;


var john = new Engineer('John', 'Resig', ['jQuery', 'Processing.js']);
var jamie = new Worker('Jamie', 'Oliver', ['Cooking']);
var gwynne = new Manager('Gwynne', 'Shotwell', ['SpaceX']);

//// Working with instanced objects

console.log(1, john instanceof Engineer); // => true
console.log(2, john instanceof Worker); // => true
console.log(3, john instanceof Person); // => true
console.log(4, john instanceof Object); // => true

console.log(5, john.fullname()); // => 'John Resig'
console.log(6, john.computer); // => 'mac'
console.log(7, gwynne.fullname()); // => 'Gwynne Shotwell'

Manager.prototype.payBonus = true;
console.log(8, gwynne.payBonus); // => true

gwynne.mood = 'happy';

Person.prototype.mood = 'neutral';
console.log(9, gwynne.hasOwnProperty('mood')); // => true
console.log(10, gwynne.mood); // => 'happy'

console.log(11, john.hasOwnProperty('mood')); // => false
console.log(12, john.mood); // => 'neutral'
