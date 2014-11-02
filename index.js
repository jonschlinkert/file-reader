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
      fp = path.resolve(fp);
      var read = reader(path.extname(fp));
      return read(fp);
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

function reader(ext) {
  switch (ext) {
    // Requireable files
    case '.js':
    case '.json':
      return require;

    // Strings
    case '.txt':
    case '.md':
    case '.hbs':
      return fs.readFileSync;

    // Data
    case '.yml':
    case '.yaml':
      return fs.readYAMLSync;
    }
}


/**
 * Camelcase rename function to pass to [map-files].
 *
 * @param  {String} `fp`
 * @return {String}
 */

function camelize(fp) {
  var str = path.basename(fp, path.extname(fp));
  if (str.length === 1) {
    return str;
  }
  return str.toLowerCase().replace(/[-_.](\w|$)/g, function (_, ch) {
    return ch.toUpperCase();
  });
}
