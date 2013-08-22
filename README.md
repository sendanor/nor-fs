nor-fs
======

Description
-----------

Asynchronous filesystem library with [chainable Q promises](https://github.com/sendanor/nor-extend) for [Node.js](http://nodejs.org/).

Sample Use Case
---------------

So, let's say you need to do something with the filesystem with [Node.js](http://nodejs.org/). 

Obviously you want to do it **asynchronously**. Otherwise simply use [Node's fs](http://nodejs.org/api/fs.html). It has good synchronous methods -- although 
I fear [they aren't chainable](#Support-for-chainable-synchronous-calls).

You also want to use [Q promises](https://github.com/kriskowal/q). Sure, you could use [q-io](https://github.com/kriskowal/q-io) -- but still, you feel you're missing something. It's not user friendly. It could be simpler.

The solution for the problem is to use our library which uses both [Q](https://github.com/kriskowal/q) and [nor-extend](https://github.com/sendanor/nor-extend) to enable 
chainable promises.

Here's an example of creating a file named `hello.txt` and changing permissions:

	fs.writeFile('hello.txt', 'Hello World').chmod('hello.txt', 600).chown('hello.txt', 1000, 1000).then(function() {
		console.log('hello.txt created succesfully');
	}).fail(function(err) {
		console.error('Error: Failed to create hello.txt: ' + err);
	}).done();

Here's how you would need to do it with traditional promises:

	fs.writeFile('hello.txt', 'Hello World').then(function() {
		return fs.chmod('hello.txt', 600);
	}).then(function() {
		return fs.chown('hello.txt', 1000, 1000);
	}).then(function() {
		console.log('hello.txt created succesfully');
	}).fail(function(err) {
		console.error('Error: Failed to create hello.txt: ' + err);
	}).done();

Install
-------

Not yet published.

Documentation
-------------

**Warning!** These are **not** implemented yet.

### fs

The root of the library is an instance of `fs.FileSystem`.

### fs.FileSystem()

The constructor of the `FileSystem` objects.

### fs.FileDescriptor(fd)

The constructor of the `FileDescriptor` objects.

It takes single argument `fd` and if not defined will throw `TypeError` as exception.

Each `FileDescriptor` object will have a propery of `.fd`.

### fs.rename(oldPath, newPath)

See (Node's fs.rename)[http://nodejs.org/api/fs.html#fs_fs_rename_oldpath_newpath_callback].

### fs.ftruncate(fd, len, callback)
### fs.truncate(path, len, callback)
### fs.chown(path, uid, gid, callback)
### fs.fchown(fd, uid, gid, callback)
### fs.lchown(path, uid, gid, callback)
### fs.chmod(path, mode, callback)
### fs.fchmod(fd, mode, callback)
### fs.lchmod(path, mode, callback)
### fs.stat(path, callback)
### fs.lstat(path, callback)
### fs.fstat(fd, callback)
### fs.link(srcpath, dstpath, callback)
### fs.symlink(srcpath, dstpath, [type], callback)
### fs.readlink(path, callback)
### fs.realpath(path, [cache], callback)
### fs.unlink(path, callback)
### fs.rmdir(path, callback)
### fs.mkdir(path, [mode], callback)
### fs.readdir(path, callback)
### fs.close(fd, callback)
### fs.open(path, flags, [mode], callback)
### fs.utimes(path, atime, mtime, callback)
### fs.futimes(fd, atime, mtime, callback)
### fs.fsync(fd, callback)
### fs.write(fd, buffer, offset, length, position, callback)
### fs.read(fd, buffer, offset, length, position, callback)
### fs.readFile(filename, [options], callback)
### fs.writeFile(filename, data, [options], callback)
### fs.appendFile(filename, data, [options], callback)
### fs.watchFile(filename, [options], listener)
### fs.unwatchFile(filename, [listener])
### fs.watch(filename, [options], [listener])
### fs.exists(path, callback)
### Class: fs.Stats

TODO
----

* [Documentation](#Documentation)
* [Tests](#Tests)
* [Support for chainable synchronous calls](#Support-for-chainable-synchronous-calls)
* [Support for fs.ReadStream and fs.WriteStream](#Support-for-fs.ReadStream-and-fs.WriteStream)
* [Support for watch features](#Support-for-watch-features)

Support for chainable synchronous calls
---------------------------------------

Since `fs.*Sync()` calls probably don't return instances of fs, there could be chainable wrapper for them.

**Warning!** These are **not** implemented yet.

### fs.renameSync(oldPath, newPath)
### fs.ftruncateSync(fd, len)
### fs.truncateSync(path, len)
### fs.chownSync(path, uid, gid)
### fs.fchownSync(fd, uid, gid)
### fs.lchownSync(path, uid, gid)
### fs.chmodSync(path, mode)
### fs.fchmodSync(fd, mode)
### fs.lchmodSync(path, mode)
### fs.statSync(path)
### fs.lstatSync(path)
### fs.fstatSync(fd)
### fs.linkSync(srcpath, dstpath)
### fs.symlinkSync(srcpath, dstpath, [type])
### fs.readlinkSync(path)
### fs.realpathSync(path, [cache])
### fs.unlinkSync(path)
### fs.rmdirSync(path)
### fs.mkdirSync(path, [mode])
### fs.readdirSync(path)
### fs.closeSync(fd)
### fs.openSync(path, flags, [mode])
### fs.utimesSync(path, atime, mtime)
### fs.futimesSync(fd, atime, mtime)
### fs.fsyncSync(fd)
### fs.writeSync(fd, buffer, offset, length, position)
### fs.readSync(fd, buffer, offset, length, position)
### fs.readFileSync(filename, [options])
### fs.writeFileSync(filename, data, [options])
### fs.appendFileSync(filename, data, [options])
### fs.existsSync(path)

Support for fs.ReadStream and fs.WriteStream
--------------------------------------------

**Warning!** These are **not** implemented yet.

### fs.createReadStream(path, [options])
### Class: fs.ReadStream
#### Event: 'open'
### fs.createWriteStream(path, [options])
### Class: fs.WriteStream
#### Event: 'open'
#### file.bytesWritten

Support for watch features
--------------------------

**Warning!** These are **not** implemented yet.

### Class: fs.FSWatcher
#### watcher.close()
#### Event: 'change'
#### Event: 'error'

Tests
-----

Tests can be run by `npm test`.

We're working on tests at the moment.

Licence
-------

The MIT License (MIT), see [the LICENCE file](https://raw.github.com/Sendanor/nor-fs/master/LICENSE).

