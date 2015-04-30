/* jshint node: true */
/* global jest, describe, it, expect */

jest.dontMock('../index.js');

var React = require('react/addons');
var ItemList = require('../index.js');
var TestUtils = React.addons.TestUtils;

//Render the component
var itemList = TestUtils.renderIntoDocument(
  <ItemList />
);

describe('ItemList', function() {
  it('renders', function() {
    expect(itemList).toBeDefined();
    expect(TestUtils.isCompositeComponentWithType(itemList, ItemList))
      .toBe(true);
  });
});


