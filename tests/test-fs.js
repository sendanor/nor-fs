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

		it('.stat() can detect mode=0644 and size=11', function(done){
			fs.stat(test_dir + '/test1.txt').then(function(f) {
				assert.strictEqual( f.size, 11 );
				assert.strictEqual( parseInt(f.mode.toString(8), 10), 100644 );
				done();
			}).fail(function(err) {
				done(err);
			}).done();
		});

		it('.chmod() can chmod tmp/test1.txt to 0600', function(done){
			fs.stat(test_dir + '/test1.txt').then(function(f) {
				assert.strictEqual( parseInt(f.mode.toString(8), 10), 100644 );
				return fs;
			}).chmod(test_dir + '/test1.txt', '0600').stat(test_dir + '/test1.txt').then(function(f) {
				assert.strictEqual( parseInt(f.mode.toString(8), 10), 100600 );
				done();
			}).fail(function(err) {
				done(err);
			}).done();
		});

		it('.truncate() can truncate tmp/test1.txt to size 8', function(done){
			fs.stat(test_dir + '/test1.txt').then(function(f) {
				assert.strictEqual( f.size, 11 );
				return fs;
			}).truncate(test_dir + '/test1.txt', 8).stat(test_dir + '/test1.txt').then(function(f) {
				assert.strictEqual( f.size, 8 );
				done();
			}).fail(function(err) {
				done(err);
			}).done();
		});

		it('.chown() can change tmp/test1.txt to own uid, gid', function(done){
			// FIXME: This should be tested somehow better
			fs.stat(test_dir + '/test1.txt').then(function(f) {
				assert.strictEqual( f.uid, process.getuid() );
				assert.strictEqual( f.gid, process.getgid() );
				return fs;
			}).chown(test_dir + '/test1.txt', process.getuid(), process.getgid()).stat(test_dir + '/test1.txt').then(function(f) {
				assert.strictEqual( f.uid, process.getuid() );
				assert.strictEqual( f.gid, process.getgid() );
				done();
			}).fail(function(err) {
				done(err);
			}).done();
		});

		it('.link() can link tmp/test2.txt as tmp/test1.txt', function(done){
			// FIXME: This should be tested somehow better
			var orig;
			fs.stat(test_dir + '/test1.txt').then(function(f) {
				orig = f;
				return fs;
			}).link(test_dir + '/test1.txt', test_dir + '/test2.txt').stat(test_dir + '/test2.txt').then(function(f) {
				assert.strictEqual( ''+f.ctime, ''+orig.ctime );
				assert.strictEqual( f.size, orig.size );
				assert.strictEqual( f.ino, orig.ino );
				done();
			}).fail(function(err) {
				done(err);
			}).done();
		});

		it('.symlink() can symlink tmp/test2.txt as tmp/test1.txt', function(done){
			// FIXME: This should be tested somehow better
			var orig;
			fs.stat(test_dir + '/test1.txt').then(function(f) {
				orig = f;
				return fs;
			}).symlink(test_dir + '/test1.txt', test_dir + '/test2.txt').stat(test_dir + '/test2.txt').then(function(f) {
				assert.strictEqual( ''+f.ctime, ''+orig.ctime );
				assert.strictEqual( f.size, orig.size );
				assert.strictEqual( f.ino, orig.ino );
			}).fin(function() {
				return fs.unlink(test_dir + '/test2.txt');
			}).then(function() {
				done();
			}).fail(function(err) {
				done(err);
			}).done();
		});

	});

});

/* EOF */
