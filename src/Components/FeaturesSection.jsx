import {
  FaUsers,
  FaClipboardCheck,
  FaChalkboardTeacher,
  FaTasks,
} from "react-icons/fa";
import SectionHeading from "./SectionHeading";

const FeaturesSection = () => {
  const features = [
    {
      icon: <FaUsers className="text-4xl mb-4" />,
      title: "Collaborate with Friends",
      description:
        "Connect with friends and work together on group assignments seamlessly.",
    },
    {
      icon: <FaClipboardCheck className="text-4xl mb-4" />,
      title: "Create and Assign",
      description:
        "Easily create assignments, set due dates, and assign them to your study group.",
    },
    {
      icon: <FaChalkboardTeacher className="text-4xl mb-4" />,
      title: "Grade Assignments",
      description:
        "Grade your friends' assignments and receive feedback to improve your skills.",
    },
    {
      icon: <FaTasks className="text-4xl mb-4" />,
      title: "Track Progress",
      description:
        "Keep track of completed assignments and stay on top of your study schedule.",
    },
  ];

  return (
    <div className="py-16 ">
      <div className="container mx-auto text-center">
        <SectionHeading title="Supercharge Your Studies with Our Unique Features" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-base-content p-6 text-base-300 rounded-lg shadow-md flex flex-col items-center"
            >
              
              {feature.icon}
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-base-200 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
