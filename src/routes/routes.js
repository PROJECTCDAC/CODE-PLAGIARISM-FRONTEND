import Login from "../views/Student/Login.jsx";
import TLogin from "../views/Teacher/TLogin.jsx";
import Register from "../views/Student/Register.jsx";
import StudentHome from "../views/Student/StudentHome";
import TeacherHome from "../views/Teacher/TeacherHome";
//Route Information
var routes = [
  {
    path: "/teacher",
    name: "Teacher Dashboard",
    icon: "ni ni-key-25 text-info",
    component: TeacherHome,
    layout: "/teacher"
  },
  {
    path: "/student",
    name: "Student Dashboard",
    icon: "ni ni-key-25 text-info",
    component: StudentHome,
    layout: "/student"
  },
  {
    path: "/tlogin",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: TLogin,
    layout: "/auth"
  },
  {
    path: "/slogin",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth"
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth"
  }
];

export default routes;
