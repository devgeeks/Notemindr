/**
 * @jsx React.DOM
 */

var React = window.React = require('React/addons'),
    ReactCSSTransitionGroup = React.addons.CSSTransitionGroup,
    LoginScreen = require('../LoginScreen/LoginScreen.jsx'),
    MainScreen = require('../MainScreen/MainScreen.jsx'),
    Router = require('react-router'),
    Routes = Router.Routes,
    Route = Router.Route,
    Link = Router.Link,
    NotFoundRoute = Router.NotFoundRoute;

React.initializeTouchEvents(true);

var App = React.createClass({

  getDefaultProps: function() {
    return {
      loggedIn: true // @TODO - determine this properly
    };
  },

  render: function() {
    return (
      <div className='App app'>
        <ReactCSSTransitionGroup transitionName="example">
          {this.props.activeRouteHandler()}
        </ReactCSSTransitionGroup>
      </div>
    );
  }

});

window.loggedIn = true;

var routes = (
  <Routes>
    <Route handler={App}>
      {/* choose MainScreen or LoginScreen based on logged in status */}
      <Route path="/"
        handler={window.loggedIn ? MainScreen : LoginScreen}
        addHandlerKey={true} />
      {/* default to login screen */}
      <NotFoundRoute handler={LoginScreen}/>
    </Route>
  </Routes>
);

var notemindr = React.renderComponent(
  routes,
  document.body
);
window.FastClick.attach(document.body);

module.exports = App;
