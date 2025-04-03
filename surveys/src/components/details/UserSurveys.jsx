import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useUserSurveys from "../../hooks/useUserSurveys";
import { useNavigate } from "react-router-dom";
import { useNormalSurveyStore } from "../../store/useNormalSurveyStore";

export default function UserSurveys() {
  const { phone } = useParams(); // Extract phone from URL params
  const { data, isLoading, isError } = useUserSurveys(phone);
  const navigate = useNavigate();
  const { updateScores, setResponse, updateBigFiveScores } =
    useNormalSurveyStore();

  //   setResponse();
  useEffect(() => {
    setResponse("bigFive", data[0]?.data);
    setResponse("maslach", data[1]?.data);
    setResponse("mbti", data[2]?.data);
    //eslint-disable-next-line
  }, []);

  if (isLoading)
    return <div className="text-lg text-gray-700">Loading surveys...</div>;
  if (isError)
    return <div className="text-lg text-red-600">Error fetching surveys</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-4xl font-bold text-blue-700 mb-8 text-center">
        Client Surveys
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-3xl">
        {data.map((survey, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:bg-blue-100 transition"
          >
            <h3 className="text-2xl font-semibold text-gray-800">
              {survey?.data?.name || "Survey"}
            </h3>
            <button
              onClick={() => {
                if (survey?.data?.name === "BigFive") {
                  navigate("/bigFiveResult");
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
  );
}
