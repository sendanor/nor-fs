/* Generic Node.js FileSystem Library */
"use strict";

var debug = require('nor-debug');
var FUNCTION = require('nor-function');
var ARRAY = require('nor-array');
var extend = require('nor-extend');
var bindings = require('./qfs.js');
var FileDescriptor = require('./FileDescriptor.js');

/** FilePath constructor */
function FilePath(name) {
	if(!name) { throw new TypeError('Missing required argument'); }
	this.name = name;
}

/** Get internal value of path */
FilePath.prototype.valueOf = function() {
	return ''+this.name;
};

/* Setup methods */

/* These functions when called successfully will return single FD and therefore should return instance of FileDescriptor */
ARRAY(['open']).forEach(function(key) {
	if(bindings[key] === undefined) {
		debug.warn('bindings.' + key + ' for FilePath is missing! Skipped it.');
		return;
	}
	FilePath.prototype[key] = function() {
		var self = this;
		var args = Array.prototype.slice.call(arguments);
		var p = FUNCTION(bindings[key]).apply(bindings, [self.name].concat(args) );
		p = p.then(function(fd) {
			return new FileDescriptor(fd);
		});
		return extend.promise( FileDescriptor, p);
	};
});

/* These are functions which use paths (fs.FOO(path, ...)) and will return single argument and therefore should return it instead */
ARRAY(['stat', 'lstat', 'readlink', 'realpath', 'readdir', 'exists', 'readFile']).forEach(function(key) {
	if(bindings[key] === undefined) {
		debug.warn('bindings.' + key + ' for FilePath is missing! Skipped it.');
		return;
	}
	FilePath.prototype[key] = function() {
		var self = this;
		var args = Array.prototype.slice.call(arguments);
		var p = FUNCTION(bindings[key]).apply(bindings, [self.name].concat(args) );
		return extend.promise(FilePath, p);
	};
});

/* These are functions which use paths (fs.FOO(path, ...)) and will not return anything and therefore should return instance of FilePath */
ARRAY(['rename', 'truncate', 'chown', 'lchown', 'chmod', 'lchmod', 'link', 'symlink',
 'unlink', 'rmdir', 'mkdir', 'utimes', 'writeFile', 'appendFile', 'unlinkIfExists', 'rmdirIfExists', 'mkdirIfMissing'
]).forEach(function(key) {
	if(bindings[key] === undefined) {
		// lchmod and lchown are only available on Mac OS X
		if(['lchmod', 'lchown'].indexOf(key) < 0) {
			debug.warn('bindings.' + key + ' for FilePath is missing! Skipped it.');
		}
		return;
	}
	FilePath.prototype[key] = function() {
		var self = this;
		var args = Array.prototype.slice.call(arguments);
		var p = FUNCTION(bindings[key]).apply(bindings, [self.name].concat(args) );
		p = p.then(function() {
			/*
			// FIXME: Should we rename the name of Path after rename() ?
			if(key === 'rename') {
				self.name = args[0];
			}
			*/
			return self;
		});
		return extend.promise(FilePath, p);
	};
});

// Exports
module.exports = FilePath;

/* EOF */
