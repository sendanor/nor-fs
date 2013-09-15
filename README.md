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
fs.path("hello.txt").writeFile("Hello World").chmod(600).chown(1000, 1000).then(function() {
	console.log("hello.txt created succesfully");
}).fail(function(err) {
	console.error("Error: Failed to create hello.txt: " + err);
}).done();
```

Here is how you would need to do it with traditional promises:

```javascript
fs.writeFile("hello.txt", "Hello World").then(function() {
	return fs.chmod("hello.txt", 600);
}).then(function() {
	return fs.chown("hello.txt", 1000, 1000);
}).then(function() {
	console.log("hello.txt created succesfully");
}).fail(function(err) {
	console.error("Error: Failed to create hello.txt: " + err);
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
var fs = require("nor-fs");
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

### require("nor-fs")

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

### fs.rename(oldPath, newPath)

Renames a file from `oldPath` to `newPath`. Asynchronous 
[rename(2)](http://linux.die.net/man/2/rename) which renames a file from `oldPath` to `newPath` and returns an extended chainable promise.

```javascript
fs.rename("foo.txt", "bar.txt").then(function(){
	console.log("Renamed succesfully!");
}).fail(function(err) {
	console.error("Error: " + err);
}).done();
```

See also [fs.rename from Node.js API Documentation](http://nodejs.org/api/fs.html#fs_fs_rename_oldpath_newpath_callback)

### fs.ftruncate(fd, len)

Truncates a file pointed by a file descriptor to a specified length. 
Asynchronous [ftruncate(2)](http://linux.die.net/man/2/ftruncate) which returns an extended chainable promise.

```javascript
fs.open("foo.txt", "r").then(function(fd){
	return fs.ftruncate(fd.valueOf(), 1000).close(fd.valueOf());
}).then(function() {
	console.log("Truncated succesfully!");
}).fail(function(err) {
	console.error("Error: " + err);
}).done();
```

**Note!** Usually there is no need to call this method because `fs.open()` 
returns an instance of `fs.Descriptor` which can be chained.

See also [fs.ftruncate from Node.js API Documentation](http://nodejs.org/api/fs.html#fs_fs_ftruncate_fd_len_callback).

### fs.truncate(path, len)

Truncates a file pointed by a path to a specified length.

Asynchronous [truncate(2)](http://man7.org/linux/man-pages/man2/truncate.2.html) which returns an extended chainable promise.

```javascript
fs.truncate("foo.txt", 1000).then(function() {
	console.log("Truncated succesfully!");
}).fail(function(err) {
	console.error("Error: " + err);
}).done();
```

See also [fs.truncate at Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_truncate_path_len_callback).

### fs.chown(path, uid, gid)

Change file owner and group. Asynchronous 
[chown(2)](http://linux.die.net/man/2/chown) which returns an extended chainable promise.

```javascript
fs.chown("foo.txt", 1000, 1000).then(function() {
	console.log("Operation finished succesfully!");
}).fail(function(err) {
	console.error("Error: " + err);
}).done();
```

See also [fs.chown from the original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_chown_path_uid_gid_callback).

**Warning!** It is automatically tested, but not so well, since normally users cannot change ownership of a file to other users.

### fs.fchown(fd, uid, gid)

Change file owner and group pointed by a file descriptor. 
Asynchronous fchown(2) which returns an extended chainable promise.

```javascript
fs.open("foo.txt", "r").then(function(fd){
	return fs.fchown(fd.valueOf(), 1000, 1000);
}).then(function() {
	console.log("Operation finished succesfully!");
}).fail(function(err) {
	console.error("Error: " + err);
}).done();
```

**Note!** Usually there is no need to call this method because `fs.open()` 
returns an instance of `fs.Descriptor` which can be chained.

See also [fs.fchown in the original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_fchown_fd_uid_gid_callback).

### fs.lchown(path, uid, gid)

Asynchronous lchown(2) which returns an extended chainable promise.

```javascript
fs.lchown("foo.txt", 1000, 1000).then(function() {
	console.log("Operation finished succesfully!");
}).fail(function(err) {
	console.error("Error: " + err);
}).done();
```

See also [fs.lchown in the original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_lchown_path_uid_gid_callback).

**Warning!** Only available on MAC OS X system.

**Warning!** It is **not** tested yet. I don't have a MAC OS X system.

### fs.chmod(path, mode)

Change file mode bits. Asynchronous chmod(2) which returns an extended 
chainable promise.

```javascript
fs.chmod("foo.txt", "0600").then(function() {
	console.log("Operation finished succesfully!");
}).fail(function(err) {
	console.error("Error: " + err);
}).done();
```

See also [fs.chmod in the original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_chmod_path_mode_callback).


### fs.fchmod(fd, mode)

Change file mode bits.
Asynchronous fchmod(2) which returns an extended chainable promise.

```javascript
fs.open("foo.txt", "r").then(function(fd){
	return fs.fchmod(fd.valueOf(), "0600");
}).then(function() {
	console.log("Operation finished succesfully!");
}).fail(function(err) {
	console.error("Error: " + err);
}).done();
```

**Note!** Usually there is no need to call this method because `fs.open()` 
returns an instance of `fs.Descriptor` which can be chained.

See also [fs.fchmod in the original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_fchmod_fd_mode_callback).


### fs.lchmod(path, mode)

Asynchronous lchmod(2) which returns an extended chainable promise.

```javascript
fs.lchmod("foo.txt", "0600").then(function() {
	console.log("Operation finished succesfully!");
}).fail(function(err) {
	console.error("Error: " + err);
}).done();
```

See also [fs.lchmod in the original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_lchmod_path_mode_callback).

**Warning!** Only available on MAC OS X system.

**Warning!** It is **not** tested yet. I don't have a MAC OS X system.


### fs.stat(path)

Display file or file system status.
Asynchronous stat(2) which returns a promise.

In case of a successful call instance of `require("fs").Stats` object is passed 
on. See the [fs.stat in the original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_stat_path_callback).

```javascript
fs.stat("foo.txt").then(function(stat) {
	console.log(util.inspect(stat));
}).fail(function(err) {
	console.error("Error: " + err);
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

### fs.lstat(path)

Asynchronous lstat(2) which returns a promise.

`lstat()` is identical to [`stat()`](#fsstat), except that if path is a 
symbolic link, then the link itself is stat-ed, not the file that it refers to.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_lstat_path_callback).


### fs.fstat(fd)

Asynchronous fstat(2) which returns a promise.

`fstat()` is identical to `stat()`, except that the file to be stat-ed is specified by the file descriptor `fd`.

```javascript
fs.open("foo.txt", "r").then(function(fd){
	return fs.fstat(fd.valueOf());
}).then(function(stat) {
	console.log(util.inspect(stat));
}).fail(function(err) {
	console.error("Error: " + err);
}).done();
```

**Note!** Usually there is no need to call this method because `fs.open()` 
returns an instance of `fs.Descriptor` which can be chained.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_fstat_fd_callback).


### fs.link(srcpath, dstpath)

Make a new name for a file (by hard linking). Asynchronous link(2). Returns an 
extended chainable promise.

```javascript
fs.link("foo.txt", "bar.txt").then(function() {
	console.log("foo.txt is succesfully linked as bar.txt");
}).fail(function(err) {
	console.error("Error: " + err);
}).done();
```

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_link_srcpath_dstpath_callback).


### fs.symlink(srcpath, dstpath, [type])

Make a new name for a file (by symlinking). Asynchronous symlink(2). Returns an 
extended chainable promise.

```javascript
fs.symlink("foo.txt", "bar.txt").then(function() {
	console.log("foo.txt is succesfully symlinked as bar.txt");
}).fail(function(err) {
	console.error("Error: " + err);
}).done();
```

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_symlink_srcpath_dstpath_type_callback).

### fs.readlink(path)

Read value of a symbolic link. Asynchronous readlink(2). Returns an extended 
chainable promise.

```javascript
fs.readlink("foo.txt").then(function(linkString) {
	console.log("foo.txt is linked to " + linkString);
}).fail(function(err) {
	console.error("Error: " + err);
}).done();
```

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_readlink_path_callback).


### fs.realpath(path, [cache])

Return the canonicalized absolute pathname. Asynchronous realpath(3). Returns 
an extended chainable promise.

```javascript
fs.realpath("foo.txt").then(function(resolvedPath) {
	console.log("foo.txt real path is " + resolvedPath);
}).fail(function(err) {
	console.error("Error: " + err);
}).done();
```

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_realpath_path_cache_callback).


### fs.unlink(path)

Delete a name and possibly the file it refers to. Asynchronous unlink(2). 
Returns an extended chainable promise.

```javascript
fs.unlink("foo.txt").then(function() {
	console.log("foo.txt successfully deleted");
}).fail(function(err) {
	console.error("Error: " + err);
}).done();
```

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_unlink_path_callback).

### fs.unlinkIfExists(path)

Delete a name and possibly the file it refers to if that file exists. 
Asynchronous unlink(2). Only tries to unlink if the file exists. Returns an 
extended chainable promise.

```javascript
fs.unlinkIfExists("foo.txt").then(function() {
	console.log("foo.txt either deleted or didn't exists");
}).fail(function(err) {
	console.error("Error: " + err);
}).done();
```


### fs.rmdir(path)

Delete a directory. Asynchronous rmdir(2). Returns an extended chainable 
promise.

```javascript
fs.rmdir("foo").then(function() {
	console.log("foo/ deleted successfully");
}).fail(function(err) {
	console.error("Error: " + err);
}).done();
```

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_rmdir_path_callback).

### fs.rmdirIfExists(path)

Delete a directory if it exists. 
Asynchronous rmdir(2). Only tries to remove the directory if it exists. Returns an extended chainable promise.

```javascript
fs.rmdirIfExists("foo").then(function() {
	console.log("foo/ deleted or did not exists");
}).fail(function(err) {
	console.error("Error: " + err);
}).done();
```

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_rmdir_path_callback).


### fs.mkdir(path, [mode])

Create a directory.
Asynchronous mkdir(2). Returns an extended chainable promise.

```javascript
fs.mkdir("foo", "0755").then(function() {
	console.log("foo/ created successfully");
}).fail(function(err) {
	console.error("Error: " + err);
}).done();
```

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_mkdir_path_mode_callback).

### fs.mkdirIfMissing(path, [mode])

Create a directory if it does not exist.
Asynchronous mkdir(2). Only tries to create the directory if it does not already exist. Returns an extended chainable promise.

```javascript
fs.mkdirIfMissing("foo", "0755").then(function() {
	console.log("foo/ created or did exists already");
}).fail(function(err) {
	console.error("Error: " + err);
}).done();
```

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_mkdir_path_mode_callback).


### fs.readdir(path)

Read directory entry. Asynchronous readdir(3). Returns an extended chainable 
promise.

```javascript
fs.readdir("foo").then(function(files) {
	console.log("foo/ has: " + files.join(" ") );
}).fail(function(err) {
	console.error("Error: " + err);
}).done();
```

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_readdir_path_callback).


### fs.open(path, flags, [mode])

Open and possibly create a file or device.
Asynchronous file open. See open(2). Returns an extended chainable promise.

```javascript
var fd, buffer;
fs.stat("foo.txt").then(function(stats) {
	buffer = new Buffer(stats.size);
	return fs.open("foo.txt", "r");
}).then(function(d) {
	fd = d; 
	return fd.read(buffer, 0, buffer.length, null);
}).then(function(results) {
	var data = buffer.toString("utf8", 0, buffer.length);
	console.log("Successfully read: " + data);
	return fd.close();
}).fail(function(err) {
	console.error("Error: " + err);
}).done();
```

See also [original Node.js API 
documentation](http://nodejs.org/api/fs.html#fs_fs_open_path_flags_mode_callback).


### fs.close(fd)

Close a file descriptor. 
Asynchronous close(2). Returns an extended chainable promise.

See the example for [fs.open()](#fsopenpath-flags-mode).

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_close_fd_callback).


### fs.utimes(path, atime, mtime)

Change file timestamps of the file referenced by the supplied path.

Returns an extended chainable promise.

```javascript
var now = new Date();
fs.utimes("foo.txt", now, now).then(function() {
	console.log("foo.txt times successfully changed.");
}).fail(function(err) {
	console.error("Error: " + err);
}).done();
```

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_utimes_path_atime_mtime_callback).


### fs.futimes(fd, atime, mtime)

Change the file timestamps of a file referenced by the supplied file descriptor.

Returns an extended chainable promise.

```javascript
var now = new Date();
fs.open("foo.txt", "r").then(function(fd){
	return fs.futimes(fd.valueOf(), now, now).close(fd.valueOf());
}).then(function() {
	console.log("Truncated succesfully!");
}).fail(function(err) {
	console.error("Error: " + err);
}).done();
```

**Note!** Usually there is no need to call this method because `fs.open()` 
returns an instance of `fs.Descriptor` which can be chained.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_futimes_fd_atime_mtime_callback).


### fs.fsync(fd)

Synchronize a file's in-core state with storage device. Asynchronous fsync(2). 
Returns an extended chainable promise.

```javascript
fs.open("foo.txt", "r").then(function(fd){
	return fs.futimes(fd.valueOf(), now, now).fsync(fd.valueOf()).close(fd.valueOf());
}).then(function() {
	console.log("Truncated succesfully!");
}).fail(function(err) {
	console.error("Error: " + err);
}).done();
```

**Note!** Usually there is no need to call this method because `fs.open()` 
returns an instance of `fs.Descriptor` which can be chained.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_fsync_fd_callback).


### fs.write(fd, buffer, offset, length, position)

Returns an extended chainable promise which will on success pass on an object with properties `.written` and `.buffer`.

```javascript
fs.open("foo.txt", "w").then(function(fd) {
	var buffer = new Buffer("Hello World", "utf8");
	return fs.write(fd.valueOf(), buffer, 0, buffer.length, null);
}).then(function(results) {
	console.log("Successfully wrote " + results.written + " bytes.");
	return fd.close();
}).fail(function(err) {
	console.error("Error: " + err);
}).done();
```

**Note!** Usually there is no need to call this method because `fs.open()` 
returns an instance of `fs.Descriptor` which can be chained:

```javascript
var fd;
fs.open("foo.txt", "w").then(function(d) {
	var buffer = new Buffer("Hello World", "utf8");
	fd = d;
	return fd.write(buffer, 0, buffer.length, null);
}).then(function(results) {
	console.log("Successfully wrote " + results.written + " bytes.");
	return fd.close();
}).fail(function(err) {
	console.error("Error: " + err);
}).done();
```

See also [original Node.js API 
See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_write_fd_buffer_offset_length_position_callback).


### fs.read(fd, buffer, offset, length, position)

Returns an extended chainable promise which will on success pass on an object with properties `.bytesRead` and `.buffer`.

```javascript
var fd, buffer;
fs.stat("foo.txt").then(function(stats) {
	buffer = new Buffer(stats.size);
	return fs.open("foo.txt", "r");
}).then(function(d) {
	fd = d; 
	return fs.read(fd.valueOf(), buffer, 0, buffer.length, null);
}).then(function(results) {
	var data = buffer.toString("utf8", 0, buffer.length);
	console.log("Successfully read: " + data);
	return fd.close();
}).fail(function(err) {
	console.error("Error: " + err);
}).done();
```

**Note!** Usually there is no need to call this method because `fs.open()` 
returns an instance of `fs.Descriptor` which can be chained. See the example 
for [fs.open()](#fsopenpath-flags-mode).

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_read_fd_buffer_offset_length_position_callback).


### fs.readFile(filename, [options])

Read file contents.

Returns an extended chainable promise.

```javascript
fs.readFile("foo.txt", {encoding:"utf8"}).then(function(data) {
	console.log("foo.txt: " + data);
}).fail(function(err) {
	console.error("Error: " + err);
}).done();
```

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_readfile_filename_options_callback).


### fs.writeFile(filename, data, [options])

Write file.

Returns an extended chainable promise.

```javascript
fs.writeFile("foo.txt", "Hello World", {encoding:"utf8"}).then(function() {
	console.log("Wrote foo.txt successfully");
}).fail(function(err) {
	console.error("Error: " + err);
}).done();
```

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_writefile_filename_data_options_callback).


### fs.appendFile(filename, data, [options])

Append to file.

Returns an extended chainable promise.

```javascript
fs.appendFile("foo.txt", "Hello World", {encoding:"utf8"}).then(function() {
	console.log("Appended to foo.txt successfully");
}).fail(function(err) {
	console.error("Error: " + err);
}).done();
```

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_appendfile_filename_data_options_callback).


### fs.exists(path)

Checks if a path exists.
Returns an extended chainable promise.

```javascript
fs.exists("foo.txt").then(function(exists) {
	if(exists) {
		console.log("foo.txt exists");
	} else {
		console.log("foo.txt does not exist!");
	}
}).fail(function(err) {
	console.error("Error: " + err);
}).done();
```

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



### fd.stat()

Alias for [fd.fstat](#fdfstat).

```javascript
var fd, buffer;
fs.open("foo.txt", "r").then(function(d) {
	fd = d;
	return fd;
}).stat().then(function(stats) {
	buffer = new Buffer(stats.size);
	return fd;
}).then(function(fd) {
	return fd.read(buffer, 0, buffer.length, null);
}).then(function(results) {
	var data = buffer.toString("utf8", 0, buffer.length);
	console.log("Successfully read: " + data);
	return fd.close();
}).fail(function(err) {
	console.error("Error: " + err);
}).done();
```

### fd.fstat()

Alias for [fd.stat](#fdstat).

Returns an extended chainable promise.

See example above 
[fd.stat](#fdstat).

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_fstat_fd_callback).



### fd.truncate(len)

Alias for [fd.ftruncate](#fdftruncate-len).

```javascript
fs.open("foo.txt", "w").truncate(4).close().then(function() {
	console.log("Successfully truncated foo.txt to 4 bytes");
}).fail(function(err) {
	console.error("Error: " + err);
}).done();
```

### fd.ftruncate(len)

Alias for [fd.truncate](#fdtruncate-len).

Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_ftruncate_fd_len_callback).


### fd.chown(uid, gid)

Alias for [fd.fchown](#fdfchown-uid-gid).

```javascript
fs.open("foo.txt", "w").chown(1000, 1000).close().then(function() {
	console.log("Successfully changed foo.txt.");
}).fail(function(err) {
	console.error("Error: " + err);
}).done();
```


### fd.fchown(uid, gid)

Alias for [fd.chown](#fdchown-uid-gid).

Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_fchown_fd_uid_gid_callback).


### fd.chmod(mode)

Alias for [fd.fchmod](#fdfchmod-mode).

```javascript
fs.open("foo.txt", "w").chmod("0600").close().then(function() {
	console.log("Successfully changed foo.txt.");
}).fail(function(err) {
	console.error("Error: " + err);
}).done();
```


### fd.fchmod(mode)

Alias for [fd.fchmod](#fdchmod-mode).

Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_fchmod_fd_mode_callback).


### fd.utimes(atime, mtime)

Alias for [fd.futimes](#fdfutimes-atime-mtime).

```javascript
var now = new Date();
fs.open("foo.txt", "w").utimes(now, now).close().then(function() {
	console.log("Successfully changed foo.txt.");
}).fail(function(err) {
	console.error("Error: " + err);
}).done();
```

### fd.futimes(atime, mtime)

Alias for [fd.utimes](#fdutimes-atime-mtime).

Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_futimes_fd_atime_mtime_callback).


### fd.write(buffer, offset, length, position)

Returns an extended chainable promise.

```javascript
var fd;
var buffer = new Buffer("Hello World", "utf8");
fs.open("foo.txt", "w").then(function(d) {
	return fd = d;
}).write(buffer, 0, buffer.length, null).then(function(results) {
	console.log("Successfully wrote " + results.written + " bytes.");
	return fd.close();
}).fail(function(err) {
	console.error("Error: " + err);
}).done();
```

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_write_fd_buffer_offset_length_position_callback).


### fd.read(buffer, offset, length, position)

Returns an extended chainable promise.

```javascript
var fd, buffer;
fs.stat("foo.txt").then(function(stats) {
	buffer = new Buffer(stats.size);
	return fs.open("foo.txt", "r");
}).then(function(d) {
	fd = d; 
	return fd.read(buffer, 0, buffer.length, null);
}).then(function(results) {
	var data = buffer.toString("utf8", 0, buffer.length);
	console.log("Successfully read: " + data);
	return fd.close();
}).fail(function(err) {
	console.error("Error: " + err);
}).done();
```

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_read_buffer_offset_length_position_callback).


### fd.sync()

Alias for [fd.fsync](#fdfsync).

```javascript
var fd;
var buffer = new Buffer("Hello World", "utf8");
fs.open("foo.txt", "w").then(function(d) {
	return fd = d;
}).write(buffer, 0, buffer.length, null).sync().close().then(function() {
	console.log("Successfully wrote to foo.txt");
}).fail(function(err) {
	console.error("Error: " + err);
}).done();
```

### fd.fsync()

Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_fsync_fd_callback).





Class SyncFileSystem
--------------------

These are chainable synchronous wrappers for original calls like `require("fs").{call}Sync(...)`.

### fs.sync.rename(oldPath, newPath)
### fs.sync.ftruncate(fd, len)
### fs.sync.truncate(path, len)
### fs.sync.chown(path, uid, gid)
### fs.sync.lchown(path, uid, gid)
### fs.sync.fchown(fd, uid, gid)
### fs.sync.chmod(path, mode)
### fs.sync.fchmod(fd, mode)
### fs.sync.lchmod(path, mode)
### fs.sync.stat(path)
### fs.sync.lstat(path)
### fs.sync.fstat(fd)
### fs.sync.link(srcpath, dstpath)
### fs.sync.symlink(srcpath, dstpath, [type])
### fs.sync.readlink(path)
### fs.sync.realpath(path, [cache])
### fs.sync.unlink(path)
### fs.sync.rmdir(path)
### fs.sync.mkdir(path, [mode])
### fs.sync.readdir(path)
### fs.sync.close(fd)
### fs.sync.open(path, flags, [mode])

Returns with promise of an instance of `fs.sync.Descriptor`.

### fs.sync.utimes(path, atime, mtime)
### fs.sync.futimes(fd, atime, mtime)
### fs.sync.fsync(fd)
### fs.sync.write(fd, buffer, offset, length, position)
### fs.sync.read(fd, buffer, offset, length, position)
### fs.sync.readFile(filename, [options])
### fs.sync.writeFile(filename, data, [options])
### fs.sync.appendFile(filename, data, [options])
### fs.sync.exists(path)

Class fs.sync.Descriptor
------------------------

These are chainable synchronous wrappers for original calls like `require("fs").{call}Sync(fd, ...)`.

### fs.sync.Descriptor.prototype.ftruncate(len)
### fs.sync.Descriptor.prototype.fchown(uid, gid)
### fs.sync.Descriptor.prototype.fchmod(mode)
### fs.sync.Descriptor.prototype.fstat()
### fs.sync.Descriptor.prototype.close()
### fs.sync.Descriptor.prototype.futimes(atime, mtime)
### fs.sync.Descriptor.prototype.fsync()
### fs.sync.Descriptor.prototype.write(buffer, offset, length, position)
### fs.sync.Descriptor.prototype.read(buffer, offset, length, position)

Support for fs.ReadStream and fs.WriteStream
--------------------------------------------

**Warning!** These are **not** implemented yet.

### fs.createReadStream(path, [options])
### Class: fs.ReadStream
#### Event: "open"
### fs.createWriteStream(path, [options])
### Class: fs.WriteStream
#### Event: "open"
#### file.bytesWritten

Support for watch features
--------------------------

**Warning!** These are **not** implemented yet.

### fs.watchFile(filename, [options], listener)

**Warning!** It is **not** implemented yet.

Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_watchfile_filename_options_listener).

### fs.unwatchFile(filename, [listener])

**Warning!** It is **not** implemented yet.

Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_ftruncate_fd_len_callback).

### fs.watch(filename, [options], [listener])

**Warning!** It is **not** implemented yet.

Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_ftruncate_fd_len_callback).

### Class: fs.FSWatcher
#### watcher.close()
#### Event: "change"
#### Event: "error"

Tests
-----

Tests can be run by `npm test`.

Licence
-------

The MIT License (MIT), see [the LICENCE file](https://raw.github.com/Sendanor/nor-fs/master/LICENSE).

