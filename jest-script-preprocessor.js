'use strict';

// This is a bit of a hax
var babelJest = require("babel-jest");

module.exports = {
  process: function(src, filename) {
    return babelJest.process(src, filename)
      .replace(/^require.*\.less.*;$/gm, '');
  }
};
