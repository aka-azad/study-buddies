import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import Root from "../Layout/Root";
import Signin from "../Pages/Signin";
import Signup from "../Pages/Signup";
import PrivateRoute from "./PrivateRoute";

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
        path: "post",
        element: <PrivateRoute></PrivateRoute>,
      },
    ],
  },
]);

export default router;
