"use strict";

var is = require('nor-is');
var assert = require('assert');

/* */
describe('fs-sync-path', function(){

	var SyncFileSystem = require('../lib/SyncFileSystem.js');
	var SyncFilePath = require('../lib/SyncFilePath.js');

	var syncfs = require('../lib/index.js').sync;

	it('should be an instance of FileSystem', function(){
		assert.strictEqual(true, is.objOf(syncfs, SyncFileSystem));
	});

	describe('.sync.Path', function(){
		it('should be same as SyncFilePath', function(){
			assert.strictEqual(syncfs.Path, SyncFilePath);
		});
	});

	describe('SyncFilePath.prototype', function(){
		it('.rename is callable',     function(){ assert.strictEqual(typeof SyncFilePath.prototype.rename, 'function'); });
		it('.truncate is callable',   function(){ assert.strictEqual(typeof SyncFilePath.prototype.truncate, 'function'); });
		it('.chown is callable',      function(){ assert.strictEqual(typeof SyncFilePath.prototype.chown, 'function'); });
		it('.chmod is callable',      function(){ assert.strictEqual(typeof SyncFilePath.prototype.chmod, 'function'); });
		it('.stat is callable',       function(){ assert.strictEqual(typeof SyncFilePath.prototype.stat, 'function'); });
		it('.lstat is callable',      function(){ assert.strictEqual(typeof SyncFilePath.prototype.lstat, 'function'); });
		it('.link is callable',       function(){ assert.strictEqual(typeof SyncFilePath.prototype.link, 'function'); });
		it('.symlink is callable',    function(){ assert.strictEqual(typeof SyncFilePath.prototype.symlink, 'function'); });
		it('.readlink is callable',   function(){ assert.strictEqual(typeof SyncFilePath.prototype.readlink, 'function'); });
		it('.realpath is callable',   function(){ assert.strictEqual(typeof SyncFilePath.prototype.realpath, 'function'); });
		it('.unlink is callable',     function(){ assert.strictEqual(typeof SyncFilePath.prototype.unlink, 'function'); });
		it('.rmdir is callable',      function(){ assert.strictEqual(typeof SyncFilePath.prototype.rmdir, 'function'); });
		it('.mkdir is callable',      function(){ assert.strictEqual(typeof SyncFilePath.prototype.mkdir, 'function'); });
		it('.readdir is callable',    function(){ assert.strictEqual(typeof SyncFilePath.prototype.readdir, 'function'); });
		it('.open is callable',       function(){ assert.strictEqual(typeof SyncFilePath.prototype.open, 'function'); });
		it('.utimes is callable',     function(){ assert.strictEqual(typeof SyncFilePath.prototype.utimes, 'function'); });
		it('.readFile is callable',   function(){ assert.strictEqual(typeof SyncFilePath.prototype.readFile, 'function'); });
		it('.writeFile is callable',  function(){ assert.strictEqual(typeof SyncFilePath.prototype.writeFile, 'function'); });
		it('.appendFile is callable', function(){ assert.strictEqual(typeof SyncFilePath.prototype.appendFile, 'function'); });
		it('.exists is callable',     function(){ assert.strictEqual(typeof SyncFilePath.prototype.exists, 'function'); });
	
		it('.unlinkIfExists is callable',     function(){ assert.strictEqual(typeof SyncFilePath.prototype.unlinkIfExists, 'function'); });
		it('.rmdirIfExists is callable',      function(){ assert.strictEqual(typeof SyncFilePath.prototype.rmdirIfExists, 'function'); });
		it('.mkdirIfMissing is callable',      function(){ assert.strictEqual(typeof SyncFilePath.prototype.mkdirIfMissing, 'function'); });

		// These are only available on Mac OS X
		it.skip('.lchown is callable',     function(){ assert.strictEqual(typeof SyncFilePath.prototype.lchown, 'function'); });
		it.skip('.lchmod is callable',     function(){ assert.strictEqual(typeof SyncFilePath.prototype.lchmod, 'function'); });

	});

	describe('tests', function(){
		
		var test_dir = __dirname + "/tmp";
		
		beforeEach(function(){
			syncfs.unlinkIfExists(test_dir + '/test1.txt')
			  .unlinkIfExists(test_dir + '/test2.txt')
			  .unlinkIfExists(test_dir + '/test3.txt')
			  .mkdirIfMissing(test_dir, "0700")
			  .writeFile(test_dir + '/test1.txt', 'Hello World', {encoding:'utf8', mode:"0644"});
		});

		afterEach(function(){
			syncfs.unlinkIfExists(test_dir + '/test1.txt')
			  .unlinkIfExists(test_dir + '/test2.txt')
			  .unlinkIfExists(test_dir + '/test3.txt')
			  .rmdirIfExists(test_dir);
		});

		it('.path().writeFile() can create tmp/test3.txt', function(){
			var exists = syncfs.path(test_dir + '/test3.txt').writeFile('Hello World').exists();
			assert.ok( ((exists === false) || (exists === true)) ? true : false );
			assert.strictEqual(exists, true);
		});

		it('.path().writeFile() can create tmp/test3.txt (with encoding:utf8)', function(){
			var exists = syncfs.path(test_dir + '/test3.txt').writeFile('Hello World', {encoding:'utf8'}).exists();
			assert.ok( ((exists === false) || (exists === true)) ? true : false );
			assert.strictEqual(exists, true);
		});

		it('.path().writeFile() can create tmp/test3.txt (with encoding:utf8, mode:0644)', function(){
			var exists = syncfs.path(test_dir + '/test3.txt').writeFile('Hello World', {encoding:'utf8', mode:"0644"}).exists();
			assert.ok( ((exists === false) || (exists === true)) ? true : false );
			assert.strictEqual(exists, true);
		});

		it('.path().exists() can detect tmp/test1.txt', function(){
			var exists = syncfs.path(test_dir + '/test1.txt').exists();
			assert.ok( ((exists === false) || (exists === true)) ? true : false );
			assert.strictEqual(exists, true);
		});

		it('.path().exists() cannot detect tmp/test2.txt', function(){
			var exists = syncfs.path(test_dir + '/test2.txt').exists();
			assert.ok( ((exists === false) || (exists === true)) ? true : false );
			assert.strictEqual(exists, false);
		});

		it('.path().rename() can rename tmp/test1.txt to tmp/test2.txt', function(){
			syncfs.path(test_dir + '/test1.txt').rename(test_dir+'/test2.txt');
		});

		it('.path().stat() can detect mode=0644 and size=11', function(){
			var f = syncfs.path(test_dir + '/test1.txt').stat();
			assert.strictEqual( f.size, 11 );
			assert.strictEqual( parseInt(f.mode.toString(8), 10), 100644 );
		});

		it('.path().chmod() can chmod tmp/test1.txt to 0600', function(){
			var p = syncfs.path(test_dir + '/test1.txt');
			var f = p.stat();
			assert.strictEqual( parseInt(f.mode.toString(8), 10), 100644 );
			f = p.chmod('0600').stat();
			assert.strictEqual( parseInt(f.mode.toString(8), 10), 100600 );
		});

		it('.path().truncate() can truncate tmp/test1.txt to size 8', function(){
			var p = syncfs.path(test_dir + '/test1.txt');
			var f = p.stat();
			assert.strictEqual( f.size, 11 );
			f = p.truncate(8).stat();
			assert.strictEqual( f.size, 8 );
		});

		it('.path().chown() can change tmp/test1.txt to own uid, gid', function(){
			// FIXME: This should be tested somehow better
			var p = syncfs.path(test_dir + '/test1.txt');
			var f = p.stat();
			assert.strictEqual( f.uid, process.getuid() );
			assert.strictEqual( f.gid, process.getgid() );
			f = p.chown(process.getuid(), process.getgid()).stat();
			assert.strictEqual( f.uid, process.getuid() );
			assert.strictEqual( f.gid, process.getgid() );
		});

		it('.path().link() can link tmp/test2.txt as tmp/test1.txt', function(){
			var p = syncfs.path(test_dir + '/test1.txt');
			var orig = p.stat();
			p.link(test_dir + '/test2.txt');
			var f = syncfs.stat(test_dir + '/test2.txt');
			assert.strictEqual( ''+f.ctime, ''+orig.ctime );
			assert.strictEqual( f.size, orig.size );
			assert.strictEqual( f.ino, orig.ino );
		});

		it('.path().symlink() can symlink tmp/test2.txt as tmp/test1.txt', function(){
			var orig;
			var p = syncfs.path(test_dir + '/test1.txt');
			try {
				orig = p.stat();
				p.symlink(test_dir + '/test2.txt');
				var f = syncfs.stat(test_dir + '/test2.txt');
				assert.strictEqual( ''+f.ctime, ''+orig.ctime );
				assert.strictEqual( f.size, orig.size );
				assert.strictEqual( f.ino, orig.ino );
			} finally {
				syncfs.unlink(test_dir + '/test2.txt');
			}
		});

		it('.path().readlink() can read a symlinks', function(){
			var orig;
			try {
				var p = syncfs.path(test_dir + '/test1.txt');
				var p2 = syncfs.path(test_dir + '/test2.txt');
				orig = p.stat();
				p.symlink(test_dir + '/test2.txt');
				var f = p2.stat();
				assert.strictEqual( ''+f.ctime, ''+orig.ctime );
				assert.strictEqual( f.size, orig.size );
				assert.strictEqual( f.ino, orig.ino );
				var linkString = p2.readlink();
				assert.strictEqual( linkString, test_dir+'/test1.txt' );
			} finally {
				syncfs.unlink(test_dir + '/test2.txt');
			}
		});

		it('.path().realpath() can resolve path', function(){
			var orig;
			try {
				var p = syncfs.path(test_dir + '/test1.txt');
				var p2 = syncfs.path(test_dir + '/test2.txt');
				orig = p.stat();
				p.symlink(test_dir + '/test2.txt');
				var f = syncfs.stat(test_dir + '/test2.txt');
				assert.strictEqual( ''+f.ctime, ''+orig.ctime );
				assert.strictEqual( f.size, orig.size );
				assert.strictEqual( f.ino, orig.ino );
				var resolvedPath = p2.realpath();
				assert.strictEqual( resolvedPath, test_dir+'/test1.txt' );
			} finally {
				syncfs.unlink(test_dir + '/test2.txt');
			}
		});

		it('.path().unlink() can unlink test1.txt', function(){
			var exists = syncfs.path(test_dir + '/test1.txt').unlink().exists();
			assert.strictEqual( exists, false );
		});

		it('.path().mkdir() can create directories and .rmdir() can remove those', function(){
			var p = syncfs.path(test_dir + '/subdir');
			var exists = p.mkdir().exists();
			assert.strictEqual( exists, true );
			exists = p.rmdir().exists();
			assert.strictEqual( exists, false );
		});

		it('.path().readdir() can read directories', function(){
			var files = syncfs.path(test_dir).readdir();
			assert.deepEqual( files, ["test1.txt"] );
		});

		it('.path().utimes() can change file timestamps', function(){
			var orig;
			var date = new Date(2013, 6, 20, 12, 1, 2);
			var p = syncfs.path(test_dir + '/test1.txt');
			orig = p.stat();
			var f = p.utimes(date, date).stat();

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

		it('.path().readFile() can read files', function(){
			var data = syncfs.path(test_dir + "/test1.txt").readFile({encoding:"utf8"});
			assert.strictEqual( data, "Hello World" );
		});

		it('.path().appendFile() can append to tmp/test1.txt', function(){
			var data = syncfs.path(test_dir + '/test1.txt').appendFile(' -- How is it working?').readFile({encoding:"utf8"});
			assert.strictEqual( data, "Hello World -- How is it working?" );
		});

		it('.path().lstat() can stat files from symlinks', function(){
			var orig;
			try {
				var p = syncfs.path(test_dir + '/test1.txt');
				orig = p.stat();
				p.symlink(test_dir + '/test2.txt');
				var f = syncfs.lstat(test_dir + '/test2.txt');
				assert.notStrictEqual( f.ino, orig.ino );
				assert.notStrictEqual( f.size, orig.size );
			} finally {
				syncfs.unlink(test_dir + '/test2.txt');
			}
		});

		it('.path().open() can open files and syncfs.fstat(fd) it, and then syncfs.close(fd)', function(){
			var orig, fd;
			try {
				var p = syncfs.path(test_dir + '/test1.txt');
				orig = p.stat();
				fd = p.open('r');
				var f = syncfs.fstat(fd.valueOf());
				assert.strictEqual( f.ino, orig.ino );
				assert.strictEqual( f.size, orig.size );
			} finally {
				syncfs.close(fd.valueOf());
			}
		});

		it('.path().open() can open files and fd.stat() it, and then fd.close()', function(){
			var orig, fd;
			try {
				var p = syncfs.path(test_dir + '/test1.txt');
				orig = p.stat();
				fd = p.open('r');
				var f = fd.stat();
				assert.strictEqual( f.ino, orig.ino );
				assert.strictEqual( f.size, orig.size );
			} finally {
				fd.close();
			}
		});

	});

});

/* EOF */
