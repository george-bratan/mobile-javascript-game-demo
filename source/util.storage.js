goog.provide('util.storage');


util.storage.set = function(name, value) {
	//
	//console.log(name + ' <= ' + value);
	window.localStorage.setItem(name, value);
}

util.storage.get = function(name) {
	//
	//console.log(name + ' => ' + window.localStorage.getItem(name));
	return window.localStorage.getItem(name);
}

util.storage.remove = function(name) {
	//
	window.localStorage.removeItem(name);
}

util.storage.clear = function() {
	//
	window.localStorage.clear();
}