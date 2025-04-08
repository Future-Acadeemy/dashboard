import React from "react";
import { interpretScore } from "../../services/Services";
import { useNormalSurveyStore } from "../../store/useNormalSurveyStore";

const MaslachResult = () => {
  //   const { answers, scores } = useSurveyStore();
  const { responses } = useNormalSurveyStore();
  console.log("responses --> ", responses);
  const scores = responses.maslach?.scores;

  return (
    <div className="p-8 bg-white shadow-lg rounded-lg max-w-4xl mx-auto mt-10">
      <h2 className="font-bold text-2xl text-gray-800 text-center mb-6">
        Results
      </h2>

      <div className="mt-6 rounded-lg p-4 bg-gray-50">
        <ul className="mt-2 space-y-2">
          {Object.entries(scores).map(([section, score]) => (
            <li key={section} className="text-gray-700">
              <span className="font-semibold">Section {section}:</span> {score}
              <span className="text-sm text-gray-500">
                {" "}
                ({interpretScore(section, score)})
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MaslachResult;
