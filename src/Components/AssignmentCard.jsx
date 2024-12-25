import PropTypes from "prop-types";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";

const AssignmentCard = (props) => {
  const { assignment, handleView, handleUpdate, confirmDelete } = props;

  return (
    <div>
      <div key={assignment._id} className="card bg-base-100 shadow-md">
        <figure className="h-52 w-full">
          <img className="h-full w-full object-cover" src={assignment.thumbnailURL} alt={assignment.title} />
        </figure>
        <div className="py-5 px-4">
          <h2 className="card-title">{assignment.title}</h2>
          <p>
            <strong>Marks:</strong> {assignment.marks}
          </p>
          <p className="mb-3">
            <strong>Difficulty:</strong> {assignment.difficulty}
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="grid grid-cols-2 gap-3 col-span-2">
              <button
                className="btn  btn-primary text-lg"
                onClick={() => handleView(assignment)}
              >
                <FaEye className="mr-1 text-xl" /> View
              </button>

              <button
                onClick={() => handleUpdate(assignment)}
                className="btn px-3  btn-secondary text-lg"
              >
                <FaEdit className="mr-1 text-base" /> Update
              </button>
            </div>
            <div className="col-span-2">
              <button
                onClick={() => confirmDelete(assignment)}
                className="btn w-full btn-error text-lg"
              >
                <FaTrashAlt className="mr-1 text-xl" /> Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

AssignmentCard.propTypes = {
  assignment: PropTypes.object.isRequired,
  handleView: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  confirmDelete: PropTypes.func.isRequired,
};

export default AssignmentCard;
