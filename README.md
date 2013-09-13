[![Build Status](https://secure.travis-ci.org/Sendanor/nor-fs.png?branch=master)](http://travis-ci.org/Sendanor/nor-fs)

nor-fs
======

Asynchronous filesystem library with chainable Q-based promises for [Node.js](http://nodejs.org/).

Sample Use Case
---------------

So, let's say you need to **do something** with the filesystem and [Node.js](http://nodejs.org/). 

You also want to use [promises](https://github.com/kriskowal/q).

Sure, you could use [q-io](https://github.com/kriskowal/q-io) -- but you would still feel like you're missing something, it could be easier and simpler!

The solution for the problem is to use our library which uses both [Q](https://github.com/kriskowal/q) and [nor-extend](https://github.com/sendanor/nor-extend) to enable 
chainable promises.

Here's an example of creating a file named `hello.txt` and changing permissions:

```javascript
fs.writeFile('hello.txt', 'Hello World').chmod('hello.txt', 600).chown('hello.txt', 1000, 1000).then(function() {
	console.log('hello.txt created succesfully');
}).fail(function(err) {
	console.error('Error: Failed to create hello.txt: ' + err);
}).done();
```

Here's how you would need to do it with traditional promises:

```javascript
fs.writeFile('hello.txt', 'Hello World').then(function() {
	return fs.chmod('hello.txt', 600);
}).then(function() {
	return fs.chown('hello.txt', 1000, 1000);
}).then(function() {
	console.log('hello.txt created succesfully');
}).fail(function(err) {
	console.error('Error: Failed to create hello.txt: ' + err);
}).done();
```

Getting Started
---------------

### Installation

#### Installing from the NPM

You may install it from the NPM: `npm install nor-fs`.

#### Dependencies

* [Node.js](http://nodejs.org) v0.10 or newer
* [nor-extend](https://github.com/sendanor/nor-extend)
* [q](https://github.com/kriskowal/q)

### Require

```javascript
var fs = require('nor-fs');
```

Our methods are named the same as their lower level Node.js API calls with the 
exception that instead of taking callbacks we are returning chainable promises.

Issues, pull requests and updates
---------------------------------

### Issues, questions and other resources

Do not hesitate to [create issues](https://github.com/sendanor/nor-fs/issues) 
or [ask questions](http://stackoverflow.com/questions/ask) for any reason. 
We're happy to receive pull requests, too.

### Social media

Our company is [@sendanorcom](https://twitter.com/sendanorcom) at Twitter and 
our channel on Freenode IRC network is #sendanor.

Original author and the lead is [@jheusala](https://twitter.com/jheusala).

### Versioning

`nor-fs` follows [Semantic Versioning](http://semver.org/) and is using 
[rolling release model](http://en.wikipedia.org/wiki/Rolling_release).

We'll introduce new features when neccessary at a good pace. We'll try our best 
not to break backwards compatibility and if that happens we'll fix it as fast 
as possible.

TODO
----

### Upcoming release

* [Issue #1](https://github.com/Sendanor/nor-fs/issues/1) -- Class `FilePath` to shortcut calls like `fs.exists('test.txt')` to `fs.path('test.txt').exists()`

### Future releases

* [Issue #3](https://github.com/Sendanor/nor-fs/issues/3) -- [Support for fs.ReadStream and fs.WriteStream](#support-for-fs.ReadStream-and-fs.WriteStream)
* [Issue #4](https://github.com/Sendanor/nor-fs/issues/4) -- [Support for watch features](#support-for-watch-features)
* [Issue #5](https://github.com/Sendanor/nor-fs/issues/5) -- `.lchown()` and `.lchmod()` not tested on Mac OS X

Full API Documentation
----------------------

### require('nor-fs')

The root of the library is an instance of [FileSystem](#class-filesystem).

It also has these properties:

* [fs.FileSystem](#class-filesystem)
* [fs.FileDescriptor](#class-filedescriptor)
* [fs.SyncFileSystem](#class-syncfilesystem)
* [fs.SyncFileDescriptor](#class-syncfiledescriptor)
* fs.sync -- Instance of class `SyncFileSystem`

Class FileSystem
----------------

### new FileSystem()

The constructor of the `FileSystem` objects.

**Warning!** You **should not** need to use it directly. However if you find any essential use for it in the userland, we would like hear it!

### FileSystem.prototype.rename(oldPath, newPath)

Asynchronous [rename(2)](http://linux.die.net/man/2/rename) which renames a file from `oldPath` to `newPath` and returns an extended chainable promise.

See also [fs.rename from Node.js API Documentation](http://nodejs.org/api/fs.html#fs_fs_rename_oldpath_newpath_callback)

### FileSystem.prototype.ftruncate(fd, len)

Asynchronous [ftruncate(2)](http://linux.die.net/man/2/ftruncate) which returns an extended chainable promise.

See also [fs.ftruncate from Node.js API Documentation](http://nodejs.org/api/fs.html#fs_fs_ftruncate_fd_len_callback).

### FileSystem.prototype.truncate(path, len)

Asynchronous [truncate(2)](http://man7.org/linux/man-pages/man2/truncate.2.html) which returns an extended chainable promise.

See also [fs.truncate at Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_truncate_path_len_callback).

### FileSystem.prototype.chown(path, uid, gid)

Asynchronous [chown(2)](http://linux.die.net/man/2/chown) which returns an extended chainable promise.

See also [fs.chown from the original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_chown_path_uid_gid_callback).

**Warning!** It is automatically tested, but not so well, since normally users cannot change ownership of a file to other users.

### FileSystem.prototype.fchown(fd, uid, gid)

Asynchronous fchown(2) which returns an extended chainable promise.

See also [fs.fchown in the original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_fchown_fd_uid_gid_callback).


### FileSystem.prototype.lchown(path, uid, gid)

Asynchronous lchown(2) which returns an extended chainable promise.

See also [fs.lchown in the original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_lchown_path_uid_gid_callback).

**Warning!** Only available on MAC OS X system.

**Warning!** It is **not** tested yet. I don't have a MAC OS X system.


### FileSystem.prototype.chmod(path, mode)

Asynchronous chmod(2) which returns an extended chainable promise.

See also [fs.chmod in the original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_chmod_path_mode_callback).


### FileSystem.prototype.fchmod(fd, mode)

Asynchronous fchmod(2) which returns an extended chainable promise.

See also [fs.fchmod in the original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_fchmod_fd_mode_callback).


### FileSystem.prototype.lchmod(path, mode)

Asynchronous lchmod(2) which returns an extended chainable promise.

See also [fs.lchmod in the original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_lchmod_path_mode_callback).

**Warning!** Only available on MAC OS X system.

**Warning!** It is **not** tested yet. I don't have a MAC OS X system.


### FileSystem.prototype.stat(path)

Asynchronous stat(2) which returns a promise.

In case of a successful call instance of fs.Stats object is passed on. 

See the fs.Stats section below for more information.

See also [fs.stat in the original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_stat_path_callback).


### FileSystem.prototype.lstat(path)

Asynchronous lstat(2) which returns a promise.

`lstat()` is identical to [`stat()`](#filesystem_prototype_stat), except that if path is a symbolic link, then the link itself is stat-ed, not the file that it refers to.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_lstat_path_callback).


### FileSystem.prototype.fstat(fd)

Asynchronous fstat(2) which returns a promise.

`fstat()` is identical to `stat()`, except that the file to be stat-ed is specified by the file descriptor `fd`.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_fstat_fd_callback).


### FileSystem.prototype.link(srcpath, dstpath)

Asynchronous link(2). Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_link_srcpath_dstpath_callback).


### FileSystem.prototype.symlink(srcpath, dstpath, [type])

Asynchronous symlink(2). Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_symlink_srcpath_dstpath_type_callback).


### FileSystem.prototype.readlink(path)

Asynchronous readlink(2). Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_readlink_path_callback).


### FileSystem.prototype.realpath(path, [cache])

Asynchronous realpath(2). Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_realpath_path_cache_callback).


### FileSystem.prototype.unlink(path)

Asynchronous unlink(2). Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_unlink_path_callback).

### FileSystem.prototype.unlinkIfExists(path)

Asynchronous unlink(2). Only tries to unlink if the file exists. Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_unlink_path_callback).


### FileSystem.prototype.rmdir(path)

Asynchronous rmdir(2). Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_rmdir_path_callback).

### FileSystem.prototype.rmdirIfExists(path)

Asynchronous rmdir(2). Only tries to remove the directory if it exists. Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_rmdir_path_callback).


### FileSystem.prototype.mkdir(path, [mode])

Asynchronous mkdir(2). Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_mkdir_path_mode_callback).

### FileSystem.prototype.mkdirIfMissing(path, [mode])

Asynchronous mkdir(2). Only tries to create the directory if it does not already exist. Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_mkdir_path_mode_callback).


### FileSystem.prototype.readdir(path)

Asynchronous readdir(3). Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_readdir_path_callback).


### FileSystem.prototype.open(path, flags, [mode])

Asynchronous file open. See open(2). Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_open_path_flags_mode_callback).


### FileSystem.prototype.close(fd)

Asynchronous close(2). Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_close_fd_callback).


### FileSystem.prototype.utimes(path, atime, mtime)

Change file timestamps of the file referenced by the supplied path.

Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_utimes_path_atime_mtime_callback).


### FileSystem.prototype.futimes(fd, atime, mtime)

Change the file timestamps of a file referenced by the supplied file descriptor.

Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_futimes_fd_atime_mtime_callback).


### FileSystem.prototype.fsync(fd)

Asynchronous fsync(2). 

Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_fsync_fd_callback).


### FileSystem.prototype.write(fd, buffer, offset, length, position)

Returns an extended chainable promise which will on success pass on an object with properties `.written` and `.buffer`.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_write_fd_buffer_offset_length_position_callback).


### FileSystem.prototype.read(fd, buffer, offset, length, position)

Returns an extended chainable promise which will on success pass on an object with properties `.bytesRead` and `.buffer`.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_read_fd_buffer_offset_length_position_callback).


### FileSystem.prototype.readFile(filename, [options])

Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_readfile_filename_options_callback).


### FileSystem.prototype.writeFile(filename, data, [options])

Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_writefile_filename_data_options_callback).


### FileSystem.prototype.appendFile(filename, data, [options])

Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_appendfile_filename_data_options_callback).


### FileSystem.prototype.exists(path)

Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_exists_path_callback).


### Class: fs.Stats

**Warning!** It is **not** implemented yet.

Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_class_fs_stats).

Class FileDescriptor
--------------------


### new FileDescriptor(fd)

The constructor of the `FileDescriptor` objects.

It takes single argument `fd` and if not defined will throw `TypeError` as exception.

Each `FileDescriptor` object will have a propery of `.fd`.

**Warning!** Normally you shouldn't need to use it directly but it might be neccessary when using 3rd party addons which deal with raw `fd`'s.



### FileDescriptor.prototype.stat()

Alias for [FileDescriptor.prototype.fstat](#filedescriptor_prototype_fstat).

### FileDescriptor.prototype.fstat()

Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_fstat_fd_callback).



### FileDescriptor.prototype.truncate(len)

Alias for [FileDescriptor.prototype.ftruncate](#filedescriptor_prototype_ftruncate_len).

### FileDescriptor.prototype.ftruncate(len)

Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_ftruncate_fd_len_callback).


### FileDescriptor.prototype.chown(uid, gid)

Alias for [FileDescriptor.prototype.fchown](#filedescriptor_prototype_fchown_len).


### FileDescriptor.prototype.fchown(uid, gid, callback)

Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_fchown_fd_uid_gid_callback).


### FileDescriptor.prototype.chmod(mode)

Alias for [FileDescriptor.prototype.fchmod](#filedescriptor_prototype_fchmod_mode).


### FileDescriptor.prototype.fchmod(mode)

Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_fchmod_fd_mode_callback).


### FileDescriptor.prototype.utimes(atime, mtime)

Alias for [FileDescriptor.prototype.futimes](#filedescriptor_prototype_futimes_atime_mtime).


### FileDescriptor.prototype.futimes(atime, mtime)

Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_futimes_fd_atime_mtime_callback).


### FileDescriptor.prototype.write(buffer, offset, length, position)

Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_write_fd_buffer_offset_length_position_callback).


### FileDescriptor.prototype.read(buffer, offset, length, position)

Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_read_buffer_offset_length_position_callback).


### FileDescriptor.prototype.sync()

Alias for [FileDescriptor.prototype.fsync](#filedescriptor_prototype_fsync).

### FileDescriptor.prototype.fsync()

Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_fsync_fd_callback).





Class SyncFileSystem
--------------------

These are chainable synchronous wrappers for original calls like `require('fs').{call}Sync(...)`.

### SyncFileSystem.prototype.rename(oldPath, newPath)
### SyncFileSystem.prototype.ftruncate(fd, len)
### SyncFileSystem.prototype.truncate(path, len)
### SyncFileSystem.prototype.chown(path, uid, gid)
### SyncFileSystem.prototype.lchown(path, uid, gid)
### SyncFileSystem.prototype.fchown(fd, uid, gid)
### SyncFileSystem.prototype.chmod(path, mode)
### SyncFileSystem.prototype.fchmod(fd, mode)
### SyncFileSystem.prototype.lchmod(path, mode)
### SyncFileSystem.prototype.stat(path)
### SyncFileSystem.prototype.lstat(path)
### SyncFileSystem.prototype.fstat(fd)
### SyncFileSystem.prototype.link(srcpath, dstpath)
### SyncFileSystem.prototype.symlink(srcpath, dstpath, [type])
### SyncFileSystem.prototype.readlink(path)
### SyncFileSystem.prototype.realpath(path, [cache])
### SyncFileSystem.prototype.unlink(path)
### SyncFileSystem.prototype.rmdir(path)
### SyncFileSystem.prototype.mkdir(path, [mode])
### SyncFileSystem.prototype.readdir(path)
### SyncFileSystem.prototype.close(fd)
### SyncFileSystem.prototype.open(path, flags, [mode])
### SyncFileSystem.prototype.utimes(path, atime, mtime)
### SyncFileSystem.prototype.futimes(fd, atime, mtime)
### SyncFileSystem.prototype.fsync(fd)
### SyncFileSystem.prototype.write(fd, buffer, offset, length, position)
### SyncFileSystem.prototype.read(fd, buffer, offset, length, position)
### SyncFileSystem.prototype.readFile(filename, [options])
### SyncFileSystem.prototype.writeFile(filename, data, [options])
### SyncFileSystem.prototype.appendFile(filename, data, [options])
### SyncFileSystem.prototype.exists(path)

Class SyncFileDescriptor
------------------------

These are chainable synchronous wrappers for original calls like `require('fs').{call}Sync(fd, ...)`.

### SyncFileDescriptor.prototype.ftruncate(len)
### SyncFileDescriptor.prototype.fchown(uid, gid)
### SyncFileDescriptor.prototype.fchmod(mode)
### SyncFileDescriptor.prototype.fstat()
### SyncFileDescriptor.prototype.close()
### SyncFileDescriptor.prototype.futimes(atime, mtime)
### SyncFileDescriptor.prototype.fsync()
### SyncFileDescriptor.prototype.write(buffer, offset, length, position)
### SyncFileDescriptor.prototype.read(buffer, offset, length, position)

Support for fs.ReadStream and fs.WriteStream
--------------------------------------------

**Warning!** These are **not** implemented yet.

### FileSystem.prototype.createReadStream(path, [options])
### Class: fs.ReadStream
#### Event: 'open'
### FileSystem.prototype.createWriteStream(path, [options])
### Class: fs.WriteStream
#### Event: 'open'
#### file.bytesWritten

Support for watch features
--------------------------

**Warning!** These are **not** implemented yet.

### FileSystem.prototype.watchFile(filename, [options], listener)

**Warning!** It is **not** implemented yet.

Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_watchfile_filename_options_listener).

### FileSystem.prototype.unwatchFile(filename, [listener])

**Warning!** It is **not** implemented yet.

Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_ftruncate_fd_len_callback).

### FileSystem.prototype.watch(filename, [options], [listener])

**Warning!** It is **not** implemented yet.

Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_ftruncate_fd_len_callback).

### Class: fs.FSWatcher
#### watcher.close()
#### Event: 'change'
#### Event: 'error'

Tests
-----

Tests can be run by `npm test`.

Licence
-------

The MIT License (MIT), see [the LICENCE file](https://raw.github.com/Sendanor/nor-fs/master/LICENSE).

