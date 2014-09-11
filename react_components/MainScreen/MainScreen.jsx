/**
 * @jsx React.DOM
 */

var React = require('React'),
    Navbar = require('../Navbar/Navbar.jsx'),
    NotesView = require('../NotesView/NotesView.jsx'),
    Fab = require('../Fab/Fab.jsx');

var MainScreen = React.createClass({

  getInitialState: function() {
    // @TODO - in real life, get these from localStorage then sync with Crypton
    return {
      notes: [
        {id: 1, title: 'Note title 1', extraClassNames: ((Math.ceil(Math.random() * 10) > 5)?'h2':'')},
        {id: 2, title: 'Note title 2', extraClassNames: ((Math.ceil(Math.random() * 10) > 5)?'h2':'')},
        {id: 3, title: 'Note title 3', extraClassNames: ((Math.ceil(Math.random() * 10) > 5)?'h2':'')},
        {id: 4, title: 'Note title 4', extraClassNames: ((Math.ceil(Math.random() * 10) > 5)?'h2':'')},
        {id: 5, title: 'Note title 5', extraClassNames: ((Math.ceil(Math.random() * 10) > 5)?'h2':'')}
      ]
    };
  },

  addOne: function(note) {
    this.state.notes = this.state.notes.concat([note]);
    this.setState({notes:this.state.notes});
  },

  addMany: function(notes) {
    window.console.log('in addMany');
    var newNotes = this.state.notes.concat(notes);
    this.setState({notes: newNotes});
  },

  componentDidMount: function() {
    // @TODO - remove all of this... it's mocking new items coming in after load
    window.setTimeout(function() {
      this.addMany([
        {id: 6, title: 'I am NEW!', extraClassNames: ((Math.ceil(Math.random() * 10) > 5)?'h2':'')},
        {id: 7, title: 'I am NEW also!', extraClassNames: ((Math.ceil(Math.random() * 10) > 5)?'h2':'')},
        {id: 8, title: 'I am another NEW one!', extraClassNames: ((Math.ceil(Math.random() * 10) > 5)?'h2':'')}
      ]);
    }.bind(this), 5000);
    window.setTimeout(function() {
      this.addMany([
        {id: 9, title: 'YAY', extraClassNames: ((Math.ceil(Math.random() * 10) > 5)?'h2':'')},
        {id: 10, title: 'WhooHoo!', extraClassNames: ((Math.ceil(Math.random() * 10) > 5)?'h2':'')},
        {id: 11, title: 'Cowabunga!', extraClassNames: ((Math.ceil(Math.random() * 10) > 5)?'h2':'')}
      ]);
    }.bind(this), 10000);
    window.setTimeout(function() {
      var newNotes = [
        {id: 2, title: 'Note title 2', extraClassNames: ((Math.ceil(Math.random() * 10) > 5)?'h2':'')},
        {id: 3, title: 'Note title 3', extraClassNames: ((Math.ceil(Math.random() * 10) > 5)?'h2':'')},
        {id: 6, title: 'I am NEW!', extraClassNames: ((Math.ceil(Math.random() * 10) > 5)?'h2':'')},
        {id: 7, title: 'I am NEW also!', extraClassNames: ((Math.ceil(Math.random() * 10) > 5)?'h2':'')},
        {id: 11, title: 'Cowabunga!', extraClassNames: ((Math.ceil(Math.random() * 10) > 5)?'h2':'')}
      ];
      this.setState({notes: newNotes});
    }.bind(this), 15000);
    window.setTimeout(function() {
      var newNotes = [
        {id: 1, title: 'Note title 1', extraClassNames: ((Math.ceil(Math.random() * 10) > 5)?'h2':'')},
        {id: 2, title: 'Note title 2', extraClassNames: ((Math.ceil(Math.random() * 10) > 5)?'h2':'')},
        {id: 3, title: 'Note title 3', extraClassNames: ((Math.ceil(Math.random() * 10) > 5)?'h2':'')},
        {id: 7, title: 'I am NEW also!', extraClassNames: ((Math.ceil(Math.random() * 10) > 5)?'h2':'')},
        {id: 8, title: 'I am another NEW one!', extraClassNames: ((Math.ceil(Math.random() * 10) > 5)?'h2':'')},
        {id: 11, title: 'Cowabunga!', extraClassNames: ((Math.ceil(Math.random() * 10) > 5)?'h2':'')}
      ];
      this.setState({notes: newNotes});
    }.bind(this), 18000);
  },

  fabClickHandler: function(event) {
    window.console.log('Fabulous!');
    var fabNode = this.refs.fab.getDOMNode();
    fabNode.classList.add('out');
    // @TODO - instead of popping back, switch to the add new note form
    window.setTimeout(function() {
      fabNode.classList.remove('out');
    }, 2000);
    return false;
  },

  render: function() {
    return (
      <div className='MainScreen page'>
        <Navbar title='Notes' subTitle='Notemindr' />
        <NotesView ref="notesView" notes={this.state.notes} />
        <Fab clickHandler={this.fabClickHandler} ref="fab" />
      </div>
    );
  }

});

module.exports = MainScreen;
