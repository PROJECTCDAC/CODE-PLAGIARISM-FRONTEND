import React from "react";
import "./Error.css";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
//Error Page Shown if Incorrect Url Visited
const Notfound = () => (
  <div className="server-error-page">
    <h1 className="server-error-title">500</h1>
    <div className="server-error-desc">You missed the way!!!</div>
    <Link to="/">
      <Button className="server-error-go-back-btn" type="primary" size="large">
        Go Back
      </Button>
    </Link>
  </div>
);

export default Notfound;
