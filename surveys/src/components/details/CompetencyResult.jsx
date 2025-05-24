import React from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { useNormalSurveyStore } from "../../store/useNormalSurveyStore";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Layout from "../../layout/Layout";

const CompetencyResult = () => {
  const { name } = useParams();
  const totals = useNormalSurveyStore().responses.Competency?.totals;
  const { t, i18n } = useTranslation();

  // const client = findUserByPhone(clients,)

  if (!totals) {
    return (
      <div className="p-6 text-center text-gray-600">
        No competency data available.
      </div>
    );
  }

  return (
    <>
      <Layout>
        <div className="p-6 sm:p-10 bg-gray-100 rounded-xl shadow max-w-6xl mx-auto mt-10 overflow-x-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-blue-700 mb-12">
            {t("Competency Gap Analysis")}
          </h2>

          <p className="text-center text-lg text-gray-700 mb-10">
            {t("Report for")} <span className="font-semibold">{name}</span>
          </p>

          {Object.entries(totals).map(([category, subCompetencies]) => (
            <div key={category} className="mb-12">
              <h3 className="text-2xl font-bold text-gray-800 border-l-4 border-blue-600 pl-4 mb-4 mt-4 text-center">
                {t(category)}
              </h3>

              <div className="w-full max-w-4xl mx-auto">
                <table className="w-full bg-white rounded-xl overflow-hidden shadow">
                  <thead className="bg-blue-100 text-gray-700 text-left">
                    <tr>
                      <th className="px-6 py-3 font-semibold">
                        {t("Sub-Competency")}
                      </th>
                      <th className="px-6 py-3 font-semibold">{t("Need")}</th>
                      <th className="px-6 py-3 font-semibold">
                        {t("Possess")}
                      </th>
                      <th className="px-6 py-3 font-semibold text-center">
                        {t("Gap")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(subCompetencies).map(
                      ([sub, values], idx) => {
                        const gap = values.possess - values.need;
                        const isPositive = gap >= 0;
                        const rowBg = idx % 2 === 0 ? "bg-white" : "bg-gray-50";

                        return (
                          <tr key={sub} className={`${rowBg}`}>
                            <td className="px-6 py-4 font-medium text-gray-900">
                              {t(sub)}
                            </td>
                            <td className="px-6 py-4">{values.need}</td>
                            <td className="px-6 py-4">{values.possess}</td>
                            <td className="px-6 py-4 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <span
                                  className={`text-lg font-semibold ${
                                    isPositive
                                      ? "text-blue-600"
                                      : "text-red-500"
                                  }`}
                                >
                                  {gap > 0 ? `+${gap}` : gap}
                                </span>
                                {isPositive ? (
                                  <FaArrowUp className="text-blue-600" />
                                ) : (
                                  <FaArrowDown className="text-red-500" />
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </Layout>
    </>
  );
};

export default CompetencyResult;
