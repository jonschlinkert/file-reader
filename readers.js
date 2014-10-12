'use strict';

var fs = require('fs-utils');

/**
 * This is just a minimal start, pull requests welcome
 * for adding extensions/readers to the list.
 *
 * @type {Object}
 */

module.exports = function (ext) {
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
};