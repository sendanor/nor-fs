/* Generic Node.js Database Library */
"use strict";

var fs = require('./index.js');
var Q = require('q');
var extend = require('extend');
var bindings = require('./qfs.js');

/** FileDescriptor constructor */
function FileDescriptor(fd) {
	if(!fd) { throw new TypeError('Missing required option fd'); }
	this.fd = fd;
}

/* Setup methods */

/* There are functions which use FileDescriptors (fs.FOO(fd, ...)) and will return single arguments and therefore should return it instead */
['fstat'].forEach(function(key) {
	if(bindings[key] === undefined) {
		console.warn('Warning! Bindings for ' + key + ' are missing! Skipped it.');
		return;
	}
	FileDescriptor.prototype[key] = function() {
		var self = this;
		var args = Array.prototype.slice.call(arguments);
		var p = bindings[key].apply(bindings, [self.id].concat(args) );
		return extend.promise(FileDescriptor, p);
	};
});

/* There are functions which use FileDescriptors (bindings.FOO(fd, ...)) and will return single object {written:...,bytesRead:..., buffer:...} and therefore should return extended object */
['write', 'read'].forEach(function(key) {
	if(bindings[key] === undefined) {
		console.warn('Warning! Bindings for ' + key + ' are missing! Skipped it.');
		return;
	}
	FileDescriptor.prototype[key] = function() {
		var self = this;
		var args = Array.prototype.slice.call(arguments);
		var p = bindings[key].apply(bindings, [self.id].concat(args) );
		p.then(function(obj) {
			return extend.object(self, obj);
		});
		return extend.promise(FileDescriptor, p);
	};
});

/* There are functions which use FileDescriptors (bindings.FOO(fd, ...)) and will not return anything and therefore should return instance of FileDescriptor */
['fsync', 'futimes', 'ftruncate', 'fchown', 'fchmod', 'close'].forEach(function(key) {
	if(bindings[key] === undefined) {
		console.warn('Warning! Bindings for ' + key + ' are missing! Skipped it.');
		return;
	}
	FileDescriptor.prototype[key] = function() {
		var self = this;
		var args = Array.prototype.slice.call(arguments);
		var p = bindings[key].apply(bindings, [self.id].concat(args) );
		p.then(function() { return self; });
		return extend.promise(FileDescriptor, p);
	};
});

/* These are aliases like FileDescriptor.f<FOO>'s as FileDescriptor.<FOO> */
['utimes', 'sync', 'truncate', 'chown', 'chmod', 'stat'].forEach(function(key) {
	if(FileDescriptor.prototype[key] === undefined) {
		console.warn('Warning! FileDescriptor.prototype.' + key + ' is missing! Skipped it.');
		return;
	}
	FileDescriptor.prototype[key] = FileDescriptor.prototype['f'+key];
});

// Exports
module.exports = FileDescriptor;

/* EOF */
