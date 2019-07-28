import React from "react";
import { Route } from "react-router-dom";
import { Container, Row, Table } from "reactstrap";
import Loader from "react-loader-spinner";
import List from "../../components/List/AssignmentList";
//Subject Wise Assignment will be handled by this Component
class Assignment extends React.Component {
  constructor() {
    super();
    this.state = {
      subject: null,
      showAssignment: true,
      isLoading: false,
      assignmentList: [
        {
          id: 1,
          title: "Hello World",
          content: "Program for Hello World",
          subject: "java"
        }
      ]
    };
  }

  /* 
  componentDidMount() 
  {
    const handle = this.props.match.params;
    this.setState({
      subject: handle.id,
      isLoading: true
    });

    var th = this;
    this.serverRequest = axios.get(API_BASE_URL).then(function(event) {
      th.setState({
        assignmentList: event.data,
        isLoading: false,
        showAssignment: true
      });
    });
  }
  */

  componentWillUnmount() {
    //  this.serverRequest.abort();
  }

  render() {
    const assignment = this.state.showAssignment ? (
      <Table dark>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Content</th>
            <th>Subject</th>
            <th>Upload</th>
          </tr>
        </thead>
        <tbody>
          {this.state.assignmentList.map(item => (
            <List assignmentList={item} {...this.props} />
          ))}
        </tbody>
      </Table>
    ) : null;

    return (
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div>
            <Row>
              {assignment}
              {this.state.isLoading ? (
                <Loader type="Circles" color="yellow" height="50" width="50" />
              ) : null}
            </Row>
          </div>

          <Route path="/assignment/:name/:id" component={assignment} />
        </Container>
      </div>
    );
  }
}

export default Assignment;

//sunya sunya maifilit mazhya
