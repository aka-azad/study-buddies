import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import Root from "../Layout/Root";
import Signin from "../Pages/Signin";
import Signup from "../Pages/Signup";
import PrivateRoute from "./PrivateRoute";
import CreateAssignment from "../Pages/CreateAssignment";
import Assignments from "../Pages/Assignments";

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
        path: "post",
        element: <PrivateRoute></PrivateRoute>,
      },
    ],
  },
]);

export default router;
