import React from "react";
import axios from "axios";
import { SUBMISSIONS_GET, SUBMISSIONS_POST } from "../../variables/Constant";
import Loader from "react-loader-spinner";
import List from "../../components/List/SubmissionList";
import {
  Button,
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Col
} from "reactstrap";
//Students Submission are viewed in this Components
class Submissions extends React.Component {
  constructor() {
    super();
    this.state = {
      showSubmission: false,
      isLoading: false,
      submissionList: []
    };
  }

  //Get Student Submission based on Subject (Passed via Parameter)
  componentDidMount() {
    const handle = this.props.match.params;
    var th = this;
    this.setState({ isLoading: true });
    this.serverRequest = axios
      .get(SUBMISSIONS_GET + "?id=" + handle.id)
      .then(function(event) {
        th.setState({
          submissionList: event.data,
          showSubmission: true,
          isLoading: false
        });
      });
  }

  render() {
    //Send Received Submission to List Component to show
    const submission = this.state.showSubmission ? (
      <tbody>
        {this.state.submissionList.map(item => (
          <List assignment={item} />
        ))}
      </tbody>
    ) : null;

    return (
      <>
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-6">
          <Container fluid>
            <Row className="mt-5">
              <Col className="mb-12 mb-xl-0" xl="12">
                <Card className="shadow">
                  <CardHeader className="border-0">
                    <Row className="align-items-center">
                      <div className="col">
                        <h3 className="mb-0">Student Assignment Submissions</h3>
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
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Student PRN - Name</th>
                        <th scope="col">Subject ID - Name</th>
                        <th scope="col">Folder Path</th>
                        <th scope="col">Plagiarism</th>
                      </tr>
                    </thead>
                    {submission}
                  </Table>
                  {this.state.isLoading ? (
                    <Loader
                      type="Circles"
                      color="green"
                      height="50"
                      width="50"
                    />
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

export default Submissions;
