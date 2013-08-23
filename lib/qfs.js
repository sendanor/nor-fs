/* Generic Node.js Database Library */
"use strict";

var FS = require('fs');
var Q = require('q');

/* Denodified calls to FS */
var bindings = module.exports = {};

bindings.rename = Q.denodeify(FS.rename);
bindings.readFile = Q.denodeify(FS.readFile);
bindings.writeFile = Q.denodeify(FS.writeFile);
bindings.mkdir = Q.denodeify(FS.mkdir);
bindings.readdir = Q.denodeify(FS.readdir);
bindings.unlink = Q.denodeify(FS.unlink);

bindings.exists = function(path) {
	var defer = Q.defer();
	FS.exists(path, function(exists) {
		defer.resolve(exists);
	});
	return defer.promise;
};

/* EOF */
