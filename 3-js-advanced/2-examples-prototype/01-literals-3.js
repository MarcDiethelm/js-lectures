var person = { fingers: 10 };

console.log(typeof person.toString); // => function
console.log(person.hasOwnProperty('toString')); // => false

console.log(Object.getPrototypeOf(person)); // => {}
console.log(person.__proto__); // => {}, same, but deprecated

console.log(Object.getPrototypeOf(person).hasOwnProperty('toString')); // => true, found it!