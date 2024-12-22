import { Outlet } from "react-router";
import Navbar from "../Components/Navbar";

const Root = () => {
    return (
        <div className="w-10/12 mx-auto">
            <Navbar/>
            <Outlet/>

        </div>
    );
};

export default Root;