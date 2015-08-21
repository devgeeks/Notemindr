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

