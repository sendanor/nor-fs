/* Generic Node.js FileSystem Library */
"use strict";

var NODE_FS = require('fs');
var OUR_FS = require('./our-sync-calls.js');

var FS = {};
Object.keys(NODE_FS).filter(function(key) { return key.substr(key.length-4) === 'Sync'; }).forEach(function(key) {
	FS[key] = function() {
		var args = Array.prototype.slice.call(arguments);
		return NODE_FS[key].apply(NODE_FS, args);
	};
});

Object.keys(OUR_FS).forEach(function(key) {
	FS[key] = function() {
		var args = Array.prototype.slice.call(arguments);
		return OUR_FS[key].apply(OUR_FS, args);
	};
});

// Exports
module.exports = FS;

/* EOF */
