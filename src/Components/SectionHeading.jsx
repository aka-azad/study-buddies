import PropTypes from "prop-types";
const SectionHeading = ({ title }) => {
  return (
    <div>
      <h2 className="text-4xl text-center font-bold border-b-2 rounded-b-lg shadow-md shadow-emerald-100 pb-6 mb-8">
        {title}
      </h2>
    </div>
  );
};

SectionHeading.propTypes = {
  title: PropTypes.string.isRequired,
};
export default SectionHeading;
