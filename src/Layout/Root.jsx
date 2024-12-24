import { Outlet } from "react-router";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Root = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="sm:w-10/12 mx-auto flex-grow">
        <Navbar />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Root;
