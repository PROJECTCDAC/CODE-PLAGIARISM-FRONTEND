import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Loader from "react-loader-spinner";
import { STUDENT_LOGIN } from "../../variables/Constant";
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";
//Student Registration Component
class Register extends React.Component {
  constructor(props) {
    super(props);
    //Initial States
    this.state = {
      name: "",
      email: "",
      prn: "",
      password: "",
      passwordStrength: null,
      toRedirect: false,
      authError: false,
      errorMessage: null,
      isLoading: false,
      validForm: false
    };
    //Bind with the Methods
    this.handleChange = this.handleChange.bind(this);
    this.regSubmit = this.regSubmit.bind(this);
  }

  //Handles value entered or changes in Inputs
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });

    //Validate the Input Fields
    if (!/\S+@\S+\.\S+/.test(this.state.email))
      this.setState({ authError: true, errorMessage: "Enter Valid Email" });
    else if (!/^[0-9\b]+$/.test(this.state.prn))
      this.setState({ authError: true, errorMessage: "Enter Valid PRN" });
    else this.setState({ authError: false, errorMessage: "" });

    if (this.state.password.length < 5)
      this.setState({ passwordStrength: "weak" });
    else this.setState({ passwordStrength: "strong" });

    if (
      this.state.email != null &&
      this.state.password != null &&
      this.state.prn != null &&
      this.state.password != null &&
      this.state.passwordStrength === "strong"
    )
      this.setState({ validForm: true, authError: false });
  }

  //Method Handles the Registration Process
  regSubmit(event) {
    event.preventDefault();

    if (
      this.state.email != null &&
      this.state.password != null &&
      this.state.prn != null &&
      this.state.password != null &&
      this.state.passwordStrength === "strong"
    )
      this.setState({ validForm: true, authError: false });

    if (this.state.validForm) {
      this.setState({ isLoading: true, authError: false });

      //Add Values to Request Body
      let bodyFormData = new FormData();
      bodyFormData.set("email", this.state.email);
      bodyFormData.set("password", this.state.password);
      bodyFormData.set("prn", this.state.prn);
      bodyFormData.set("name", this.state.name);

      let axiosConfig = {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*"
        }
      };

      //Method to Send Request to API and Process Response
      axios
        .post(STUDENT_LOGIN, bodyFormData, axiosConfig)
        .then(result => {
          console.log(result.data);
          if (result.data.status) {
            this.setState({ toRedirect: true, isLoading: false });
          }
        })
        .catch(error => {
          console.log(error);
          this.setState({
            authError: true,
            isLoading: false,
            errorMessage: "Please Try Again"
          });
        });
    } else
      this.setState({ authError: true, errorMessage: "Enter Valid Inputs" });
  }

  render() {
    if (this.state.toRedirect) {
      return <Redirect to={"/slogin"} />;
    }

    return (
      <>
        <Col lg="6" md="8">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                New Student Register
              </div>
              {this.state.authError ? (
                <div className="text-center text-muted mb-4">
                  {this.state.errorMessage}
                </div>
              ) : (
                <span />
              )}
              <Form role="form">
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Name" type="text" />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Email"
                      type="email"
                      name="email"
                      ref={this.input}
                      onChange={this.handleChange}
                      required
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-tag" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="PRN Number"
                      type="number"
                      name="prn"
                      ref={this.input}
                      onChange={this.handleChange}
                      required
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Password"
                      type="password"
                      name="password"
                      ref={this.input}
                      onChange={this.handleChange}
                      required
                    />
                  </InputGroup>
                </FormGroup>
                <div className="text-muted font-italic">
                  <small>
                    password strength:
                    <span className="text-success font-weight-700">
                      {this.state.passwordStrength}
                    </span>
                  </small>
                </div>
                <Row className="my-4">
                  <Col xs="12">
                    <div className="custom-control custom-control-alternative custom-checkbox">
                      <input
                        className="custom-control-input"
                        id="customCheckRegister"
                        type="checkbox"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customCheckRegister"
                      >
                        <span className="text-muted">
                          I agree with the{" "}
                          <a href="#privacy" onClick={e => e.preventDefault()}>
                            Privacy Policy
                          </a>
                        </span>
                      </label>
                    </div>
                  </Col>
                </Row>
                <div className="text-center">
                  <Button
                    className="mt-4"
                    color="primary"
                    type="submit"
                    onClick={this.regSubmit}
                    disabled={this.state.isLoading ? true : false}
                  >
                    Create account
                  </Button>
                  {this.state.isLoading && this.state.validForm ? (
                    <span>
                      <Loader
                        type="Puff"
                        color="#00BFFF"
                        height="50"
                        width="50"
                      />
                    </span>
                  ) : (
                    <span />
                  )}
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </>
    );
  }
}

export default Register;

//yeh mera ghar yeh tera ghar, yeh ghar bahut hasin hai
