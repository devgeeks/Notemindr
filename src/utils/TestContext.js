/* jshint node: true */
'use strict';

var Router = require('react-router'),
    Route = Router.Route,
    React = require('react/addons'),
    TestUtils = React.addons.TestUtils,
    TestLocation = require('react-router/modules/locations/TestLocation');

var TestContext = {
  getRouterComponent: function(targetComponent) {
    var component,
        div = document.createElement('div'),
        routes = [
          React.createFactory(Route)({
            name: 'test',
            handler: targetComponent
          })
        ];

    TestLocation.history = ['/test'];

    Router.run(routes, TestLocation, function (Handler) {
      var mainComponent = React.render(React.createFactory(Handler)({}), div);

      component = TestUtils.findRenderedComponentWithType(mainComponent,
        targetComponent);
    });

    return component;
  }
};

module.exports = TestContext;
