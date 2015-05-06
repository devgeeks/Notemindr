'use strict';

var Router = require('react-router'),
    React = require('react/addons'),
    TestLocation = require('react-router/modules/locations/TestLocation');
var TestUtils = React.addons.TestUtils,
    Route = Router.Route;

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
