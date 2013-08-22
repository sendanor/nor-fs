/* Generic Node.js Database Library */
"use strict";

var FS = require('fs');
var Q = require('q');
var extend = require('extend');

/** FileDescriptor constructor */
function FileDescriptor(fd) {
	if(!fd) { throw new TypeError('Missing required option fd'); }
	this.fd = fd;
}

/* Setup methods */

/* There are functions which use FileDescriptors (bindings.FOO(fd, ...)) and will return single arguments and therefore should return it instead */
['fstat'].forEach(function(key) {
	FileDescriptor.prototype[key] = function() {
	});
});

/* There are functions which use FileDescriptors (bindings.FOO(fd, ...)) and will return two arguments (written|bytesRead, buffer) and therefore should return special object */
['write', 'read'].forEach(function(key) {
	FileDescriptor.prototype[key] = function() {
	});
});

/* There are functions which use FileDescriptors (bindings.FOO(fd, ...)) and will not return anything and therefore should return instance of FileDescriptor */
['fsync', 'futimes', 'ftruncate', 'fchown', 'fchmod', 'close'].forEach(function(key) {
	FileDescriptor.prototype[key] = function() {
	});
});


// Alias FileDescriptor.f<FOO>'s as FileDescriptor.<FOO>
['utimes', 'sync', 'truncate', 'chown', 'chmod', 'stat'].forEach(function(key) {
	FileDescriptor.prototype[key] = FileDescriptor.prototype['f'+key];
});

// Exports
module.exports = FileDescriptor;

/* EOF */
