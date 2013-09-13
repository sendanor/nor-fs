/* Generic Node.js FileSystem Library */
"use strict";

var util = require('util');
var FS = require('fs');
var fs = {};

/** Unlink the path if it exists, otherwise do nothing. */
fs.unlinkIfExistsSync = function() {
	var args = Array.prototype.slice.call(arguments);
	if(!FS.existsSync(args[0])) { return; }
	FS.unlinkSync.apply(FS, args);
};

/** Rmdir the path if it exists, otherwise do nothing. */
fs.rmdirIfExistsSync = function() {
	var args = Array.prototype.slice.call(arguments);
	if(!FS.existsSync(args[0])) { return; }
	FS.rmdirSync.apply(FS, args);
};

/** Create empty file in the path it is missing, otherwise do nothing. */
//fs.createIfMissingSync = function(path, mode) {
//	if(FS.existsSync(path)) { return; }
//	FS.writeFileSync(path, "");
//};

/** Mkdir the path if it is missing, otherwise do nothing. */
fs.mkdirIfMissingSync = function() {
	var args = Array.prototype.slice.call(arguments);
	if(FS.existsSync(args[0])) { return; }
	FS.mkdirSync.apply(FS, args);
};

// Exports
module.exports = fs;

/* EOF */
