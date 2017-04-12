const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');
const Link = require('react-router').Link;
const Col = require('react-bootstrap/lib/Col');
const Panel = require('react-bootstrap/lib/Panel');
const Input = require('react-bootstrap/lib/Input');
const Button  = require('react-bootstrap/lib/Button');
const ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar');
const Alert = require('react-bootstrap/lib/Alert');

const editBug = React.createClass({
  render: function() {
    const success = (
      <Alert bsStyle="success" onDismiss={this.dismissSuccess} dismissAfter={5000}>
        Bug saved to DB successfully.
      </Alert>
    );
    return (
      <div style={{maxWidth: 600}}>
        <Panel header={"Edit bug: " + this.props.params.id}>
          <form onSubmit={this.submit}>
            <Input type="select" label="Priority"
              value={this.state.priority} onChange={this.onChangePriority}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </Input>
            <Input type="select" label="Status" value={this.state.status} onChange={this.onChangeStatus}>
              <option>New</option>
              <option>Open</option>
              <option>Closed</option>
            </Input>
            <Input type="text" label="Title" value={this.state.title} onChange={this.onChangeTitle}/>
            <Input type="text" label="Owner" value={this.state.owner} onChange={this.onChangeOwner}/>
            <Input type="text" label="Description" value={this.state.description} onChange={this.onChangeDescription}/>
            <ButtonToolbar>
              <Button type="submit" bsStyle="primary">Submit</Button>
              <Link className="btn btn-link" to="/bugs">Back</Link>
            </ButtonToolbar>
          </form>
        </Panel>
        {this.state.successVisible ? success : null}
      </div>
    );
  },

  getInitialState: function() {
    return {successVisible: false};
  },

  componentDidMount: function() {
    this.loadData();
  },

  componentDidUpdate: function(prevProps) {
    console.log("editBug: componentDidUpdate", prevProps.params.id, this.props.params.id);
    if (this.props.params.id != prevProps.params.id) {
      this.loadData();
    }
  },

  loadData: function() {
    $.ajax('/api/bugs/' + this.props.params.id) .done(function(bug) {
      this.setState(bug);
    }.bind(this));
  },

  onChangePriority: function(e) {
    this.setState({priority: e.target.value});
  },
  onChangeStatus: function(e) {
    this.setState({status: e.target.value});
  },
  onChangeOwner: function(e) {
    this.setState({owner: e.target.value});
  },
    onChangeDescription: function(e) {
        this.setState({description: e.target.value});
    },
  onChangeTitle: function(e) {
    this.setState({title: e.target.value});
  },

  showSuccess: function() {
    this.setState({successVisible: true});
  },
  dismissSuccess: function() {
    this.setState({successVisible: false});
  },

  submit: function(e) {
    e.preventDefault();
    const bug = {
      status: this.state.status,
      priority: this.state.priority,
      owner: this.state.owner,
        description: this.state.description,
      title: this.state.title
    }

    $.ajax({
      url: '/api/bugs/' + this.props.params.id, type: 'PUT', contentType:'application/json',
      data: JSON.stringify(bug),
      dataType: 'json',
      success: function(bug) {
        this.setState(bug);
        this.showSuccess();
      }.bind(this),
    });
  }
});

module.exports = editBug;
