/* Generic Node.js Database Library */
"use strict";

var FS = require('fs');
var Q = require('q');

/* Denodified calls to FS */
var qfs = module.exports = {};

qfs.readFile = Q.denodeify(FS.readFile);
qfs.writeFile = Q.denodeify(FS.writeFile);
qfs.mkdir = Q.denodeify(FS.mkdir);
qfs.readdir = Q.denodeify(FS.readdir);
qfs.unlink = Q.denodeify(FS.unlink);

qfs.exists = function(path) {
	var defer = Q.defer();
	FS.exists(path, function(exists) {
		defer.resolve(exists);
	});
	return defer.promise;
};

/* EOF */
