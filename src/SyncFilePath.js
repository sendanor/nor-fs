/* Generic Node.js FileSystem Library */
"use strict";

var debug = require('nor-debug');
var FUNCTION = require('nor-function');
var ARRAY = require('nor-array');
var fs = require('./sync-bindings.js');
var SyncFileDescriptor = require('./SyncFileDescriptor.js');

/** SyncFilePath constructor */
function SyncFilePath(name) {
	if(!name) { throw new TypeError('Missing required argument'); }
	this.name = name;
}

/** Get internal value of path */
SyncFilePath.prototype.valueOf = function() {
	return ''+this.name;
};

/* Setup methods */

/* These functions when called successfully will return single FD and therefore should return instance of SyncFileDescriptor */
ARRAY(['open']).forEach(function(key) {
	if(fs[key+'Sync'] === undefined) {
		debug.warn('fs.' + key + 'Sync for SyncFilePath is missing! Skipped it.');
		return;
	}
	SyncFilePath.prototype[key] = function() {
		var self = this;
		var args = Array.prototype.slice.call(arguments);
		var fd = FUNCTION(fs[key+'Sync']).apply(fs, [self.name].concat(args) );
		return new SyncFileDescriptor(fd);
	};
});

/* These are functions which use paths (fs.FOO(path, ...)) and returns single value and therefore should return it instead */
ARRAY(['stat', 'lstat', 'readlink', 'realpath', 'readdir', 'exists', 'readFile']).forEach(function(key) {
	if(fs[key+'Sync'] === undefined) {
		debug.warn('fs.' + key + 'Sync for SyncFilePath is missing! Skipped it.');
		return;
	}
	SyncFilePath.prototype[key] = function() {
		var self = this;
		var args = Array.prototype.slice.call(arguments);
		var ret = FUNCTION(fs[key+'Sync']).apply(fs, [self.name].concat(args) );
		return ret;
	};
});

/* These are functions which use paths (fs.FOO(path, ...)) and will not return anything and therefore should return instance of SyncFilePath */
ARRAY(['rename', 'truncate', 'chown', 'lchown', 'chmod', 'lchmod', 'link', 'symlink',
 'unlink', 'rmdir', 'mkdir', 'utimes', 'writeFile', 'appendFile', 'unlinkIfExists', 'rmdirIfExists', 'mkdirIfMissing'
]).forEach(function(key) {
	if(fs[key+'Sync'] === undefined) {
		// lchmod and lchown are only available on Mac OS X
		if(['lchmod', 'lchown'].indexOf(key) < 0) {
			debug.warn('fs.' + key + 'Sync for SyncFilePath is missing! Skipped it.');
		}
		return;
	}
	SyncFilePath.prototype[key] = function() {
		var self = this;
		var args = Array.prototype.slice.call(arguments);
		FUNCTION(fs[key+'Sync']).apply(fs, [self.name].concat(args) );

		/*
		// FIXME: Should we rename the name of Path after rename() ?
		if(key === 'rename') {
			self.name = args[0];
		}
		*/
		return self;
	};
});

// Exports
module.exports = SyncFilePath;

/* EOF */
