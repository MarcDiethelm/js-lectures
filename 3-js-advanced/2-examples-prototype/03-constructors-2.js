var Person = function Person(data) {

	//////////////////////////////////////////
	// "private" variables and functions
	// only accessible to "privileged" methods: invoke, read, write

	var firstName = data.firstName;
	var lastName = data.lastName;

	var addPartnerLastName = function(partnerLastName) {
		lastName = lastName +'-'+ partnerLastName;
	};


	//////////////////////////////////////////
	// "privileged" methods
	// locally defined
	// have access to "private" objects via closure
	// public access: invoke, replace but not edit (view?)

	this.marry = function(partnerLastName) {
		addPartnerLastName(partnerLastName);
	};

	this.getName = function() {
		return firstName +' '+ lastName;
	};


	//////////////////////////////////////////
	// "public" objects
	// public access: read, write

	this.legs = 2;
};


//////////////////////////////////////////
// Prototype properties
// shared by all instances, unless overwritten by instance
// public access: invoke, read, write

Person.prototype = {
	mood: 'neutral',
	socialize: function() {
		this.mood = 'happy';
	}
};

Person.prototype.cyborgify = function() {
	this.legs = this.legs + 1;
};


//////////////////////////////////////////
// "Static" properties
// public access: invoke, read, write

Person.isHuman = true;

var marc = new Person('Marc', 'Diethelm');

//////////////////////////////////////////

/**
 * What's found where
 *
 * Person.prototype (== marc.__proto__)
 * =============================================
 * this.mood
 * ---------------------------------------------
 * this.socialize
 * ---------------------------------------------
 * this.cyborgify
 * ---------------------------------------------
 *                      ^
 *                      | .__proto__
 * instance (marc)      |
 * =============================================
 * closure provides:
 * data, firstName, lastName, addPartnerLastName
 * ---------------------------------------------
 * this.marry
 * ---------------------------------------------
 * this.getName
 * ---------------------------------------------
 * this.legs
 * =============================================
 */
marc