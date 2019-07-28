import React from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media
} from "reactstrap";

//Component for Logged in User Navigation Bar
class AdminNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false
    };
  }

  //handle logout process and unset/clears all localstorage session
  logout(event) {
    event.preventDefault();
    if (localStorage.getItem("isLogged")) {
      alert("Logout Succesfull");
      //localStorage.removeItem("isLogged", false);
      localStorage.clear();
      this.setState({ redirectToReferrer: true });
    } else {
      alert("Please Check Connection");
    }
  }

  render() {
    //if logout succesfully redirect to HomePage
    if (this.state.redirectToReferrer) {
      return <Redirect to={"/"} />;
    }

    return (
      <>
        <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
          <Container fluid>
            <Link
              className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
              to="./"
            >
              {this.props.brandText}
            </Link>
            <Nav className="align-items-center d-none d-md-flex" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                      <img
                        alt="..."
                        src={require("../../assets/img/theme/team-4-800x800.jpg")}
                      />
                    </span>
                    <Media className="ml-2 d-none d-lg-block">
                      <span className="mb-0 text-sm font-weight-bold">
                        {localStorage.getItem("name")}
                      </span>
                    </Media>
                  </Media>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem className="noti-title" header tag="div">
                    <h6 className="text-overflow m-0">Welcome!</h6>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={this.logout.bind(this)}>
                    <i className="ni ni-user-run" />
                    <span>Logout</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default AdminNavbar;
