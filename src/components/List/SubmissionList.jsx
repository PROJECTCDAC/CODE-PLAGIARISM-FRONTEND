import React from "react";
import { Redirect } from "react-router-dom";
import { SUBMISSIONS_POST } from "../../variables/Constant";
import { Button } from "reactstrap";
import axios from "axios";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";

//Component to Show List of Student Assignment Submission
class List extends React.Component {
  constructor() {
    super();
    this.state = {
      //    assignmentId: 0,
      subjectId: 0,
      reportId: null,
      isLoading: false,
      generated: false
    };
    this.generateReport = this.generateReport.bind(this);
  }

  //Function to Request Server for Generating Plagiarism Report of Student Code Submission
  generateReport(event) {
    event.preventDefault();
    this.setState({
      //    assignmentId: event.currentTarget.dataset.id,
      subjectId: event.currentTarget.dataset.subject
    });

    if (this.state.generated === false) {
      console.log("here");
      this.setState({ generated: true });

      /*
      //Adding Subject and Student data to Request Body
      let bodyFormData = new FormData();
      //    bodyFormData.set("assignment", this.state.assignmentId);
      bodyFormData.set("subject", this.state.subjectId);

      let axiosConfig = {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*"
        }
      };

      //Axios Method to Send POST Request
      axios
        .post(SUBMISSIONS_POST, bodyFormData, axiosConfig)
        .then(result => {
          console.log(result.data);
          //To work on Received Response of Request
          if (result.data.status === "Success") {
            alert("Plagiarism Report Generated Succesfully");
            this.setState({
              isLoading: false,
              generated: true,
              reportId: result.data.id
            });
          }
        })
        .catch(error => {
          console.log(error);
          alert("Something went wrong! Please Try Again");
          this.setState({ isLoading: false });
        });
        */
    } else {
      return <Redirect to={`${"plagiarism"}/${this.state.reportId}`} />;
    }
  }

  render() {
    return (
      <tr>
        <th scope="row">
          {this.props.assignment.stuid.prn} - {this.props.assignment.stuid.name}
        </th>
        <td>
          {this.props.assignment.subid.subid} -{" "}
          {this.props.assignment.subid.subjectName}
        </td>
        <td>{this.props.assignment.folderAddress}</td>
        <td>
          <Button
            data-id={this.props.assignment.fileid}
            data-subject={this.props.assignment.subid.subid}
            color="success"
            onClick={this.generateReport}
          >
            {this.state.isLoading === false && this.state.generated === true ? (
              <>
                <Link
                  to={`/teacher/plagiarism/${this.props.assignment.stuid.prn}`}
                >
                  View Report
                </Link>
              </>
            ) : (
              <>
                {this.state.isLoading === true &&
                this.state.subjectId === this.props.assignment.subject ? (
                  <Loader
                    type="CradleLoader"
                    color="yellow"
                    height="20"
                    width="20"
                    disabled
                  />
                ) : (
                  <>Generate Report</>
                )}
              </>
            )}
          </Button>
        </td>
      </tr>
    );
  }
}

export default List;
