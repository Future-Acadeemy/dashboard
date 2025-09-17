import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useUserSurveys from "../../hooks/useUserSurveys";
import { useNormalSurveyStore } from "../../store/useNormalSurveyStore";
import { useUserStore } from "../../store/useUserStore";
import useClientsStore from "../../store/useClientsStore";
import Layout from "../../layout/Layout";

export default function UserSurveys() {
  const { phone } = useParams();
  const { isLoading, isError } = useUserSurveys(phone);
  const navigate = useNavigate();
  const { responses } = useNormalSurveyStore();
  const name = useUserStore().name;
  const { clients } = useClientsStore();

  if (isLoading)
    return <div className="text-lg text-gray-700">Loading surveys...</div>;
  if (isError)
    return <div className="text-lg text-red-600">Error fetching surveys</div>;

  const filteredResponses = Object.entries(responses).filter(
    ([_, surveyData]) => surveyData?.phone === phone
  );

  function findUserByPhone(clients, phoneNumber) {
    return clients.find((user) => user.phone === phoneNumber);
  }

  const client = findUserByPhone(clients, phone);
  console.log("clientttt --> ", client.name);

  console.log("filteredResponses --> ", filteredResponses);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        <h2 className="text-4xl font-bold text-blue-700 mb-8 text-center">
          {client.name}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-3xl">
          {filteredResponses.map(([type, surveyData], index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:bg-blue-100 transition"
            >
              <h3 className="text-2xl font-semibold text-gray-800">
                {surveyData?.name || "Survey"}
              </h3>
              <button
                onClick={() => {
                  console.log("surveyData?.name --> ", surveyData?.name);
                  if (surveyData?.name === "BigFive") {
                    console.log("hhh");
                    navigate(`/bigFiveResult/${client.name}`);
                  } else if (surveyData?.name === "MBTI") {
                    navigate(`/MBTIResult/${client.name}`);
                  } else if (surveyData?.name === "Maslach") {
                    navigate(`/maslachResults/${client.name}`);
                  } else if (surveyData?.name === "Competency") {
                    navigate(`/competencyResult/${client.name}`);
                  } else if (surveyData?.name === "work_Stress") {
                    navigate(`/stress/${client.name}`);
                  } else if (surveyData?.name === "personal_Competency") {
                    navigate(`/personal-competency/${client.name}`);
                  } else if (surveyData?.name === "leadership") {
                    navigate(`/leadership/${client.name}`);
                  } else if (surveyData?.name === "pattern_scale") {
                    navigate(`/patterns/${client.name}`);
                  } else if (surveyData?.name === "holland") {
                    navigate(`/holland/${client.name}`);
                  } else if (surveyData?.name === "cds") {
                    navigate(`/cds/${client.name}`);
                  } else {
                    navigate(`/teamwork/${client.name}`);
                  }
                }}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
