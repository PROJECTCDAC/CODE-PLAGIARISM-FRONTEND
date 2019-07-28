import React from "react";
import Loader from "react-loader-spinner";
import { Button, Progress } from "reactstrap";

//Component to Show Plagiarism Report in Form of List
class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      showPopUp: false
    };
  }

  componentDidUpdate() {}
  render() {
    return (
      <tr>
        <td scope="row">
          {" "}
          {this.props.plagiarismReport.studentone.split(/(\D+)/)[0]}-{" "}
          {this.props.plagiarismReport.studentone.split(/(\D+)/)[1]}{" "}
        </td>
        <td>
          {this.props.plagiarismReport.studenttwo.split(/(\D+)/)[0]} -{" "}
          {this.props.plagiarismReport.studenttwo.split(/(\D+)/)[1]}
        </td>
        <td>
          <div className="d-flex align-items-center">
            <span className="mr-2">
              {" "}
              {this.props.plagiarismReport.percentage}{" "}
            </span>
            <div>
              <Progress
                max="100"
                value={this.props.plagiarismReport.percentage}
                barClassName="bg-gradient-danger"
              />
            </div>
          </div>
        </td>
        <td>
          {this.props.plagiarismReport.percentage >= 50 ? (
            <div>
              <Button
                data-id={this.props.itemid}
                color="success"
                onClick={this.props.viewCode}
              >
                {this.props.loadCode == 1 ? (
                  <span>View Code</span>
                ) : (
                  <span>Load Code</span>
                )}
              </Button>
            </div>
          ) : null}
        </td>
      </tr>
    );
  }
}

export default List;
