import React from "react";
import axios from "axios";
import { CHECKSUM } from "../../variables/Constant";
import Loader from "react-loader-spinner";
import List from "../../components/List/CheckSumList";
import {
  Button,
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Col
} from "reactstrap";
//Plagiarism Report of Student Submission is shown in this Component
class Checksum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPlagiarism: false,
      isLoading: false,
      id: 0,
      plagiarismReport: []
    };
    this.viewCode = this.viewCode.bind(this);
  }

  //Set States and Get Generated Plagiarism Report via API based on Student PRN
  componentDidMount() {
    this.setState({
      isLoading: true
    });

    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*"
      }
    };

    //Send GET Request to Server and Set Received JSON response as state
    var th = this;
    this.serverRequest = axios.get(CHECKSUM, axiosConfig).then(function(res) {
      th.setState({
        plagiarismReport: res.data,
        isLoading: false
      });
    });
  }

  viewCode() {
    this.setState({
      showPlagiarism: true
    });
  }

  componentWillUnmount() {
    this.setState({
      plagiarismReport: []
    });
  }

  render() {
    //Send Data to Table and Model Component and Show it
    const table = this.state.showPlagiarism ? (
      <>
        <Table className="align-items-center table-flush" responsive>
          <thead className="thead-light">
            <tr>
              <th scope="col">Checksum</th>
              <th scope="col">Student PRN | File Name</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(this.state.plagiarismReport).map(item => (
              <List
                plagiarismReport={item}
                values={this.state.plagiarismReport}
              />
            ))}
          </tbody>
        </Table>
      </>
    ) : null;

    return (
      <>
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-6">
          <Container fluid>
            <Col>
              <Row>
                <h1>Checksum Result</h1>
              </Row>
            </Col>
          </Container>
          <Container fluid>
            <Row>
              <Col className="mb-5 mb-xl-0" xl="12">
                <Card className="shadow">
                  <CardHeader className="border-0">
                    <Row className="align-items-center">
                      <div className="col">
                        <h3 className="mb-0">Plagiarism Report</h3>
                      </div>
                      <div className="col text-right">
                        <Button
                          color="primary"
                          href="#pablo"
                          onClick={this.viewCode}
                          size="sm"
                        >
                          View Result
                        </Button>
                      </div>
                    </Row>
                  </CardHeader>
                  {table}
                  {this.state.isLoading ? (
                    <Loader type="Bars" color="green" height="50" width="50" />
                  ) : null}
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

export default Checksum;
