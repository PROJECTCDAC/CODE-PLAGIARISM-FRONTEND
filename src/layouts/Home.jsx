import React from "react";
import { Route } from "react-router-dom";
// reactstrap components
import { Container, Row, Col } from "reactstrap";
import { Redirect } from "react-router-dom";
// core components
import HomeNavbar from "../components/Navbars/HomeNavbar.jsx";
import AuthFooter from "../components/Footers/HomePageFooter.jsx";
import { Button } from "reactstrap";
//Home Page Layout
class Home extends React.Component {
  componentDidMount() {
    document.body.classList.add("bg-default");
    if (localStorage.getItem("isLogged") != "true")
      localStorage.setItem("isLogged", false);
  }
  componentWillUnmount() {
    document.body.classList.remove("bg-default");
  }
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  render() {
    //Redirect if User is Logged in
    if (
      localStorage.getItem("isLogged") === "true" &&
      localStorage.getItem("user") === "student"
    ) {
      return <Redirect to={"/student/home"} />;
    } else if (
      localStorage.getItem("isLogged") === "true" &&
      localStorage.getItem("user") === "teacher"
    ) {
      return <Redirect to={"/teacher/home"} />;
    }
    return (
      <>
        <div className="main-content">
          <HomeNavbar />
          <div className="header bg-gradient-info py-7 py-lg-8">
            <Container>
              <div className="header-body text-center mb-7">
                <Row className="justify-content-center">
                  <Col lg="5" md="6">
                    <h1 className="text-white">Welcome to Code-Plagiarism</h1>
                    <br />
                    <div className="btn-wrapper text-center">
                      <Button
                        className="btn-neutral btn-icon"
                        color="default"
                        //    component={Route}
                        href="/auth/tlogin/"
                      >
                        <span className="btn-inner--text">Teacher Login</span>
                      </Button>
                      <Button
                        className="btn-neutral btn-icon"
                        color="default"
                        //   component={Route}
                        href="/auth/slogin/"
                      >
                        <span className="btn-inner--text">Student Login</span>
                      </Button>
                    </div>
                  </Col>
                </Row>
              </div>
            </Container>
            <div className="separator separator-bottom separator-skew zindex-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-default"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </div>
        </div>
        <AuthFooter />
      </>
    );
  }
}

export default Home;
