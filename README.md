[![Build Status](https://secure.travis-ci.org/Sendanor/nor-fs.png?branch=master)](http://travis-ci.org/Sendanor/nor-fs)

nor-fs
======

Asynchronous filesystem library with chainable Q-based promises for [Node.js](http://nodejs.org/).

Sample Use Case
---------------

So, let's say you need to **do something** with the filesystem and [Node.js](http://nodejs.org/). 

You also want to use [promises](https://github.com/kriskowal/q). (Actually, we have `fs.sync` for synchronous calls, too.)

Sure, you could use [q-io](https://github.com/kriskowal/q-io) -- but you would still feel like you're missing something, it could be easier and simpler!

The solution for the problem is to use our library which uses both [Q](https://github.com/kriskowal/q) and [nor-extend](https://github.com/sendanor/nor-extend) to enable 
chainable promises.

Here's an example of creating a file named `hello.txt` and changing permissions:

```javascript
fs.path('hello.txt').writeFile('Hello World').chmod(600).chown(1000, 1000).then(function() {
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

Quick Introduction
------------------

All methods are wrappers for `fs` module 
([Node.js File System module](http://nodejs.org/api/fs.html)) 
with same names and arguments when possible.

### Asynchronous methods

Asynchronous methods take the same arguments as `fs` but instead of callbacks 
every asynchronous method returns an extended Q promise which can be chained.

```javascript
fs.writeFile("hello.txt", "Hello World").chmod("hello.txt", "0600").then(function() {
	...
}).fail(function(err) {
	...
}).done();
```

You can shorten it with the path-based API:

```javascript
fs.path("hello.txt").writeFile("Hello World").chmod("0600").then(function() {
	...
}).fail(function(err) {
	...
}).done();
```

### Synchronous methods

Synchronous methods take same arguments as `fs` module but are chainable, and 
methods don't have leading `Sync` in their names.

Synchronous API is provided through `fs.sync`:

```javascript
fs.sync.writeFile("hello.txt", "Hello World").chmod("hello.txt", "0600");
```

You can shorten it with the path-based API:

```javascript
fs.sync.path("hello.txt").writeFile("Hello World").chmod("0600");
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

* Not decided yet.

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
* [fs.Path](#class-fs-path)
* [fs.Descriptor](#class-fs-descriptor)
* [fs.SyncFileSystem](#class-syncfilesystem)
* [fs.sync.Path](#class-sync-path)
* [fs.sync.Descriptor](#class-sync-descriptor)
* fs.sync -- Instance of class `fs.SyncFileSystem`

And these methods:

* fs.path(name) -- Returns instance of `fs.Path(name)`
* fs.sync.path(name) -- Returns instance of `fs.sync.Path(name)`

Class FileSystem
----------------

### new FileSystem()

The constructor of the `FileSystem` objects.

**Warning!** You **should not** need to use it directly. However if you find any essential use for it in the userland, we would like hear it!

### FileSystem.prototype.rename(oldPath, newPath)

Renames a file from `oldPath` to `newPath`. Asynchronous 
[rename(2)](http://linux.die.net/man/2/rename) which renames a file from `oldPath` to `newPath` and returns an extended chainable promise.

```javascript
fs.rename('foo.txt', 'bar.txt').then(function(){
	console.log('Renamed succesfully!');
}).fail(function(err) {
	console.error('Error: ' + err);
}).done();
```

See also [fs.rename from Node.js API Documentation](http://nodejs.org/api/fs.html#fs_fs_rename_oldpath_newpath_callback)

### FileSystem.prototype.ftruncate(fd, len)

Truncates a file pointed by a file descriptor to a specified length. 
Asynchronous [ftruncate(2)](http://linux.die.net/man/2/ftruncate) which returns an extended chainable promise.

```javascript
fs.open('foo.txt', 'r').then(function(fd){
	return fs.ftruncate(fd.valueOf(), 1000).close(fd.valueOf());
}).then(function() {
	console.log('Truncated succesfully!');
}).fail(function(err) {
	console.error('Error: ' + err);
}).done();
```

**Note!** Usually there is no need to call this method because `fs.open()` 
returns an instance of `fs.Descriptor` which can be chained.

See also [fs.ftruncate from Node.js API Documentation](http://nodejs.org/api/fs.html#fs_fs_ftruncate_fd_len_callback).

### FileSystem.prototype.truncate(path, len)

Truncates a file pointed by a path to a specified length.

Asynchronous [truncate(2)](http://man7.org/linux/man-pages/man2/truncate.2.html) which returns an extended chainable promise.

```javascript
fs.truncate('foo.txt', 1000).then(function() {
	console.log('Truncated succesfully!');
}).fail(function(err) {
	console.error('Error: ' + err);
}).done();
```

See also [fs.truncate at Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_truncate_path_len_callback).

### FileSystem.prototype.chown(path, uid, gid)

Change file owner and group. Asynchronous 
[chown(2)](http://linux.die.net/man/2/chown) which returns an extended chainable promise.

```javascript
fs.chown('foo.txt', 1000, 1000).then(function() {
	console.log('Operation finished succesfully!');
}).fail(function(err) {
	console.error('Error: ' + err);
}).done();
```

See also [fs.chown from the original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_chown_path_uid_gid_callback).

**Warning!** It is automatically tested, but not so well, since normally users cannot change ownership of a file to other users.

### FileSystem.prototype.fchown(fd, uid, gid)

Change file owner and group pointed by a file descriptor. 
Asynchronous fchown(2) which returns an extended chainable promise.

```javascript
fs.open('foo.txt', 'r').then(function(fd){
	return fs.fchown(fd.valueOf(), 1000, 1000);
}).then(function() {
	console.log('Operation finished succesfully!');
}).fail(function(err) {
	console.error('Error: ' + err);
}).done();
```

**Note!** Usually there is no need to call this method because `fs.open()` 
returns an instance of `fs.Descriptor` which can be chained.

See also [fs.fchown in the original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_fchown_fd_uid_gid_callback).

### FileSystem.prototype.lchown(path, uid, gid)

Asynchronous lchown(2) which returns an extended chainable promise.

```javascript
fs.lchown('foo.txt', 1000, 1000).then(function() {
	console.log('Operation finished succesfully!');
}).fail(function(err) {
	console.error('Error: ' + err);
}).done();
```

See also [fs.lchown in the original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_lchown_path_uid_gid_callback).

**Warning!** Only available on MAC OS X system.

**Warning!** It is **not** tested yet. I don't have a MAC OS X system.

### FileSystem.prototype.chmod(path, mode)

Change file mode bits. Asynchronous chmod(2) which returns an extended 
chainable promise.

```javascript
fs.chmod('foo.txt', "0600").then(function() {
	console.log('Operation finished succesfully!');
}).fail(function(err) {
	console.error('Error: ' + err);
}).done();
```

See also [fs.chmod in the original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_chmod_path_mode_callback).


### FileSystem.prototype.fchmod(fd, mode)

Change file mode bits.
Asynchronous fchmod(2) which returns an extended chainable promise.

```javascript
fs.open('foo.txt', 'r').then(function(fd){
	return fs.fchmod(fd.valueOf(), "0600");
}).then(function() {
	console.log('Operation finished succesfully!');
}).fail(function(err) {
	console.error('Error: ' + err);
}).done();
```

**Note!** Usually there is no need to call this method because `fs.open()` 
returns an instance of `fs.Descriptor` which can be chained.

See also [fs.fchmod in the original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_fchmod_fd_mode_callback).


### FileSystem.prototype.lchmod(path, mode)

Asynchronous lchmod(2) which returns an extended chainable promise.

```javascript
fs.lchmod('foo.txt', "0600").then(function() {
	console.log('Operation finished succesfully!');
}).fail(function(err) {
	console.error('Error: ' + err);
}).done();
```

See also [fs.lchmod in the original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_lchmod_path_mode_callback).

**Warning!** Only available on MAC OS X system.

**Warning!** It is **not** tested yet. I don't have a MAC OS X system.


### FileSystem.prototype.stat(path)

Display file or file system status.
Asynchronous stat(2) which returns a promise.

In case of a successful call instance of `require('fs').Stats` object is passed 
on. See the [fs.stat in the original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_stat_path_callback).

```javascript
fs.stat('foo.txt').then(function(stat) {
	console.log(util.inspect(stat));
}).fail(function(err) {
	console.error('Error: ' + err);
}).done();
```

...which will return:

```
{ dev: 2113,
  mode: 33204,
  nlink: 1,
  uid: 1000,
  gid: 1000,
  rdev: 0,
  blksize: 4096,
  ino: 5014598,
  size: 0,
  blocks: 0,
  atime: Sun Sep 15 2013 09:03:33 GMT+0300 (EEST),
  mtime: Sun Sep 15 2013 09:03:33 GMT+0300 (EEST),
  ctime: Sun Sep 15 2013 09:03:33 GMT+0300 (EEST) }
```

### FileSystem.prototype.lstat(path)

Asynchronous lstat(2) which returns a promise.

`lstat()` is identical to [`stat()`](#filesystem_prototype_stat), except that if path is a symbolic link, then the link itself is stat-ed, not the file that it refers to.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_lstat_path_callback).


### FileSystem.prototype.fstat(fd)

Asynchronous fstat(2) which returns a promise.

`fstat()` is identical to `stat()`, except that the file to be stat-ed is specified by the file descriptor `fd`.

```javascript
fs.open('foo.txt', 'r').then(function(fd){
	return fs.fstat(fd.valueOf());
}).then(function(stat) {
	console.log(util.inspect(stat));
}).fail(function(err) {
	console.error('Error: ' + err);
}).done();
```

**Note!** Usually there is no need to call this method because `fs.open()` 
returns an instance of `fs.Descriptor` which can be chained.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_fstat_fd_callback).


### FileSystem.prototype.link(srcpath, dstpath)

Make a new name for a file (by hard linking). Asynchronous link(2). Returns an 
extended chainable promise.

```javascript
fs.link('foo.txt', 'bar.txt').then(function() {
	console.log('foo.txt is succesfully linked as bar.txt');
}).fail(function(err) {
	console.error('Error: ' + err);
}).done();
```

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_link_srcpath_dstpath_callback).


### FileSystem.prototype.symlink(srcpath, dstpath, [type])

Make a new name for a file (by symlinking). Asynchronous symlink(2). Returns an 
extended chainable promise.

```javascript
fs.symlink('foo.txt', 'bar.txt').then(function() {
	console.log('foo.txt is succesfully symlinked as bar.txt');
}).fail(function(err) {
	console.error('Error: ' + err);
}).done();
```

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_symlink_srcpath_dstpath_type_callback).

### FileSystem.prototype.readlink(path)

Read value of a symbolic link. Asynchronous readlink(2). Returns an extended 
chainable promise.

```javascript
fs.readlink('foo.txt').then(function(linkString) {
	console.log('foo.txt is linked to ' + linkString);
}).fail(function(err) {
	console.error('Error: ' + err);
}).done();
```

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_readlink_path_callback).


### FileSystem.prototype.realpath(path, [cache])

Return the canonicalized absolute pathname. Asynchronous realpath(3). Returns 
an extended chainable promise.

```javascript
fs.realpath('foo.txt').then(function(resolvedPath) {
	console.log('foo.txt real path is ' + resolvedPath);
}).fail(function(err) {
	console.error('Error: ' + err);
}).done();
```

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_realpath_path_cache_callback).


### FileSystem.prototype.unlink(path)

Delete a name and possibly the file it refers to. Asynchronous unlink(2). 
Returns an extended chainable promise.

```javascript
fs.unlink('foo.txt').then(function() {
	console.log('foo.txt successfully deleted');
}).fail(function(err) {
	console.error('Error: ' + err);
}).done();
```

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_unlink_path_callback).

### FileSystem.prototype.unlinkIfExists(path)

Delete a name and possibly the file it refers to if that file exists. 
Asynchronous unlink(2). Only tries to unlink if the file exists. Returns an 
extended chainable promise.

```javascript
fs.unlinkIfExists('foo.txt').then(function() {
	console.log('foo.txt either deleted or didn't exists');
}).fail(function(err) {
	console.error('Error: ' + err);
}).done();
```


### FileSystem.prototype.rmdir(path)

Delete a directory. Asynchronous rmdir(2). Returns an extended chainable 
promise.

```javascript
fs.rmdir('foo').then(function() {
	console.log('foo/ deleted successfully');
}).fail(function(err) {
	console.error('Error: ' + err);
}).done();
```

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_rmdir_path_callback).

### FileSystem.prototype.rmdirIfExists(path)

Delete a directory if it exists. 
Asynchronous rmdir(2). Only tries to remove the directory if it exists. Returns an extended chainable promise.

```javascript
fs.rmdirIfExists('foo').then(function() {
	console.log('foo/ deleted or didn't exists');
}).fail(function(err) {
	console.error('Error: ' + err);
}).done();
```

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_rmdir_path_callback).


### FileSystem.prototype.mkdir(path, [mode])

Create a directory.
Asynchronous mkdir(2). Returns an extended chainable promise.

```javascript
fs.mkdir('foo', "0755").then(function() {
	console.log('foo/ created successfully');
}).fail(function(err) {
	console.error('Error: ' + err);
}).done();
```

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_mkdir_path_mode_callback).

### FileSystem.prototype.mkdirIfMissing(path, [mode])

Create a directory if it does not exist.
Asynchronous mkdir(2). Only tries to create the directory if it does not already exist. Returns an extended chainable promise.

```javascript
fs.mkdirIfMissing('foo', "0755").then(function() {
	console.log('foo/ created or did exists already');
}).fail(function(err) {
	console.error('Error: ' + err);
}).done();
```

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_mkdir_path_mode_callback).


### FileSystem.prototype.readdir(path)

Read directory entry. Asynchronous readdir(3). Returns an extended chainable 
promise.

```javascript
fs.readdir('foo').then(function(files) {
	console.log('foo/ has: ' + files.join(' ') );
}).fail(function(err) {
	console.error('Error: ' + err);
}).done();
```

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_readdir_path_callback).


### FileSystem.prototype.open(path, flags, [mode])

Open and possibly create a file or device.
Asynchronous file open. See open(2). Returns an extended chainable promise.

```javascript
var fd, buffer;
fs.stat('foo.txt').then(function(stats) {
	buffer = new Buffer(stats.size);
	return fs.open('foo.txt', 'r');
}).then(function(d) {
	fd = d; 
	return fd.read(buffer, 0, buffer.length, null);
}).then(function(results) {
	var data = buffer.toString("utf8", 0, buffer.length);
	console.log('Successfully read: ' + data);
	return fd.close();
}).fail(function(err) {
	console.error('Error: ' + err);
}).done();
```

See also [original Node.js API 
documentation](http://nodejs.org/api/fs.html#fs_fs_open_path_flags_mode_callback).


### FileSystem.prototype.close(fd)

Close a file descriptor. 
Asynchronous close(2). Returns an extended chainable promise.

See the example for [fs.open()](#filesystem_prototype_open_path_flags_mode).

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

