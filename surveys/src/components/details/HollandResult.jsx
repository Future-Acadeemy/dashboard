import React from "react";
import { useTranslation } from "react-i18next";
import { useNormalSurveyStore } from "../../store/useNormalSurveyStore";
import { useParams } from "react-router-dom";

const skillColors = {
  "النمط واقعي": "bg-blue-50 text-blue-800",
  "النمط الاستكشافي": "bg-green-50 text-green-800",
  "النمط الفني": "bg-yellow-50 text-yellow-800",
  "النمط الاجتماعي": "bg-purple-50 text-purple-800",
  "نمط الريادي و القيادي": "bg-red-50 text-red-800",
  "النمط التقليدي": "bg-gray-50 text-gray-800",
};

const classifyHollandScore = (score) => {
  if (score >= 30 && score <= 60) return "منخفض";
  if (score > 60 && score <= 90) return "عالي";
  return "خارج النطاق";
};

const HollandResult = () => {
  const { responses } = useNormalSurveyStore();
  const scores = responses.holland.scores;
  const { t } = useTranslation();
  const { name } = useParams();

  return (
    <div className="p-6 bg-white shadow-xl rounded-2xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        {t("نتائج الاستبيان")}
      </h2>
      <p className="text-center text-lg text-gray-700 mb-10">
        {t("Report for")} <span className="font-semibold">{name}</span>
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(scores).map(([skill, { score }]) => {
          const classification = classifyHollandScore(score);

          return (
            <div
              key={skill}
              className={`p-5 rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition flex flex-col justify-between ${skillColors[skill]}`}
            >
              <h3 className="font-bold text-lg mb-3">{t(skill)}</h3>
              <span
                className={`inline-block px-3 py-1 text-sm font-semibold rounded-full mb-4 ${
                  classification === "عالي"
                    ? "bg-green-200 text-green-800"
                    : classification === "منخفض"
                    ? "bg-red-200 text-red-800"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {t(classification)}
              </span>
              <p className="text-gray-700 text-sm">
                <span className="font-semibold">{t("الدرجة")}:</span> {score}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HollandResult;
