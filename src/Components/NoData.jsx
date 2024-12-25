import { Link } from "react-router";

const NoData = () => {
  return (
    <div className="flex flex-col items-center text-center justify-center h-screen min-h-fit pb-3 bg-gradient-to-r from-green-300 via-yellow-400 to-orange-500 text-white rounded-3xl my-5">
      <h1 className="sm:text-6xl text-2xl font-extrabold mb-4">No Data Available <br /> on Server</h1>
      <p className="sm:text-2xl font-semibold text-xl px-2 mb-4">
        Unfortunately, there is no data available.
      </p>
      <p className="sm:text-xl font-semibold px-2 mb-8">
        You can try refreshing the page or come back later.
      </p>
      <Link
        to="/assignments"
        className="btn btn-outline btn-lg border-white text-white hover:bg-white hover:text-black"
      >
        Go To All Assignments
      </Link>
    </div>
  );
};

export default NoData;
