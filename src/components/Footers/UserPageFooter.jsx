import React from "react";
// reactstrap (A Bootstrap) components
import { Row, Col } from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
      //Footer for Logged in Users Starts Here
      <footer className="footer">
        <Row className="align-items-center justify-content-xl-between">
          <Col xl="6">
            <div className="copyright text-center text-xl-left text-muted">
              © 2019 CDAC ACTS
            </div>
          </Col>
        </Row>
      </footer>
    );
  }
}

export default Footer;
