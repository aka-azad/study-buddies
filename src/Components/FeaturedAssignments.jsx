import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import LottieLoader from "../Components/LottieLoader";
import AssignmentCard from "../Components/AssignmentCard";
import SectionHeading from "./SectionHeading";
import NoData from "./NoData";
import { Link } from "react-router";
import { FaArrowRight } from "react-icons/fa";
import AuthContext from "../Context/AuthContext";

const FeaturedAssignments = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [featuredAssignments, setFeaturedAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedAssignments = () => {
      axios
        .get("https://study-buddies-server.vercel.app/assignments")
        .then((response) => {
          setLoading(false);
          const assignments = response.data;
          const randomAssignments = assignments
            .sort(() => 0.5 - Math.random())
            .slice(0, 8);
          setFeaturedAssignments(randomAssignments);
        })
        .catch((error) => {
          console.error("Error fetching featured assignments:", error);
        });
    };

    fetchFeaturedAssignments();
  }, []);

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
    } else {
      navigate("/signin", {
        state: `/assignments/${assignment._id}`,
      });
    }
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
            setFeaturedAssignments(
              featuredAssignments.filter((a) => a._id !== assignment._id)
            );
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
      <SectionHeading title="Some Of Ongoing Assignments" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading && <LottieLoader />}
        {featuredAssignments.length < 1 && !loading ? (
          <NoData />
        ) : (
          featuredAssignments.map((assignment) => (
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
      <div className="mt-8 mx-auto w-fit">
        <Link
          to={"/assignments"}
          className="btn btn-primary text-base bg-opacity-80"
        >
          See more <FaArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default FeaturedAssignments;
