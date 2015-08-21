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
    const emptyEntryContent = !loadPending ? 'Add some entries' : '';
    const entryItems = entries.length ? entries.map((entry) => {
      return <EntryListItem key={ entry.id } entry={ entry } />;
    }) : <div>{ emptyEntryContent } </div>;
    return (
      <div className={ classes }>
        <div className='loading-message'>Loading...</div>
        <div>
          { entryItems }
        </div>
      </div>
    );
  }

});


