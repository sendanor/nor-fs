/* Generic filesystem library */
"use strict";

var FileSystem = require('./FileSystem.js');
var FileDescriptor = require('./FileDescriptor.js');

var SyncFileSystem = require('./SyncFileSystem.js');
var SyncFileDescriptor = require('./SyncFileDescriptor.js');

var fs = module.exports = new FileSystem();

fs.FileSystem = FileSystem;
fs.FileDescriptor = FileDescriptor;

fs.SyncFileSystem = SyncFileSystem;
fs.SyncFileDescriptor = SyncFileDescriptor;

fs.sync = new SyncFileSystem();

/* EOF */
