const React = require('react');
const ReactDOM = require('react-dom');
const Col = require('react-bootstrap/lib/Col');
const Panel = require('react-bootstrap/lib/Panel');
const Input = require('react-bootstrap/lib/Input');
const ButtonInput = require('react-bootstrap/lib/ButtonInput');

const addBug = React.createClass({
  render: function() {
    //console.log("Rendering addBug");
    return (
        <Panel collapsible defaultExpanded={false} header="Add Bug" bsStyle="warning">
        <form name="addBug">
          <Input type="text" name="title" label="Bug Title" />
          <Input type="text" name="owner" label="Owner" />
          <Input type="text" name="des" label="Description" />
          <ButtonInput value="Add" bsStyle="primary" onClick={this.handleSubmit} />
        </form>
      </Panel>
    )
  },

  handleSubmit: function(e) {
    e.preventDefault();
    const form = document.forms.addBug;
    this.props.addBug({owner: form.owner.value, title: form.title.value, description: form.des.value, status: 'New', priority: 'Low'});
    // clear the form for the next input
    form.owner.value = ""; form.title.value = "";form.des.value = "";
  }
});

module.exports = addBug;
