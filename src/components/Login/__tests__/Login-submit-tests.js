/* eslint-env node, jasmine */
/* global jest */

jest.dontMock('../index.js');

var React = require('react/addons');
var Login = require('../index.js');
var {TestUtils} = React.addons;

describe('Login submit', () => {
  var login,
      loginForm,
      loginButton,
      dummyCallback;

  beforeEach(() => {
    //Render the component
    dummyCallback = jest.genMockFunction();
    login = TestUtils.renderIntoDocument(
      <Login pending={true} appName='Notemindr' loginHandler={dummyCallback} />
    );
    loginForm = TestUtils.findRenderedDOMComponentWithClass(login, 'form');
    loginButton = TestUtils.findRenderedDOMComponentWithClass(login, 'submit');
  });

  it('should call this.props.loginHandler when the form is submitted', () => {
    expect(loginForm).toBeDefined();
    expect(login.props.loginHandler).toBeDefined();
    TestUtils.Simulate.submit(loginForm.getDOMNode());
    expect(dummyCallback).toBeCalled();
  });

  it('should call this.props.loginHandler when the login button is clicked', () => {
    expect(loginButton).toBeDefined();
    expect(login.props.loginHandler).toBeDefined();
    TestUtils.Simulate.click(loginButton.getDOMNode());
    expect(dummyCallback).toBeCalled();
  });
});

