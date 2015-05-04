/**
 * @jsx React.DOM
 */

/* jshint node: true */
'use strict';

var React = require('react');

var Spinner = require('../Spinner');

var Login = React.createClass({

  getDefaultProps: function() {
    return {
      dismissed: false,
      pending: false
    };
  },

  render: function() {
    var cx = React.addons.classSet;
    var classes = cx({
      'login': true,
      'pending': this.props.pending,
      'dismissed': this.props.dismissed
    });
    var subClasses = cx({
      loginform: true,
      pending: this.props.pending
    });
    return (
      <div className={classes}>
        <div className='blocker' />
        <form className='form' name='loginform' id='login'
            onSubmit={this.props.loginHandler}>
          <h2>{this.props.appName}</h2>
          <Spinner dark={false} pending={this.props.pending} />
          <input id='username' className={subClasses} type='text'
              name='username' autoCorrect='off' autoCapitalize='off'
              placeholder='Username' tabIndex='1' />
          <input id='passphrase' className={subClasses} type='password'
              name='passphrase' placeholder='Passphrase' tabIndex='2' />
          <div className='buttons' id='login-buttons'>
            <a className={'button submit colored ' + subClasses}
                onClick={this.props.loginHandler}>Login</a>
            <a className={'button create ' + subClasses}>Create Account</a>
          </div>
          <input type='submit' name='loginsubmit' />
        </form>
      </div>
    );
  }

});

module.exports = Login;
