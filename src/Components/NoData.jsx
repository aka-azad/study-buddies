import { Link } from "react-router";

const NoData = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-green-300 via-yellow-400 to-orange-500 text-white rounded-3xl my-5">
      <h1 className="text-6xl font-extrabold mb-4">No Data</h1>
      <p className="text-2xl mb-4">
        Unfortunately, there is no data available.
      </p>
      <p className="text-xl mb-8">
        You can try refreshing the page or come back later.
      </p>
      <Link
        to="/"
        className="btn btn-outline btn-lg border-white text-white hover:bg-white hover:text-black"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NoData;
