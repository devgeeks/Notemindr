import React from 'react';
import { connect } from 'react-redux';

import EntriesList from '../../components/EntriesList';
import { loadIndex } from '../../actions/entryIndex';

const EntriesControllerView = React.createClass({

  displayName: 'EntriesControllerView',

  propTypes: {
    account: React.PropTypes.object,
    dispatch: React.PropTypes.func,
    index: React.PropTypes.object,
    loadPending: React.PropTypes.bool,
    savePending: React.PropTypes.bool
  },

  componentDidMount: function() {
    const { dispatch } = this.props;
    dispatch(loadIndex());
  },

  render: function() {
    function keysort(key) {
      return function(a,b){
       let x = a[key].toLocaleLowerCase()
       let y = b[key].toLocaleLowerCase()
       return ~~(x > y);
      }
    }
    const { index, loadPending, savePending } = this.props;
    const { value } = index;
    const entries = value.length ? value.sort(keysort('label')) : value;
    return (
      <EntriesList entries={ entries } loadPending={ loadPending }
        savePending={ savePending } />
    );
  }

});

function mapStateToProps(state) {
  const { auth, entryIndex } = state;
  const { account } = auth;
  const { index, loadPending, error, savePending } = entryIndex;
  return {
    account,
    index,
    loadPending,
    savePending,
    error
  };
}

export default connect(mapStateToProps)(EntriesControllerView);
