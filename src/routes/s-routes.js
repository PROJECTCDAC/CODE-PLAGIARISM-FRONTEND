import StudentHome from "../views/Student/StudentHome";
import Subject from "../views/Student/Subject";
import Assignment from "../views/Student/Assignment";
import StudentProfile from "../views/Student/StudentProfile";
//Route Information for Logged in Student User
var routes = [
  {
    path: "/home",
    name: "Home",
    icon: "ni ni-key-25 text-info",
    component: StudentHome,
    layout: "/student"
  },
  {
    path: "/subject",
    name: "Select Subject",
    icon: "ni ni-key-25 text-info",
    component: Subject,
    layout: "/student"
  },
  {
    path: "/assignment/:name/:id",
    name: "Select Assignment",
    icon: "ni ni-key-25 text-info",
    component: Assignment,
    layout: "/student"
  },
  {
    path: "/",
    name: "Profile",
    icon: "ni ni-key-25 text-info",
    component: StudentProfile,
    layout: "/student"
  }
];

export default routes;
