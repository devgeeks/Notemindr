/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';

import Spinner from '../Spinner';

import './index.less';

export default React.createClass({

  displayName: 'LoginForm',

  propTypes: {
    className: React.PropTypes.string,
    pending: React.PropTypes.bool,
    submitHandler: React.PropTypes.func
  },

  render: function() {
    const { className: classname, pending, submitHandler } = this.props;
    return (
      <div className={ classname }>
        <div className='blocker' />
        <form action='#' type='post' onSubmit={ submitHandler }>
          <h2>Notemindr</h2>
          <Spinner dark={ false } pending={ pending } />
          <input id='username' type='text' name='username' autoCorrect='off'
              autoCapitalize='off' placeholder='Username' tabIndex='1'
              ref='username' aria-label='Username' />
          <input id='passphrase' type='password' name='passphrase'
              placeholder='Passphrase' tabIndex='2' ref='passphrase'
              aria-label='Passphrase' />
          <div className='buttons'>
            <input type='submit' value='Log in' tabIndex='3'
                aria-label='Log in' />
          </div>
        </form>
      </div>
    );
  }

});

