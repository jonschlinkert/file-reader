/*!
 * file-reader <https://github.com/jonschlinkert/file-reader>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var assert = require('assert');
var should = require('should');
var files = require('./');


describe('files', function () {
  it('should return an object of .txt strings:', function () {
    var fixtures = files('fixtures/*.txt');
    // console.log(fixtures)
    fixtures.should.have.property('a', 'AAA');
    fixtures.should.have.property('b', 'BBB');
    fixtures.should.have.property('c', 'CCC');
  });

  it('should return an object of .js functions:', function () {
    var fixtures = files('fixtures/*.js');
    // console.log(fixtures)
    fixtures.should.have.property('a');
    fixtures.a.should.be.a.function;
    fixtures.should.have.property('b');
    fixtures.b.should.be.a.function;
    fixtures.should.have.property('c');
    fixtures.c.should.be.a.function;
  });

  it('should return an object of .yml objects:', function () {
    var fixtures = files('fixtures/*.{yml,json}');
    // console.log(fixtures)
    fixtures.should.have.property('a', {a: 'a'});
    fixtures.a.should.be.an.object;
    fixtures.should.have.property('b', {b: 'b'});
    fixtures.b.should.be.an.object;
    fixtures.should.have.property('c', {c: 'c'});
    fixtures.c.should.be.an.object;
  });
});

