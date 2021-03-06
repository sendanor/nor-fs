/* Generic Node.js FileSystem Library */
"use strict";

var debug = require('nor-debug');
var FUNCTION = require('nor-function');
var ARRAY = require('nor-array');
var util = require('util');
var FS = require('./sync-bindings.js');
var SyncFileDescriptor = require('./SyncFileDescriptor.js');

/** SyncFileSystem module constructor */
function SyncFileSystem() {
}

/* Setup methods */

/* These are fs functions which do not return anything and therefore should return instance of SyncFileSystem instead */
ARRAY(['rename', 'ftruncate', 'truncate', 'chown', 'fchown', 'lchown',
 'chmod', 'fchmod', 'lchmod', 'link', 'symlink', 'unlink', 'rmdir', 
 'mkdir', 'close', 'utimes', 'fsync', 'futimes', 'writeFile', 'appendFile',
 'unlinkIfExists', 'rmdirIfExists', 'mkdirIfMissing'
]).forEach(function(key) {
	if(FS[key+'Sync'] === undefined) {
		// lchmod and lchown are only available on Mac OS X
		if(['lchmod', 'lchown'].indexOf(key) < 0) {
			debug.warn('fs.' + key + 'Sync is missing! Skipped it.');
		}
		return;
	}
	SyncFileSystem.prototype[key] = function() {
		var self = this;
		var args = Array.prototype.slice.call(arguments);
		var ret = FUNCTION(FS[key+'Sync']).apply(FS, args);
		if(ret !== undefined) {
			debug.warn('fs.' + key + ' returned with ' + util.inspect(ret) + ' instead of undefined');
		}
		return self;
	};
});

/* These functions when called successfully will return single object and therefore should return it */
ARRAY(['stat', 'lstat', 'fstat', 'readlink', 'realpath', 'readdir', 'readFile', 'exists', 'read', 'write']).forEach(function(key) {
	if(FS[key+'Sync'] === undefined) {
		debug.warn('FS.' + key + 'Sync is missing! Skipped it.');
		return;
	}
	SyncFileSystem.prototype[key] = FS[key+'Sync'].bind(FS);
});

/* These functions when called successfully will return single FD and therefore should return instance of SyncFileDescriptor */
ARRAY(['open']).forEach(function(key) {
	if(FS[key+'Sync'] === undefined) {
		debug.warn('FS.' + key + 'Sync is missing! Skipped it.');
		return;
	}
	SyncFileSystem.prototype[key] = function() {
		//var self = this;
		var args = Array.prototype.slice.call(arguments);
		var fd = FUNCTION(FS[key+'Sync']).apply(FS, args);
		return new SyncFileDescriptor(fd);
	};
});

// Exports
module.exports = SyncFileSystem;

/* EOF */
