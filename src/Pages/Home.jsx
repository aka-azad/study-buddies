import Banner from "../Components/Banner";
import FAQSection from "../Components/FAQSection";
import FeaturedAssignments from "../Components/FeaturedAssignments";
import FeaturesSection from "../Components/FeaturesSection";
import ReviewsSection from "../Components/ReviewsSection";

const Home = () => {
  return (
    <div>
      <Banner />
      <FeaturedAssignments />
      <FeaturesSection />
      <ReviewsSection />
      <FAQSection />
    </div>
  );
};

export default Home;
