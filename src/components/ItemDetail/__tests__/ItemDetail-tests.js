/* eslint-env node, jasmine */
/* global jest */

jest.dontMock('../index.js');
jest.dontMock('../../../utils/TestContext');

var React = require('react/addons');
var testContext = require('../../../utils/TestContext');
var ItemDetail = require('../index.js');
var {TestUtils} = React.addons;

describe('ItemDetail', () => {
  var itemDetail;

  beforeEach(() => {
    // Render the component
    itemDetail = testContext.getRouterComponent(ItemDetail);
  });

  it('should render', () => {
    expect(itemDetail).toBeDefined();
    expect(TestUtils.isCompositeComponentWithType(itemDetail, ItemDetail))
        .toBe(true);
    expect(itemDetail.getDOMNode().className).toContain('itemdetail');
  });
});

