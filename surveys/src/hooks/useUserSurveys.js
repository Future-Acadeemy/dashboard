import { useQueries } from "@tanstack/react-query";
import axios from "axios";
import { useSurveyStore } from "../store/useSurveyStore";
import { useNormalSurveyStore } from "../store/useNormalSurveyStore";

const fetchSurveyData = async (url) => {
  const { data } = await axios.get(url);
  return data;
};

export default function useUserSurveys(phoneNumber) {
  const endpoints = [
    // `http://localhost:8080/api/bigfive/${phoneNumber}`,
    `http://localhost:8080/api/machlan/${phoneNumber}`,
    `http://localhost:8080/api/mbti/${phoneNumber}`,
  ];

  const results = useQueries({
    queries: endpoints.map((url) => ({
      queryKey: ["surveyData", url],
      queryFn: () => fetchSurveyData(url),
    })),
  });

  const isLoading = results.some((result) => result.isLoading);
  const isError = results.some((result) => result.isError);
  const data = results.map((result) => result.data);
  console.log("data from hook ---> ", data);

  // storing maslaach data in its corresponding store
  //   setResponse("maslach", data[1]?.data?.answers);

  return { data, isLoading, isError };
}
