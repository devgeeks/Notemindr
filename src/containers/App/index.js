/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react/addons';
import TimeoutTransitionGroup from 'timeout-transition-group';

export default React.createClass({

  propTypes: {
    children: React.PropTypes.any,
    location: React.PropTypes.object
  },

  contextTypes: {
    router: React.PropTypes.object
  },

  displayName: 'App',

  render: function() {

    let key = this.props.location.pathname;

    return (
      <div className='app'>
        <TimeoutTransitionGroup
            enterTimeout={ 300 } leaveTimeout={ 300 }
            transitionName='pagetransition'>
          { React.cloneElement(this.props.children || <div />, { key: key }) }
        </TimeoutTransitionGroup>
      </div>
    );
  }

});

