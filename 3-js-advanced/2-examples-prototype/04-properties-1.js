var obj = {
	str: 'blue',
	func: function() {
		return string;
	}
};
var key;

for (key in obj) {
	console.log(key, typeof obj[key], obj[key]);
}
