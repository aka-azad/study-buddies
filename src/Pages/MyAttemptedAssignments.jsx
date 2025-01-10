import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AuthContext from "../Context/AuthContext";
import NoData from "../Components/NoData";
import LottieLoader from "../Components/LottieLoader";

const MyAttemptedAssignments = () => {
  const { user } = useContext(AuthContext);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://study-buddies-server.vercel.app/submissions?submittedBy=${user.email}`,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          setAssignments(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching submitted assignments:", error);
          toast.error("Failed to load your submitted assignments.");
        });
    }
  }, [user]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="sm:text-4xl text-3xl text-center font-bold border-b-2 rounded-b-lg shadow-md shadow-emerald-100 pb-6 mb-8">
        Submitted Assignments
      </h1>
      {loading && <LottieLoader />}
      {assignments.length < 1 && !loading ? (
        <NoData />
      ) : (
        <div className="overflow-x-auto min-w-full nothing">
          <table className="table min-w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-base-300 text-center *:min-w-fit">
                <th className="border px-4 py-2">Title</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Marks</th>
                <th className="border px-4 py-2">Obtained Marks</th>
                <th className="border px-4 py-2">Feedback</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment) => (
                <tr key={assignment._id} className="*:min-w-fit">
                  <td className="border px-4 py-2">{assignment.title}</td>
                  <td className="border px-4 py-2">
                    {assignment.status === "pending" ? "Pending" : "Complete"}
                  </td>
                  <td className="border px-4 py-2">{assignment.marks}</td>
                  <td className="border px-4 py-2">
                    {assignment.obtained_marks || "Pending"}
                  </td>
                  <td className="border px-4 py-2">
                    {assignment.feedback || "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyAttemptedAssignments;
