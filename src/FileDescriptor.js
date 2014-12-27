/* Generic Node.js FileSystem Library */
"use strict";

var debug = require('nor-debug');
var FUNCTION = require('nor-function');
var ARRAY = require('nor-array');
var extend = require('nor-extend');
var bindings = require('./qfs.js');

/** FileDescriptor constructor */
function FileDescriptor(fd) {
	if(!fd) { throw new TypeError('Missing required option fd'); }
	this.fd = fd;
}

/** Get internal value of FD */
FileDescriptor.prototype.valueOf = function() {
	return this.fd;
};

/* Setup methods */

/* These are functions which use FileDescriptors (fs.FOO(fd, ...)) and will return single arguments and therefore should return it instead */
ARRAY(['fstat']).forEach(function(key) {
	if(bindings[key] === undefined) {
		debug.warn('bindings.' + key + ' for FileDescriptor is missing! Skipped it.');
		return;
	}
	FileDescriptor.prototype[key] = function() {
		var self = this;
		var args = Array.prototype.slice.call(arguments);
		var p = FUNCTION(bindings[key]).apply(bindings, [self.fd].concat(args) );
		return extend.promise(FileDescriptor, p);
	};
});

/* These are functions which use FileDescriptors (bindings.FOO(fd, ...)) and will return single object {written:...,bytesRead:..., buffer:...} and therefore should return extended object */
ARRAY(['write', 'read']).forEach(function(key) {
	if(bindings[key] === undefined) {
		debug.warn('bindings.' + key + ' for FileDescriptor is missing! Skipped it.');
		return;
	}
	FileDescriptor.prototype[key] = function() {
		var self = this;
		var args = Array.prototype.slice.call(arguments);
		var p = FUNCTION(bindings[key]).apply(bindings, [self.fd].concat(args) );
		p = p.then(function(obj) {
			return extend.object(self, obj);
		});
		return extend.promise(FileDescriptor, p);
	};
});

/* These are functions which use FileDescriptors (bindings.FOO(fd, ...)) and will not return anything and therefore should return instance of FileDescriptor */
ARRAY(['fsync', 'futimes', 'ftruncate', 'fchown', 'fchmod', 'close']).forEach(function(key) {
	if(bindings[key] === undefined) {
		debug.warn('bindings.' + key + ' for FileDescriptor is missing! Skipped it.');
		return;
	}
	FileDescriptor.prototype[key] = function() {
		var self = this;
		var args = Array.prototype.slice.call(arguments);
		var p = FUNCTION(bindings[key]).apply(bindings, [self.fd].concat(args) );
		p = p.then(function() { return self; });
		return extend.promise(FileDescriptor, p);
	};
});

/* These are aliases like FileDescriptor.f<FOO>'s as FileDescriptor.<FOO> */
ARRAY(['utimes', 'sync', 'truncate', 'chown', 'chmod', 'stat']).forEach(function(key) {
	if(FileDescriptor.prototype['f'+key] === undefined) {
		debug.warn('FileDescriptor.prototype.f' + key + ' is missing! Skipped it.');
		return;
	}
	if(FileDescriptor.prototype[key] !== undefined) {
		debug.warn('FileDescriptor.prototype.' + key + ' is defined already! Skipped it.');
		return;
	}
	FileDescriptor.prototype[key] = FileDescriptor.prototype['f'+key];
});

// Exports
module.exports = FileDescriptor;

/* EOF */
