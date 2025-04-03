import React from "react";
import { useNavigate } from "react-router-dom";
import { useNormalSurveyStore } from "../../store/useNormalSurveyStore";

// Personality trait descriptions
const traitDescriptions = {
  E: "Extroversion (E) is the personality trait of seeking fulfillment from sources outside the self or in community. High scorers tend to be very social, while low scorers prefer to work on their projects alone.",
  A: "Agreeableness (A) reflects how much individuals adjust their behavior to suit others. High scorers are typically polite and like people. Low scorers tend to 'tell it like it is'.",
  C: "Conscientiousness (C) is the personality trait of being honest and hardworking. High scorers tend to follow rules and prefer clean homes. Low scorers may be messy and cheat others.",
  N: "Neuroticism (N) is the personality trait of being emotional.",
  O: "Openness to Experience (O) is the personality trait of seeking new experiences and intellectual pursuits. High scorers may daydream a lot. Low scorers may be very down-to-earth.",
};

const BigFiveResult = () => {
  const { responses } = useNormalSurveyStore();
  const navigate = useNavigate();

  const scores = responses.bigFive.scores;
  console.log("scoress from bg===> ", scores);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-2xl mx-auto">
      <h2 className="font-bold text-2xl mb-6 text-center">
        Your Big Five Personality Results
      </h2>
      {Object.entries(scores).map(([section, score]) => (
        <div
          key={section}
          className="mb-6 p-5 bg-gray-100 border rounded-lg shadow-md"
        >
          <p className="text-xl font-bold text-blue-600">
            Score: <span>{score}</span>
          </p>
          <p className="text-gray-700 italic">{traitDescriptions[section]}</p>
        </div>
      ))}
      <div className="flex justify-center">
        <button
          className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
          onClick={() => navigate("/home")}
        >
          Back to Home Page
        </button>
      </div>
    </div>
  );
};

export default BigFiveResult;
