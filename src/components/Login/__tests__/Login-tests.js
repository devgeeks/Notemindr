/* eslint-env node, jasmine */
/* global jest */

jest.dontMock('../index.js');

var React = require('react/addons');
var Login = require('../index.js');
var {TestUtils} = React.addons;

var Spinner = require('../../Spinner');

describe('Login default', () => {
  var login,
      loginComponent,
      loginChildren,
      loginForm;

  beforeEach(() => {
    //Render the component
    login = TestUtils.renderIntoDocument(
      <Login pending={false} appName='Notemindr' />
    );
    loginComponent = TestUtils.findRenderedDOMComponentWithClass(login, 'login');
    loginChildren = loginComponent.props.children;
    loginForm = loginChildren[1];
  });

  it('should render', () => {
    expect(login).toBeDefined();
    expect(TestUtils.isCompositeComponentWithType(login, Login)).toBe(true);
    expect(login.getDOMNode().className).toContain('login');
  });

  it('should have the correct children', () => {
    expect(loginChildren).toBeDefined();
    expect(loginChildren.length).toBe(2);
    expect(loginChildren[0].type).toEqual('div');
    expect(loginChildren[0]._store.props.className).toEqual('blocker');
    expect(loginForm.type).toEqual('form');
  });

  it('should have the correct grandchildren', () => {
    var grandChildren = loginForm.props.children;
    expect(grandChildren.length).toBe(6);
    expect(grandChildren[0].type).toEqual('h2');
    expect(grandChildren[0]._store.props.children).toEqual(login.props.appName);
    expect(TestUtils.isElementOfType(grandChildren[1], Spinner)).toBe(true);
    expect(grandChildren[2].type).toEqual('input');
    var usernameProps = {
      id: 'username',
      className: 'loginform',
      type: 'text',
      name: 'username',
      autoCorrect: 'off',
      autoCapitalize: 'off',
      placeholder: 'Username',
      tabIndex: '1'
    };
    expect(grandChildren[2]._store.props).toEqual(usernameProps);
    var passphraseProps = {
      id: 'passphrase',
      className: 'loginform',
      type: 'password',
      name: 'passphrase',
      placeholder: 'Passphrase',
      tabIndex: '2'
    };
    expect(grandChildren[3]._store.props).toEqual(passphraseProps);
    expect(grandChildren[4].type).toEqual('div');
    expect(grandChildren[4]._store.props.className).toEqual('buttons');
    expect(grandChildren[5].type).toEqual('input');
    expect(grandChildren[5]._store.props.type).toEqual('submit');
    expect(grandChildren[5]._store.props.name).toEqual('loginsubmit');
  });

  it('should have the correct great grandchildren', () => {
    var grandChildren = loginForm._store.props.children;
    var greatGrandChildren = grandChildren[4].props.children;
    expect(greatGrandChildren.length).toBe(2);
    expect(greatGrandChildren[0]._store.props).toEqual({
      className: 'button submit colored loginform',
      tabIndex: '3',
      children: 'Login'
    });
    expect(greatGrandChildren[1]._store.props).toEqual({
      className: 'button create loginform',
      tabIndex: '4',
      children: 'Create Account'
    });
  });
});

describe('Login pending', () => {
  var login,
      loginComponent,
      loginChildren,
      loginForm;

  beforeEach(() => {
    //Render the component
    login = TestUtils.renderIntoDocument(
      <Login pending={true} appName='Notemindr' />
    );
    loginComponent = TestUtils.findRenderedDOMComponentWithClass(login, 'login');
    loginChildren = loginComponent.props.children;
    loginForm = loginChildren[1];
  });

  it('should render as pending', () => {
    expect(login.getDOMNode().className).toContain('pending');
  });

  it('should render the inputs as pending', () => {
    var grandChildren = loginForm._store.props.children;
    expect(grandChildren[2]._store.props.className).toContain('pending');
    expect(grandChildren[3]._store.props.className).toContain('pending');
  });

  it('should render the buttons as pending', () => {
    var grandChildren = loginForm._store.props.children;
    var greatGrandChildren = grandChildren[4].props.children;
    expect(greatGrandChildren[0]._store.props.className).toContain('pending');
    expect(greatGrandChildren[1]._store.props.className).toContain('pending');
  });
});

