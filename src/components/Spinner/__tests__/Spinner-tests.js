/* eslint-env node, jasmine */
/* global jest */

jest.dontMock('../index.js');

var React = require('react/addons');
var Spinner = require('../index.js');
var {TestUtils} = React.addons;

describe('Spinner', () => {
  var spinner,
      spinnerComponent;

  beforeEach(() => {
    //Render the component
    spinner = TestUtils.renderIntoDocument(
      <Spinner pending={false} />
    );
    spinnerComponent = TestUtils
        .findRenderedDOMComponentWithClass(spinner, 'spinnercontainer');
  });

  it('should render', () => {
    expect(spinner).toBeDefined();
    expect(TestUtils.isCompositeComponentWithType(spinner, Spinner))
        .toBe(true);
    expect(spinner.getDOMNode().className).toContain('spinnercontainer');
  });

  it('should be hidden by default', () => {
    expect(spinner.getDOMNode().className).toNotContain('pending');
  });
});

describe('Spinner pending', () => {
  var spinner,
      spinnerComponent;

  beforeEach(() => {
    //Render the component
    spinner = TestUtils.renderIntoDocument(
      <Spinner pending={true} />
    );
    spinnerComponent = TestUtils
        .findRenderedDOMComponentWithClass(spinner, 'spinnercontainer');
  });

  it('should be visible when pending', () => {
    expect(spinner.getDOMNode().className).toContain('pending');
  });
});

describe('Spinner light', () => {
  // ...
});

describe('Spinner dark', () => {
  // ...
});

describe('Spinner dimensions', () => {
  // ...
});
