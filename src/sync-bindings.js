/* Generic Node.js FileSystem Library */
"use strict";

var FUNCTION = require('nor-function');
var ARRAY = require('nor-array');
var NODE_FS = require('fs');
var OUR_FS = require('./our-sync-calls.js');

var FS = {};
ARRAY(Object.keys(NODE_FS)).filter(function(key) { return key.substr(key.length-4) === 'Sync'; }).forEach(function(key) {
	FS[key] = function() {
		var args = Array.prototype.slice.call(arguments);
		return FUNCTION(NODE_FS[key]).apply(NODE_FS, args);
	};
});

ARRAY(Object.keys(OUR_FS)).forEach(function(key) {
	FS[key] = function() {
		var args = Array.prototype.slice.call(arguments);
		return FUNCTION(OUR_FS[key]).apply(OUR_FS, args);
	};
});

// Exports
module.exports = FS;

/* EOF */
