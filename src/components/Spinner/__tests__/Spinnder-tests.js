/* jshint node: true */
/* global jest, describe, it, expect */

jest.dontMock('../index.js');

var React = require('react/addons');
var Spinner = require('../index.js');
var TestUtils = React.addons.TestUtils;

describe('Spinner', function() {
  it('should render', function() {
    //Render the component
    var spinner = TestUtils.renderIntoDocument(
      <Spinner />
    );
    expect(spinner).toBeDefined();
  });
});


