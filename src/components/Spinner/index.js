/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React, { PureRenderMixin } from 'react';
import classNames from 'classnames';

import './index.less';

export default React.createClass({
  mixins: [PureRenderMixin],

  displayName: 'Spinner',

  getDefaultProps: function() {
    return {
      dark: false,
      height: '30px',
      inline: false,
      pending: false,
      width: '30px'
    };
  },

  propTypes: {
    dark: React.PropTypes.bool,
    height: React.PropTypes.string,
    inline: React.PropTypes.bool,
    pending: React.PropTypes.bool,
    width: React.PropTypes.string
  },

  render: function() {
    const { width, height, dark, pending, inline } = this.props;;
    const classes = classNames({
      'spinner-container': true,
      'pending': pending,
      'dark': dark
    });

    const spinnerDivStyle = {
      width: width,
      display: (inline ? 'inline-' : '') + 'block'
    };

    return (
      <div className={ classes } style={ spinnerDivStyle }>
        <svg className='spinner' width={ width } height={ height }
            viewBox='0 0 66 66' xmlns='http://www.w3.org/2000/svg'>
          <circle className='path' fill='none' strokeWidth='3'
            strokeLinecap='round' cx='33' cy='33' r='30'></circle>
        </svg>
      </div>
    );
  }

});

