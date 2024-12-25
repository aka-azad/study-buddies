import { Link } from "react-router";
import { FaTwitter, FaFacebook, FaInstagram, FaArrowRight } from "react-icons/fa";
import { FcReadingEbook } from "react-icons/fc";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r  from-indigo-500 via-purple-500 to-pink-500 text-white py-8">
      <div className="w-10/12 mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 md:space-x-12 px-4">
        <div className="flex flex-col items-center">
          <Link
            to="/"
            className="btn w-fit btn-ghost px-0 hover:bg-transparent"
          >
            <FcReadingEbook className="text-3xl" />
            <p className="text-2xl font-bold text-white hover:text-gray-300 transition duration-300">
              Study Buddies
            </p>
          </Link>
          <div className="text-center md:text-left">
            <p className="mt-1  font-semibold">
              &copy; 2024 StudyBuddies. All rights reserved.
            </p>
          </div>
        </div>
        <div className="text-center sm:text-left">
          <h6 className="text-lg font-bold underline underline-offset-2">Navigate To</h6>
          <div className="flex flex-col space-y-2 font-semibold">
            <Link to={"/signin"} className="flex items-center"> <FaArrowRight className="mr-2"/> Log In</Link>
            <Link to={"/register"} className="flex items-center"> <FaArrowRight className="mr-2"/> Register Now</Link>
            <Link to={"/assignments"} className="flex items-center"> <FaArrowRight className="mr-2"/> Show All Assignments</Link>
          </div>
        </div>
        <div className="text-center w-fit md:text-left">
          <p className="mb-2 text-lg font-semibold">Follow us on:</p>
          <div className="flex justify-center md:justify-start space-x-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition duration-300 hover:text-gray-300"
            >
              <FaTwitter className="text-2xl" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition duration-300 hover:text-gray-300"
            >
              <FaFacebook className="text-2xl" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition duration-300 hover:text-gray-300"
            >
              <FaInstagram className="text-2xl" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
