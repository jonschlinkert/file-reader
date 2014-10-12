/*!
 * file-reader <https://github.com/jonschlinkert/file-reader>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var mapFiles = require('map-files');
var merge = require('mixin-object');
var reader = require('./readers');


module.exports = function (patterns, options) {
  return mapFiles(patterns, merge({}, options, {
    name: function camelize(fp) {
      var str = path.basename(fp, path.extname(fp));
      return str.replace(/-(.)/, function (_, s) {
        return s.toUpperCase();
      });
    },
    read: function read(fp) {
      return reader(path.extname(fp))(path.resolve(fp));
    }
  }));
};
