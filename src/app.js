/**
 * @jsx React.DOM
 */
/* jshint browser: true */

var React = require('react/addons');

var App = require('./components/App');
var Login = require('./components/Login');
var ItemList = require('./components/ItemList');
var ItemDetail = require('./components/ItemDetail');
var Router = require('react-router');
var Route = Router.Route,
    DefaultRoute = Router.DefaultRoute;

var attachFastClick = require('fastclick');
attachFastClick(document.body);

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="item" path="/item/:item" handler={ItemDetail} />
    <Route path='/' handler={ItemList} />
    <DefaultRoute handler={Login}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('Notemindr'));
});
