import React from "react";
import useUserSurveys from "../../hooks/useUserSurveys";

export default function UserSurveys() {
  const phoneNumber = "01090283565"; // Get dynamically if needed
  const { data, isLoading, isError } = useUserSurveys(phoneNumber);

  if (isLoading) return <div>Loading surveys...</div>;
  if (isError) return <div>Error fetching surveys</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">User Surveys</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((survey, index) => (
          <div key={index} className="border p-4 rounded-lg shadow-md bg-white">
            <h3 className="text-lg font-semibold">
              {survey?.data?.name || "Survey"}
            </h3>
            <pre className="text-sm bg-gray-100 p-2 rounded">
              {JSON.stringify(survey?.data, null, 2)}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}
