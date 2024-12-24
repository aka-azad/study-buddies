import { Link } from "react-router";

const Banner = () => {
  return (
    <>
      <div
        className="relative bg-cover bg-center py-36 rounded-3xl overflow-hidden"
        style={{
          backgroundImage:
            'url("https://www.signupgenius.com/images/new-landing/college/group-study.jpg")',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative container mx-auto text-center text-neutral-content">
          <h1 className="text-4xl font-bold mb-4">Welcome to StudyBuddies</h1>
          <p className="text-lg mb-6">
            Collaborate, learn, and grow together with friends. <br /> Create
            assignments, complete them, and grade your friend&apos;s work.
          </p>
          <Link to={'/assignments'} className="btn btn-primary">Get Started</Link>
        </div>
      </div>
    </>
  );
};

export default Banner;
