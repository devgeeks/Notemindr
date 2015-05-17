/* eslint-env node, jasmine */
/* global jest */
'use strict';

jest.dontMock('../index.js');

var React = require('react/addons');
var Item = require('../index.js');
var {TestUtils} = React.addons;

describe('Item', () => {
  var itemComponent,
      itemElement;

  beforeEach(() => {
    //Render the component
    let item = {id: 2, h1: 'Big heading', h2: 'Small heading', body: 'A body'};
    itemComponent = TestUtils.renderIntoDocument(
      <Item item={item} key={item.id} />
    );
    itemElement =
      TestUtils.findRenderedDOMComponentWithClass(itemComponent, 'item');
  });

  it('should render', () => {
    expect(itemComponent).toBeDefined();
    expect(TestUtils.isCompositeComponentWithType(itemComponent, Item)).toBe(true);
    expect(itemElement).toBeDefined();
  });
});


