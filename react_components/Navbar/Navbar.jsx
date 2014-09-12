/**
 * @jsx React.DOM
 */

var React = require('React'),
    NavbarButton = require('./NavbarButton.jsx');

var Navbar = React.createClass({

  getInitialState: function() {
    return {
      title: this.props.title || 'Notes',
      subTitle: this.props.subTitle || 'Notemindr'
    };
  },

  searchClickHandler: function(event) {
    return false;
  },

  menuClickHandler: function(event) {
    return false;
  },

  render: function() {
    return (
      <div className='Navbar nav'>
        <NavbarButton clickHandler={this.menuClickHandler} pull='left'
          icon='ion-navicon' />
        <h1>
          <a href='#'>{this.state.title} <i className='ion-arrow-down-b'></i></a>
          <small>{this.state.subTitle}</small>
        </h1>
        <NavbarButton clickHandler={this.searchClickHandler} pull='right'
          icon='ion-search' />
      </div>
    );
  }

});

module.exports = Navbar;
