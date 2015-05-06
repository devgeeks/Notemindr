/* eslint-env node, jasmine */
/* global jest */

jest.dontMock('../index.js');

var React = require('react/addons');
var ItemList = require('../index.js');
var {TestUtils} = React.addons;

//Render the component
var itemList = TestUtils.renderIntoDocument(
  <ItemList />
);

describe('ItemList', () => {
  it('renders', () => {
    expect(itemList).toBeDefined();
    expect(TestUtils.isCompositeComponentWithType(itemList, ItemList))
      .toBe(true);
  });
});


