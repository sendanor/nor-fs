"use strict";

/* */
describe('fs-path', function(){

	var Q = require('q');
	Q.longStackSupport = true;

	var FileSystem = require('../src/FileSystem.js');
	var FilePath = require('../src/FilePath.js');
	var fs = require('../src/index.js');
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

	describe('FilePath.prototype', function(){
		it('.rename is callable',     function(){ assert.strictEqual(typeof FilePath.prototype.rename, 'function'); });
		it('.truncate is callable',   function(){ assert.strictEqual(typeof FilePath.prototype.truncate, 'function'); });
		it('.chown is callable',      function(){ assert.strictEqual(typeof FilePath.prototype.chown, 'function'); });
		it('.chmod is callable',      function(){ assert.strictEqual(typeof FilePath.prototype.chmod, 'function'); });
		it('.stat is callable',       function(){ assert.strictEqual(typeof FilePath.prototype.stat, 'function'); });
		it('.lstat is callable',      function(){ assert.strictEqual(typeof FilePath.prototype.lstat, 'function'); });
		it('.link is callable',       function(){ assert.strictEqual(typeof FilePath.prototype.link, 'function'); });
		it('.symlink is callable',    function(){ assert.strictEqual(typeof FilePath.prototype.symlink, 'function'); });
		it('.readlink is callable',   function(){ assert.strictEqual(typeof FilePath.prototype.readlink, 'function'); });
		it('.realpath is callable',   function(){ assert.strictEqual(typeof FilePath.prototype.realpath, 'function'); });
		it('.unlink is callable',     function(){ assert.strictEqual(typeof FilePath.prototype.unlink, 'function'); });
		it('.rmdir is callable',      function(){ assert.strictEqual(typeof FilePath.prototype.rmdir, 'function'); });
		it('.mkdir is callable',      function(){ assert.strictEqual(typeof FilePath.prototype.mkdir, 'function'); });
		it('.readdir is callable',    function(){ assert.strictEqual(typeof FilePath.prototype.readdir, 'function'); });
		it('.open is callable',       function(){ assert.strictEqual(typeof FilePath.prototype.open, 'function'); });
		it('.utimes is callable',     function(){ assert.strictEqual(typeof FilePath.prototype.utimes, 'function'); });
		it('.readFile is callable',   function(){ assert.strictEqual(typeof FilePath.prototype.readFile, 'function'); });
		it('.writeFile is callable',  function(){ assert.strictEqual(typeof FilePath.prototype.writeFile, 'function'); });
		it('.appendFile is callable', function(){ assert.strictEqual(typeof FilePath.prototype.appendFile, 'function'); });
		it('.exists is callable',     function(){ assert.strictEqual(typeof FilePath.prototype.exists, 'function'); });

		it('.unlinkIfExists is callable',     function(){ assert.strictEqual(typeof FilePath.prototype.unlinkIfExists, 'function'); });
		it('.rmdirIfExists is callable',      function(){ assert.strictEqual(typeof FilePath.prototype.rmdirIfExists, 'function'); });
		it('.mkdirIfMissing is callable',      function(){ assert.strictEqual(typeof FilePath.prototype.mkdirIfMissing, 'function'); });

		// These are only available on Mac OS X
		it.skip('.lchown is callable',     function(){ assert.strictEqual(typeof FilePath.prototype.lchown, 'function'); });
		it.skip('.lchmod is callable',     function(){ assert.strictEqual(typeof FilePath.prototype.lchmod, 'function'); });

	});

	describe('fs', function(){

		var test_dir = __dirname + "/tmp";

		beforeEach(function(){
			return fs.unlinkIfExists(test_dir + '/test1.txt')
			  .$unlinkIfExists(test_dir + '/test2.txt')
			  .$unlinkIfExists(test_dir + '/test3.txt')
			  .$mkdirIfMissing(test_dir, "0700")
			  .$writeFile(test_dir + '/test1.txt', 'Hello World', {encoding:'utf8', mode:"0644"});
		});

		afterEach(function(){
			return fs.unlinkIfExists(test_dir + '/test1.txt')
			  .$unlinkIfExists(test_dir + '/test2.txt')
			  .$unlinkIfExists(test_dir + '/test3.txt')
			  .$rmdirIfExists(test_dir);
		});

		it('.path().writeFile() can create tmp/test3.txt', function(){
			return fs.path(test_dir + '/test3.txt').writeFile('Hello World').$exists().then(function(exists) {
				assert.ok( ((exists === false) || (exists === true)) ? true : false );
				assert.strictEqual(exists, true);
			});
		});

		it('.path().writeFile() can create tmp/test3.txt (with encoding:utf8)', function(){
			return fs.path(test_dir + '/test3.txt').writeFile('Hello World', {encoding:'utf8'}).$exists().then(function(exists) {
				assert.ok( ((exists === false) || (exists === true)) ? true : false );
				assert.strictEqual(exists, true);
			});
		});

		it('.path().writeFile() can create tmp/test3.txt (with encoding:utf8, mode:0644) -- using mode as string', function(){
			return fs.path(test_dir + '/test3.txt').writeFile('Hello World', {encoding:'utf8', mode:"0644"}).$exists().then(function(exists) {
				assert.ok( ((exists === false) || (exists === true)) ? true : false );
				assert.strictEqual(exists, true);
			});
		});

		it('.path().writeFile() can create tmp/test3.txt (with encoding:utf8, mode:0644) -- using mode as number', function(){
			return fs.path(test_dir + '/test3.txt').writeFile('Hello World', {encoding:'utf8', mode:parseInt("0644", 8)}).$exists().then(function(exists) {
				assert.ok( ((exists === false) || (exists === true)) ? true : false );
				assert.strictEqual(exists, true);
			});
		});

		it('.path().exists() can detect tmp/test1.txt', function(){
			return fs.path(test_dir + '/test1.txt').exists().then(function(exists) {
				assert.ok( ((exists === false) || (exists === true)) ? true : false );
				assert.strictEqual(exists, true);
			});
		});

		it('.path().exists() cannot detect tmp/test2.txt', function(){
			return fs.path(test_dir + '/test2.txt').exists().then(function(exists) {
				assert.ok( ((exists === false) || (exists === true)) ? true : false );
				assert.strictEqual(exists, false);
			});
		});

		it('.path().rename() can rename tmp/test1.txt to tmp/test2.txt', function(){
			return fs.path(test_dir + '/test1.txt').rename(test_dir+'/test2.txt');
		});

		it('.path().stat() can detect mode=0644 and size=11', function(){
			return fs.path(test_dir + '/test1.txt').stat().then(function(f) {
				assert.strictEqual( f.size, 11 );
				assert.strictEqual( f.mode, parseInt('0644', 8) );
			});
		});

		it('.path().chmod() can chmod tmp/test1.txt to 0600 -- using mode as string', function(){
			var p = fs.path(test_dir + '/test1.txt');
			return p.stat().then(function(f) {
				assert.strictEqual( f.mode, parseInt('0644', 8) );
				return p;
			}).chmod('0600').stat().then(function(f) {
				assert.strictEqual( f.mode, parseInt('0600', 8) );
			});
		});

		it('.path().chmod() can chmod tmp/test1.txt to 0600 -- using mode as number', function(){
			var p = fs.path(test_dir + '/test1.txt');
			return p.stat().then(function(f) {
				assert.strictEqual( f.mode, parseInt('0644', 8) );
				return p;
			}).chmod(parseInt('0600', 8)).stat().then(function(f) {
				assert.strictEqual( f.mode, parseInt('0600', 8) );
			});
		});

		it('.path().truncate() can truncate tmp/test1.txt to size 8', function(){
			var p = fs.path(test_dir + '/test1.txt');
			return p.stat().then(function(f) {
				assert.strictEqual( f.size, 11 );
				return p;
			}).truncate(8).stat().then(function(f) {
				assert.strictEqual( f.size, 8 );
			});
		});

		it('.path().chown() can change tmp/test1.txt to own uid, gid', function(){
			// FIXME: This should be tested somehow better
			var p = fs.path(test_dir + '/test1.txt');
			return p.stat().then(function(f) {
				assert.strictEqual( f.uid, process.getuid() );
				assert.strictEqual( f.gid, process.getgid() );
				return p;
			}).chown(process.getuid(), process.getgid()).stat().then(function(f) {
				assert.strictEqual( f.uid, process.getuid() );
				assert.strictEqual( f.gid, process.getgid() );
			});
		});

		it('.path().link() can link tmp/test2.txt as tmp/test1.txt', function(){
			var orig;
			var p = fs.path(test_dir + '/test1.txt');
			return p.stat().then(function(f) {
				orig = f;
				return p;
			}).link(test_dir + '/test2.txt').then(function() {
				return fs.stat(test_dir + '/test2.txt');
			}).then(function(f) {
				assert.strictEqual( ''+f.ctime, ''+orig.ctime );
				assert.strictEqual( f.size, orig.size );
				assert.strictEqual( f.ino, orig.ino );
			});
		});

		it('.path().symlink() can symlink tmp/test2.txt as tmp/test1.txt', function(){
			var orig;
			var p = fs.path(test_dir + '/test1.txt');
			return p.stat().then(function(f) {
				orig = f;
				return p;
			}).symlink(test_dir + '/test2.txt').then(function() {
				return fs.stat(test_dir + '/test2.txt');
			}).then(function(f) {
				assert.strictEqual( ''+f.ctime, ''+orig.ctime );
				assert.strictEqual( f.size, orig.size );
				assert.strictEqual( f.ino, orig.ino );
			}).fin(function() {
				return fs.unlink(test_dir + '/test2.txt');
			});
		});

		it('.path().readlink() can read a symlinks', function(){
			var orig;
			var p = fs.path(test_dir + '/test1.txt');
			var p2 = fs.path(test_dir + '/test2.txt');
			return p.stat().then(function(f) {
				orig = f;
				return p;
			}).symlink(test_dir + '/test2.txt').then(function() {
				return p2.stat();
			}).then(function(f) {
				assert.strictEqual( ''+f.ctime, ''+orig.ctime );
				assert.strictEqual( f.size, orig.size );
				assert.strictEqual( f.ino, orig.ino );
				return p2;
			}).readlink().then(function(linkString) {
				assert.strictEqual( linkString, test_dir+'/test1.txt' );
			}).fin(function() {
				return fs.unlink(test_dir + '/test2.txt');
			});
		});

		it('.path().realpath() can resolve path', function(){
			var orig;
			var p = fs.path(test_dir + '/test1.txt');
			var p2 = fs.path(test_dir + '/test2.txt');
			return p.stat().then(function(f) {
				orig = f;
				return p;
			}).symlink(test_dir + '/test2.txt').then(function() {
				return fs.stat(test_dir + '/test2.txt');
			}).then(function(f) {
				assert.strictEqual( ''+f.ctime, ''+orig.ctime );
				assert.strictEqual( f.size, orig.size );
				assert.strictEqual( f.ino, orig.ino );
				return p2;
			}).realpath().then(function(resolvedPath) {
				assert.strictEqual( resolvedPath, test_dir+'/test1.txt' );
			}).fin(function() {
				return fs.unlink(test_dir + '/test2.txt');
			});
		});

		it('.path().unlink() can unlink test1.txt', function(){
			return fs.path(test_dir + '/test1.txt').unlink().exists().then(function(exists) {
				assert.strictEqual( exists, false );
			});
		});

		it('.path().mkdir() can create directories and .rmdir() can remove those', function(){
			var p = fs.path(test_dir + '/subdir');
			return p.mkdir().exists().then(function(exists) {
				assert.strictEqual( exists, true );
				return p;
			}).rmdir().exists().then(function(exists) {
				assert.strictEqual( exists, false );
				return fs;
			});
		});

		it('.path().readdir() can read directories', function(){
			return fs.path(test_dir).readdir().then(function(files) {
				assert.deepEqual( files, ["test1.txt"] );
			});
		});

		it('.path().utimes() can change file timestamps', function(){
			var orig;
			var date = new Date(2013, 6, 20, 12, 1, 2);
			var p = fs.path(test_dir + '/test1.txt');
			return p.stat().then(function(f) {
				orig = f;
				return p;
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
			});
		});

		it('.path().readFile() can read files', function(){
			return fs.path(test_dir + "/test1.txt").readFile({encoding:"utf8"}).then(function(data) {
				assert.strictEqual( data, "Hello World" );
			});
		});

		it('.path().appendFile() can append to tmp/test1.txt', function(){
			return fs.path(test_dir + '/test1.txt').appendFile(' -- How is it working?').readFile({encoding:"utf8"}).then(function(data) {
				assert.strictEqual( data, "Hello World -- How is it working?" );
			});
		});

		it('.path().lstat() can stat files from symlinks', function(){
			var orig;
			var p = fs.path(test_dir + '/test1.txt');
			return p.stat().then(function(f) {
				orig = f;
				return p;
			}).symlink(test_dir + '/test2.txt').then(function() {
				return fs.lstat(test_dir + '/test2.txt');
			}).then(function(f) {
				assert.notStrictEqual( f.ino, orig.ino );
				assert.notStrictEqual( f.size, orig.size );
			}).fin(function() {
				return fs.unlink(test_dir + '/test2.txt');
			});
		});

		it('.path().open() can open files and fs.fstat(fd) it, and then fs.close(fd)', function(){
			var orig, fd;
			var p = fs.path(test_dir + '/test1.txt');
			return p.stat().then(function(f) {
				orig = f;
				return p;
			}).open('r').then(function(f) {
				fd = f;
				return fs;
			}).then(function(fs) {
				return fs.fstat(fd.valueOf());
			}).then(function(f) {
				assert.strictEqual( f.ino, orig.ino );
				assert.strictEqual( f.size, orig.size );
			}).fin(function() {
				return fs.close(fd.valueOf());
			});
		});

		it('.path().open() can open files and fd.stat() it, and then fd.close()', function(){
			var orig, fd;
			var p = fs.path(test_dir + '/test1.txt');
			return p.stat().then(function(f) {
				orig = f;
				return p;
			}).open('r').then(function(f) {
				return fd = f;
			}).stat().then(function(f) {
				assert.strictEqual( f.ino, orig.ino );
				assert.strictEqual( f.size, orig.size );
			}).fin(function() {
				return fd.close();
			});
		});

	});

});

/* EOF */
