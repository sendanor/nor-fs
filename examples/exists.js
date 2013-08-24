
var fs = require('../lib/index.js');

fs.writeFile('foo.txt', 'Hello').exists('foo.txt').then(function(exists) {
	console.log('foo.txt exists=' + exists);
	return fs;
}).fail(function(err) {
	console.error('Error: ' + err);
}).done();
