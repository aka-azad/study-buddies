import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AuthContext from "../Context/AuthContext";
import NoData from "../Components/NoData";

const MyAttemptedAssignments = () => {
  const { user } = useContext(AuthContext);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:5000/submissions?submittedBy=${user.email}`, {
          withCredentials: true,
        })
        .then((res) => {
          setAssignments(res.data);
        })
        .catch((error) => {
          console.error("Error fetching submitted assignments:", error);
          toast.error("Failed to load your submitted assignments.");
        });
    }
  }, [user]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl text-center font-bold border-b-2 rounded-b-lg shadow-md shadow-emerald-100 pb-6 mb-8">
        Submitted Assignments
      </h1>
      {assignments.length < 1 ? (
        <NoData />
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-base-300">
                <th className="border px-4 py-2">Title</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Marks</th>
                <th className="border px-4 py-2">Obtained Marks</th>
                <th className="border px-4 py-2">Feedback</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment) => (
                <tr key={assignment._id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{assignment.title}</td>
                  <td className="border px-4 py-2">{assignment.status}</td>
                  <td className="border px-4 py-2">{assignment.marks}</td>
                  <td className="border px-4 py-2">
                    {assignment.obtained_marks}
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
