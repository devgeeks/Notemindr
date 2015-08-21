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



