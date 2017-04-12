const React = require('react');
const ReactDOM = require('react-dom');

const Panel = require('react-bootstrap/lib/Panel');
const Grid = require('react-bootstrap/lib/Grid');
const Row = require('react-bootstrap/lib/Row');
const Col = require('react-bootstrap/lib/Col');
const Input = require('react-bootstrap/lib/Input');
const ButtonInput = require('react-bootstrap/lib/ButtonInput');

const filterBug = React.createClass({
  render: function() {
    console.log("Rendering filterBug, state=", this.state);
    return (
        <Panel collapsible defaultExpanded={true} header="Filter" bsStyle="info">
        <Grid fluid={true}>
          <Row>
            <Col xs={12} sm={12} md={12}>
              <Input type="select" label="Priority" value={this.state.priority}
                onChange={this.onChangePriority}>
                <option value="">(Any)</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </Input>
            </Col>
            <Col xs={12} sm={12} md={12}>
              <Input type="select" label="Status" value={this.state.status}
                onChange={this.onChangeStatus}>
                <option value="">(Any)</option>
                <option>New</option>
                <option>Open</option>
                <option>Closed</option>
              </Input>
            </Col>
            <Col xs={12} sm={12} md={12}>
              <Input label="&nbsp;">
                <ButtonInput value="Search" bsStyle="primary" onClick={this.submit} />
              </Input>
            </Col>
          </Row>
        </Grid>
      </Panel>
    )
  },

  getInitialState: function() {
    const initFilter = this.props.initFilter;
    return {status: initFilter.status, priority: initFilter.priority};
  },

  componentWillReceiveProps: function(newProps) {
    if (newProps.initFilter.status === this.state.status
        && newProps.initFilter.priority === this.state.priority) {
      console.log("filterBug: componentWillReceiveProps, no change");
      return;
    }
    console.log("filterBug: componentWillReceiveProps, new filter:", newProps.initFilter);
    this.setState({status: newProps.initFilter.status, priority: newProps.initFilter.priority});
  },

  onChangeStatus: function(e) {
    this.setState({status: e.target.value});
  },
  onChangePriority: function(e) {
    this.setState({priority: e.target.value});
  },

  submit: function(e) {
    const newFilter = {};
    if (this.state.priority) newFilter.priority = this.state.priority;
    if (this.state.status) newFilter.status = this.state.status;
    this.props.submitHandler(newFilter);
  }
});

module.exports = filterBug;
