import { useState } from "react";
import SectionHeading from "./SectionHeading";

const FAQSection = () => {
  const faqs = [
    {
      question: "What is Study Buddies?",
      answer:
        "StudyBuddies is an online platform that allows friends to collaborate on assignments, complete them, and grade each other's work, enhancing the group study experience.",
    },
    {
      question: "How do I create an assignment?",
      answer:
        "Once logged in, navigate to the 'Create Assignments' section. Fill in the required details such as title, description, marks, difficulty level, and due date, then submit the form to create an assignment.",
    },
    {
      question: "Can I grade my friend's assignments?",
      answer:
        "Yes! After assignments are completed, you can grade your friend's work and provide valuable feedback to help them improve.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Absolutely. We use secure methods to store your data and ensure your personal information is protected. We also use environment variables to secure sensitive information like Firebase configuration keys and MongoDB credentials.",
    },
    {
      question: "How do I track my progress?",
      answer:
        "You can track your progress by visiting the 'My Attempted Assignments' section, where you will find all the assignments you have completed along with their grades.",
    },
    {
      question: "What are the different difficulty levels for assignments?",
      answer:
        "Assignments can be categorized into three difficulty levels: easy, medium, and hard. These levels help you gauge the complexity and plan your work accordingly.",
    },
    {
      question: "Can I delete an assignment?",
      answer:
        "Yes, you can delete an assignment you created. Just navigate to the assignment, click the delete button, and confirm the action. Note that you can't delete assignments created by others.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="pb-16">
      <div className="container mx-auto">
        <SectionHeading   title="Unlocking the Mysteries: Your Questions Answered"/>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="p-4 border rounded-lg shadow-md ">
              <button
                className="w-full text-left text-xl font-semibold mb-2 focus:outline-none"
                onClick={() => toggleAccordion(index)}
              >
                {faq.question}
              </button>
              <div
                className={`${
                  activeIndex === index ? "block" : "hidden"
                } mt-2 text-primary`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
