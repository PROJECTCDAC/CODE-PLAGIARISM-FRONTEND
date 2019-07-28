import React from "react";
import axios from "axios";
import { FILE_GET } from "../../variables/Constant";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
//Component to Show Code of Two Students for Comparision in form of Popup Model
class Models extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      unmountOnClose: true,
      firstFile: "",
      secondFile: "",
      studentone: "",
      studenttwo: "",
      loadCode: 1
    };

    this.toggle = this.toggle.bind(this);
    this.unmount = this.unmount.bind(this);
  }

  componentWillMount() {
    //Setting values to Request Body
    let bodyFormData = new FormData();
    bodyFormData.set("fileone", this.props.filePath.studentone);
    bodyFormData.set("filetwo", this.props.filePath.studenttwo);

    //Code To set Request Format and Avoid CORS Problem
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*"
      }
    };

    //Axios POST method to send Request and Process on Response Received
    axios
      .get(
        FILE_GET +
          "/" +
          bodyFormData.get("fileone") +
          "/" +
          bodyFormData.get("filetwo"),
        axiosConfig
      )
      .then(result => {
        console.log(result.data);
        this.setState({
          firstFile: result.data.content.contentOne,
          secondFile: result.data.content.contentTwo
        });
      })
      .catch(error => {
        console.log(error);
        alert("Something went wrong! Please Try Again");
        this.setState({ modal: false });
      });
  }
  //To Set States and Send Server Request when DOM is Attached
  componentDidMount() {
    this.setState({
      studentone: this.props.filePath.studentone,
      studenttwo: this.props.filePath.studenttwo,
      modal: false
    });
  }

  componentWillReceiveProps() {
    console.log(this.state.firstFile);
    this.setState({
      modal: true
    });
  }

  //Function to work on Model Hide/Show
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
    window.location.reload();
  }

  //Function to work on Model Closed
  unmount(e) {
    let value = e.target.value;
    this.setState({ unmountOnClose: JSON.parse(value) });
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
          backdrop="true"
          unmount={this.state.unmount}
          size="lg"
        >
          <ModalHeader toggle={this.toggle}>Code Review</ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-md-6">
                <label>PRN: {this.state.studentone.split(/(\D+)/)[0]} </label>
                <textarea
                  rows="15"
                  cols="90"
                  className="form-control col-xs-12"
                  defaultValue={this.state.firstFile}
                />
              </div>
              <div className="col-md-6">
                <label>PRN: {this.state.studenttwo.split(/(\D+)/)[0]} </label>
                <textarea
                  rows="15"
                  cols="90"
                  className="form-control col-xs-12"
                  defaultValue={this.state.secondFile}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Models;
