/* eslint-env node, jasmine */
/* global jest */

jest.dontMock('../index.js');

var React = require('react/addons');
var Item = require('../index.js');
var {TestUtils} = React.addons;

describe('Item', () => {
  var item,
      itemElement;

  beforeEach(() => {
    //Render the component
    item = TestUtils.renderIntoDocument(
      <Item />
    );
    itemElement =
      TestUtils.findRenderedDOMComponentWithClass(item, 'item');
  });

  it('should render', () => {
    expect(item).toBeDefined();
    expect(TestUtils.isCompositeComponentWithType(item, Item)).toBe(true);
    expect(itemElement).toBeDefined();
  });
});


