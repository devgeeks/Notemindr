/* eslint-env node, jasmine */
/* global jest */

jest.dontMock('../index.js');

var React = require('react/addons');
var Spinner = require('../index.js');
var TestUtils = React.addons.TestUtils;

describe('Spinner', function() {
  var spinner,
      spinnerComponent;

  beforeEach(function() {
    //Render the component
    spinner = TestUtils.renderIntoDocument(
      <Spinner pending={false} />
    );
    spinnerComponent = TestUtils
        .findRenderedDOMComponentWithClass(spinner, 'spinnercontainer');
  });

  it('should render', function() {
    expect(spinner).toBeDefined();
    expect(TestUtils.isCompositeComponentWithType(spinner, Spinner))
        .toBe(true);
    expect(spinner.getDOMNode().className).toContain('spinnercontainer');
  });

  it('should be hidden by default', function() {
    expect(spinner.getDOMNode().className).toNotContain('pending');
  });
});

describe('Spinner pending', function() {
  var spinner,
      spinnerComponent;

  beforeEach(function() {
    //Render the component
    spinner = TestUtils.renderIntoDocument(
      <Spinner pending={true} />
    );
    spinnerComponent = TestUtils
        .findRenderedDOMComponentWithClass(spinner, 'spinnercontainer');
  });

  it('should be visible when pending', function() {
    expect(spinner.getDOMNode().className).toContain('pending');
  });
});

describe('Spinner light', function() {
  // ...
});

describe('Spinner dark', function() {
  // ...
});

describe('Spinner dimensions', function() {
  // ...
});
