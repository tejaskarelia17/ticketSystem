const React = require('react');
const ReactDOM = require('react-dom');
const Router = require('react-router').Router;
const Route = require('react-router').Route;
const Redirect = require('react-router').Redirect;
const Col = require('react-bootstrap/lib/Col');
const listBug = require('./listBug');
const editBug = require('./editBug');

const NoMatch = React.createClass({
  render: function() {
    return (
      <h2>Page not Found!</h2>
    );
  }
});

ReactDOM.render(
  (
    <Router>
      <Route path="/bugs" component={listBug} />
      <Route path="/bugs/:id" component={editBug} />
      <Redirect from="/" to="/bugs" />
      <Route path="*" component={NoMatch} />
    </Router>
  ),
  document.getElementById('main')
);

