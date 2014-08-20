// Exercise 2
// Write a module that you can pass a filename. Use the filename to create a file with fs.writeFile, then read it, then delete it.

var file = require('./file.js');

file('foo.txt', 'Hello World!');