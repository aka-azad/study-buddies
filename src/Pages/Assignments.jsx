import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import AuthContext from "../Context/AuthContext";
import NoData from "../Components/NoData";
import LottieLoader from "../Components/LottieLoader";
import AssignmentCard from "../Components/AssignmentCard";

const AssignmentsPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignments = () => {
      axios
        .get("http://localhost:5000/assignments", {
          params: {
            search: searchQuery,
            difficulty:
              difficultyFilter !== "all" ? difficultyFilter : undefined,
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
        "You can only Edit assignments you created.",
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
        .delete(`http://localhost:5000/assignments/${assignment._id}`, {
          withCredentials: true,
        })
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
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
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
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by title..."
          className="input input-bordered w-full max-w-xs"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="select select-bordered w-full max-w-xs"
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value)}
        >
          <option value="all">All Difficulties</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <div
        className={`${
          assignments.length > 0
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 nothing"
            : ""
        }}`}
      >
        {loading && <LottieLoader />}
        {assignments.length < 1 && !loading ? (
          <NoData></NoData>
        ) : (
          assignments.map((assignment) => (
            <AssignmentCard
              key={assignment._id}
              assignment={assignment}
              confirmDelete={confirmDelete}
              handleUpdate={handleUpdate}
              handleView={handleView} 
            />
          ))
        )}
      </div>
    </div>
  );
};

export default AssignmentsPage;
