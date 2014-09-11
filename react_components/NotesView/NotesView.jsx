/**
 * @jsx React.DOM
 */

var React = require('React/addons'),
    ReactCSSTransitionGroup = React.addons.CSSTransitionGroup,
    Card = require('../Card/Card.jsx');

var NotesView = React.createClass({

  getDefaultProps: function() {
    return {
      notes: []
    };
  },

  componentDidMount: function() {
    var container = document.querySelector('#container');
    this.msnry = window.msnry = new window.Masonry(container, {
      // options
      itemSelector: '.item',
      columnWidth: 1,
      transitionDuration: 0
    });
  },

  componentDidUpdate: function() {
    // Start fresh
    window.clearInterval(this.layoutInterval);
    var i = 0;
    this.layoutInterval = window.setInterval(function() {
      if (i >= 7) {
        window.clearInterval(this.layoutInterval);
        return;
      }
      this.msnry.layout();
      i++;
    }, 200);
    this.msnry.reloadItems();
    this.msnry.layout();
  },

  render: function() {
    var elems = this.props.notes.map(function(note, noteIndex) {
      return (
        <Card key={note.id}
          id={'note-' + note.id}
          extraClassNames={note.extraClassNames}
          title={note.title} />
      );
    });
    return (
      <div className='NotesView content'>
        <div id='container' refs='masonryContainer'>
          <ReactCSSTransitionGroup transitionName="addnote">
            {elems}
          </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  }

});

module.exports = NotesView;
