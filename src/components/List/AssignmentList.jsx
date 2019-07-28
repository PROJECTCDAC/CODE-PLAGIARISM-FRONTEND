import React from "react";
import { Button } from "reactstrap";
//Axios Package for communicating with API
import axios from "axios";
//URL for connection
import { FILE_UPLOAD, SUBMISSIONS_POST } from "../../variables/Constant";
//Loader Component while communicating or processing
import Loader from "react-loader-spinner";

//List Components to Show Assignments
class List extends React.Component {
  constructor() {
    super();
    this.state = {
      fileSelected: false,
      isLoading: false,
      fileURL: null,
      subject: null,
      subjectName: null,
      student: null,
      codes: []
    };
    //Event handling hooks
    this.handleEvent = this.handleEvent.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
  }

  componentDidMount() {
    this.setState({
      student: localStorage.getItem("prn")
    });
  }

  //Handle Event on File/Folder is selected
  handleEvent(event) {
    let codes = [];
    //Add File Path to Array
    for (var i = 0; i < event.target.files.length; i++) {
      codes[i] = event.target.files.item(i);
    }
    //Keep on .java and .cpp code files from selected
    codes = codes.filter(code => code.name.match(/\.(cpp|java)$/));
    //Update the State in Component
    this.setState({
      codes,
      fileSelected: true
    });
    //Gets Student and Subject Data as set on File Input as Attribute
    this.setState({
      subject: event.currentTarget.dataset.subject,
      subjectName: event.currentTarget.dataset.subjectname
    });
  }

  //UPLOAD FILE AND SEND FILE PATH TO BACKEND
  uploadFiles(event) {
    //Before Beginning Upload Set the States
    this.setState({
      isLoading: true
    });
    //File Uploading Function
    const uploaders = this.state.codes.map(code => {
      const data = new FormData();
      data.append("file", code, code.name);
      //Parameters to Set Content Type and To Solve Cross Origin Issue
      let axiosConfig = {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*"
        }
      };
      //Set the Student and Subject Information at Server (EndPoints)
      this.serverRequest = axios
        .get(
          FILE_UPLOAD + "/" + this.state.subjectName + "/" + this.state.student
        )
        .then(function(event) {});

      //Upload the Files and await till completion
      (async () => {
        await axios.post(FILE_UPLOAD, data).then(response => {
          console.log(response.data.fileURL);
          this.setState({
            fileURL: response.data.fileURL
          });
        });
      })();
    });

    //Checks for Files Upload Completition
    axios
      .all(uploaders)
      .then(() => {
        console.log("done");
        //Set Headers with Server Side Folder Path, Student, and Subject Data

        let bodyFormData = new FormData();
        bodyFormData.set("stuid", this.state.student);
        bodyFormData.set("subid", this.state.subject);
        bodyFormData.set(
          "folderAddress",
          "/uploads/" + this.state.subjectName + "/" + this.state.student + "/"
        );

        let axiosConfig = {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "*"
          }
        };

        //Send Assignment Submission Information to Back-End
        axios
          .post(SUBMISSIONS_POST, bodyFormData, axiosConfig)
          .then(result => {
            console.log(result.data);

            if (result.data.message === "success") {
              alert("Submission Succesfull");
              this.setState({
                isLoading: false,
                submitted: true
              });
            } else {
              this.setState({
                isLoading: false,
                submitted: true
              });
              alert("Already Submitted");
            }
          })
          .catch(error => {
            console.log(error);
            this.setState({
              isLoading: false
            });
            alert("Please Try Again");
          });
      })
      .catch(err => alert(err.message));
  }

  render() {
    let subjectName = this.props.match.params.name;
    let subject = this.props.match.params.id;
    return (
      <tr className="px-5">
        <td>{this.props.assignmentList.id}</td>
        <td>{this.props.assignmentList.title}</td>
        <td>{this.props.assignmentList.content}</td>
        <td>{subjectName}</td>
        <td>
          <form>
            <input
              type="file"
              name="file"
              data-subjectname={subjectName}
              data-subject={subject}
              multiple
              onChange={this.handleEvent}
            />
            <Button
              onClick={this.uploadFiles}
              color="success"
              disabled={
                this.state.fileSelected || this.state.submitted ? false : true
              }
            >
              {this.state.isLoading === true ? (
                //Show Loader While Processing
                <Loader
                  type="CradleLoader"
                  color="yellow"
                  height="20"
                  width="20"
                  disabled
                />
              ) : (
                <>
                  {this.state.submitted ? (
                    <> Already Uploaded </>
                  ) : (
                    <> Click Here to Upload Folder </>
                  )}
                </>
              )}
            </Button>
          </form>
        </td>
      </tr>
    );
  }
}

export default List;
