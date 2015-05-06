var React = require('react/addons');

var App = require('./components/App');
var Login = require('./components/Login');
var ItemList = require('./components/ItemList');
var ItemDetail = require('./components/ItemDetail');
var Router = require('react-router');
var {Route, DefaultRoute} = Router;

var attachFastClick = require('fastclick');
attachFastClick(document.body);

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
