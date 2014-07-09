var person = Object.create({});
person.fingers = 10;
var individual = Object.create(person);
individual.gender = 'female';
console.log(individual.fingers, individual.gender); // => 10 female
console.log(individual.hasOwnProperty('fingers')); // => false