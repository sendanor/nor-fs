/* Generic Node.js FileSystem Library */
"use strict";

var util = require('util');
var FS = require('fs');

/** SyncFileDescriptor constructor */
function SyncFileDescriptor(fd) {
	if(!fd) { throw new TypeError('Missing required option fd'); }
	this.fd = fd;
}

/** Get internal value of FD */
SyncFileDescriptor.prototype.valueOf = function() {
	return this.fd;
};

/* Setup methods */

/* These are functions which use file descriptors as (fs.FOO(fd, ...)) and will return single arguments and therefore should return it instead */
['fstat', 'write', 'read'].forEach(function(key) {
	if(FS[key+'Sync'] === undefined) {
		console.warn('Warning! fs.' + key + 'Sync is missing! Skipped it.');
		return;
	}
	SyncFileDescriptor.prototype[key] = function() {
		var self = this;
		var args = Array.prototype.slice.call(arguments);
		return FS[key+'Sync'].apply(FS, [self.fd].concat(args) );
	};
});

/* These are functions which use SyncFileDescriptors (FS.FOO(fd, ...)) and will not return anything and therefore should return instance of SyncFileDescriptor */
['fsync', 'futimes', 'ftruncate', 'fchown', 'fchmod', 'close'].forEach(function(key) {
	if(FS[key+'Sync'] === undefined) {
		console.warn('Warning! fs.' + key + 'Sync is missing! Skipped it.');
		return;
	}
	SyncFileDescriptor.prototype[key] = function() {
		var self = this;
		var args = Array.prototype.slice.call(arguments);
		var ret = FS[key+'Sync'].apply(FS, [self.fd].concat(args) );
		if(ret !== undefined) {
			console.warn('Warning! fs.' + key + 'Sync returned with ' + util.inspect(ret) + ' instead of undefined');
		}
		return self;
	};
});

/* These are aliases like SyncFileDescriptor.f<FOO>'s as SyncFileDescriptor.<FOO> */
['utimes', 'sync', 'truncate', 'chown', 'chmod', 'stat'].forEach(function(key) {
	if(SyncFileDescriptor.prototype['f'+key] === undefined) {
		console.warn('Warning! SyncFileDescriptor.prototype.f' + key + ' is missing! Skipped it.');
		return;
	}
	if(SyncFileDescriptor.prototype[key] !== undefined) {
		console.warn('Warning! SyncFileDescriptor.prototype.' + key + ' is defined already! Skipped it.');
		return;
	}
	SyncFileDescriptor.prototype[key] = SyncFileDescriptor.prototype['f'+key];
});

// Exports
module.exports = SyncFileDescriptor;

/* EOF */
