import React from "react";
import { useSurveyStore } from "../../store/useSurveyStore";
import { useUserStore } from "../../store/useUserStore";
import { useTranslation } from "react-i18next";
import { useNormalSurveyStore } from "../../store/useNormalSurveyStore";
import { useParams } from "react-router-dom";

const classifyStressScore = (score) => {
  if (score >= 48 && score <= 96) return "Low Stress";
  if (score > 96 && score <= 144) return "Below Average Stress";
  if (score > 144 && score <= 192) return "Average Stress";
  if (score > 192 && score <= 240) return "High Stress";
  return "Out of Range";
};

const StressResult = () => {
  const user = useUserStore((state) => state);
  const { t } = useTranslation();
  const { name } = useParams();

  const { responses } = useNormalSurveyStore();
  const totalResult = responses.work_Stress.totalResult;
  const scores = responses.work_Stress.scores;
  const totalScore = scores.total?.score || 0;

  const classification = classifyStressScore(totalScore);

  return (
    <div className="p-6 bg-white shadow-xl rounded-2xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        {t("Results")}
      </h2>
      <p className="text-center text-lg text-gray-700 mb-10">
        {t("Report for")} <span className="font-semibold">{name}</span>
      </p>
      {/* Overall Stress Result */}
      {totalResult && (
        <div className="mb-6 p-4 rounded-xl border border-red-200 bg-red-50 text-red-800 shadow-sm mt-6">
          <h3 className="font-bold text-lg mb-2">{t("Overall Result")}</h3>
          <p className="text-sm">
            {t(classification)} ({totalScore})
          </p>
        </div>
      )}
    </div>
  );
};

export default StressResult;
