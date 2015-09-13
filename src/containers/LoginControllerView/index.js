/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { login } from '../../actions/auth';
import LoginForm from '../../components/LoginForm';

const LoginControllerView = React.createClass({

  displayName: 'LoginControllerView',

  propTypes: {
    account: React.PropTypes.object,
    dispatch: React.PropTypes.func,
    history: React.PropTypes.object,
    pending: React.PropTypes.bool
  },

  componentWillReceiveProps: function(nextProps) {
    const { history } = this.props;
    const { account, pending, error } = nextProps;
    if (account && !pending) {
      history.pushState(null, '/entries');
      return;
    }
    if (error) {
      // @TODO Display error
      alert(error);
    }
  },

  handleSubmit: function(e) {
    const { dispatch } = this.props;
    e.preventDefault();
    console.log('submitting credentials for login...');
    //this.setState({ pending: true });
    let loginForm = this.refs.loginForm;
    let username = loginForm.refs.username.getDOMNode().value.trim();
    let passphrase = loginForm.refs.passphrase.getDOMNode().value;
    dispatch(login(username, passphrase));
  },

  render: function() {
    const { pending } = this.props;
    const classes = classNames({
      'login': true,
      'pending': pending
    });
    return (
      <LoginForm ref='loginForm' className={ classes }
          submitHandler={ this.handleSubmit }
          pending={ pending } />
    );
  }

});

function mapStateToProps(state) {
  const { error, pending, account } = state.auth;

  return {
    error,
    pending,
    account
  };
}

export default connect(mapStateToProps)(LoginControllerView);

