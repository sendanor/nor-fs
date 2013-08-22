nor-fs
======

Description
-----------

Asynchronous filesystem library with chainable Q-based promises for [Node.js](http://nodejs.org/).

Sample Use Case
---------------

So, let's say you need to **do something** with the filesystem and [Node.js](http://nodejs.org/). 

Obviously you want to do it **asynchronously**. Otherwise simply use [fs](http://nodejs.org/api/fs.html). It already has pretty good synchronous API -- although 
I fear [they still aren't chainable](#support-for-chainable-synchronous-calls).

You also want to use [promises](https://github.com/kriskowal/q).

Sure, you could use [q-io](https://github.com/kriskowal/q-io) -- but you would still feel like you're missing something, it could be easier and simpler!

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

### require('nor-fs')

The root of the library is an instance of [FileSystem](#class-filesystem).

It has these properties:

* [fs.FileSystem](#class-filesystem)
* [fs.FileDescriptor](#class-filedescriptor)

Class FileSystem
----------------

### new FileSystem()

The constructor of the `FileSystem` objects.

**Warning!** You **should not** need to use it directly. However if you find any essential use for it in the userland, we would like hear it!

### fs.rename(oldPath, newPath)

Renames a file from `oldPath` to `newPath`.

**Warning!** It is **not** implemented yet.

See (fs.rename in Node.js)[http://nodejs.org/api/fs.html#fs_fs_rename_oldpath_newpath_callback].

### fs.ftruncate(fd, len)

**Warning!** It is **not** implemented yet.

See (fs.ftruncate in Node.js)[http://nodejs.org/api/fs.html#fs_fs_ftruncate_fd_len_callback].

### fs.truncate(path, len, callback)

**Warning!** It is **not** implemented yet.

See (fs.ftruncate in Node.js)[http://nodejs.org/api/fs.html#fs_fs_ftruncate_fd_len_callback].

### fs.chown(path, uid, gid, callback)

**Warning!** It is **not** implemented yet.

See (fs.ftruncate in Node.js)[http://nodejs.org/api/fs.html#fs_fs_ftruncate_fd_len_callback].

### fs.fchown(fd, uid, gid, callback)

**Warning!** It is **not** implemented yet.

See (fs.ftruncate in Node.js)[http://nodejs.org/api/fs.html#fs_fs_ftruncate_fd_len_callback].

### fs.lchown(path, uid, gid, callback)

**Warning!** It is **not** implemented yet.

See (fs.ftruncate in Node.js)[http://nodejs.org/api/fs.html#fs_fs_ftruncate_fd_len_callback].

### fs.chmod(path, mode, callback)

**Warning!** It is **not** implemented yet.

See (fs.ftruncate in Node.js)[http://nodejs.org/api/fs.html#fs_fs_ftruncate_fd_len_callback].

### fs.fchmod(fd, mode, callback)

**Warning!** It is **not** implemented yet.

See (fs.ftruncate in Node.js)[http://nodejs.org/api/fs.html#fs_fs_ftruncate_fd_len_callback].

### fs.lchmod(path, mode, callback)

**Warning!** It is **not** implemented yet.

See (fs.ftruncate in Node.js)[http://nodejs.org/api/fs.html#fs_fs_ftruncate_fd_len_callback].

### fs.stat(path, callback)

**Warning!** It is **not** implemented yet.

See (fs.ftruncate in Node.js)[http://nodejs.org/api/fs.html#fs_fs_ftruncate_fd_len_callback].

### fs.lstat(path, callback)

**Warning!** It is **not** implemented yet.

See (fs.ftruncate in Node.js)[http://nodejs.org/api/fs.html#fs_fs_ftruncate_fd_len_callback].

### fs.fstat(fd, callback)

**Warning!** It is **not** implemented yet.

See (fs.ftruncate in Node.js)[http://nodejs.org/api/fs.html#fs_fs_ftruncate_fd_len_callback].

### fs.link(srcpath, dstpath, callback)

**Warning!** It is **not** implemented yet.

See (fs.ftruncate in Node.js)[http://nodejs.org/api/fs.html#fs_fs_ftruncate_fd_len_callback].

### fs.symlink(srcpath, dstpath, [type], callback)

**Warning!** It is **not** implemented yet.

See (fs.ftruncate in Node.js)[http://nodejs.org/api/fs.html#fs_fs_ftruncate_fd_len_callback].

### fs.readlink(path, callback)

**Warning!** It is **not** implemented yet.

See (fs.ftruncate in Node.js)[http://nodejs.org/api/fs.html#fs_fs_ftruncate_fd_len_callback].

### fs.realpath(path, [cache], callback)

**Warning!** It is **not** implemented yet.

See (fs.ftruncate in Node.js)[http://nodejs.org/api/fs.html#fs_fs_ftruncate_fd_len_callback].

### fs.unlink(path, callback)

**Warning!** It is **not** implemented yet.

See (fs.ftruncate in Node.js)[http://nodejs.org/api/fs.html#fs_fs_ftruncate_fd_len_callback].

### fs.rmdir(path, callback)

**Warning!** It is **not** implemented yet.

See (fs.ftruncate in Node.js)[http://nodejs.org/api/fs.html#fs_fs_ftruncate_fd_len_callback].

### fs.mkdir(path, [mode], callback)

**Warning!** It is **not** implemented yet.

See (fs.ftruncate in Node.js)[http://nodejs.org/api/fs.html#fs_fs_ftruncate_fd_len_callback].

### fs.readdir(path, callback)

**Warning!** It is **not** implemented yet.

See (fs.ftruncate in Node.js)[http://nodejs.org/api/fs.html#fs_fs_ftruncate_fd_len_callback].

### fs.close(fd, callback)

**Warning!** It is **not** implemented yet.

See (fs.ftruncate in Node.js)[http://nodejs.org/api/fs.html#fs_fs_ftruncate_fd_len_callback].

### fs.open(path, flags, [mode], callback)

**Warning!** It is **not** implemented yet.

See (fs.ftruncate in Node.js)[http://nodejs.org/api/fs.html#fs_fs_ftruncate_fd_len_callback].

### fs.utimes(path, atime, mtime, callback)

**Warning!** It is **not** implemented yet.

See (fs.ftruncate in Node.js)[http://nodejs.org/api/fs.html#fs_fs_ftruncate_fd_len_callback].

### fs.futimes(fd, atime, mtime, callback)

**Warning!** It is **not** implemented yet.

See (fs.ftruncate in Node.js)[http://nodejs.org/api/fs.html#fs_fs_ftruncate_fd_len_callback].

### fs.fsync(fd, callback)

**Warning!** It is **not** implemented yet.

See (fs.ftruncate in Node.js)[http://nodejs.org/api/fs.html#fs_fs_ftruncate_fd_len_callback].

### fs.write(fd, buffer, offset, length, position, callback)

**Warning!** It is **not** implemented yet.

See (fs.ftruncate in Node.js)[http://nodejs.org/api/fs.html#fs_fs_ftruncate_fd_len_callback].

### fs.read(fd, buffer, offset, length, position, callback)

**Warning!** It is **not** implemented yet.

See (fs.ftruncate in Node.js)[http://nodejs.org/api/fs.html#fs_fs_ftruncate_fd_len_callback].

### fs.readFile(filename, [options], callback)

**Warning!** It is **not** implemented yet.

See (fs.ftruncate in Node.js)[http://nodejs.org/api/fs.html#fs_fs_ftruncate_fd_len_callback].

### fs.writeFile(filename, data, [options], callback)

**Warning!** It is **not** implemented yet.

See (fs.ftruncate in Node.js)[http://nodejs.org/api/fs.html#fs_fs_ftruncate_fd_len_callback].

### fs.appendFile(filename, data, [options], callback)

**Warning!** It is **not** implemented yet.

See (fs.ftruncate in Node.js)[http://nodejs.org/api/fs.html#fs_fs_ftruncate_fd_len_callback].

### fs.watchFile(filename, [options], listener)

**Warning!** It is **not** implemented yet.

See (fs.ftruncate in Node.js)[http://nodejs.org/api/fs.html#fs_fs_ftruncate_fd_len_callback].

### fs.unwatchFile(filename, [listener])

**Warning!** It is **not** implemented yet.

See (fs.ftruncate in Node.js)[http://nodejs.org/api/fs.html#fs_fs_ftruncate_fd_len_callback].

### fs.watch(filename, [options], [listener])

**Warning!** It is **not** implemented yet.

See (fs.ftruncate in Node.js)[http://nodejs.org/api/fs.html#fs_fs_ftruncate_fd_len_callback].

### fs.exists(path, callback)

**Warning!** It is **not** implemented yet.

See (fs.ftruncate in Node.js)[http://nodejs.org/api/fs.html#fs_fs_ftruncate_fd_len_callback].

### Class: fs.Stats

**Warning!** It is **not** implemented yet.

See (fs.ftruncate in Node.js)[http://nodejs.org/api/fs.html#fs_fs_ftruncate_fd_len_callback].

Class FileDescriptor
--------------------

### new FileDescriptor(fd)

The constructor of the `FileDescriptor` objects.

It takes single argument `fd` and if not defined will throw `TypeError` as exception.

Each `FileDescriptor` object will have a propery of `.fd`.

**Warning!** Normally you shouldn't need to use it directly but it might be neccessary when using 3rd party addons which deal with raw `fd`'s.

### FileDescriptor.prototype.ftruncate(fd, len)
### fs.fchown(fd, uid, gid, callback)


TODO
----

* [Documentation](#documentation)
* [Tests](#tests)
* [Support for chainable synchronous calls](#support-for-chainable-synchronous-calls)
* [Support for fs.ReadStream and fs.WriteStream](#support-for-fs.ReadStream-and-fs.WriteStream)
* [Support for watch features](#support-for-watch-features)

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

