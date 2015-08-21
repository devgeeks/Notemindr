/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';

import './index.less';

export default React.createClass({

  displayName: 'EntryListItem',

  propTypes: {
    entry: React.PropTypes.object,
    key: React.PropTypes.string
  },

  render: function() {
    const { entry, key } = this.props;
    return (
      <div key={ key } className='entry-list-item'>
        <div>{ entry.label }</div>
        <div><small>{ entry.type }</small></div>
      </div>
    );
  }

});



