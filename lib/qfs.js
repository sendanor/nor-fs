/* Generic Node.js Database Library */
"use strict";

var FS = require('fs');
var Q = require('q');

/* Denodified calls to FS */
var bindings = module.exports = {};

/* These are standard Node.js-style calls with format callback(err, [value]) */

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

/* `FS.exists` has a special format callback(exists) */

bindings.exists = function(path) {
	var defer = Q.defer();
	try {
		FS.exists(path, function(exists) {
			defer.resolve( (exists) ? true : false );
		});
	} catch(err) {
		defer.reject(err);
	}
	return defer.promise;
};

/* EOF */
