import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { toast } from "react-toastify";
import AuthContext from "../Context/AuthContext";

const UpdateAssignment = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [marks, setMarks] = useState("");
  const [thumbnailURL, setThumbnailURL] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [dueDate, setDueDate] = useState(new Date());
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/assignments/${id}`)
      .then((res) => {
        const assignment = res.data;
        setTitle(assignment.title);
        setDescription(assignment.description);
        setMarks(assignment.marks);
        setThumbnailURL(assignment.thumbnailURL);
        setDifficulty(assignment.difficulty);
        setDueDate(new Date(assignment.dueDate));
      })
      .catch((error) => {
        console.error("Error fetching assignment:", error);
        setMessage("Failed to load assignment.");
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedAssignment = {
      title,
      description,
      marks,
      thumbnailURL,
      difficulty,
      dueDate,
      placedBy: user.email,
    };

    axios
      .put(`http://localhost:5000/assignments/${id}`, updatedAssignment, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success("Assignment updated successfully.");
          navigate("/assignments");
        } else {
          setMessage("Unable to update assignment.");
        }
      })
      .catch((error) => {
        console.error("Error updating assignment:", error);
        setMessage("Failed to update assignment.");
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl text-center font-bold border-b-2 rounded-b-lg shadow-md shadow-emerald-100 pb-6 mb-8">
        Update Assignment
      </h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            className="textarea textarea-bordered w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Marks</label>
          <input
            type="number"
            className="input input-bordered w-full"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Thumbnail Image URL
          </label>
          <input
            type="url"
            className="input input-bordered w-full"
            value={thumbnailURL}
            onChange={(e) => setThumbnailURL(e.target.value)}
            required
          />
        </div>
        <div className="mb-4 flex space-x-4">
          <div className="flex-grow">
            <label className="block text-sm font-medium mb-1">
              Difficulty Level
            </label>
            <select
              className="select select-bordered w-full"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Due Date</label>
            <DatePicker
              selected={dueDate}
              onChange={(date) => setDueDate(date)}
              className="input input-bordered w-full"
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Update Assignment
        </button>
      </form>
      {message && <p className="text-center mt-4">{message}</p>}
    </div>
  );
};

export default UpdateAssignment;
