/* Generic Node.js FileSystem Library */
"use strict";

var FS = require('fs');
var Q = require('q');
var extend = require('nor-extend');
var bindings = require('./qfs.js');
var FileDescriptor = require('./FileDescriptor.js');

/** FileSystem module constructor */
function FileSystem() {
}

/* Setup methods */

/* These are fs functions which do not return anything and therefore should return instance of FileSystem instead */
['rename', 'ftruncate', 'truncate', 'chown', 'fchown', 'lchown',
 'chmod', 'fchmod', 'lchmod', 'link', 'symlink', 'unlink', 'rmdir', 
 'mkdir', 'close', 'utimes', 'fsync', 'futimes', 'writeFile', 'appendFile',
 'unlinkIfExists', 'rmdirIfExists', 'mkdirIfMissing'
].forEach(function(key) {
	if(bindings[key] === undefined) {
		// lchmod and lchown are only available on Mac OS X
		if(['lchmod', 'lchown'].indexOf(key) < 0) {
			console.warn('Warning! bindings.' + key + ' is missing! Skipped it.');
		}
		return;
	}
	FileSystem.prototype[key] = function() {
		var self = this;
		var args = Array.prototype.slice.call(arguments);
		var p = bindings[key].apply(bindings, args);
		p = p.then(function() {
			return self;
		});
		return extend.promise( [FileSystem, FileDescriptor], p);
	};
});

/* These functions when called successfully will return single object and therefore should return it */
['stat', 'lstat', 'fstat', 'readlink', 'realpath', 'readdir', 'readFile', 'exists', 'read', 'write'].forEach(function(key) {
	if(bindings[key] === undefined) {
		console.warn('Warning! bindings.' + key + ' is missing! Skipped it.');
		return;
	}
	FileSystem.prototype[key] = function() {
		var self = this;
		var args = Array.prototype.slice.call(arguments);
		var p = bindings[key].apply(bindings, args);
		return extend.promise( [FileSystem, FileDescriptor], p);
	};
});

/* These functions when called successfully will return single FD and therefore should return instance of FileDescriptor */
['open'].forEach(function(key) {
	if(bindings[key] === undefined) {
		console.warn('Warning! bindings.' + key + ' is missing! Skipped it.');
		return;
	}
	FileSystem.prototype[key] = function() {
		var self = this;
		var args = Array.prototype.slice.call(arguments);
		var p = bindings[key].apply(bindings, args);
		p = p.then(function(fd) {
			return new FileDescriptor(fd);
		});
		return extend.promise( FileDescriptor, p);
	};
});

// Exports
module.exports = FileSystem;

/* EOF */
