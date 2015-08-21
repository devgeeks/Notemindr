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
    pending: React.PropTypes.bool
  },

  contextTypes: {
    router: React.PropTypes.object
  },

  componentWillReceiveProps: function(nextProps) {
    const { account, pending, error } = nextProps;
    if (account && !pending) {
      this.context.router.transitionTo('entries', null, { account: account });
      return;
    }
    if (error) {
      // @TODO Handle error
      console.log(error);
    }
  },

  handleSubmit: function(e) {
    const { dispatch } = this.props;
    e.preventDefault();
    console.log('submitting...');
    //this.setState({ pending: true });
    let loginForm = this.refs.loginForm;
    let username = loginForm.refs.username.getDOMNode().value.trim();
    let passphrase = loginForm.refs.passphrase.getDOMNode().value;
    dispatch(login(username, passphrase));
  },

  render: function() {
    const classes = classNames({
      'login-controller-view': true,
      'pending': this.props.pending
    });
    return (
      <LoginForm ref='loginForm' className={ classes }
          submitHandler={ this.handleSubmit } />
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

