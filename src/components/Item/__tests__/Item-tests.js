/* jshint node: true */
/* global jest, beforeEach, describe, it, expect */

jest.dontMock('../index.js');

var React = require('react/addons');
var Item = require('../index.js');
var TestUtils = React.addons.TestUtils;

describe('Item', function() {
  var item,
      itemElement;

  beforeEach(function() {
    //Render the component
    item = TestUtils.renderIntoDocument(
      <Item />
    );
    itemElement =
      TestUtils.findRenderedDOMComponentWithClass(item, 'item');
  });

  it('should render', function() {
    expect(item).toBeDefined();
    expect(TestUtils.isCompositeComponentWithType(item, Item)).toBe(true);
    expect(itemElement).toBeDefined();
  });
});


