/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import classNames from 'classnames';

import EntryListItem from '../EntryListItem';

import './index.less';

export default React.createClass({

  displayName: 'EntriesList',

  propTypes: {
    entries: React.PropTypes.array,
    loadPending: React.PropTypes.bool,
    savePending: React.PropTypes.bool,
  },

  render: function() {
    const { entries, loadPending, savePending } = this.props;
    const classes = classNames({
      'entries-list': true,
      'loading': loadPending,
      'saving': savePending
    });
    // Break this into its own <EntryItem>
    const emptyEntryContent =
      !loadPending
        ? 'No notes found. Maybe you could add some now?'
        : '';
    const entryItems = entries.length ? entries.map((entry) => {
      return <EntryListItem key={ entry.id } entry={ entry } />;
    }) : <div className='entry-content-empty'>{ emptyEntryContent } </div>;
    return (
      <div className={ classes }>
        <div className='loading-message'>Loading notes...</div>
        <div className='entry-items-container'>
          { entryItems }
        </div>
      </div>
    );
  }

});


