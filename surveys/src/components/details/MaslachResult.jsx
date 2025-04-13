import React from "react";
import { interpretScore } from "../../services/Services";
import { useNormalSurveyStore } from "../../store/useNormalSurveyStore";
import { useParams } from "react-router-dom";
import Layout from "../../layout/Layout";
import { useTranslation } from "react-i18next";

const MaslachResult = () => {
  //   const { answers, scores } = useSurveyStore();
  const { name } = useParams();
  const { t, i18n } = useTranslation();

  const { responses } = useNormalSurveyStore();
  console.log("responses --> ", responses);
  const scores = responses.Maslach?.scores;

  return (
    <Layout>
      <div className="p-8 bg-white shadow-lg rounded-lg max-w-4xl mx-auto mt-10">
        <h2 className="font-bold text-2xl text-gray-800 text-center mb-6">
          {t("Results")}
        </h2>
        <p className="text-center text-lg text-gray-700 mb-10">
          {t("Report for")} <span className="font-semibold">{name}</span>
        </p>

        <div className="mt-6 rounded-lg p-4 bg-gray-50">
          <ul className="mt-2 space-y-2">
            {Object.entries(scores).map(([section, score]) => (
              <li key={section} className="text-gray-700">
                <span className="font-semibold">
                  {t("Section")} {t(section)}:
                </span>{" "}
                {score}
                <span className="text-sm text-gray-500">
                  {" "}
                  {t(interpretScore(section, score))}{" "}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default MaslachResult;
