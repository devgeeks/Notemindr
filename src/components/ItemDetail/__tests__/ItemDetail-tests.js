/* jshint node: true */
/* global jest, describe, it, expect */

jest.dontMock('../index.js');

var React = require('react/addons');
var ItemDetail = require('../index.js');
var TestUtils = React.addons.TestUtils;

//Render the component
var itemDetail = TestUtils.renderIntoDocument(
  <ItemDetail />
);

describe('ItemDetail', function() {
  it('should render', function() {
    expect(itemDetail).toBeDefined();
    expect(TestUtils.isCompositeComponentWithType(itemDetail, ItemDetail))
      .toBe(true);
  });
});

