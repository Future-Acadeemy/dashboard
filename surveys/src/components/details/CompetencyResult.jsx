import React from "react";

// import { useTranslation } from "react-i18next";
import { useNormalSurveyStore } from "../../store/useNormalSurveyStore";

const CompetencyResult = () => {
  //   const { t, i18n } = useTranslation();
  const { responses } = useNormalSurveyStore();

  const scores = responses.Competency?.scores;

  const overallScore = scores?.overall;

  return (
    <div className="p-8 bg-white shadow-lg rounded-lg max-w-4xl mx-auto mt-10">
      <h2 className="font-bold text-2xl text-gray-800 text-center mb-6">
        Competency Gap
      </h2>

      {/* Competency Gap Circle */}
      {overallScore !== undefined && (
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="p-5 bg-blue-500 text-white rounded flex items-center justify-center text-2xl font-bold shadow-lg">
            {overallScore}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompetencyResult;
