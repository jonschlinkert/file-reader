/*!
 * file-reader <https://github.com/jonschlinkert/file-reader>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var fs = require('fs-utils');
var mapFiles = require('map-files');
var extend = require('extend-shallow');

module.exports = function(patterns, options) {
  return mapFiles(patterns, extend({
    name: camelize,
    read: function(fp) {
      var ext = path.extname(fp);
      if (!reader.hasOwnProperty(ext)) {
        ext = '.txt';
      }
      return reader[ext](path.resolve(fp));
    }
  }, options));
};

/**
 * This is just a minimal start, pull requests welcome
 * for adding extensions/readers to the list.
 *
 * @param {String} `ext`
 * @return {Function} The file reader to use for the given `ext`
 * @api private
 */

var reader = {
  // Functions
  '.js'  : require,

  // Strings
  '.hbs' : fs.readFileSync,
  '.md'  : fs.readFileSync,
  '.tmpl': fs.readFileSync,
  '.txt' : fs.readFileSync,

  // Objects
  '.json': require,
  '.yaml': fs.readYAMLSync,
  '.yml' : fs.readYAMLSync,
};

/**
 * Camelcase rename function to pass to [map-files].
 *
 * @param  {String} `fp`
 * @return {String}
 */

function camelize(fp) {
  var str = path.basename(fp, path.extname(fp));
  if (/\./.test(str)) {
    str = str.split('.')[0];
  }
  if (str.length === 1) {
    return str;
  }
  str = str.replace(/^[-_.\s]+/, '').toLowerCase();
  return str.replace(/[-_.]+(\w|$)/g, function (_, ch) {
    return ch.toUpperCase();
  });
}
