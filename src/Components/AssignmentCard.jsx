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
        <div className="p-4">
          <h2 className="card-title ">{assignment.title}</h2>
          <p>
            <strong>Marks:</strong> {assignment.marks}
          </p>
          <p className="mb-3">
            <strong>Difficulty:</strong> {assignment.difficulty}
          </p>
          <div className="grid grid-cols-2 gap-2">
            <div className="grid grid-cols-2 gap-2 col-span-2">
              <button
                className="btn btn-sm btn-primary text-base"
                onClick={() => handleView(assignment)}
              >
                <FaEye className="mr-1 text-base" /> View
              </button>

              <button
                onClick={() => handleUpdate(assignment)}
                className="btn px-3 btn-sm btn-secondary text-base"
              >
                <FaEdit className="mr-1 text-sm" /> Update
              </button>
            </div>
            <div className="col-span-2">
              <button
                onClick={() => confirmDelete(assignment)}
                className="btn w-full btn-sm btn-error text-base"
              >
                <FaTrashAlt className="mr-1 text-sm" /> Delete
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
