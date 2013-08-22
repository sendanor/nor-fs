nor-fs -- Chainable Asynchronous Filesystem Library
===================================================

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

### FileSystem.prototype.rename(oldPath, newPath)

**Warning!** It is **not** implemented yet.

Asynchronous [rename(2)](http://linux.die.net/man/2/rename).

Renames a file from `oldPath` to `newPath`.

Returns an extended chainable promise.

See also [fs.rename from Node.js API Documentation](http://nodejs.org/api/fs.html#fs_fs_rename_oldpath_newpath_callback)

### FileSystem.prototype.ftruncate(fd, len)

**Warning!** It is **not** implemented yet.

Asynchronous [ftruncate(2)](http://linux.die.net/man/2/ftruncate).

Returns an extended chainable promise.

See also [fs.ftruncate from Node.js API Documentation](http://nodejs.org/api/fs.html#fs_fs_ftruncate_fd_len_callback).

### FileSystem.prototype.truncate(path, len)

**Warning!** It is **not** implemented yet.

Asynchronous [truncate(2)](http://man7.org/linux/man-pages/man2/truncate.2.html).

Returns an extended chainable promise.

See also [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_truncate_path_len_callback).

### FileSystem.prototype.chown(path, uid, gid)

**Warning!** It is **not** implemented yet.

Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_chown_path_uid_gid_callback).

### FileSystem.prototype.fchown(fd, uid, gid)

**Warning!** It is **not** implemented yet.

Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_fchown_fd_uid_gid_callback).

### FileSystem.prototype.lchown(path, uid, gid)

**Warning!** It is **not** implemented yet.

Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_lchown_path_uid_gid_callback).

### FileSystem.prototype.chmod(path, mode)

**Warning!** It is **not** implemented yet.

Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_chmod_path_mode_callback).

### FileSystem.prototype.fchmod(fd, mode)

**Warning!** It is **not** implemented yet.

Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_fchmod_fd_mode_callback).

### FileSystem.prototype.lchmod(path, mode)

**Warning!** It is **not** implemented yet.

Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_lchmod_path_mode_callback).

### FileSystem.prototype.stat(path)

**Warning!** It is **not** implemented yet.

Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_stat_path_callback).

### FileSystem.prototype.lstat(path)

**Warning!** It is **not** implemented yet.

Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_lstat_path_callback).

### FileSystem.prototype.fstat(fd)

**Warning!** It is **not** implemented yet.

Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_fstat_fd_callback).

### FileSystem.prototype.link(srcpath, dstpath)

**Warning!** It is **not** implemented yet.

Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_link_srcpath_dstpath_callback).

### FileSystem.prototype.symlink(srcpath, dstpath, [type])

**Warning!** It is **not** implemented yet.

Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_symlink_srcpath_dstpath_type_callback).

### FileSystem.prototype.readlink(path)

**Warning!** It is **not** implemented yet.

Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_readlink_path_callback).

### FileSystem.prototype.realpath(path, [cache])

**Warning!** It is **not** implemented yet.

Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_realpath_path_cache_callback).

### FileSystem.prototype.unlink(path)

**Warning!** It is **not** implemented yet.

Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_unlink_path_callback).

### FileSystem.prototype.rmdir(path)

**Warning!** It is **not** implemented yet.

Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_rmdir_path_callback).

### FileSystem.prototype.mkdir(path, [mode])

**Warning!** It is **not** implemented yet.

Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_mkdir_path_mode_callback).

### FileSystem.prototype.readdir(path)

**Warning!** It is **not** implemented yet.

Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_readdir_path_callback).

### FileSystem.prototype.close(fd)

**Warning!** It is **not** implemented yet.

Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_close_fd_callback).

### FileSystem.prototype.open(path, flags, [mode])

**Warning!** It is **not** implemented yet.

Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_open_path_flags_mode_callback).

### FileSystem.prototype.utimes(path, atime, mtime)

**Warning!** It is **not** implemented yet.

Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_utimes_path_atime_mtime_callback).

### FileSystem.prototype.futimes(fd, atime, mtime)

**Warning!** It is **not** implemented yet.

Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_futimes_fd_atime_mtime_callback).

### FileSystem.prototype.fsync(fd)

**Warning!** It is **not** implemented yet.

Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_fsync_fd_callback).

### FileSystem.prototype.write(fd, buffer, offset, length, position)

**Warning!** It is **not** implemented yet.

Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_write_fd_buffer_offset_length_position_callback).

### FileSystem.prototype.read(fd, buffer, offset, length, position)

**Warning!** It is **not** implemented yet.

Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_read_fd_buffer_offset_length_position_callback).

### FileSystem.prototype.readFile(filename, [options])

**Warning!** It is **not** implemented yet.

Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_readfile_filename_options_callback).

### FileSystem.prototype.writeFile(filename, data, [options])

**Warning!** It is **not** implemented yet.

Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_writefile_filename_data_options_callback).

### FileSystem.prototype.appendFile(filename, data, [options])

**Warning!** It is **not** implemented yet.

Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_appendfile_filename_data_options_callback).

### FileSystem.prototype.exists(path)

**Warning!** It is **not** implemented yet.

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


### FileDescriptor.prototype.truncate(len)

Alias for [FileDescriptor.prototype.ftruncate](#filedescriptor_prototype_ftruncate_len).

### FileDescriptor.prototype.ftruncate(len)

**Warning!** It is **not** implemented yet.

Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_ftruncate_fd_len_callback).


### FileDescriptor.prototype.chown(uid, gid)

Alias for [FileDescriptor.prototype.fchown](#filedescriptor_prototype_fchown_len).

### FileDescriptor.prototype.fchown(uid, gid, callback)

**Warning!** It is **not** implemented yet.

Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_fchown_fd_uid_gid_callback).


### FileSystem.prototype.chmod(mode)

Alias for [FileDescriptor.prototype.fchmod](#filedescriptor_prototype_fchmod_mode).

### FileSystem.prototype.fchmod(mode)

**Warning!** It is **not** implemented yet.

Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_fchmod_fd_mode_callback).


### FileSystem.prototype.utimes(atime, mtime)

Alias for [FileDescriptor.prototype.futimes](#filedescriptor_prototype_futimes_atime_mtime).

### FileSystem.prototype.futimes(atime, mtime)

**Warning!** It is **not** implemented yet.

Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_futimes_fd_atime_mtime_callback).


### FileSystem.prototype.write(buffer, offset, length, position)

**Warning!** It is **not** implemented yet.

Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_write_fd_buffer_offset_length_position_callback).


### FileSystem.prototype.read(buffer, offset, length, position)

**Warning!** It is **not** implemented yet.

Returns an extended chainable promise.

See [original Node.js API documentation](http://nodejs.org/api/fs.html#fs_fs_read_buffer_offset_length_position_callback).




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

### FileSystem.prototype.renameSync(oldPath, newPath)
### FileSystem.prototype.ftruncateSync(fd, len)
### FileSystem.prototype.truncateSync(path, len)
### FileSystem.prototype.chownSync(path, uid, gid)
### FileSystem.prototype.fchownSync(fd, uid, gid)
### FileSystem.prototype.lchownSync(path, uid, gid)
### FileSystem.prototype.chmodSync(path, mode)
### FileSystem.prototype.fchmodSync(fd, mode)
### FileSystem.prototype.lchmodSync(path, mode)
### FileSystem.prototype.statSync(path)
### FileSystem.prototype.lstatSync(path)
### FileSystem.prototype.fstatSync(fd)
### FileSystem.prototype.linkSync(srcpath, dstpath)
### FileSystem.prototype.symlinkSync(srcpath, dstpath, [type])
### FileSystem.prototype.readlinkSync(path)
### FileSystem.prototype.realpathSync(path, [cache])
### FileSystem.prototype.unlinkSync(path)
### FileSystem.prototype.rmdirSync(path)
### FileSystem.prototype.mkdirSync(path, [mode])
### FileSystem.prototype.readdirSync(path)
### FileSystem.prototype.closeSync(fd)
### FileSystem.prototype.openSync(path, flags, [mode])
### FileSystem.prototype.utimesSync(path, atime, mtime)
### FileSystem.prototype.futimesSync(fd, atime, mtime)
### FileSystem.prototype.fsyncSync(fd)
### FileSystem.prototype.writeSync(fd, buffer, offset, length, position)
### FileSystem.prototype.readSync(fd, buffer, offset, length, position)
### FileSystem.prototype.readFileSync(filename, [options])
### FileSystem.prototype.writeFileSync(filename, data, [options])
### FileSystem.prototype.appendFileSync(filename, data, [options])
### FileSystem.prototype.existsSync(path)

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

We're working on tests at the moment.

Licence
-------

The MIT License (MIT), see [the LICENCE file](https://raw.github.com/Sendanor/nor-fs/master/LICENSE).

