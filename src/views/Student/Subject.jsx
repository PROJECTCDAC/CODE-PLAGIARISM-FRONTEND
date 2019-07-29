import React from "react";
import { Container, Row, Col, Button, ListGroup } from "reactstrap";
import axios from "axios";
import { SUBJECT_GET } from "../../variables/Constant";
import Loader from "react-loader-spinner";
import List from "../../components/List/SubjectList";
//Subject List will be show in this Component
class Subject extends React.Component {
  constructor() {
    super();
    this.state = {
      showSubject: false,
      isLoading: false,
      subject: []
    };
    this.subjectControlEvent = this.subjectControlEvent.bind(this);
  }

  //Gets Subject List from Server while DOM is attached
  componentDidMount() {
    var th = this;
    this.setState({ isLoading: true });

    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*"
      }
    };

    this.serverRequest = axios
      .get(SUBJECT_GET, axiosConfig)
      .then(function(event) {
        th.setState({
          subject: event.data,
          isLoading: false,
          showSubject: true
        });
      });
  }

  componentWillUnmount() {
    //  this.serverRequest.abort();
  }

  //Handle Subject Show/Hide
  subjectControlEvent() {
    this.setState({
      showSubject: !this.state.showSubject
    });
  }

  render() {
    //Send Subject Data to List Component
    const subjects = this.state.showSubject ? (
      <ListGroup>
        {this.state.subject.subject.map(item => (
          <List subject={item} redirect="assignment" />
        ))}
      </ListGroup>
    ) : null;

    return (
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div>
            <Row>
              <Col md="4" xs="6" />
              <Col md="4" xs="6">
                {subjects}
                <Button
                  style={{ marginLeft: "22%", marginTop: "50px" }}
                  color="success"
                  onClick={this.subjectControlEvent}
                  disabled={this.state.showSubject ? false : true}
                >
                  {this.state.isLoading ? (
                    <Loader type="Bars" color="yellow" height="30" width="30" />
                  ) : (
                    <span>Show/Hide Subject</span>
                  )}
                </Button>
              </Col>
              <Col md="4" xs="6" />
            </Row>
          </div>
        </Container>
      </div>
    );
  }
}

export default Subject;
