/* Generic filesystem library */
"use strict";
var FileSystem = require('./FileSystem.js');
var FileDescriptor = require('./FileDescriptor.js');
var fs = module.exports = new FileSystem();
fs.FileSystem = FileSystem;
fs.FileDescriptor = FileDescriptor;

/* EOF */
