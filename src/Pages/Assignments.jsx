import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthProvider";

const AssignmentsPage = () => {
  const { user } = useContext(AuthContext);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/assignments")
      .then((response) => {
        setAssignments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching assignments:", error);
      });
  }, []);

  const handleDelete = (assignment) => {
    if (assignment?.placedBy === user.email) {
      axios
        .delete(`http://localhost:5000/assignments/${assignment._id}`)
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
    console.log(assignment);

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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Assignments</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {assignments.map((assignment) => (
          <div key={assignment._id} className="card bg-base-100  shadow-md">
            <figure className="h-52">
              <img src={assignment.thumbnailURL} alt={assignment.title} />
            </figure>
            <div className="card-body px-3">
              <h2 className="card-title">{assignment.title}</h2>
              <p>
                <strong>Marks:</strong> {assignment.marks}
              </p>
              <p>
                <strong>Difficulty:</strong> {assignment.difficulty}
              </p>
              <div className="card-actions justify-between">
                <Link
                  to={`/assignments/${assignment._id}`}
                  className="btn btn-primary text-lg"
                >
                  <FaEye className="mr-1 text-xl" /> View
                </Link>
                <Link
                  to={`/assignments/${assignment._id}/edit`}
                  className="btn btn-secondary text-lg"
                >
                  <FaEdit className="mr-1 text-xl" /> Update
                </Link>
                <button
                  onClick={() => confirmDelete(assignment)}
                  className="btn btn-error text-lg"
                >
                  <FaTrashAlt className="mr-1 text-xl" /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignmentsPage;
