import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MBTI_interpretations } from "../../data/inputs";
import { useNormalSurveyStore } from "../../store/useNormalSurveyStore";

const traitDescriptions = {
  E: "Extroversion (E) is the personality trait of seeking fulfillment from sources outside the self or in community. High scorers tend to be very social, while low scorers prefer to work on their projects alone.",
  I: "Introversion (I) is the personality trait of focusing more on inner thoughts and ideas rather than external stimulation. High scorers enjoy solitude and deep thinking.",
  S: "Sensing (S) individuals focus on concrete facts and details. They rely on their five senses and prefer practicality over abstract ideas.",
  N: "Intuition (N) individuals focus on patterns, possibilities, and abstract thinking rather than concrete facts.",
  T: "Thinking (T) individuals make decisions based on logic and rational analysis rather than emotions.",
  F: "Feeling (F) individuals prioritize values, emotions, and personal concerns when making decisions.",
  J: "Judging (J) individuals prefer structure, organization, and planning in their lives.",
  P: "Perceiving (P) individuals are more flexible, spontaneous, and adaptable to change.",
};

const MbtiResult = () => {
  const { name } = useParams();

  const { responses } = useNormalSurveyStore();
  const navigate = useNavigate();
  const scores = responses.MBTI.scores;
  console.log("scores from mbti --> ", scores);

  const personalityType = Object.keys(scores).join("");
  const personalityData = MBTI_interpretations[personalityType] || {
    title: "Unknown Type",
    description: "No matching MBTI interpretation found.",
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-blue-300 p-6 bg-gray-100">
      <div className="bg-white shadow-xl rounded-4xl p-8 max-w-3xl w-full">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Your Personality Type
        </h2>
        <p className="text-center text-lg text-gray-700 mb-10">
          Report for <span className="font-semibold">{name}</span>
        </p>
        <div className="mt-4 text-center text-4xl font-bold text-blue-600">
          {personalityType}
        </div>

        <h3 className="mt-6 text-xl font-semibold text-gray-800 text-center">
          {personalityData.title}
        </h3>
        <p className="text-gray-600 italic text-center px-6">
          {personalityData.description}
        </p>

        <h3 className="mt-8 text-xl font-semibold text-gray-800">All Traits</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {Object.entries(scores).map(([trait, score]) => (
            <div
              key={trait}
              className="p-4 border-0 rounded-lg bg-gray-50 shadow-md "
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {trait}: <span className="text-blue-500">{score}</span>
              </h3>
              <p className="text-gray-600 italic">{traitDescriptions[trait]}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6"></div>
      </div>
    </div>
  );
};

export default MbtiResult;
