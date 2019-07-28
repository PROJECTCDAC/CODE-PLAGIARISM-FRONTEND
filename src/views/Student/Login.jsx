import React from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Loader from "react-loader-spinner";
import { STUDENT_LOGIN } from "../../variables/Constant";
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
//Login Process of Student will be handled by this component
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      toRedirect: false,
      authError: false,
      errorMessage: null,
      isLoading: false,
      validForm: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.loginSubmit = this.loginSubmit.bind(this);
  }

  //Invoked when value is entered or changes in Input Field
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
    if (this.state.email != null && this.state.password != null)
      this.setState({ validForm: true });
  }

  //Method Called when Login Button is Clicked
  loginSubmit(event) {
    event.preventDefault();
    if (this.state.validForm) {
      this.setState({ isLoading: true, authError: false });

      //Sets data into Request Body
      let bodyFormData = new FormData();
      bodyFormData.set("prn", this.state.email);
      bodyFormData.set("password", this.state.password);

      //Set Request Content Type and Avoid CORS error
      let axiosConfig = {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*"
        }
      };

      //Method to Send Request and Handle Received Response
      axios
        .post(STUDENT_LOGIN, bodyFormData, axiosConfig)
        .then(result => {
          console.log(result.data.message);
          if (result.data.message === "Success") {
            //Serves when user is Found
            localStorage.setItem("token", result.data.id);
            localStorage.setItem("name", result.data.name);
            localStorage.setItem("prn", result.data.prn);
            localStorage.setItem("user", "student");
            localStorage.setItem("isLogged", true);
            this.setState({ toRedirect: true, isLoading: false });
          } else {
            //Serves when user is not found
            this.setState({
              authError: true,
              isLoading: false,
              errorMessage: " Email/PRN or Password Does not Match"
            });
          }
        })
        .catch(error => {
          console.log(error);
          this.setState({
            //Serves when EndPoint Connection Error
            authError: true,
            isLoading: false,
            errorMessage: " Email/PRN or Password Does not Match"
          });
        });
    } else {
      //if(!/\S+@\S+\.\S+/.test(this.state.email))
      this.setState({ authError: true, errorMessage: "Enter Valid Inputs" });
    }
  }

  render() {
    //redirect if user logged in succesfully
    if (this.state.toRedirect && localStorage.getItem("isLogged")) {
      return <Redirect to={"/student/home"} />;
    }
    return (
      //Login Form JSX
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">Student Login</div>
              {this.state.authError ? (
                <div className="text-center text-muted mb-4">
                  {this.state.errorMessage}
                </div>
              ) : (
                <span />
              )}
              <Form role="form">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      name="email"
                      placeholder="Enter PRN"
                      type="text"
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
                      name="password"
                      placeholder="Password"
                      type="password"
                      ref={this.input}
                      onChange={this.handleChange}
                      required
                    />
                  </InputGroup>
                </FormGroup>
                <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id=" customCheckLogin"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor=" customCheckLogin"
                  >
                    <span className="text-muted">Remember me</span>
                  </label>
                </div>
                <div className="text-center">
                  <Button
                    className="my-4"
                    color="primary"
                    type="submit"
                    onClick={this.loginSubmit}
                    disabled={this.state.isLoading ? true : false}
                  >
                    Sign In
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
          <Row className="mt-3">
            <Col xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <small />
              </a>
            </Col>
            <Col className="text-right" xs="6">
              <a className="text-light" href="/auth/register">
                <small>Create new account</small>
              </a>
            </Col>
          </Row>
        </Col>
      </>
    );
  }
}

export default Login;
