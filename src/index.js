/* Generic Node.js FileSystem Library */
"use strict";

var FileSystem = require('./FileSystem.js');
var FilePath = require('./FilePath.js');
var FileDescriptor = require('./FileDescriptor.js');

var SyncFileSystem = require('./SyncFileSystem.js');
var SyncFilePath = require('./SyncFilePath.js');
var SyncFileDescriptor = require('./SyncFileDescriptor.js');

var fs = module.exports = new FileSystem();
fs.sync = new SyncFileSystem();

// Asynchronous API
fs.FileSystem = FileSystem;
fs.Path = FilePath;
fs.Descriptor = FileDescriptor;

// Synchronous API
fs.SyncFileSystem = SyncFileSystem;
fs.sync.Path = SyncFilePath;
fs.sync.Descriptor = SyncFileDescriptor;

// Obsolete aliases
fs.FileDescriptor = fs.Descriptor;

/** Returns instance of `fs.Path(name)`
 * FIXME: Move this to FilePath?
 */
fs.path = function(name) {
	return new FilePath(name);
};

/** Returns instance of `fs.Path(name)`
 * FIXME: Move this to SyncFilePath?
 */
fs.sync.path = function(name) {
	return new SyncFilePath(name);
};

/* EOF */
