/* Generic Node.js FileSystem Library */
"use strict";

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
['open'].forEach(function(key) {
	if(fs[key+'Sync'] === undefined) {
		console.warn('Warning! fs.' + key + 'Sync is missing! Skipped it.');
		return;
	}
	SyncFilePath.prototype[key] = function() {
		var self = this;
		var args = Array.prototype.slice.call(arguments);
		var fd = fs[key+'Sync'].apply(fs, [self.name].concat(args) );
		return new SyncFileDescriptor(fd);
	};
});

/* These are functions which use paths (fs.FOO(path, ...)) and returns single value and therefore should return it instead */
['stat', 'lstat', 'readlink', 'realpath', 'readdir', 'exists', 'readFile'
].forEach(function(key) {
	if(fs[key+'Sync'] === undefined) {
		console.warn('Warning! fs.' + key + 'Sync are missing! Skipped it.');
		return;
	}
	SyncFilePath.prototype[key] = function() {
		var self = this;
		var args = Array.prototype.slice.call(arguments);
		var ret = fs[key+'Sync'].apply(fs, [self.name].concat(args) );
		return ret;
	};
});

/* These are functions which use paths (fs.FOO(path, ...)) and will not return anything and therefore should return instance of SyncFilePath */
['rename', 'truncate', 'chown', 'lchown', 'chmod', 'lchmod', 'link', 'symlink',
 'unlink', 'rmdir', 'mkdir', 'utimes', 'writeFile', 'appendFile', 'unlinkIfExists', 'rmdirIfExists', 'mkdirIfMissing'
].forEach(function(key) {
	if(fs[key+'Sync'] === undefined) {
		console.warn('Warning! Bindings for ' + key + ' are missing! Skipped it.');
		return;
	}
	SyncFilePath.prototype[key] = function() {
		var self = this;
		var args = Array.prototype.slice.call(arguments);
		fs[key+'Sync'].apply(fs, [self.name].concat(args) );

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
