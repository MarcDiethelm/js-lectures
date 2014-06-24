module.exports = function(config) {
	return {
		get: function(id) {
			return config.postName + ' ' + id;
		}
	}
};