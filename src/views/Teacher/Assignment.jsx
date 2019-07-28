import React from "react";
import axios from "axios";
import { API_BASE_URL } from "../../variables/Constant";
import Loader from "react-loader-spinner";
import {
  Button,
  Row,
  Col,
  Container,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Card,
  CardBody
} from "reactstrap";
//Assignment for Subject can be Added or Removed in this Component
class Assignment extends React.Component {
  constructor() {
    super();
    this.state = {
      subject: null,
      assignment: null,
      isLoading: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.addAssignment = this.addAssignment.bind(this);
  }

  componentDidMount() {
    const handle = this.props.match.params;
    this.setState({ subject: handle.id });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  //Assignment Adding is handled by this method
  addAssignment(event) {
    event.preventDefault();
    if (this.state.assignment != null) {
      this.setState({ isLoading: true });

      let bodyFormData = new FormData();
      bodyFormData.set("assignment", this.state.assignment);
      bodyFormData.set("subject", this.state.subject);

      let axiosConfig = {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*"
        }
      };

      axios
        .post(API_BASE_URL, bodyFormData, axiosConfig)
        .then(result => {
          console.log(result.data);
          if (result.data.status) {
            alert("Assigment Added Succesfully");
            this.setState({ isLoading: false });
          }
        })
        .catch(error => {
          console.log(error);
          alert("Something went wrong! Please Try Again");
          this.setState({ isLoading: false });
        });
    } else alert("Enter Assignment");
  }

  render() {
    return (
      <>
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
          <Container fluid>
            <Row>
              <Col lg="5" md="7">
                <Card className="bg-secondary shadow border-0">
                  <CardBody className="px-lg-5 py-lg-5">
                    <div className="text-center text-muted mb-4">
                      Add Assignment
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
                            type="text"
                            name="subject"
                            value={this.state.subject}
                            ref={this.input}
                            readOnly
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-email-83" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Enter Assignment Question"
                            type="textarea"
                            name="assignment"
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
                          onClick={this.addAssignment}
                        >
                          {this.state.isLoading ? (
                            <Loader
                              type="Bars"
                              color="yellow"
                              height="50"
                              width="50"
                            />
                          ) : (
                            <span>Add Assignment</span>
                          )}
                        </Button>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
                <Row className="mt-3" />
              </Col>

              <Col />
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

export default Assignment;
