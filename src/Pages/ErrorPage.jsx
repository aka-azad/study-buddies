import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 text-white rounded-3xl my-5">
      <h1 className="text-9xl font-extrabold mb-4">404</h1>
      <p className="text-2xl mb-4">Sorry, we can&apos;t find that page.</p>
      <p className="text-xl mb-8">But don&apos;t worry, you can find plenty of other things on our homepage.</p>
      <Link
        to="/"
        className="btn btn-outline btn-lg border-white text-white hover:bg-white hover:text-black"
      >
        Return to Homepage
      </Link>
    </div>
  );
};

export default ErrorPage;
