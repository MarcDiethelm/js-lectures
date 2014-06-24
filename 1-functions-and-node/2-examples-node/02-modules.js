// Requiring custom module posts.js in the current directory
var config = { postName: 'Post' };
var posts = require('./posts')(config);
console.log(posts.get('42'));