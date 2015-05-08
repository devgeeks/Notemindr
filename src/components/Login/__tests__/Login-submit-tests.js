/* eslint-env node, jasmine */
/* global jest */
'use strict';

jest.dontMock('../index.js');

var React = require('react/addons');
var Login = require('../index.js');
var {TestUtils} = React.addons;

describe('Login submit', () => {
  var login,
      loginForm,
      loginButton,
      registerButton,
      dummyLoginCallback,
      dummyRegisterCallback;

  beforeEach(() => {
    //Render the component
    dummyLoginCallback = jest.genMockFunction();
    dummyRegisterCallback = jest.genMockFunction();
    login = TestUtils.renderIntoDocument(
      <Login pending={true} appName='Notemindr'
          loginHandler={dummyLoginCallback}
          registerHandler={dummyRegisterCallback} />
    );
    loginForm = TestUtils.findRenderedDOMComponentWithClass(login, 'form');
    loginButton = TestUtils.findRenderedDOMComponentWithClass(login, 'submit');
    registerButton = TestUtils.findRenderedDOMComponentWithClass(login, 'create');
  });

  it('should call this.props.loginHandler when the form is submitted', () => {
    expect(loginForm).toBeDefined();
    expect(login.props.loginHandler).toBeDefined();
    TestUtils.Simulate.submit(loginForm.getDOMNode());
    expect(dummyLoginCallback).toBeCalled();
  });

  it('should call this.props.loginHandler when the login button is clicked', () => {
    expect(loginButton).toBeDefined();
    expect(login.props.loginHandler).toBeDefined();
    TestUtils.Simulate.click(loginButton.getDOMNode());
    expect(dummyLoginCallback).toBeCalled();
  });

  it('should call this.props.registerHandler when the create account button is clicked', () => {
    expect(registerButton).toBeDefined();
    expect(login.props.registerHandler).toBeDefined();
    TestUtils.Simulate.click(registerButton.getDOMNode());
    expect(dummyRegisterCallback).toBeCalled();
  });
});

