import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./assets/vendor/nucleo/css/nucleo.css";
import "./assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/css/argon-dashboard-react.css";

import AuthLayout from "./layouts/Auth.jsx";
import HomeLayout from "./layouts/Home.jsx";
import StudentDashboard from "./layouts/Student.jsx";
import TeacherDashboard from "./layouts/Teacher.jsx";
import Notfound from "./views/Error";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" render={props => <HomeLayout {...props} />} />
      <Route path="/auth" render={props => <AuthLayout {...props} />} />
      <Route
        path="/student"
        render={props => <StudentDashboard {...props} />}
      />
      <Route
        path="/teacher"
        render={props => <TeacherDashboard {...props} />}
      />
      <Route component={Notfound} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

serviceWorker.unregister();
