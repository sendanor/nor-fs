"use strict";

/* */
describe('fs', function(){

	var FileSystem = require('../lib/FileSystem.js');
	var FileDescriptor = require('../lib/FileDescriptor.js');
	var fs = require('../lib/index.js');
	var is = require('nor-is');
	var assert = require('assert');

	it('should be an instance of FileSystem', function(){
		assert.strictEqual(true, is.objOf(fs, FileSystem));
	});

	describe('.FileSystem', function(){
		it('should be same as FileSystem', function(){
			assert.strictEqual(fs.FileSystem, FileSystem);
		});
	});

	describe('.FileDescriptor', function(){
		it('should be same as FileDescriptor', function(){
			assert.strictEqual(fs.FileDescriptor, FileDescriptor);
		});
	});

	it('.rename is callable',     function(){ assert.strictEqual(typeof fs.rename, 'function'); });
	it('.ftruncate is callable',  function(){ assert.strictEqual(typeof fs.ftruncate, 'function'); });
	it('.truncate is callable',   function(){ assert.strictEqual(typeof fs.truncate, 'function'); });
	it('.chown is callable',      function(){ assert.strictEqual(typeof fs.chown, 'function'); });
	it('.fchown is callable',     function(){ assert.strictEqual(typeof fs.fchown, 'function'); });
	it('.chmod is callable',      function(){ assert.strictEqual(typeof fs.chmod, 'function'); });
	it('.fchmod is callable',     function(){ assert.strictEqual(typeof fs.fchmod, 'function'); });
	it('.stat is callable',       function(){ assert.strictEqual(typeof fs.stat, 'function'); });
	it('.lstat is callable',      function(){ assert.strictEqual(typeof fs.lstat, 'function'); });
	it('.fstat is callable',      function(){ assert.strictEqual(typeof fs.fstat, 'function'); });
	it('.link is callable',       function(){ assert.strictEqual(typeof fs.link, 'function'); });
	it('.symlink is callable',    function(){ assert.strictEqual(typeof fs.symlink, 'function'); });
	it('.readlink is callable',   function(){ assert.strictEqual(typeof fs.readlink, 'function'); });
	it('.realpath is callable',   function(){ assert.strictEqual(typeof fs.realpath, 'function'); });
	it('.unlink is callable',     function(){ assert.strictEqual(typeof fs.unlink, 'function'); });
	it('.rmdir is callable',      function(){ assert.strictEqual(typeof fs.rmdir, 'function'); });
	it('.mkdir is callable',      function(){ assert.strictEqual(typeof fs.mkdir, 'function'); });
	it('.readdir is callable',    function(){ assert.strictEqual(typeof fs.readdir, 'function'); });
	it('.close is callable',      function(){ assert.strictEqual(typeof fs.close, 'function'); });
	it('.open is callable',       function(){ assert.strictEqual(typeof fs.open, 'function'); });
	it('.utimes is callable',     function(){ assert.strictEqual(typeof fs.utimes, 'function'); });
	it('.futimes is callable',    function(){ assert.strictEqual(typeof fs.futimes, 'function'); });
	it('.fsync is callable',      function(){ assert.strictEqual(typeof fs.fsync, 'function'); });
	it('.write is callable',      function(){ assert.strictEqual(typeof fs.write, 'function'); });
	it('.read is callable',       function(){ assert.strictEqual(typeof fs.read, 'function'); });
	it('.readFile is callable',   function(){ assert.strictEqual(typeof fs.readFile, 'function'); });
	it('.writeFile is callable',  function(){ assert.strictEqual(typeof fs.writeFile, 'function'); });
	it('.appendFile is callable', function(){ assert.strictEqual(typeof fs.appendFile, 'function'); });
	it('.exists is callable',     function(){ assert.strictEqual(typeof fs.exists, 'function'); });

	// These are only available on Mac OS X
	it.skip('.lchown is callable',     function(){ assert.strictEqual(typeof fs.lchown, 'function'); });
	it.skip('.lchmod is callable',     function(){ assert.strictEqual(typeof fs.lchmod, 'function'); });

	describe('fs', function(){
		
		var test_dir = __dirname + "/tmp";
		
		beforeEach(function(done){
			fs.exists(test_dir + '/test1.txt').then(function(exists) {
				assert.ok( ((exists === false) || (exists === true)) ? true : false );
				return (exists) ? fs.unlink(test_dir + '/test1.txt') : fs;
			}).$exists(test_dir + '/test2.txt').then(function(exists) {
				assert.ok( ((exists === false) || (exists === true)) ? true : false );
				return (exists) ? fs.unlink(test_dir + '/test2.txt') : fs;
			}).$exists(test_dir + '/test3.txt').then(function(exists) {
				assert.ok( ((exists === false) || (exists === true)) ? true : false );
				return (exists) ? fs.unlink(test_dir + '/test3.txt') : fs;
			}).$exists(test_dir).then(function(exists) {
				assert.ok( ((exists === false) || (exists === true)) ? true : false );
				return (exists) ? fs : fs.mkdir(test_dir, "0700");
			}).$writeFile(test_dir + '/test1.txt', 'Hello World', {encoding:'utf8', mode:"0644"}).then(function(fs) {
				done();
			}).fail(function(err) {
				done(err);
			}).done();
		});

		afterEach(function(done){
			fs.exists(test_dir + '/test1.txt').then(function(exists) {
				assert.ok( ((exists === false) || (exists === true)) ? true : false );
				return (exists) ? fs.unlink(test_dir + '/test1.txt') : fs;
			}).$exists(test_dir + '/test2.txt').then(function(exists) {
				assert.ok( ((exists === false) || (exists === true)) ? true : false );
				return (exists) ? fs.unlink(test_dir + '/test2.txt') : fs;
			}).$exists(test_dir + '/test3.txt').then(function(exists) {
				assert.ok( ((exists === false) || (exists === true)) ? true : false );
				return (exists) ? fs.unlink(test_dir + '/test3.txt') : fs;
			}).$exists(test_dir).then(function(exists) {
				assert.ok( ((exists === false) || (exists === true)) ? true : false );
				return (exists) ? fs.rmdir(test_dir) : fs;
			}).then(function(fs) {
				done();
			}).fail(function(err) {
				done(err);
			}).done();
		});

		it('.writeFile() can create tmp/test3.txt', function(done){
			fs.writeFile(test_dir + '/test3.txt', 'Hello World').$exists(test_dir + '/test3.txt').then(function(exists) {
				assert.ok( ((exists === false) || (exists === true)) ? true : false );
				assert.strictEqual(exists, true);
				done();
			}).fail(function(err) {
				done(err);
			}).done();
		});

		it('.writeFile() can create tmp/test3.txt (with encoding:utf8)', function(done){
			fs.writeFile(test_dir + '/test3.txt', 'Hello World', {encoding:'utf8'}).$exists(test_dir + '/test3.txt').then(function(exists) {
				assert.ok( ((exists === false) || (exists === true)) ? true : false );
				assert.strictEqual(exists, true);
				done();
			}).fail(function(err) {
				done(err);
			}).done();
		});

		it('.writeFile() can create tmp/test3.txt (with encoding:utf8, mode:0644)', function(done){
			fs.writeFile(test_dir + '/test3.txt', 'Hello World', {encoding:'utf8', mode:"0644"}).$exists(test_dir + '/test3.txt').then(function(exists) {
				assert.ok( ((exists === false) || (exists === true)) ? true : false );
				assert.strictEqual(exists, true);
				done();
			}).fail(function(err) {
				done(err);
			}).done();
		});

		it('.exists() can detect tmp/test1.txt', function(done){
			fs.exists(test_dir + '/test1.txt').then(function(exists) {
				assert.ok( ((exists === false) || (exists === true)) ? true : false );
				assert.strictEqual(exists, true);
				done();
			}).fail(function(err) {
				done(err);
			}).done();
		});

		it('.exists() cannot detect tmp/test2.txt', function(done){
			fs.exists(test_dir + '/test2.txt').then(function(exists) {
				assert.ok( ((exists === false) || (exists === true)) ? true : false );
				assert.strictEqual(exists, false);
				done();
			}).fail(function(err) {
				done(err);
			}).done();
		});

		it('.rename() can rename tmp/test1.txt to tmp/test2.txt', function(done){
			fs.rename(test_dir + '/test1.txt', test_dir+'/test2.txt').then(function(fs) {
				done();
			}).fail(function(err) {
				done(err);
			}).done();
		});

	});

});

/* EOF */
