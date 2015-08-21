/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import classNames from 'classnames';

import './index.less';

export default React.createClass({

  displayName: 'TransientDialog',

  propTypes: {
    dismissed: React.PropTypes.bool,
    message: React.PropTypes.string
  },

  render: function() {
    const { dismissed, message } = this.props;
    const classes = classNames({
      'transientdialog': true,
      'dismissed': dismissed
    });
    return (
      <div className={ classes }>
        <div>{ message }</div>
      </div>
    );
  }

});

