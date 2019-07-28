import { ListGroupItem } from "reactstrap";
import React from "react";
import { Link } from "react-router-dom";

//Component to Show Subject List
class List extends React.Component {
  render() {
    return (
      <ListGroupItem className="px-5">
        <Link
          to={`${this.props.redirect}/${this.props.subject.subjectName}/${
            this.props.subject.subid
          }`}
        >
          {this.props.subject.subjectName} - Online Examination
        </Link>
      </ListGroupItem>
    );
  }
}

export default List;
