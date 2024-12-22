import PropTypes from "prop-types";
import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../Context/AuthProvider";
// import LottieLoader from "../Components/LottieLoader";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    // return <LottieLoader />;
  }
  if (user) {
    return children;
  }

  return <Navigate to={"/signin"} />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoute;
