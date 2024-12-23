import { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import { AuthContext } from "../Context/AuthProvider";

const AssignmentDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState(null);
  const [googleDocsLink, setGoogleDocsLink] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/assignments/${id}`)
      .then((res) => {
        setAssignment(res.data);
      })
      .catch((error) => {
        console.error("Error fetching assignment details:", error);
        toast.error("Failed to load assignment details.");
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const submissionData = {
      googleDocsLink,
      note,
      assignmentId: id,
      status: "pending",
      submittedBy: user.email,
    };

    axios
      .post("http://localhost:5000/submissions", submissionData)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Assignment submitted successfully.");
          document.getElementById("my_modal").close();
          navigate("/assignments");
        } else {
          toast.error("Failed to submit assignment.");
        }
      })
      .catch((error) => {
        console.error("Error submitting assignment:", error);
        toast.error("Failed to submit assignment.");
      });
  };

  return (
    <div className="container mx-auto lg:w-8/12 md:w-10/12 p-4">
      <Link to="/assignments" className="btn btn-secondary mb-4">
        <FaArrowLeft className="mr-2" /> Back to Assignments
      </Link>
      {assignment && (
        <div className=" p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">{assignment.title}</h1>
          <img
            src={assignment.thumbnailURL}
            alt={assignment.title}
            className="mb-4 h-64 object-cover w-full"
          />
          <p className="mb-2">
            <strong>Description:</strong> {assignment.description}
          </p>
          <p className="mb-2">
            <strong>Marks:</strong> {assignment.marks}
          </p>
          <p className="mb-2">
            <strong>Difficulty:</strong> {assignment.difficulty}
          </p>
          <p className="mb-2">
            <strong>Due Date:</strong>{" "}
            {new Date(assignment.dueDate).toLocaleDateString()}
          </p>
          <div className="w-fit mx-auto">
            <button
              onClick={() => document.getElementById("my_modal").showModal()}
              className="btn btn-wide btn-primary mt-4 "
            >
              Take Assignment
            </button>
          </div>
        </div>
      )}

      <dialog
        id="my_modal"
        className="modal modal-bottom sm:modal-middle w-10/12 mx-auto"
      >
        <div className="modal-box">
          <h2 className="text-xl font-bold mb-4">Submit Assignment</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Google Docs Link
              </label>
              <input
                type="url"
                className="input input-bordered w-full"
                value={googleDocsLink}
                onChange={(e) => setGoogleDocsLink(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Quick Note
              </label>
              <textarea
                className="textarea textarea-bordered w-full"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-full">
              Submit
            </button>
          </form>
          <div className="modal-action">
            <form method="dialog" className="w-full">
              <button className="btn btn-secondary w-full ">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssignmentDetails;