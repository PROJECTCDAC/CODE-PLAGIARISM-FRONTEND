import TeacherHome from "../views/Teacher/TeacherHome";
import Assignment from "../views/Teacher/Assignment";
import Plagiarism from "../views/Teacher/Plagiarism";
import Subject from "../views/Teacher/Subject";
import Submissions from "../views/Teacher/Submissions";
import TeacherProfile from "../views/Teacher/TeacherProfile";
import Checksum from "../views/Teacher/Checksum";
//Route Information for Logged in Teacher User
var routes = [
  {
    path: "/submissions/:name/:id",
    name: "Student Submissions",
    icon: "ni ni-key-25 text-info",
    component: Submissions,
    layout: "/teacher"
  },
  {
    path: "/plagiarism/:id",
    name: "Plagiarism Report",
    icon: "ni ni-key-25 text-info",
    component: Plagiarism,
    layout: "/teacher"
  },
  {
    path: "/assignment/:id",
    name: "Add Assignment",
    icon: "ni ni-key-25 text-info",
    component: Assignment,
    layout: "/teacher"
  },
  {
    path: "/assignment",
    name: "Add Assignment",
    icon: "ni ni-key-25 text-info",
    component: Assignment,
    layout: "/teacher"
  },
  {
    path: "/plagiarism",
    name: "Plagiarism Report",
    icon: "ni ni-key-25 text-info",
    component: Plagiarism,
    layout: "/teacher"
  },
  {
    path: "/add",
    name: "Add Subject",
    icon: "ni ni-key-25 text-info",
    component: Subject,
    layout: "/teacher"
  },
  {
    path: "/submissions",
    name: "View Submissions",
    icon: "ni ni-key-25 text-info",
    component: Submissions,
    layout: "/teacher"
  },
  {
    path: "/home",
    name: "Teacher Dashboard",
    icon: "ni ni-key-25 text-info",
    component: TeacherHome,
    layout: "/teacher"
  },
  {
    path: "/checksum",
    name: "Checksum",
    icon: "ni ni-key-25 text-info",
    component: Checksum,
    layout: "/teacher"
  },
  {
    path: "/",
    name: "Profile",
    icon: "ni ni-key-25 text-info",
    component: TeacherProfile,
    layout: "/teacher"
  }
];

export default routes;
