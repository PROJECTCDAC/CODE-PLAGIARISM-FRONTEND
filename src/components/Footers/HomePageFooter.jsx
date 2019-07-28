import React from "react";
// reactstrap components
import { NavItem, Nav, Container, Row, Col } from "reactstrap";

class Login extends React.Component {
  render() {
    return (
      //Footer for Home Page
      <>
        <footer className="py-5">
          <Container>
            <Row className="align-items-center justify-content-xl-between">
              <Col xl="6">
                <div className="copyright text-center text-xl-left text-muted">
                  © 2019 CDAC-ACTS
                </div>
              </Col>
              <Col xl="6">
                <Nav className="nav-footer justify-content-center justify-content-xl-end">
                  <NavItem>What is your Group Number?</NavItem>
                </Nav>
              </Col>
            </Row>
          </Container>
        </footer>
      </>
    );
  }
}

export default Login;
