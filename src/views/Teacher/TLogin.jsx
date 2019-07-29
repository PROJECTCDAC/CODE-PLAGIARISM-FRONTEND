import React from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Loader from "react-loader-spinner";
import { TEACHER_LOGIN } from "../../variables/Constant";
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
//Teacher Login is Handled by this Component
class TLogin extends React.Component {
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

  //Invoked when value is entered or changed in input field
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
    //Validation of Form
    if (this.state.email != null && this.state.password != null)
      this.setState({ validForm: true });
  }

  //Handled Login Process when Button Pressed
  loginSubmit(event) {
    event.preventDefault();
    if (this.state.validForm) {
      this.setState({ isLoading: true, authError: false });

      //Set Data into Request Body
      let bodyFormData = new FormData();
      bodyFormData.set("email", this.state.email);
      bodyFormData.set("password", this.state.password);

      //Set Request Body Type to JSON and Avoid CORS error
      let axiosConfig = {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*"
        }
      };
      //Axios Method to  Work with API Request and Response
      axios
        .post(TEACHER_LOGIN, bodyFormData, axiosConfig)
        .then(result => {
          console.log(result.data);
          if (result.data.message === "Success") {
            //If user found
            localStorage.setItem("name", result.data.email);
            localStorage.setItem("token", result.data.id);
            localStorage.setItem("isLogged", true);
            localStorage.setItem("user", "teacher");
            this.setState({ toRedirect: true, isLoading: false });
          } else {
            this.setState({
              //if no user found
              authError: true,
              isLoading: false,
              errorMessage: " Email or Password Does not Match"
            });
          }
        })
        .catch(error => {
          //if connection or server error
          console.log(error);
          this.setState({
            authError: true,
            isLoading: false,
            errorMessage: " Please Try Again"
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
      return <Redirect to={"/teacher/home"} />;
    }

    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">Teacher Login</div>
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
                      placeholder="Email"
                      type="email"
                      name="email"
                      ref={this.input}
                      onChange={this.handleChange}
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
                    Sign in
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
          <Row className="mt-3" />
        </Col>
      </>
    );
  }
}

export default TLogin;
