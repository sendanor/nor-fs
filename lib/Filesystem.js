/* Generic Node.js Database Library */
"use strict";

var FS = require('fs');
var Q = require('q');
var extend = require('extend');
var bindings = require('./qfs.js');

var callback_types

/** Filesystem module constructor */
function Filesystem() {
}

/* Setup methods */

/* These are fs functions which do not return anything and therefore should return instance of Filesystem instead */
['rename', 'ftruncate', 'truncate', 'chown', 'fchown', 'lchown',
 'chmod', 'fchmod', 'lchmod', 'link', 'symlink', 'unlink', 'rmdir', 
 'mkdir', 'close', 'utimes', 'fsync', 'futimes', 'writeFile', 'appendFile'].forEach(function(key) {
	if(bindings[key] === undefined) {
		console.warn('Warning! Bindings for ' + key + ' are missing! Skipped it.');
		return;
	}
	Filesystem.prototype[key] = function() {
		var self = this;
		var args = Array.prototype.slice.call(arguments);
		var p = bindings[key].apply(bindings, args);
		p.then(function() {
			return self;
		});
		return extend.promise( Filesystem, p);
	};
});

/* These are functions which will -- when successful -- return single object and therefore should return it instead of Filesystem instance */
['stat', 'lstat', 'fstat', 'readlink', 'realpath', 'readdir', 'readFile', 'exists'].forEach(function(key) {
	if(bindings[key] === undefined) {
		console.warn('Warning! Bindings for ' + key + ' are missing! Skipped it.');
		return;
	}
	Filesystem.prototype[key] = function() {
		var self = this;
		var args = Array.prototype.slice.call(arguments);
		var p = bindings[key].apply(bindings, args);
		p.then(function() {
			return self;
		});
		return extend.promise( Filesystem, p);
	};
});

/* These are functions which will -- when successful -- return single FD and therefore should return instance of FileDescriptor */
['open']

/* There are functions which use FileDescriptors (bindings.FOO(fd, ...)) and will return single arguments and therefore should return it instead */
['fstat']

/* There are functions which use FileDescriptors (bindings.FOO(fd, ...)) and will return two arguments (written|bytesRead, buffer) and therefore should return special object */
['write', 'read']

/* There are functions which use FileDescriptors (bindings.FOO(fd, ...)) and will not return anything and therefore should return instance of FileDescriptor */
['fsync', 'futimes', 'ftruncate', 'fchown', 'fchmod', 'close']


// Alias FileDescriptor.futimes as FileDescriptor.utimes
// Alias FileDescriptor.fsync as FileDescriptor.sync
// Alias FileDescriptor.ftruncate as FileDescriptor.truncate
// Alias FileDescriptor.fchown as FileDescriptor.chown
// Alias FileDescriptor.fchmod as FileDescriptor.chmod
// Alias FileDescriptor.fstat as FileDescriptor.stat

// Exports
module.exports = Filesystem;

/* EOF */
