import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import Root from "../Layout/Root";
import Signin from "../Pages/Signin";
import Signup from "../Pages/Signup";
import PrivateRoute from "./PrivateRoute";
import CreateAssignment from "../Pages/CreateAssignment";
import Assignments from "../Pages/Assignments";
import UpdateAssignment from "../Pages/UpdateAssignment";
import AssignmentDetails from "../Pages/AssignmentDetails";
import PendingAssignments from "../Pages/PendingAssignments";
import MyAttemptedAssignments from "../Pages/MyAttemptedAssignments";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "signin",
        element: <Signin />,
      },
      {
        path: "register",
        element: <Signup />,
      },
      {
        path: "create-assignment",
        element: <CreateAssignment />,
      },
      {
        path: "assignments",
        element: <Assignments />,
      },
      {
        path: "pending-assignments",
        element: <PendingAssignments />,
      },
      {
        path: "my-assignments",
        element: <MyAttemptedAssignments />,
      },
      {
        path: "assignments/:id",
        element: <AssignmentDetails />,
      },
      {
        path: "assignments/:id/edit",
        element: <UpdateAssignment />,
      },
      {
        path: "post",
        element: <PrivateRoute></PrivateRoute>,
      },
    ],
  },
]);

export default router;
