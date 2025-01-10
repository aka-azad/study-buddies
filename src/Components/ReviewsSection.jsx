import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SectionHeading from "./SectionHeading";
import backgroundImage from "../assets/bg-parallax.jpg";

const reviews = [
  {
    img: "https://pics.craiyon.com/2023-09-17/53cec2c19b574b4c9bd72975f01ff785.webp",
    name: "John Doe",
    review:
      "This platform has completely transformed the way I manage my assignments!",
  },
  {
    img: "https://pics.craiyon.com/2023-09-17/53cec2c19b574b4c9bd72975f01ff785.webp",

    name: "Jane Smith",
    review:
      "Collaborating with friends has never been easier. Highly recommend!",
  },
  {
    img: "https://pics.craiyon.com/2023-09-17/53cec2c19b574b4c9bd72975f01ff785.webp",

    name: "Alice Johnson",
    review: "The grading feature is a game changer for our study group.",
  },
  {
    img: "https://pics.craiyon.com/2023-09-17/53cec2c19b574b4c9bd72975f01ff785.webp",

    name: "Robert Brown",
    review: "Tracking progress keeps me on top of my studies. Love it!",
  },
];

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};

const ReviewsSection = () => {
  return (
    <div className="container mb-16">
      <SectionHeading title="What Our Users Say" />
      <div
        className="parallax-section  p-16 rounded-lg"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className=" rounded-lg bg-black bg-opacity-10 mx-auto backdrop-blur-xl text-center text-base-content">
          <Slider {...settings}>
            {reviews.map((review, index) => (
              <div key={index} className="p-6">
                <div className="bg-base-300 bg-opacity-25 flex flex-col items-center p-6 rounded-lg shadow-md">
                  <figure className="w-32 h-32 overflow-hidden rounded-full">
                    <img
                      className="object-cover object-center overflow-hidden"
                      src={review?.img}
                      alt=""
                    />
                  </figure>
                  <p className="text-lg italic mb-4">
                    &quot;{review.review}&quot;
                  </p>
                  <h3 className="text-xl font-semibold">{review.name}</h3>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;
