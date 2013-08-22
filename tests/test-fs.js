"use strict";

var fs = require('../lib/fs.js');
var assert = require('assert');

/* */
describe('fs', function(){

  describe('.true()', function(){
    it('should return true when the value fs trueish', function(){
      assert.strictEqual(true, fs.true(true));
    });
    it('should return false when the value fs not trueish', function(){
      assert.strictEqual(false, fs.true(false));
    });
  });

});

/* EOF */
