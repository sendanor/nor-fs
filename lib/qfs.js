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
  'fsync', 'appendFile'
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

/* These are special calls with format callback(err, [written|bytesRead], [buffer]) */
[ 'write', 'read' ].forEach(function(key) {
	if(typeof FS[key] === 'undefined') {
		console.warn('Warning! Skipped FS.' + key + ' because it is undefined!');
		return;
	}
	
	if(typeof bindings[key] !== 'undefined') {
		console.warn('Warning! Skipped FS.' + key + ' because it was already defined!');
		return;
	}
	
	//bindings[key] = Q.denodeify(FS[key]);
	bindings[key] = function() {
		var args = Array.prototype.slice.call(arguments);
		var defer = Q.defer();
		try {
			FS[key].apply(FS, args.concat([function() {
				try {
					var args2 = Array.prototype.slice.call(arguments);
					if(args2[0]) { throw args2[0]; }
					var ret = {};
					if(key === 'write') {
						ret.written = args2[1];
						ret.buffer = args2[2];
					} else if(key === 'read') {
						ret.bytesRead = args2[1];
						ret.buffer = args2[2];
					}
					defer.resolve(ret);
				} catch(err) {
					defer.reject(err);
				}
			}])
			);
		} catch(err) {
			defer.reject(err);
		}
		return defer.promise;
	};

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
