# file-reader [![NPM version](https://badge.fury.io/js/file-reader.svg)](http://badge.fury.io/js/file-reader)

> Read a glob of files, dynamically choosing the reader or requiring the files based on the file extension.

## Install with [npm](npmjs.org)

```bash
npm i file-reader --save
```

## Usage

Read a glob of files:

```js
var read = require('file-reader');

read('*.js');
//=> { a: [Function: aaa], b: [Function: bbb], c: [Function: ccc] }

read('*.txt');
//=> { a: 'AAA', b: 'BBB', c: 'CCC' }

read('*.{yml,json}');
//=> { a: { a: 'a' }, b: { b: 'b' }, c: { c: 'c' } }
```

Read a single file (you must supply the full file path, no glob patterns):

```js
var read = require('file-reader');

read.file('a.js');
//=> { a: [Function: foo] }

read.file('a.txt');
//=> { a: 'foo' }

read('a.yml');
//=> { a: { foo: 'bar' } }
```

## Run tests

Install dev dependencies:

```bash
npm i -d && npm test
```

## Author

**Jon Schlinkert**
 
+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert) 

## License
Copyright (c) 2014-2015 Jon Schlinkert  
Released under the MIT license

***

_This file was generated by [verb](https://github.com/assemble/verb) on January 21, 2015._