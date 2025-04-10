import { useEffect } from "react";
import { useQueries } from "@tanstack/react-query";
import axios from "axios";
import { useNormalSurveyStore } from "../store/useNormalSurveyStore";

const fetchSurveyData = async (url) => {
  const { data } = await axios.get(url);
  return data;
};

export default function useUserSurveys(phoneNumber) {
  const { setResponse } = useNormalSurveyStore();

  const types = ["bigFive", "maslach", "mbti"];
  const endpoints = [
    `https://survey-backend.up.railway.app/api/bigfive/${phoneNumber}`,
    `https://survey-backend.up.railway.app/api/machlan/${phoneNumber}`,
    `https://survey-backend.up.railway.app/api/mbti/${phoneNumber}`,
    `https://survey-backend.up.railway.app/api/competency/${phoneNumber}`,
  ];

  const results = useQueries({
    queries: endpoints.map((url) => ({
      queryKey: ["surveyData", url],
      queryFn: () => fetchSurveyData(url),
    })),
  });

  const isLoading = results.some((r) => r.isLoading);
  const isError = results.some((r) => r.isError);
  const allFetched = results.every((r) => r.isSuccess || r.isError);

  // Extract data array
  const data = results.map((r) => r.data);

  // Set responses only when all data has been fetched
  useEffect(() => {
    if (!allFetched) return;

    results.forEach((result, index) => {
      const resultData = result.data;

      if (
        resultData &&
        resultData.message !== "No data found" &&
        resultData.data &&
        Object.keys(resultData.data).length > 0
      ) {
        setResponse(resultData.data.name || types[index], resultData.data);
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allFetched]); // only run once when all data is loaded

  return { data, isLoading, isError };
}
