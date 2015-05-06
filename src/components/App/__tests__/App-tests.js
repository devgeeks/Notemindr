/* eslint-env node, jasmine */
/* global jest */

jest.dontMock('../../../utils/TestContext');
jest.dontMock('../index.js');

var testContext = require('../../../utils/TestContext');
var React = require('react/addons');
var {TestUtils} = React.addons;
var App = require('../index.js');
var Login = require('../../Login');
var Header = require('../../Header');
var TimeoutTransitionGroup = require('timeout-transition-group');

var app;

describe('App', () => {
  beforeEach(() => {
    // Render the component
    app = testContext.getRouterComponent(App);
  });

  it('should render', () => {
    expect(app).toBeDefined();
    expect(TestUtils.isCompositeComponentWithType(app, App)).toBe(true);
    expect(app.getDOMNode().className).toContain('app');
  });

  it('should have three (3) children', () => {
    var children = TestUtils.findRenderedDOMComponentWithClass(app, 'app')
      .props.children;
    expect(app.getDOMNode().children.length).toBe(3);
    expect(children.length).toBe(3);
    expect(TestUtils.isElementOfType(children[0], Login)).toBe(true);
    expect(TestUtils.isElementOfType(children[1], Header)).toBe(true);
    expect(TestUtils.isElementOfType(children[2], TimeoutTransitionGroup))
      .toBe(true);
  });
});

