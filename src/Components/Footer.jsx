import { Link } from "react-router";
import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
import { FcReadingEbook } from "react-icons/fc";

const Footer = () => {
  return (
    <footer className="bg-base-300 text-base-content">
      <div className="container mx-auto py-6 px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="flex items-center space-x-2">
          <FcReadingEbook className="text-2xl" />
          <Link to="/" className="text-xl font-bold text-primary">
            StudyBuddies
          </Link>
        </div>
        <div className="text-center md:text-left">
          <p className="mt-1">&copy; 2024 StudyBuddies. All rights reserved.</p>
        </div>

        <div className="text-center md:text-left">
          <p className="mb-2">Follow us on:</p>
          <div className="flex justify-center md:justify-start space-x-2">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link link-hover"
            >
              <FaTwitter className="text-xl" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link link-hover"
            >
              <FaFacebook className="text-xl" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link link-hover"
            >
              <FaInstagram className="text-xl" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
