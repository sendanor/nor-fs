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
	it.skip('.ftruncate is callable',  function(){ assert.strictEqual(typeof fs.ftruncate, 'function'); });
	it.skip('.truncate is callable',   function(){ assert.strictEqual(typeof fs.truncate, 'function'); });
	it.skip('.chown is callable',      function(){ assert.strictEqual(typeof fs.chown, 'function'); });
	it.skip('.fchown is callable',     function(){ assert.strictEqual(typeof fs.fchown, 'function'); });
	it.skip('.lchown is callable',     function(){ assert.strictEqual(typeof fs.lchown, 'function'); });
	it.skip('.chmod is callable',      function(){ assert.strictEqual(typeof fs.chmod, 'function'); });
	it.skip('.fchmod is callable',     function(){ assert.strictEqual(typeof fs.fchmod, 'function'); });
	it.skip('.lchmod is callable',     function(){ assert.strictEqual(typeof fs.lchmod, 'function'); });
	it.skip('.stat is callable',       function(){ assert.strictEqual(typeof fs.stat, 'function'); });
	it.skip('.lstat is callable',      function(){ assert.strictEqual(typeof fs.lstat, 'function'); });
	it.skip('.fstat is callable',      function(){ assert.strictEqual(typeof fs.fstat, 'function'); });
	it.skip('.link is callable',       function(){ assert.strictEqual(typeof fs.link, 'function'); });
	it.skip('.symlink is callable',    function(){ assert.strictEqual(typeof fs.symlink, 'function'); });
	it.skip('.readlink is callable',   function(){ assert.strictEqual(typeof fs.readlink, 'function'); });
	it.skip('.realpath is callable',   function(){ assert.strictEqual(typeof fs.realpath, 'function'); });
	it('.unlink is callable',     function(){ assert.strictEqual(typeof fs.unlink, 'function'); });
	it.skip('.rmdir is callable',      function(){ assert.strictEqual(typeof fs.rmdir, 'function'); });
	it('.mkdir is callable',      function(){ assert.strictEqual(typeof fs.mkdir, 'function'); });
	it('.readdir is callable',    function(){ assert.strictEqual(typeof fs.readdir, 'function'); });
	it.skip('.close is callable',      function(){ assert.strictEqual(typeof fs.close, 'function'); });
	it.skip('.open is callable',       function(){ assert.strictEqual(typeof fs.open, 'function'); });
	it.skip('.utimes is callable',     function(){ assert.strictEqual(typeof fs.utimes, 'function'); });
	it.skip('.futimes is callable',    function(){ assert.strictEqual(typeof fs.futimes, 'function'); });
	it.skip('.fsync is callable',      function(){ assert.strictEqual(typeof fs.fsync, 'function'); });
	it.skip('.write is callable',      function(){ assert.strictEqual(typeof fs.write, 'function'); });
	it.skip('.read is callable',       function(){ assert.strictEqual(typeof fs.read, 'function'); });
	it('.readFile is callable',   function(){ assert.strictEqual(typeof fs.readFile, 'function'); });
	it('.writeFile is callable',  function(){ assert.strictEqual(typeof fs.writeFile, 'function'); });
	it.skip('.appendFile is callable', function(){ assert.strictEqual(typeof fs.appendFile, 'function'); });
	it('.exists is callable',     function(){ assert.strictEqual(typeof fs.exists, 'function'); });


	describe('fs', function(){
		
		var test_dir = __dirname + "/tmp";
		
		beforeEach(function(done){
			fs.mkdir(test_dir, '0700').writeFile(test_dir + '/test1.txt', 'Hello World', {encoding:'utf8', mode:'0644'}).then(function(fs) {
				done();
			}).fail(function(err) {
				done(err);
			}).done();
		});

		afterEach(function(done){
			fs.unlink(test_dir + '/test1.txt').unlink(test_dir).then(function(fs) {
				done();
			}).fail(function(err) {
				done(err);
			}).done();
		});

		it('#rename() can rename tmp/test1.txt to tmp/test2.txt', function(done){
			fs.rename(test_dir + '/test1.txt', test_dir+'/test2.txt').then(function(fs) {
				done();
			}).fail(function(err) {
				done(err);
			}).fin(function() {
				return fs.rename(test_dir+'/test2.txt', test_dir+'/test1.txt');
			}).done();

		});
	});

});

/* EOF */
