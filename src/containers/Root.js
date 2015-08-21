import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Redirect } from 'react-router';
//import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

import configureStore from '../store/configureStore';
import App from './App';
import LoginControllerView from './LoginControllerView';
import EntriesControllerView from './EntriesControllerView';

import reducers from '../reducers';

const store = configureStore(reducers);

export default React.createClass({

  displayName: 'Root',

  propTypes: {
    history: React.PropTypes.object
  },

  render() {
    let debug = <div style={ {height:'0', width:'0'} } />;
    if (!__PRODUCTION__) {
      const { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react');
      debug = <DebugPanel top right bottom><DevTools store={ store } monitor={ LogMonitor } /></DebugPanel>;
    }
    return (
      <div>
        <Provider store={ store }>
          { () =>
            <Router history={ this.props.history }>
              <Route component={ App }>
                <Route path='login' component={ LoginControllerView } />
                <Route path='entries' component={ EntriesControllerView } />
                <Redirect from='/' to='/login' />
              </Route>
            </Router>
          }
        </Provider>
        { debug }
      </div>
    );
  }
});
