import React from "react";
import { useSurveyStore } from "../../store/useSurveyStore";
import { useUserStore } from "../../store/useUserStore";
import { useTranslation } from "react-i18next";
import { useNormalSurveyStore } from "../../store/useNormalSurveyStore";
import Layout from "../../layout/Layout";
import { useParams } from "react-router-dom";

const interpretations = {
  A: "Decision making skills",
  B: "Communication Skills",
  C: "Motivation Skills",
  D: "Conflict Management Skills",
  E: "Meeting Management Skills",
};

const sectionColors = {
  A: "bg-blue-50 text-blue-800",
  B: "bg-green-50 text-green-800",
  C: "bg-yellow-50 text-yellow-800",
  D: "bg-purple-50 text-purple-800",
  E: "bg-pink-50 text-pink-800",
};

const classifyScore = (score) => {
  if (score >= 10 && score <= 20) return "ضعيف";
  if (score > 20 && score <= 30) return "اقل من المتوسط";
  if (score > 30 && score <= 40) return "اعلى من المتوسط";
  if (score > 40 && score <= 50) return "مرتفع";
  return "Out of Range";
};

const TeamworkResult = () => {
  const user = useUserStore((state) => state);
  const { t } = useTranslation();
  const { name } = useParams();

  const { responses } = useNormalSurveyStore();
  const scores = responses.teamwork.scores;

  return (
    <Layout>
      <div className="p-6 bg-white shadow-xl rounded-2xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          {t("Results")}
        </h2>
        <p className="text-center text-lg text-gray-700 mb-10">
          {t("Report for")} <span className="font-semibold">{name}</span>
        </p>
        <div className="grid gap-6 md:grid-cols-2 mt-6">
          {Object.entries(scores).map(([section, { score }]) => {
            const classification = classifyScore(score);
            return (
              <div
                key={section}
                className={`p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition ${sectionColors[section]}`}
              >
                <h3 className="font-bold text-lg mb-2">
                  {t("Section")} {t(section)}
                </h3>
                <p className="text-xs opacity-90 leading-relaxed">
                  {t(interpretations[section])}
                </p>
                <p className="text-sm mb-1">
                  <span className="font-semibold">{t("Score")}:</span> {score} (
                  {t(classification)})
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default TeamworkResult;
