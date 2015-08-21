import React from 'react';

import './index.less';

export default React.createClass({

  displayName: 'LoginForm',

  propTypes: {
    className: React.PropTypes.string,
    submitHandler: React.PropTypes.func
  },

  render: function() {
    return (
      <div className={ this.props.className }>
        <form action='#' type='post' onSubmit={ this.props.submitHandler }>
          <div>
            <input id='username' type='text' name='username' autoCorrect='off'
                autoCapitalize='off' placeholder='Username' tabIndex='1'
                ref='username' aria-label='Username' />
          </div>
          <div>
            <input id='passphrase' type='password' name='passphrase'
                placeholder='Passphrase' tabIndex='2' ref='passphrase'
                aria-label='Passphrase' />
          </div>
          <div>
            <input type='submit' value='Log in' tabIndex='3'
                aria-label='Log in' />
          </div>
        </form>
      </div>
    );
  }

});

