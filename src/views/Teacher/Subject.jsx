import React from "react";
import axios from "axios";
import { SUBJECT_GET, SUBJECT_POST } from "../../variables/Constant";
import Loader from "react-loader-spinner";
import List from "../../components/List/SubjectList";
import {
  Button,
  Card,
  CardBody,
  Container,
  Row,
  Col,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  ListGroupItem,
  ListGroup
} from "reactstrap";
//Subject Adding and Selecting to Add Assignment is done in this Component
class Subject extends React.Component {
  constructor() {
    super();
    this.state = {
      showSubject: false,
      isLoading: false,
      subjectName: null,
      subject: {}
    };
    this.subjectControlEvent = this.subjectControlEvent.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addSubject = this.addSubject.bind(this);
  }

  componentDidMount() {
    var th = this;
    this.setState({ isLoading: true });

    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*"
      }
    };

    //Send GET request to get List of Subject
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

  subjectControlEvent() {
    this.setState({
      showSubject: !this.state.showSubject
    });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  //Send POST Request to Server API to Add Subject
  addSubject(event) {
    event.preventDefault();
    if (this.state.subjectName != null) {
      this.setState({ isLoading: true });
      //Set Request Body
      let bodyFormData = new FormData();
      bodyFormData.set("subject", this.state.subjectName);

      let axiosConfig = {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*"
        }
      };

      axios
        .post(SUBJECT_POST, bodyFormData, axiosConfig)
        .then(result => {
          console.log(result.data);
          if (result.data.message === "Success") {
            alert("Subject Added Succesfully");
            this.setState({ isLoading: false });
          } else {
            alert("Something went wrong! Please Try Again");
            this.setState({ isLoading: false });
          }
        })
        .catch(error => {
          console.log(error);
          alert("Something went wrong! Please Try Again");
          this.setState({ isLoading: false });
        });
    } else alert("Enter Valid Subject Name");
  }

  render() {
    //Send Subject List as Prop to LIST component to Display
    const subjects = this.state.showSubject ? (
      <ListGroup>
        {this.state.subject.subject.map(item => (
          <List subject={item} redirect="submissions" />
        ))}
      </ListGroup>
    ) : null;

    return (
      <>
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
          <Container fluid>
            <Row>
              <Col lg="5" md="7">
                <Card className="bg-secondary shadow border-0">
                  <CardBody className="px-lg-5 py-lg-5">
                    <div className="text-center text-muted mb-4">
                      Add Subject
                    </div>
                    <Form role="form">
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-email-83" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Subject"
                            type="text"
                            name="subjectName"
                            ref={this.input}
                            onChange={this.handleChange}
                          />
                        </InputGroup>
                      </FormGroup>
                      <div className="text-center">
                        <Button
                          className="my-4"
                          color="primary"
                          type="button"
                          onClick={this.addSubject}
                        >
                          Add Subject
                        </Button>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
                <Row className="mt-3" />
              </Col>

              <Col>
                {subjects}
                <Button
                  style={{ marginLeft: "22%", marginTop: "50px" }}
                  color="success"
                  onClick={this.subjectControlEvent}
                  disabled={
                    this.state.subject && this.state.isLoading ? true : false
                  }
                >
                  {this.state.isLoading ? (
                    <Loader type="Bars" color="yellow" height="30" width="30" />
                  ) : (
                    <span>Show/Hide Subject</span>
                  )}
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

export default Subject;
