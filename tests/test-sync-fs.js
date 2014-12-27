"use strict";

var debug = require('nor-debug');
var is = require('nor-is');
var assert = require('assert');

/* */
describe('sync-fs', function(){
	var fs = require('../src/index.js');
	var SyncFileSystem = require('../src/SyncFileSystem.js');
	var SyncFilePath = require('../src/SyncFilePath.js');
	var SyncFileDescriptor = require('../src/SyncFileDescriptor.js');

	describe('.SyncFileSystem', function(){
		it('should be same as SyncFileSystem', function(){
			assert.strictEqual(fs.SyncFileSystem, SyncFileSystem);
		});
	});

	describe('.sync.Descriptor', function(){
		it('should be same as SyncFileDescriptor', function(){
			assert.strictEqual(fs.sync.Descriptor, SyncFileDescriptor);
		});
	});

	describe('.sync.Path', function(){
		it('should be same as SyncFilePath', function(){
			assert.strictEqual(fs.sync.Path, SyncFilePath);
		});
	});

describe('sync', function(){
	var syncfs = fs.sync;

	it('should be an instance of SyncFileSystem', function(){
		assert.strictEqual(true, is.objOf(syncfs, SyncFileSystem));
	});


	it('.rename is callable',     function(){ assert.strictEqual(typeof syncfs.rename, 'function'); });
	it('.ftruncate is callable',  function(){ assert.strictEqual(typeof syncfs.ftruncate, 'function'); });
	it('.truncate is callable',   function(){ assert.strictEqual(typeof syncfs.truncate, 'function'); });
	it('.chown is callable',      function(){ assert.strictEqual(typeof syncfs.chown, 'function'); });
	it('.fchown is callable',     function(){ assert.strictEqual(typeof syncfs.fchown, 'function'); });
	it('.chmod is callable',      function(){ assert.strictEqual(typeof syncfs.chmod, 'function'); });
	it('.fchmod is callable',     function(){ assert.strictEqual(typeof syncfs.fchmod, 'function'); });
	it('.stat is callable',       function(){ assert.strictEqual(typeof syncfs.stat, 'function'); });
	it('.lstat is callable',      function(){ assert.strictEqual(typeof syncfs.lstat, 'function'); });
	it('.fstat is callable',      function(){ assert.strictEqual(typeof syncfs.fstat, 'function'); });
	it('.link is callable',       function(){ assert.strictEqual(typeof syncfs.link, 'function'); });
	it('.symlink is callable',    function(){ assert.strictEqual(typeof syncfs.symlink, 'function'); });
	it('.readlink is callable',   function(){ assert.strictEqual(typeof syncfs.readlink, 'function'); });
	it('.realpath is callable',   function(){ assert.strictEqual(typeof syncfs.realpath, 'function'); });
	it('.unlink is callable',     function(){ assert.strictEqual(typeof syncfs.unlink, 'function'); });
	it('.rmdir is callable',      function(){ assert.strictEqual(typeof syncfs.rmdir, 'function'); });
	it('.mkdir is callable',      function(){ assert.strictEqual(typeof syncfs.mkdir, 'function'); });
	it('.readdir is callable',    function(){ assert.strictEqual(typeof syncfs.readdir, 'function'); });
	it('.close is callable',      function(){ assert.strictEqual(typeof syncfs.close, 'function'); });
	it('.open is callable',       function(){ assert.strictEqual(typeof syncfs.open, 'function'); });
	it('.utimes is callable',     function(){ assert.strictEqual(typeof syncfs.utimes, 'function'); });
	it('.futimes is callable',    function(){ assert.strictEqual(typeof syncfs.futimes, 'function'); });
	it('.fsync is callable',      function(){ assert.strictEqual(typeof syncfs.fsync, 'function'); });
	it('.write is callable',      function(){ assert.strictEqual(typeof syncfs.write, 'function'); });
	it('.read is callable',       function(){ assert.strictEqual(typeof syncfs.read, 'function'); });
	it('.readFile is callable',   function(){ assert.strictEqual(typeof syncfs.readFile, 'function'); });
	it('.writeFile is callable',  function(){ assert.strictEqual(typeof syncfs.writeFile, 'function'); });
	it('.appendFile is callable', function(){ assert.strictEqual(typeof syncfs.appendFile, 'function'); });
	it('.exists is callable',     function(){ assert.strictEqual(typeof syncfs.exists, 'function'); });

	// These are only available on Mac OS X
	it.skip('.lchown is callable',     function(){ assert.strictEqual(typeof syncfs.lchown, 'function'); });
	it.skip('.lchmod is callable',     function(){ assert.strictEqual(typeof syncfs.lchmod, 'function'); });

	describe('tests', function(){

		var test_dir = __dirname + "/tmp";

		beforeEach(function(){
			return fs.unlinkIfExists(test_dir + '/test1.txt')
			  .unlinkIfExists(test_dir + '/test2.txt')
			  .unlinkIfExists(test_dir + '/test3.txt')
			  .mkdirIfMissing(test_dir, parseInt("0700", 8))
			  .writeFile(test_dir + '/test1.txt', 'Hello World', {encoding:'utf8', mode:parseInt("0644", 8)})
			  .stat(test_dir + '/test1.txt').then(function(f) {
				assert.strictEqual( f.size, 'Hello World'.length );
				assert.strictEqual( f.mode, parseInt("100644", 8) );
			});
		});

		afterEach(function(){
			return fs.unlinkIfExists(test_dir + '/test1.txt')
			  .unlinkIfExists(test_dir + '/test2.txt')
			  .unlinkIfExists(test_dir + '/test3.txt')
			  .rmdirIfExists(test_dir);
		});

		it('.writeFile() can create tmp/test3.txt', function(){
			var exists = syncfs.writeFile(test_dir + '/test3.txt', 'Hello World').exists(test_dir + '/test3.txt');
			assert.ok( ((exists === false) || (exists === true)) ? true : false );
			assert.strictEqual(exists, true);
		});

		it('.writeFile() can create tmp/test3.txt (with encoding:utf8)', function(){
			var exists = syncfs.writeFile(test_dir + '/test3.txt', 'Hello World', {encoding:'utf8'}).exists(test_dir + '/test3.txt');
			assert.ok( ((exists === false) || (exists === true)) ? true : false );
			assert.strictEqual(exists, true);
		});

		it('.writeFile() can create tmp/test3.txt (with encoding:utf8, mode:0644) -- using mode as string', function(){
			var exists = syncfs.writeFile(test_dir + '/test3.txt', 'Hello World', {encoding:'utf8', mode:"0644"}).exists(test_dir + '/test3.txt');
			assert.ok( ((exists === false) || (exists === true)) ? true : false );
			assert.strictEqual(exists, true);

			var f = syncfs.stat(test_dir + '/test3.txt');
			assert.strictEqual( f.size, 'Hello World'.length );
			assert.strictEqual( f.mode, parseInt("100644", 8) );
		});

		it('.writeFile() can create tmp/test3.txt (with encoding:utf8, mode:0644) -- using mode as number', function(){
			var exists = syncfs.writeFile(test_dir + '/test3.txt', 'Hello World', {encoding:'utf8', mode:parseInt("0644", 8)}).exists(test_dir + '/test3.txt');
			assert.ok( ((exists === false) || (exists === true)) ? true : false );
			assert.strictEqual(exists, true);

			var f = syncfs.stat(test_dir + '/test3.txt');
			assert.strictEqual( f.size, 'Hello World'.length );
			assert.strictEqual( f.mode, parseInt("100644", 8) );
		});

		it('.exists() can detect tmp/test1.txt', function(){
			var exists = syncfs.exists(test_dir + '/test1.txt');
			assert.ok( ((exists === false) || (exists === true)) ? true : false );
			assert.strictEqual(exists, true);
		});

		it('.exists() cannot detect tmp/test2.txt', function(){
			var exists = syncfs.exists(test_dir + '/test2.txt');
			assert.ok( ((exists === false) || (exists === true)) ? true : false );
			assert.strictEqual(exists, false);
		});

		it('.rename() can rename tmp/test1.txt to tmp/test2.txt', function(){
			syncfs.rename(test_dir + '/test1.txt', test_dir+'/test2.txt');
		});

		it('.stat() can detect mode=0644 and size=11', function(){
			var f = syncfs.stat(test_dir + '/test1.txt');
			assert.strictEqual( f.size, 11 );
			assert.strictEqual( f.mode, parseInt('100644', 8) );
		});

		it('.chmod() can chmod tmp/test1.txt to 0600 -- using mode as string', function(){
			var f = syncfs.stat(test_dir + '/test1.txt');
			assert.strictEqual( f.mode, parseInt("100644", 8) );
			f = syncfs.chmod(test_dir + '/test1.txt', '0600').stat(test_dir + '/test1.txt')
			assert.strictEqual( f.mode, parseInt("100600", 8) );
		});

		it('.chmod() can chmod tmp/test1.txt to 0600 -- using mode as number', function(){
			var f = syncfs.stat(test_dir + '/test1.txt');
			assert.strictEqual( f.mode, parseInt("100644", 8) );
			f = syncfs.chmod(test_dir + '/test1.txt', parseInt('0600', 8)).stat(test_dir + '/test1.txt')
			assert.strictEqual( f.mode, parseInt("100600", 8) );
		});

		it('.truncate() can truncate tmp/test1.txt to size 8', function(){
			var f = syncfs.stat(test_dir + '/test1.txt');
			assert.strictEqual( f.size, 11 );
			f = syncfs.truncate(test_dir + '/test1.txt', 8).stat(test_dir + '/test1.txt');
			assert.strictEqual( f.size, 8 );
		});

		it('.chown() can change tmp/test1.txt to own uid, gid', function(){
			// FIXME: This should be tested somehow better
			var f = syncfs.stat(test_dir + '/test1.txt');
			assert.strictEqual( f.uid, process.getuid() );
			assert.strictEqual( f.gid, process.getgid() );
			f = syncfs.chown(test_dir + '/test1.txt', process.getuid(), process.getgid()).stat(test_dir + '/test1.txt');
			assert.strictEqual( f.uid, process.getuid() );
			assert.strictEqual( f.gid, process.getgid() );
		});

		it('.link() can link tmp/test2.txt as tmp/test1.txt', function(){
			var orig = syncfs.stat(test_dir + '/test1.txt');
			var f = syncfs.link(test_dir + '/test1.txt', test_dir + '/test2.txt').stat(test_dir + '/test2.txt');
			assert.strictEqual( ''+f.ctime, ''+orig.ctime );
			assert.strictEqual( f.size, orig.size );
			assert.strictEqual( f.ino, orig.ino );
		});

		it('.symlink() can symlink tmp/test2.txt as tmp/test1.txt', function(){
			try {
				var orig = syncfs.stat(test_dir + '/test1.txt');
				var f = syncfs.symlink(test_dir + '/test1.txt', test_dir + '/test2.txt').stat(test_dir + '/test2.txt');
				assert.strictEqual( ''+f.ctime, ''+orig.ctime );
				assert.strictEqual( f.size, orig.size );
				assert.strictEqual( f.ino, orig.ino );
			} finally {
				syncfs.unlink(test_dir + '/test2.txt');
			}
		});

		it('.readlink() can read a symlinks', function(){
			try {
				var orig = syncfs.stat(test_dir + '/test1.txt');
				var f = syncfs.symlink(test_dir + '/test1.txt', test_dir + '/test2.txt').stat(test_dir + '/test2.txt');
				assert.strictEqual( ''+f.ctime, ''+orig.ctime );
				assert.strictEqual( f.size, orig.size );
				assert.strictEqual( f.ino, orig.ino );
				var linkString = syncfs.readlink(test_dir + '/test2.txt');
				assert.strictEqual( linkString, test_dir+'/test1.txt' );
			} finally {
				syncfs.unlink(test_dir + '/test2.txt');
			}
		});

		it('.realpath() can resolve path', function(){
			try {
				var orig = syncfs.stat(test_dir + '/test1.txt');
				var f = syncfs.symlink(test_dir + '/test1.txt', test_dir + '/test2.txt').stat(test_dir + '/test2.txt');
				assert.strictEqual( ''+f.ctime, ''+orig.ctime );
				assert.strictEqual( f.size, orig.size );
				assert.strictEqual( f.ino, orig.ino );
				var resolvedPath = syncfs.realpath(test_dir + '/test2.txt');
				assert.strictEqual( resolvedPath, test_dir+'/test1.txt' );
			} finally {
				syncfs.unlink(test_dir + '/test2.txt');
			}
		});

		it('.unlink() can unlink test1.txt', function(){
			var exists = syncfs.unlink(test_dir + '/test1.txt').exists(test_dir + '/test1.txt');
			assert.strictEqual( exists, false );
		});

		it('.mkdir() can create directories and .rmdir() can remove those', function(){
			var exists = syncfs.mkdir(test_dir + '/subdir').exists(test_dir + '/subdir');
			assert.strictEqual( exists, true );
			exists = syncfs.rmdir(test_dir + '/subdir').exists(test_dir + '/subdir');
			assert.strictEqual( exists, false );
		});

		it('.readdir() can read directories', function(){
			var files = syncfs.readdir(test_dir);
			assert.deepEqual( files, ["test1.txt"] );
		});

		it('.utimes() can change file timestamps', function(){
			var date = new Date(2013, 6, 20, 12, 1, 2);
			var orig = syncfs.stat(test_dir + '/test1.txt');
			var f = syncfs.utimes(test_dir + '/test1.txt', date, date).stat(test_dir + '/test1.txt');
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

		it('.readFile() can read files', function(){
			var data = syncfs.readFile(test_dir + "/test1.txt", {encoding:"utf8"});
			assert.strictEqual( data, "Hello World" );
		});

		it('.appendFile() can append to tmp/test1.txt', function(){
			var data = syncfs.appendFile(test_dir + '/test1.txt', ' -- How is it working?').readFile(test_dir + "/test1.txt", {encoding:"utf8"});
			assert.strictEqual( data, "Hello World -- How is it working?" );
		});

		it('.lstat() can stat files from symlinks', function(){
			try {
				var orig = syncfs.stat(test_dir + '/test1.txt');
				var f = syncfs.symlink(test_dir + '/test1.txt', test_dir + '/test2.txt').lstat(test_dir + '/test2.txt');
				assert.notStrictEqual( f.ino, orig.ino );
				assert.notStrictEqual( f.size, orig.size );
			} finally {
				syncfs.unlink(test_dir + '/test2.txt');
			}
		});

		it('.open() can open files and syncfs.fstat(fd) it, and then syncfs.close(fd)', function(){
			var fd;
			try {
				var orig = syncfs.stat(test_dir + '/test1.txt');
				fd = syncfs.open(test_dir + '/test1.txt', 'r');
				var f = syncfs.fstat(fd.valueOf());
				assert.strictEqual( f.ino, orig.ino );
				assert.strictEqual( f.size, orig.size );
			} finally {
				syncfs.close(fd.valueOf());
			}
		});

		it('.open() can open files and fd.stat() it, and then fd.close()', function(){
			var orig, fd;
			try {
				orig = syncfs.stat(test_dir + '/test1.txt');
				fd = syncfs.open(test_dir + '/test1.txt', 'r');
				var f = fd.stat();
				assert.strictEqual( f.ino, orig.ino );
				assert.strictEqual( f.size, orig.size );
			} finally {
				if(fd) {
					fd.close();
				}
			}
		});

		it('.ftruncate(fd) can truncate tmp/test1.txt to size 8', function(){
			var fd, f;
			try {
				f = syncfs.stat(test_dir + '/test1.txt');
				assert.strictEqual( f.size, 11 );
				fd = syncfs.open(test_dir + '/test1.txt', 'w+');
				f = syncfs.ftruncate(fd.valueOf(), 8).fstat(fd.valueOf());
				assert.strictEqual( f.size, 8 );
			} finally {
				syncfs.close(fd.valueOf());
			}
		});

		it('fd.truncate() can truncate tmp/test1.txt to size 8', function(){
			var fd, f;
			try {
				f = syncfs.stat(test_dir + '/test1.txt')
				assert.strictEqual( f.size, 11 );
				fd = syncfs.open(test_dir + '/test1.txt', 'w+');
				f = fd.truncate(8).stat();
				assert.strictEqual( f.size, 8 );
			} finally {
				if(fd) {
					fd.close();
				}
			}
		});


		it('fd.chown() can change tmp/test1.txt to own uid, gid', function(){
			// FIXME: This should be tested somehow better
			var fd, f;
			try {
				f = syncfs.stat(test_dir + '/test1.txt');
				assert.strictEqual( f.uid, process.getuid() );
				assert.strictEqual( f.gid, process.getgid() );
				fd = syncfs.open(test_dir + '/test1.txt', 'w+');
				f = fd.chown(process.getuid(), process.getgid()).stat();
				assert.strictEqual( f.uid, process.getuid() );
				assert.strictEqual( f.gid, process.getgid() );
			} finally {
				if(fd) {
					fd.close();
				}
			}
		});

		it('.fchown(fd) can change tmp/test1.txt to own uid, gid', function(){
			// FIXME: This should be tested somehow better
			var fd, f;
			try {
				f = syncfs.stat(test_dir + '/test1.txt');
				assert.strictEqual( f.uid, process.getuid() );
				assert.strictEqual( f.gid, process.getgid() );
				fd = syncfs.open(test_dir + '/test1.txt', 'w+');
				f = syncfs.fchown(fd.valueOf(), process.getuid(), process.getgid()).fstat(fd.valueOf());
				assert.strictEqual( f.uid, process.getuid() );
				assert.strictEqual( f.gid, process.getgid() );
			} finally {
				if(fd) {
					fd.close();
				}
			}
		});

		it('fd.chmod() can chmod tmp/test1.txt to 0600 -- using mode as string', function(){
			var fd, f;
			try {
				f = syncfs.stat(test_dir + '/test1.txt');
				assert.strictEqual( f.mode, parseInt("100644", 8) );
				fd = syncfs.open(test_dir + '/test1.txt', 'w+');
				f = fd.chmod('0600').stat();
				assert.strictEqual( f.mode, parseInt("100600", 8) );
			} finally {
				if(fd) {
					fd.close();
				}
			}
		});

		it('fd.chmod() can chmod tmp/test1.txt to 0600 -- using mode as number', function(){
			var fd, f;
			try {
				f = syncfs.stat(test_dir + '/test1.txt');
				assert.strictEqual( f.mode, parseInt("100644", 8) );
				fd = syncfs.open(test_dir + '/test1.txt', 'w+');
				f = fd.chmod(parseInt('0600', 8)).stat();
				assert.strictEqual( f.mode, parseInt("100600", 8) );
			} finally {
				if(fd) {
					fd.close();
				}
			}
		});

		it('.chmod(fd) can chmod tmp/test1.txt to 0600 -- using mode as string', function(){
			var fd, f;
			try {
				f = syncfs.stat(test_dir + '/test1.txt');
				assert.strictEqual( f.mode, parseInt("100644", 8) );
				fd = syncfs.open(test_dir + '/test1.txt', 'w+');
				f = syncfs.fchmod(fd.valueOf(), '0600').fstat(fd.valueOf());
				assert.strictEqual( f.mode, parseInt("100600", 8) );
			} finally {
				if(fd) {
					fd.close();
				}
			}
		});

		it('.chmod(fd) can chmod tmp/test1.txt to 0600 -- using mode as number', function(){
			var fd, f;
			try {

				f = syncfs.stat(test_dir + '/test1.txt');
				assert.strictEqual( f.mode, parseInt("100644", 8) );

				fd = syncfs.open(test_dir + '/test1.txt', 'w+');
				f = syncfs.fchmod(fd.valueOf(), parseInt('0600', 8)).fstat(fd.valueOf());
				assert.strictEqual( f.mode, parseInt("100600", 8) );
			} finally {
				if(fd) {
					fd.close();
				}
			}
		});

		it('fd.utimes() can change file timestamps', function(){
			var orig, fd, f;
			var date = new Date(2013, 6, 20, 12, 1, 2);
			try {
				orig = syncfs.stat(test_dir + '/test1.txt');
				fd = syncfs.open(test_dir + '/test1.txt', 'r');
				f = fd.utimes(date, date).stat();
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
			} finally {
				if(fd) {
					fd.close();
				}
			}
		});

		it('.futimes(fd) can change file timestamps', function(){
			var orig, fd, f;
			var date = new Date(2013, 6, 20, 12, 1, 2);
			try {
				orig = syncfs.stat(test_dir + '/test1.txt');
				fd = syncfs.open(test_dir + '/test1.txt', 'r');
				f = syncfs.futimes(fd.valueOf(), date, date).fstat(fd.valueOf());
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
			} finally {
				if(fd) {
					fd.close();
				}
			}
		});

		it('.write(fd, ...) can write to tmp/test2.txt and fs.sync.fsync(fd) works', function(){
			var fd, f;
			var buffer = new Buffer('Is it working yet?', 'utf8');
			try {
				var exists = syncfs.exists(test_dir + '/test2.txt');
				assert.strictEqual( exists, false );
				fd = syncfs.open(test_dir + '/test2.txt', 'w');
				var written = syncfs.write(fd.valueOf(), buffer, 0, 8, 11);
				assert.strictEqual( written, 8 );
				syncfs.fsync(fd.valueOf());
				f = syncfs.fstat(fd.valueOf());
				assert.strictEqual( f.size, 11 + 8 );
			} finally {
				syncfs.close(fd.valueOf());
			}
		});

		it('fd.write(...) can write to tmp/test2.txt and fd.sync() works', function(){
			var fd, f;
			var buffer = new Buffer('Is it working yet?', 'utf8');
			try {
				var exists = syncfs.exists(test_dir + '/test2.txt');
				assert.strictEqual( exists, false );
				fd = syncfs.open(test_dir + '/test2.txt', 'w');
				var written = fd.write(buffer, 0, 8, 11);
				assert.strictEqual( written, 8 );
				fd.sync();
				f = syncfs.fstat(fd.valueOf());
				assert.strictEqual( f.size, 11 + 8 );
			} finally {
				syncfs.close(fd.valueOf());
			}
		});

		it('.read(fd, ...) can read tmp/test1.txt', function(){
			var fd, f;
			var buffer = new Buffer('########', 'utf8');
			try {
				fd = syncfs.open(test_dir + '/test1.txt', 'r');
				var bytesRead = syncfs.read(fd.valueOf(), buffer, /* offset */ 0, /* length */ 8, /* position */ 0);
				assert.strictEqual( bytesRead, 8 );
			} finally {
				syncfs.close(fd.valueOf());
			}
		});

		it('fd.read(...) can read tmp/test1.txt', function(){
			var fd, f;
			var buffer = new Buffer('########', 'utf8');
			try {
				fd = syncfs.open(test_dir + '/test1.txt', 'r');
				var bytesRead = fd.read(buffer, /* offset */ 0, /* length */ 8, /* position */ 0);
				assert.strictEqual( bytesRead, 8 );
			} finally {
				syncfs.close(fd.valueOf());
			}
		});

	});

}); // sync
}); // fs

/* EOF */
