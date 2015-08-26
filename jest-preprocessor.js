var babelJest = require('babel-jest');

module.exports = {
  process: function(src, filename) {
    if (filename.match(/less/)) {
      return '';
    }
    return babelJest.process(src, filename);
  }
};
