import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "../components/Navbars/UserNavbar.jsx";
import AdminFooter from "../components/Footers/UserPageFooter.jsx";
import Sidebar from "../components/Sidebar/StudentSidebar.jsx";
import routes from "../routes/s-routes";

//Student Dashboard Layout
class Admin extends React.Component {
  componentDidUpdate(e) {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.mainContent.scrollTop = 0;
  }
  //Get Route Information
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/student") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return null;
  };
  render() {
    //Redirect if User is not Logged
    if (
      localStorage.getItem("isLogged") == "false" ||
      localStorage.getItem("user") == "teacher"
    ) {
      return <Redirect to={"/auth/slogin"} />;
    }
    return (
      <>
        <Sidebar
          {...this.props}
          routes={routes}
          logo={{
            innerLink: "/student",
            imgAlt: "..."
          }}
        />
        <div className="main-content" ref="mainContent">
          <AdminNavbar
            {...this.props}
            brandText={this.getBrandText(this.props.location.pathname)}
          />
          <Switch>{this.getRoutes(routes)}</Switch>
          <Container fluid>
            <AdminFooter />
          </Container>
        </div>
      </>
    );
  }
}

export default Admin;
