import React from "react";
import axios from "axios";
import { GENERATE_PLAGIARISM } from "../../variables/Constant";
import Loader from "react-loader-spinner";
import Models from "../../components/Models/ViewCodeModel";
import List from "../../components/List/PlagiarismReportList";
import {
  Button,
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Col
} from "reactstrap";
//Array storing Filtered Data
var listing = [];
//Plagiarism Report of Student Submission is shown in this Component
class Plagiarism extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPlagiarism: true,
      isLoading: false,
      showModel: false,
      id: 0,
      report: 0,
      plagiarismReport: [],
      filePath: null
    };
    this.viewCode = this.viewCode.bind(this);
  }

  //Set States and Get Generated Plagiarism Report via API based on Student PRN
  componentDidMount() {
    const handle = this.props.match.params;
    this.setState({
      report: handle.id,
      isLoading: false
    });

    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*"
      }
    };

    //Send GET Request to Server and Set Received JSON response as state
    var th = this;
    this.serverRequest = axios
      .get(GENERATE_PLAGIARISM, axiosConfig)
      .then(function(event) {
        th.setState({
          plagiarismReport: event.data,
          showPlagiarism: true,
          isLoading: false
        });
      });
  }

  //Shows Model Pop with Code of Two Students for Comparing whoes Matching % is greater than 50
  viewCode(event) {
    let id = event.currentTarget.dataset.id;
    let paths = listing[id];
    this.setState({
      filePath: paths,
      showModel: true
    });
  }

  render() {
    //Get Student PRN from URL as per pattern in route
    let student = this.props.match.params.id;

    //Filtering The Received Plagiarism Data (Avoids Self Comparison)
    let studentPlag = this.state.plagiarismReport.filter(function(student) {
      return (
        student.studentone.split(/(\D+)/)[0] !=
        student.studenttwo.split(/(\D+)/)[0]
      );
    });
    listing = studentPlag;
    //Send Data to Table and Model Component and Show it
    const table = this.state.showPlagiarism ? (
      <>
        <Table className="align-items-center table-flush" responsive>
          <thead className="thead-light">
            <tr>
              <th scope="col">Student PRN</th>
              <th scope="col">Code File</th>
              <th scope="col">% Plagiarism</th>
              <th scope="col">Check Code</th>
            </tr>
          </thead>
          <tbody>
            {listing.map((item, index) => (
              <List
                plagiarismReport={item}
                itemid={index}
                viewCode={this.viewCode}
              />
            ))}
          </tbody>
        </Table>
        {this.state.showModel === true ? (
          <Models filePath={this.state.filePath} />
        ) : null}
      </>
    ) : null;

    return (
      <>
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-6">
          <Container fluid>
            <Col>
              <Row>
                <h1>PRN : {student} </h1>
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
                          onClick={e => e.preventDefault()}
                          size="sm"
                        >
                          See all
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

export default Plagiarism;
