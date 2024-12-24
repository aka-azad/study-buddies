import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import AuthContext from "../Context/AuthContext";

const PendingAssignments = () => {
  const { user } = useContext(AuthContext);
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      axios
        .get("http://localhost:5000/submissions/pending", {
          withCredentials: true,
        })
        .then((res) => {
          const filteredAssignments = res.data.filter(
            (assignment) => assignment.examinee_email !== user.email
          );
          setAssignments(filteredAssignments);
        })
        .catch((error) => {
          console.error("Error fetching pending assignments:", error);
          toast.error("Failed to load pending assignments.");
        });
    }
  }, [user]);

  const openAssignmentModal = (assignment) => {
    setSelectedAssignment(assignment);
    document.getElementById("give_mark_modal").showModal();
  };

  const closeAssignmentModal = () => {
    setSelectedAssignment(null);
    document.getElementById("give_mark_modal").close();
  };

  const handleMarking = (e, assignment) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const marks = formData.get("marks");
    const obtainedMarks = Number(marks);
    const feedback = formData.get("feedback");
    const assignmentMarksMargin = Number(assignment.marks);
    if (assignmentMarksMargin < obtainedMarks) {
      toast.error(`Obtained Marks Can't be higher than ${assignment.marks}`);
      return;
    }

    const updatedAssignment = {
      status: "completed",
      obtained_marks: obtainedMarks,
      feedback,
    };

    axios
      .patch(
        `http://localhost:5000/submissions/${selectedAssignment._id}`,
        updatedAssignment , {withCredentials: true}
      )
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success("Assignment marked successfully.");
          closeAssignmentModal();
          navigate("/pending-assignments");
        } else {
          toast.error("Failed to mark assignment.");
        }
      })
      .catch((error) => {
        console.error("Error marking assignment:", error);
        toast.error("Failed to mark assignment.");
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl text-center font-bold border-b-2 rounded-b-lg shadow-md shadow-emerald-100 pb-6 mb-8">
        Pending Assignments
      </h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-base-300">
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Marks</th>
              <th className="px-4 py-2">Examinee Name</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment) => (
              <tr key={assignment._id}>
                <td className="border px-4 py-2">{assignment.title}</td>
                <td className="border px-4 py-2">{assignment.marks}</td>
                <td className="border px-4 py-2">{assignment.examinee_name}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => openAssignmentModal(assignment)}
                    className="btn btn-primary"
                  >
                    Give Mark
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dialog
        id="give_mark_modal"
        className="modal modal-bottom sm:modal-middle w-10/12 mx-auto"
      >
        <div className="modal-box">
          <h2 className="text-xl font-bold mb-4">Give Mark</h2>
          {selectedAssignment && (
            <>
              <p>
                <strong>Google Docs Link:</strong>
                <a
                  href={selectedAssignment.googleDocsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link link-primary"
                >
                  {selectedAssignment.googleDocsLink}
                </a>
              </p>
              <p>
                <strong>Quick Note:</strong> {selectedAssignment.note}
              </p>
              <form onSubmit={(e) => handleMarking(e, selectedAssignment)}>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Marks
                  </label>
                  <input
                    type="number"
                    name="marks"
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Feedback
                  </label>
                  <textarea
                    name="feedback"
                    className="textarea textarea-bordered w-full"
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-full">
                  Submit
                </button>
              </form>
              <div className="modal-action">
                <button
                  onClick={closeAssignmentModal}
                  className="btn btn-secondary w-full"
                >
                  Close
                </button>
              </div>
            </>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default PendingAssignments;
