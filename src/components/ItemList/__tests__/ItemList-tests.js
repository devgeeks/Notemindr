/* eslint-env node, jasmine */
/* global jest */
'use strict';

jest.dontMock('../../../utils/TestContext');
jest.dontMock('../index.js');

// var testContext = require('../../../utils/TestContext');

var React = require('react/addons');
var {TestUtils} = React.addons;

var ItemList = require('../index.js');

describe('ItemList', () => {
  var itemList;

  beforeEach(() => {
    var sessionState = {
      error: '',
      pending: false,
      session: {}
    };
    var noteState = {
      items: [
        {id: 1, h1: 'A large heading', body: 'This is the body of a note...'},
        {id: 2, h1: 'Big heading', h2: 'Small heading', body: 'A body'}
      ],
      item: {},
      pending: false,
      error: ''
    };
    itemList = TestUtils.renderIntoDocument(
      <ItemList noteState={noteState} sessionState={sessionState} />
    );
  });

  it('renders', () => {
    expect(itemList).toBeDefined();
    expect(TestUtils.isCompositeComponentWithType(itemList, ItemList))
      .toBe(true);
  });
});


