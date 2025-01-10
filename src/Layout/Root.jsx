import { Outlet } from "react-router";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Root = () => {
  return (
    <div>
      <div className="flex flex-col sm:p-0 px-3 min-h-screen bg-info bg-opacity-10">
        <Navbar />
        <div className="flex-grow sm:w-10/12 mx-auto w-full overflow-x-auto">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Root;
