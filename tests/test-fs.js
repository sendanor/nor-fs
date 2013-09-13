"use strict";

/* */
describe('fs', function(){

	var Q = require('q');
	Q.longStackSupport = true;

	var FileSystem = require('../lib/FileSystem.js');
	var FilePath = require('../lib/FilePath.js');
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

	describe('.Path', function(){
		it('should be same as FilePath', function(){
			assert.strictEqual(fs.Path, FilePath);
		});
	});

	describe('.FileDescriptor', function(){
		it('should be same as FileDescriptor', function(){
			assert.strictEqual(fs.FileDescriptor, FileDescriptor);
		});
	});

	describe('.Descriptor', function(){
		it('should be same as FileDescriptor', function(){
			assert.strictEqual(fs.Descriptor, FileDescriptor);
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

	it('.unlinkIfExists is callable',     function(){ assert.strictEqual(typeof fs.unlinkIfExists, 'function'); });
	it('.rmdirIfExists is callable',      function(){ assert.strictEqual(typeof fs.rmdirIfExists, 'function'); });
	it('.mkdirIfMissing is callable',      function(){ assert.strictEqual(typeof fs.mkdirIfMissing, 'function'); });

	// These are only available on Mac OS X
	it.skip('.lchown is callable',     function(){ assert.strictEqual(typeof fs.lchown, 'function'); });
	it.skip('.lchmod is callable',     function(){ assert.strictEqual(typeof fs.lchmod, 'function'); });

	describe('tests', function(){
		
		var test_dir = __dirname + "/tmp";
		
		beforeEach(function(done){
			fs.unlinkIfExists(test_dir + '/test1.txt')
			  .$unlinkIfExists(test_dir + '/test2.txt')
			  .$unlinkIfExists(test_dir + '/test3.txt')
			  .$mkdirIfMissing(test_dir, "0700")
			  .$writeFile(test_dir + '/test1.txt', 'Hello World', {encoding:'utf8', mode:"0644"}).then(function(fs) {
				done();
			}).fail(function(err) {
				done(err);
			}).done();
		});

		afterEach(function(done){
			fs.unlinkIfExists(test_dir + '/test1.txt')
			  .$unlinkIfExists(test_dir + '/test2.txt')
			  .$unlinkIfExists(test_dir + '/test3.txt')
			  .$rmdirIfExists(test_dir)
			  .then(function(fs) {
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

		it('.readlink() can read a symlinks', function(done){
			var orig;
			fs.stat(test_dir + '/test1.txt').then(function(f) {
				orig = f;
				return fs;
			}).symlink(test_dir + '/test1.txt', test_dir + '/test2.txt').stat(test_dir + '/test2.txt').then(function(f) {
				assert.strictEqual( ''+f.ctime, ''+orig.ctime );
				assert.strictEqual( f.size, orig.size );
				assert.strictEqual( f.ino, orig.ino );
				return fs;
			}).readlink(test_dir + '/test2.txt').then(function(linkString) {
				assert.strictEqual( linkString, test_dir+'/test1.txt' );
			}).fin(function() {
				return fs.unlink(test_dir + '/test2.txt');
			}).then(function() {
				done();
			}).fail(function(err) {
				done(err);
			}).done();
		});

		it('.realpath() can resolve path', function(done){
			var orig;
			fs.stat(test_dir + '/test1.txt').then(function(f) {
				orig = f;
				return fs;
			}).symlink(test_dir + '/test1.txt', test_dir + '/test2.txt').stat(test_dir + '/test2.txt').then(function(f) {
				assert.strictEqual( ''+f.ctime, ''+orig.ctime );
				assert.strictEqual( f.size, orig.size );
				assert.strictEqual( f.ino, orig.ino );
				return fs;
			}).realpath(test_dir + '/test2.txt').then(function(resolvedPath) {
				assert.strictEqual( resolvedPath, test_dir+'/test1.txt' );
			}).fin(function() {
				return fs.unlink(test_dir + '/test2.txt');
			}).then(function() {
				done();
			}).fail(function(err) {
				done(err);
			}).done();
		});

		it('.unlink() can unlink test1.txt', function(done){
			fs.unlink(test_dir + '/test1.txt').exists(test_dir + '/test1.txt').then(function(exists) {
				assert.strictEqual( exists, false );
				done();
			}).fail(function(err) {
				done(err);
			}).done();
		});

		it('.mkdir() can create directories and .rmdir() can remove those', function(done){
			fs.mkdir(test_dir + '/subdir').exists(test_dir + '/subdir').then(function(exists) {
				assert.strictEqual( exists, true );
				return fs;
			}).rmdir(test_dir + '/subdir').exists(test_dir + '/subdir').then(function(exists) {
				assert.strictEqual( exists, false );
				return fs;
			}).then(function() {
				done();
			}).fail(function(err) {
				done(err);
			}).done();
		});

		it('.readdir() can read directories', function(done){
			fs.readdir(test_dir).then(function(files) {
				assert.deepEqual( files, ["test1.txt"] );
				return fs;
			}).then(function() {
				done();
			}).fail(function(err) {
				done(err);
			}).done();
		});

		it('.utimes() can change file timestamps', function(done){
			var orig;
			var date = new Date(2013, 6, 20, 12, 1, 2);
			fs.stat(test_dir + '/test1.txt').then(function(f) {
				orig = f;
				return fs;
			}).utimes(test_dir + '/test1.txt', date, date).stat(test_dir + '/test1.txt').then(function(f) {
				assert.strictEqual( f.atime.getFullYear(), 2013 );
				assert.strictEqual( f.atime.getMonth(), 6 );
				assert.strictEqual( f.atime.getDate(), 20 );
				assert.strictEqual( f.atime.getHours(), 12 );
				assert.strictEqual( f.atime.getMinutes(), 1 );
				assert.strictEqual( f.atime.getSeconds(), 2 );

				assert.strictEqual( f.mtime.getFullYear(), 2013 );
				assert.strictEqual( f.mtime.getMonth(), 6 );
				assert.strictEqual( f.mtime.getDate(), 20 );
				assert.strictEqual( f.mtime.getHours(), 12 );
				assert.strictEqual( f.mtime.getMinutes(), 1 );
				assert.strictEqual( f.mtime.getSeconds(), 2 );

				assert.strictEqual( f.size, orig.size );
				assert.strictEqual( f.ino, orig.ino );
			}).then(function() {
				done();
			}).fail(function(err) {
				done(err);
			}).done();
		});

		it('.readFile() can read files', function(done){
			fs.readFile(test_dir + "/test1.txt", {encoding:"utf8"}).then(function(data) {
				assert.strictEqual( data, "Hello World" );
				return fs;
			}).then(function() {
				done();
			}).fail(function(err) {
				done(err);
			}).done();
		});

		it('.appendFile() can append to tmp/test1.txt', function(done){
			fs.appendFile(test_dir + '/test1.txt', ' -- How is it working?').readFile(test_dir + "/test1.txt", {encoding:"utf8"}).then(function(data) {
				assert.strictEqual( data, "Hello World -- How is it working?" );
				return fs;
			}).then(function() {
				done();
			}).fail(function(err) {
				done(err);
			}).done();
		});

		it('.lstat() can stat files from symlinks', function(done){
			var orig;
			fs.stat(test_dir + '/test1.txt').then(function(f) {
				orig = f;
				return fs;
			}).symlink(test_dir + '/test1.txt', test_dir + '/test2.txt').lstat(test_dir + '/test2.txt').then(function(f) {
				assert.notStrictEqual( f.ino, orig.ino );
				assert.notStrictEqual( f.size, orig.size );
			}).fin(function() {
				return fs.unlink(test_dir + '/test2.txt');
			}).then(function() {
				done();
			}).fail(function(err) {
				done(err);
			}).done();
		});

		it('.open() can open files and fs.fstat(fd) it, and then fs.close(fd)', function(done){
			var orig, fd;
			fs.stat(test_dir + '/test1.txt').then(function(f) {
				orig = f;
				return fs;
			}).open(test_dir + '/test1.txt', 'r').then(function(f) {
				fd = f;
				return fs;
			}).then(function(fs) {
				return fs.fstat(fd.valueOf());
			}).then(function(f) {
				assert.strictEqual( f.ino, orig.ino );
				assert.strictEqual( f.size, orig.size );
			}).fin(function() {
				return fs.close(fd.valueOf());
			}).then(function() {
				done();
			}).fail(function(err) {
				done(err);
			}).done();
		});

		it('.open() can open files and fd.stat() it, and then fd.close()', function(done){
			var orig, fd;
			fs.stat(test_dir + '/test1.txt').then(function(f) {
				orig = f;
				return fs;
			}).open(test_dir + '/test1.txt', 'r').then(function(f) {
				return fd = f;
			}).stat().then(function(f) {
				assert.strictEqual( f.ino, orig.ino );
				assert.strictEqual( f.size, orig.size );
			}).fin(function() {
				return fd.close();
			}).then(function() {
				done();
			}).fail(function(err) {
				done(err);
			}).done();
		});

		it('.ftruncate(fd) can truncate tmp/test1.txt to size 8', function(done){
			var fd;
			fs.stat(test_dir + '/test1.txt').then(function(f) {
				assert.strictEqual( f.size, 11 );
				return fs;
			}).open(test_dir + '/test1.txt', 'w+').then(function(f) {
				fd = f;
				return fs;
			}).then(function(fs) {
				return fs.ftruncate(fd.valueOf(), 8).fstat(fd.valueOf());
			}).then(function(f) {
				assert.strictEqual( f.size, 8 );
				return fs;
			}).fin(function() {
				return fs.close(fd.valueOf());
			}).then(function() {
				done();
			}).fail(function(err) {
				done(err);
			}).done();
		});

		it('fd.truncate() can truncate tmp/test1.txt to size 8', function(done){
			var fd;
			fs.stat(test_dir + '/test1.txt').then(function(f) {
				assert.strictEqual( f.size, 11 );
				return fs;
			}).open(test_dir + '/test1.txt', 'w+').then(function(f) {
				return fd = f;
			}).truncate(8).stat().then(function(f) {
				assert.strictEqual( f.size, 8 );
			}).fin(function() {
				return fd.close();
			}).then(function() {
				done();
			}).fail(function(err) {
				done(err);
			}).done();
		});


		it('fd.chown() can change tmp/test1.txt to own uid, gid', function(done){
			// FIXME: This should be tested somehow better
			var fd;
			fs.stat(test_dir + '/test1.txt').then(function(f) {
				assert.strictEqual( f.uid, process.getuid() );
				assert.strictEqual( f.gid, process.getgid() );
				return fs;
			}).open(test_dir + '/test1.txt', 'w+').then(function(f) {
				return fd = f;
			}).chown(process.getuid(), process.getgid()).stat().then(function(f) {
				assert.strictEqual( f.uid, process.getuid() );
				assert.strictEqual( f.gid, process.getgid() );
			}).fin(function() {
				return fd.close();
			}).then(function() {
				done();
			}).fail(function(err) {
				done(err);
			}).done();
		});

		it('.fchown(fd) can change tmp/test1.txt to own uid, gid', function(done){
			// FIXME: This should be tested somehow better
			var fd;
			fs.stat(test_dir + '/test1.txt').then(function(f) {
				assert.strictEqual( f.uid, process.getuid() );
				assert.strictEqual( f.gid, process.getgid() );
				return fs;
			}).open(test_dir + '/test1.txt', 'w+').then(function(f) {
				return fd = f;
			}).then(function(fd) {
				return fs.fchown(fd.valueOf(), process.getuid(), process.getgid()).fstat(fd.valueOf());
			}).then(function(f) {
				assert.strictEqual( f.uid, process.getuid() );
				assert.strictEqual( f.gid, process.getgid() );
			}).fin(function() {
				return fd.close();
			}).then(function() {
				done();
			}).fail(function(err) {
				done(err);
			}).done();
		});

		it('fd.chmod() can chmod tmp/test1.txt to 0600', function(done){
			var fd;
			fs.stat(test_dir + '/test1.txt').then(function(f) {
				assert.strictEqual( parseInt(f.mode.toString(8), 10), 100644 );
				return fs;
			}).open(test_dir + '/test1.txt', 'w+').then(function(f) {
				return fd = f;
			}).chmod('0600').stat().then(function(f) {
				assert.strictEqual( parseInt(f.mode.toString(8), 10), 100600 );
			}).fin(function() {
				return fd.close();
			}).then(function() {
				done();
			}).fail(function(err) {
				done(err);
			}).done();
		});

		it('.chmod(fd) can chmod tmp/test1.txt to 0600', function(done){
			var fd;
			fs.stat(test_dir + '/test1.txt').then(function(f) {
				assert.strictEqual( parseInt(f.mode.toString(8), 10), 100644 );
				return fs;
			}).open(test_dir + '/test1.txt', 'w+').then(function(f) {
				fd = f;
				return fs;
			}).then(function(fs) {
				return fs.fchmod(fd.valueOf(), '0600').fstat(fd.valueOf());
			}).then(function(f) {
				assert.strictEqual( parseInt(f.mode.toString(8), 10), 100600 );
			}).fin(function() {
				return fd.close();
			}).then(function() {
				done();
			}).fail(function(err) {
				done(err);
			}).done();
		});

		it('fd.utimes() can change file timestamps', function(done){
			var orig, fd;
			var date = new Date(2013, 6, 20, 12, 1, 2);
			fs.stat(test_dir + '/test1.txt').then(function(f) {
				orig = f;
				return fs;
			}).open(test_dir + '/test1.txt', 'r').then(function(f) {
				return fd = f;
			}).utimes(date, date).stat().then(function(f) {
				assert.strictEqual( f.atime.getFullYear(), 2013 );
				assert.strictEqual( f.atime.getMonth(), 6 );
				assert.strictEqual( f.atime.getDate(), 20 );
				assert.strictEqual( f.atime.getHours(), 12 );
				assert.strictEqual( f.atime.getMinutes(), 1 );
				assert.strictEqual( f.atime.getSeconds(), 2 );

				assert.strictEqual( f.mtime.getFullYear(), 2013 );
				assert.strictEqual( f.mtime.getMonth(), 6 );
				assert.strictEqual( f.mtime.getDate(), 20 );
				assert.strictEqual( f.mtime.getHours(), 12 );
				assert.strictEqual( f.mtime.getMinutes(), 1 );
				assert.strictEqual( f.mtime.getSeconds(), 2 );

				assert.strictEqual( f.size, orig.size );
				assert.strictEqual( f.ino, orig.ino );
			}).fin(function() {
				return fd.close();
			}).then(function() {
				done();
			}).fail(function(err) {
				done(err);
			}).done();
		});

		it('.futimes(fd) can change file timestamps', function(done){
			var orig, fd;
			var date = new Date(2013, 6, 20, 12, 1, 2);
			fs.stat(test_dir + '/test1.txt').then(function(f) {
				orig = f;
				return fs;
			}).open(test_dir + '/test1.txt', 'r').then(function(f) {
				fd = f;
				return fs;
			}).then(function(fs) {
				return fs.futimes(fd.valueOf(), date, date).fstat(fd.valueOf());
			}).then(function(f) {
				assert.strictEqual( f.atime.getFullYear(), 2013 );
				assert.strictEqual( f.atime.getMonth(), 6 );
				assert.strictEqual( f.atime.getDate(), 20 );
				assert.strictEqual( f.atime.getHours(), 12 );
				assert.strictEqual( f.atime.getMinutes(), 1 );
				assert.strictEqual( f.atime.getSeconds(), 2 );

				assert.strictEqual( f.mtime.getFullYear(), 2013 );
				assert.strictEqual( f.mtime.getMonth(), 6 );
				assert.strictEqual( f.mtime.getDate(), 20 );
				assert.strictEqual( f.mtime.getHours(), 12 );
				assert.strictEqual( f.mtime.getMinutes(), 1 );
				assert.strictEqual( f.mtime.getSeconds(), 2 );

				assert.strictEqual( f.size, orig.size );
				assert.strictEqual( f.ino, orig.ino );
			}).fin(function() {
				return fd.close();
			}).then(function() {
				done();
			}).fail(function(err) {
				done(err);
			}).done();
		});

		it('.write(fd, ...) can write to tmp/test2.txt and fs.fsync(fd) works', function(done){
			var fd;
			var buffer = new Buffer('Is it working yet?', 'utf8');
			fs.exists(test_dir + '/test2.txt').then(function(exists) {
				assert.strictEqual( exists, false );
				return fs;
			}).open(test_dir + '/test2.txt', 'w').then(function(f) {
				fd = f;
				return fs;
			}).then(function(fs) {
				return fs.write(fd.valueOf(), buffer, 0, 8, 11);
			}).then(function(results) {
				assert.strictEqual( results.written, 8 );
				assert.strictEqual( results.buffer, buffer );
				return fs.fsync(fd.valueOf());
			}).then(function(fs) {
				return fs.fstat(fd.valueOf());
			}).then(function(f) {
				assert.strictEqual( f.size, 11 + 8 );
				return fs;
			}).fin(function() {
				return fs.close(fd.valueOf());
			}).then(function() {
				done();
			}).fail(function(err) {
				done(err);
			}).done();
		});

		it('fd.write(...) can write to tmp/test2.txt and fd.sync() works', function(done){
			var fd;
			var buffer = new Buffer('Is it working yet?', 'utf8');
			fs.exists(test_dir + '/test2.txt').then(function(exists) {
				assert.strictEqual( exists, false );
				return fs;
			}).open(test_dir + '/test2.txt', 'w').then(function(f) {
				return fd = f;
			}).then(function(fd) {
				return fd.write(buffer, 0, 8, 11);
			}).then(function(results) {
				assert.strictEqual( results.written, 8 );
				assert.strictEqual( results.buffer, buffer );
				return fd.sync();
			}).then(function() {
				return fs.fstat(fd.valueOf());
			}).then(function(f) {
				assert.strictEqual( f.size, 11 + 8 );
				return fs;
			}).fin(function() {
				return fs.close(fd.valueOf());
			}).then(function() {
				done();
			}).fail(function(err) {
				done(err);
			}).done();
		});

		it('.read(fd, ...) can read tmp/test1.txt', function(done){
			var fd;
			var buffer = new Buffer('########', 'utf8');
			fs.open(test_dir + '/test1.txt', 'r').then(function(f) {
				fd = f;
				return fs;
			}).then(function(fs) {
				return fs.read(fd.valueOf(), buffer, /* offset */ 0, /* length */ 8, /* position */ 0);
			}).then(function(results) {
				assert.strictEqual( results.bytesRead, 8 );
				assert.strictEqual( results.buffer.toString('utf8'), 'Hello Wo' );
				return fs;
			}).fin(function() {
				return fs.close(fd.valueOf());
			}).then(function() {
				done();
			}).fail(function(err) {
				done(err);
			}).done();
		});

		it('fd.read(...) can read tmp/test1.txt', function(done){
			var fd;
			var buffer = new Buffer('########', 'utf8');
			fs.open(test_dir + '/test1.txt', 'r').then(function(f) {
				return fd = f;
			}).then(function(fd) {
				return fd.read(buffer, /* offset */ 0, /* length */ 8, /* position */ 0);
			}).then(function(results) {
				assert.strictEqual( results.bytesRead, 8 );
				assert.strictEqual( results.buffer.toString('utf8'), 'Hello Wo' );
				return fs;
			}).fin(function() {
				return fs.close(fd.valueOf());
			}).then(function() {
				done();
			}).fail(function(err) {
				done(err);
			}).done();
		});

	});

});

/* EOF */
