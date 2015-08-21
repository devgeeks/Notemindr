import React from 'react';
import { history } from 'react-router/lib/HashHistory';

import Root from './containers/Root';

// Ensure the static files are copied across
require('file?name=dist/[name].[ext]!./index.html');
require('file?name=dist/js/[name].[ext]!./crypton.js');
// Import styles
require('./index.less');

if (!__PRODUCTION__) {
  const a11y = require('react-a11y');
  // We are ignoring a11y failures in the redux-devtools
  const devToolsFailures = (name) => {
    return name !== 'LogMonitorButton'
        && name !== 'LogMonitorAction'
        && name !== 'JSONArrow'
        && name !== 'JSONObjectNode'
        && name !== 'JSONBooleanNode'
        && name !== 'JSONArrayNode'
        && name !== 'JSONNullNode'
        && name !== 'JSONStringNode';
  };
  a11y(React, { filterFn: devToolsFailures, includeSrcNode: true });
}

React.render(
  <Root history={ history } />,
  document.getElementById('app')
);

