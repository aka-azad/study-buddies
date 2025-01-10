import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import AuthContext from "../Context/AuthContext";
import NoData from "../Components/NoData";
import LottieLoader from "../Components/LottieLoader";
import AssignmentCard from "../Components/AssignmentCard";

const AssignmentsPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("card"); // New state for view mode

  useEffect(() => {
    const fetchAssignments = () => {
      axios
        .get("https://study-buddies-server.vercel.app/assignments", {
          params: {
            search: searchQuery,
            difficulty:
              difficultyFilter !== "All"
                ? difficultyFilter.toLowerCase()
                : undefined,
          },
        })
        .then((response) => {
          setLoading(false);
          setAssignments(response.data);
        })
        .catch((error) => {
          console.error("Error fetching assignments:", error);
        });
    };

    fetchAssignments();
  }, [searchQuery, difficultyFilter]);

  const handleUpdate = (assignment) => {
    if (assignment.placedBy === user?.email) {
      navigate(`/assignments/${assignment._id}/edit`);
    } else {
      Swal.fire(
        "Error!",
        "You can only edit assignments you created.",
        "error"
      );
    }
  };

  const handleView = (assignment) => {
    if (user) {
      navigate(`/assignments/${assignment._id}`);
    } else
      navigate("/signin", {
        state: `/assignments/${assignment._id}`,
      });
  };

  const handleDelete = (assignment) => {
    if (assignment?.placedBy === user.email) {
      axios
        .delete(
          `https://study-buddies-server.vercel.app/assignments/${assignment._id}`,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          if (res.data.deletedCount > 0) {
            setAssignments(assignments.filter((a) => a._id !== assignment._id));
            Swal.fire(
              "Deleted!",
              "Assignment deleted successfully.",
              "success"
            );
          }
        })
        .catch((error) => {
          console.error("Error deleting assignment:", error);
          Swal.fire("Error!", "Failed to delete assignment.", "error");
        });
    } else {
      Swal.fire(
        "Error!",
        "You can only delete assignments you created.",
        "error"
      );
    }
  };

  const confirmDelete = (assignment) => {
    if (assignment?.placedBy === user.email) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          handleDelete(assignment);
        }
      });
    } else {
      Swal.fire(
        "Error!",
        "You can only delete assignments you created.",
        "error"
      );
    }
  };

  return (
    <div className="container mx-auto py-4">
      <h1 className="text-4xl text-center font-bold border-b-2 rounded-b-lg shadow-md shadow-emerald-100 pb-6 mb-8">
        Assignments
      </h1>
      <div className="mb-4 flex gap-2 justify-between items-center">
        <input
          type="text"
          placeholder="Search by Title..."
          className="input input-bordered w-full max-w-xs"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="select select-bordered w-full max-w-xs"
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value)}
        >
          <option value="All">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
        <button
          className="btn btn-primary"
          onClick={() => setViewMode(viewMode === "card" ? "table" : "card")}
        >
          Switch to {viewMode === "card" ? "Table" : "Card"} View
        </button>
      </div>

      {loading && <LottieLoader />}

      {assignments.length < 1 && !loading ? (
        <NoData />
      ) : viewMode === "card" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {assignments.map((assignment) => (
            <AssignmentCard
              key={assignment._id}
              assignment={assignment}
              confirmDelete={confirmDelete}
              handleUpdate={handleUpdate}
              handleView={handleView}
            />
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto ">
          <table className="table  table-zebra w-full border-collapse border border-base-300">
            <thead>
              <tr className="bg-base-200 text-center">
                <th className="border border-base-300 px-4 py-2">Title</th>
                <th className="border w-[90px] border-base-300 px-4 py-2">
                  Image
                </th>
                <th className="border border-base-300 px-4 py-2">Difficulty</th>
                <th className="border w-[300px] max-w-[400px] border-base-300 px-4 py-2">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment) => (
                <tr key={assignment._id}>
                  <td className="border border-base-300 px-4 py-2">
                    {assignment.title}
                  </td>
                  <td className="border min-w-[90px] border-base-300 px-4 py-2">
                    <img
                      src={assignment.thumbnailURL}
                      alt={assignment.title}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  </td>
                  <td className="border border-base-300 px-4 py-2">
                    {assignment.difficulty.charAt(0).toUpperCase() +
                      assignment.difficulty.slice(1)}
                  </td>
                  <td className="border min-w-[350px] max-w-[400px] border-base-300 px-4 py-2">
                    <div className="grid lg:grid-cols-3 grid-cols-2 gap-3">
                      <button
                        onClick={() => handleView(assignment)}
                        className="btn btn-sm btn-primary"
                      >
                        <FaEye className="mr-1 text-base" /> View
                      </button>
                      <button
                        onClick={() => handleUpdate(assignment)}
                        className="btn btn-sm btn-secondary"
                      >
                        <FaEdit className=" text-sm" />
                        Update
                      </button>
                      <button
                        onClick={() => confirmDelete(assignment)}
                        className="btn btn-sm btn-error col-span-2 lg:col-span-1"
                      >
                        <FaTrashAlt className="mr-1 text-sm" /> Delete
                      </button>
                    </div>
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

export default AssignmentsPage;
