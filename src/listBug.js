const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');
const Link = require('react-router').Link;
const Col = require('react-bootstrap/lib/Col');
const Row = require('react-bootstrap/lib/Row');
const filterBug = require('./filterBug');
const addBug = require('./addBug');
const Panel = require('react-bootstrap/lib/Panel');
const Grid = require('react-bootstrap/lib/Grid');

const BugRow = React.createClass({
  render: function() {
    //console.log("Rendering BugRow:", this.props.bug);
    return (
      <tr>
        <td>
          <Link to={'/bugs/' + this.props.bug._id}>{this.props.bug.title}</Link>
        </td>
        <td>{this.props.bug.status}</td>
        <td>{this.props.bug.priority}</td>
        <td>{this.props.bug.owner}</td>
      </tr>
    )
  }
});

const BugTable = React.createClass({
  render: function() {
    //console.log("Rendering bug table, num items:", this.props.bugs.length);
    const bugRows = this.props.bugs.map(function(bug) {
      return <BugRow key={bug._id} bug={bug} />
    });
    return (
        <Panel collapsible defaultExpanded={true} header="List" bsStyle="primary">
          <Grid fluid={true}>
        <div class="col-sm-6 col-md-6 col-xs-6" >
      <table className="table table-striped table-bordered table-condensed">
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Owner</th>
          </tr>
        </thead>
        <tbody>
          {bugRows}
        </tbody>
      </table>
              </div>
              </Grid>
              </Panel>
    )
  }
});

const listBug = React.createClass({
  getInitialState: function() {
    return {bugs: []};
  },
  render: function() {
    console.log("Rendering listBug, num items:", this.state.bugs.length);
    return (
        <div>
        <Row>
          <Col xs={12} md={4}>
            <h1>Filter</h1>
            <filterBug submitHandler={this.changeFilter} initFilter={this.props.location.query}/>
          </Col>
              <Col xs={12} md={8}>
                <h1>List of all the Tickets</h1>
                <BugTable bugs={this.state.bugs}/>
              </Col>
          <Col xs={12} md={12}>
            <addBug addBug={this.addBug} />
          </Col>
      </Row>
    </div>
    )
  },

  componentDidMount: function() {
    console.log("listBug: componentDidMount");
    this.loadData();
  },

  componentDidUpdate: function(prevProps) {
    const oldQuery = prevProps.location.query;
    const newQuery = this.props.location.query;
    if (oldQuery.priority === newQuery.priority &&
        oldQuery.status === newQuery.status) {
      console.log("listBug: componentDidUpdate, no change in filter, not updating");
      return;
    } else {
      console.log("listBug: componentDidUpdate, loading data with new filter");
      this.loadData();
    }
  },

  loadData: function() {
    const query = this.props.location.query || {};
    const filter = {priority: query.priority, status: query.status};

    $.ajax('/api/bugs', {data: filter}).done(function(data) {
      this.setState({bugs: data});
    }.bind(this));
    // In production, we'd also handle errors.
  },

  changeFilter: function(newFilter) {
    this.props.history.push({search: '?' + $.param(newFilter)});
  },

  addBug: function(bug) {
    console.log("Adding bug:", bug);
    $.ajax({
      type: 'POST', url: '/api/bugs', contentType: 'application/json',
      data: JSON.stringify(bug),
      success: function(data) {
        const bug = data;
        // We're advised not to modify the state, it's immutable. So, make a copy.
        const bugsModified = this.state.bugs.concat(bug);
        this.setState({bugs: bugsModified});
      }.bind(this),
      error: function(xhr, status, err) {
        // ideally, show error to user.
        console.log("Error adding bug:", err);
      }
    });
  }
});

module.exports = listBug;

