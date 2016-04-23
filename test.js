/*!
 * file-reader <https://github.com/jonschlinkert/file-reader>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var yaml = require('js-yaml');
require('should');
var assert = require('assert');
var read = require('./');

describe('files', function() {
  it('should return an object of .txt strings:', function() {
    var fixtures = read('fixtures/*.txt');
    assert(fixtures.hasOwnProperty('a'));
    assert(fixtures.hasOwnProperty('b'));
    assert(fixtures.hasOwnProperty('c'));
  });

  it('should add a `fn` property with the functions for .js files', function() {
    var fixtures = read('fixtures/*.js');
    assert(fixtures.hasOwnProperty('a'));
    assert.equal(typeof fixtures.a.fn, 'function');
    assert(fixtures.hasOwnProperty('b'));
    assert.equal(typeof fixtures.b.fn, 'function');
    assert(fixtures.hasOwnProperty('c'));
    assert.equal(typeof fixtures.c.fn, 'function');
  });
});

describe('file', function() {
  it('should match the extension to a reader', function() {
    var fixtures = read('fixtures/*.{yml,json}');
    assert(fixtures.hasOwnProperty('a'));
    assert.equal(typeof fixtures.a.content, 'object');
    assert(fixtures.hasOwnProperty('aa'));
    assert.equal(typeof fixtures.aa.content, 'object');
    assert(fixtures.hasOwnProperty('b'));
    assert.equal(typeof fixtures.b.content, 'object');
    assert(fixtures.hasOwnProperty('c'));
    assert.equal(typeof fixtures.c.content, 'object');
  });

  it('should dynamically choose the reader to read a txt file:', function() {
    var fixtures = read.file('fixtures/a.txt');
    fixtures.should.equal('AAA');
  });
  it('should dynamically choose the reader to read a txt file:', function() {
    var fixtures = read.file('fixtures/a.json');
    fixtures.should.eql({a: 'a'});
  });
  it('should dynamically choose the reader to read a txt file:', function() {
    var fixtures = read.file('fixtures/a.yml');
    fixtures.should.eql({a: 'a'});
  });

  it('should allow a custom reader to be passed on the options:', function() {
    var fixtures = read.file('fixtures/a.yml', {
      read: function(fp) {
        return yaml.load(fp)
      }
    });
    fixtures.should.eql({a: 'a'});
  });
});

