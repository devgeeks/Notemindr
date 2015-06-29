/* eslint-env node, jasmine */
/* global jest */
'use strict';

jest.dontMock('../../../utils/TestContext');
jest.dontMock('../index.js');

var testContext = require('../../../utils/TestContext');

var React = require('react/addons');
var {TestUtils} = React.addons;
var TimeoutTransitionGroup = require('timeout-transition-group');

var App = require('../index.js');
var TransientDialog = require('../../TransientDialog');
var Login = require('../../Login');
var Header = require('../../Header');
var SessionStore = require('../../../stores/SessionStore');
var NoteStore = require('../../../stores/NoteStore');

var app;

describe('App', () => {
  beforeEach(() => {
    SessionStore.getState.mockReturnValue({
      session: null,
      pending: false,
      error: ''
    });
    NoteStore.getState.mockReturnValue({
      items: [
        {id: 1, h1: 'A large heading', body: 'This is the body of a note...'},
        {id: 2, h1: 'Big heading', h2: 'Small heading', body: 'A body'}
      ],
      item: {},
      pending: false,
      error: ''
    });
    // Render the component
    app = testContext.getRouterComponent(App);
  });

  it('should render', () => {
    expect(app).toBeDefined();
    expect(TestUtils.isCompositeComponentWithType(app, App)).toBe(true);
    expect(app.getDOMNode().className).toContain('app');
  });

  it('should have four (4) children', () => {
    var children = TestUtils.findRenderedDOMComponentWithClass(app, 'app')
      .props.children;
    expect(app.getDOMNode().children.length).toBe(4);
    expect(children.length).toBe(4);
    expect(TestUtils.isElementOfType(children[0], TransientDialog)).toBe(true);
    expect(TestUtils.isElementOfType(children[1], Login)).toBe(true);
    expect(TestUtils.isElementOfType(children[2], Header)).toBe(true);
    expect(TestUtils.isElementOfType(children[3], TimeoutTransitionGroup))
      .toBe(true);
  });
});

