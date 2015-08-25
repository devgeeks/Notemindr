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
    savePending: React.PropTypes.bool,
    sorting: React.PropTypes.string
  },

  componentDidMount: function() {
    const { dispatch } = this.props;
    dispatch(loadIndex());
  },

  render: function() {
    function keysortByTimeAndDate(key) {
      return function(a,b){
       //let x = a[key].toLocaleLowerCase()
       //let y = b[key].toLocaleLowerCase()
       let x = new Date(Date.parse(a[key]));
       let y = new Date(Date.parse(b[key]));
       return ~~(x < y);
      }
    }
    function keysortByLabel(key) {
      return function(a,b){
       let x = a[key].toLocaleLowerCase()
       let y = b[key].toLocaleLowerCase()
       return ~~(x > y);
      }
    }
    const { index, loadPending, savePending, sorting } = this.props;
    const { value: entries } = index;
    // @TODO This is a NOTES app, default to sorted by creation time/date
    // Also need an option to sort in other ways, status, updated, etc
    // Maybe this should be another action/reducer?
    const dateSortedEntries =
      entries.length
      ? entries.sort(keysortByTimeAndDate('created'))
      : [];
    const labelSortedEntries =
      entries.length
      ? entries.sort(keysortByLabel('label'))
      : [];
    return (
      <div>
        <Header />
        {/* default to sorting by date */}
        <EntriesList
          entries={ sorting === 'label' ? dateSortedEntries : labelSortedEntries }
          loadPending={ loadPending }
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
