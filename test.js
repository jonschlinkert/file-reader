/*!
 * file-reader <https://github.com/jonschlinkert/file-reader>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var assert = require('assert');
require('should');
var read = require('./');


describe('files', function () {
  it('should return an object of .txt strings:', function () {
    var fixtures = read('fixtures/*.txt');
    fixtures.should.have.property('a', 'AAA');
    fixtures.should.have.property('b', 'BBB');
    fixtures.should.have.property('c', 'CCC');
  });

  it('should return an object of .js functions:', function () {
    var fixtures = read('fixtures/*.js');
    fixtures.should.have.property('a');
    fixtures.a.should.be.a.function;
    fixtures.should.have.property('b');
    fixtures.b.should.be.a.function;
    fixtures.should.have.property('c');
    fixtures.c.should.be.a.function;
  });

  it('should return an object of .yml objects:', function () {
    var fixtures = read('fixtures/*.{yml,json}');
    fixtures.should.have.property('a', {a: 'a'});
    fixtures.a.should.be.an.object;
    fixtures.should.have.property('b', {b: 'b'});
    fixtures.b.should.be.an.object;
    fixtures.should.have.property('c', {c: 'c'});
    fixtures.c.should.be.an.object;
  });
});

describe('file', function () {
  it('should dynamically choose the reader to read a txt file:', function () {
    var fixtures = read.file('fixtures/a.txt');
    fixtures.should.equal('AAA');
  });
  it('should dynamically choose the reader to read a txt file:', function () {
    var fixtures = read.file('fixtures/a.json');
    fixtures.should.eql({a: 'a'});
  });
  it('should dynamically choose the reader to read a txt file:', function () {
    var fixtures = read.file('fixtures/a.yml');
    fixtures.should.eql({a: 'a'});
  });
});

