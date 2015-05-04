/* jshint node: true */
/* global jest, beforeEach, describe, it, expect */

jest.dontMock('../index.js');
jest.dontMock('../../../utils/TestContext');

var React = require('react/addons');
var testContext = require('../../../utils/TestContext');
var ItemDetail = require('../index.js');
var TestUtils = React.addons.TestUtils;

describe('ItemDetail', function() {
  var itemDetail;

  beforeEach(function() {
    // Render the component
    itemDetail = testContext.getRouterComponent(ItemDetail);
  });

  it('should render', function() {
    expect(itemDetail).toBeDefined();
    expect(TestUtils.isCompositeComponentWithType(itemDetail, ItemDetail))
        .toBe(true);
    expect(itemDetail.getDOMNode().className).toContain('itemdetail');
  });
});

