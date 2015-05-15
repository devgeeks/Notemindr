'use strict';

var React = require('react/addons');

var App = require('./components/App');
var ItemList = require('./components/ItemList');
var ItemDetail = require('./components/ItemDetail');
var Router = require('react-router');
var {Route, DefaultRoute} = Router;

var FastClick = require('fastclick');
FastClick.attach(document.body);

// @TODO - remove in production
var a11y = require('react-a11y');
a11y(React);

require('./app.less');

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="item" path="/item/:item" handler={ItemDetail} />
    <Route path='/' handler={ItemList} />
    <DefaultRoute handler={ItemList} />
  </Route>
);

Router.run(routes, (Handler) => {
  React.render(<Handler/>, document.getElementById('Notemindr'));
});
