import { Link, NavLink } from "react-router";
import ThemeToggle from "./ThemeToggle";
import { FcReadingEbook } from "react-icons/fc";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);

  const links = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/assignments"}>Assignments</NavLink>
      </li>
    </>
  );
  const privateLinks = (
    <>
      <li>
        <NavLink to={"/pending-assignments"}>Pending Assignments</NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-100 border-b-2">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {links}
            {user && privateLinks}
          </ul>
        </div>
        <button className="btn btn-ghost text-xl font-bold hover:bg-neutral bg-neutral  text-neutral-content">
          <FcReadingEbook className="text-2xl" /> Study
          <span className="text-accent "> Buddies</span>
        </button>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {links}
          {user && privateLinks}
        </ul>
      </div>
      <div className="navbar-end">
        <ThemeToggle />
        {user ? (
          <>
            <div
              className="tooltip tooltip-bottom ml-3"
              data-tip={user.displayName}
            >
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img alt={user.displayName} src={user.photoURL} />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <a className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </a>
                  </li>
                  <li>
                    <a>Settings</a>
                  </li>
                  <li>
                    <a>Logout</a>
                  </li>
                </ul>
              </div>
            </div>
            <button
              onClick={signOutUser}
              className="btn ml-3 btn-outline btn-info"
            >
              Log Out
            </button>
          </>
        ) : (
          <Link to={"/signin"} className="btn ml-3 btn-outline btn-info ">
            Log In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
