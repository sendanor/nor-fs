/* Generic Node.js Database Library */
"use strict";

var FS = require('fs');
var Q = require('q');

/* Denodified calls to FS */
var bindings = module.exports = {};

[ 'rename', 'readFile', 'writeFile', 'mkdir', 'readdir', 'rmdir', 'unlink', 'ftruncate',
  'truncate', 'chown', 'fchown', 'lchown', 'chmod', 'fchmod', 'lchmod', 'stat', 'lstat', 
  'fstat', 'link', 'symlink', 'readlink', 'realpath', 'close', 'open', 'utimes', 'futimes',
  'fsync', 'write', 'read', 'appendFile'
].forEach(function(key) {
	if(typeof FS[key] === 'undefined') {

		// lchmod and lchown are only available on Mac OS X
		if(['lchmod', 'lchown'].indexOf(key) < 0) {
			console.warn('Warning! Skipped FS.' + key + ' because it is undefined!');
		}
		return;
	}
	
	if(typeof bindings[key] !== 'undefined') {
		console.warn('Warning! Skipped FS.' + key + ' because it was already defined!');
		return;
	}
	
	bindings[key] = Q.denodeify(FS[key]);
});


bindings.exists = function(path) {
	var defer = Q.defer();
	FS.exists(path, function(exists) {
		defer.resolve(exists);
	});
	return defer.promise;
};

/* EOF */
