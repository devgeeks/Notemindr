/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { connect } from 'react-redux';

import EntriesList from '../../components/EntriesList';
import Header from '../../components/Header';
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
    const entries = value.length ? value.sort(keysort('label')) : [];
    return (
      <div>
        <Header />
        <EntriesList entries={ entries } loadPending={ loadPending }
          savePending={ savePending } />
      </div>
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
