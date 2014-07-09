var person = Object.create({});
var individual = Object.create(person);

person.toes = 10;
console.log(individual.toes); // => 10