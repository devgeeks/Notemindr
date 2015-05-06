/* eslint-env node, jasmine */
/* global jest */

jest.dontMock('../index.js');

var React = require('react/addons');
var Header = require('../index.js');
var TestUtils = React.addons.TestUtils;

//Render the component
var header = TestUtils.renderIntoDocument(
  <Header />
);

describe('Header', function() {
  it('should render', function() {
    var headerElement =
      TestUtils.findRenderedDOMComponentWithClass(header, 'header');
    expect(header).toBeDefined();
    expect(TestUtils.isCompositeComponentWithType(header, Header)).toBe(true);
    expect(headerElement).toBeDefined();
  });
});

