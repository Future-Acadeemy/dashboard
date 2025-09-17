import React, { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Survey from "./components/Survey";
import UserInfoForm from "./components/UserInfoForm";
import "./index.css";
import "./output.css";
import Layout from "./layout/Layout";
import Registeration from "./pages/Registeration";
import SurveyForm from "./pages/SurveyForm";
import Report from "./pages/Report";
import Home from "./components/Home";
import PersonalitySurvey from "./pages/PersonalitySurvey";
import Login from "./pages/Login";
import UserSurveys from "./components/details/UserSurveys";
import BigFiveResult from "./components/details/BigFiveResult";
import MbtiResult from "./components/details/MbtiResult";
import MaslachResult from "./components/details/MaslachResult";
import CompetencyResult from "./components/details/CompetencyResult";
import TeamworkResult from "./components/details/TeamworkResult";
import StressResult from "./components/details/StressResults";
import PResult from "./components/details/PResult";
import LeadershipResult from "./components/details/LeadershipResult";
import PatternResult from "./components/details/PatternResult";
import HollandResult from "./components/details/HollandResult";
import CdsResult from "./components/details/CdsResult";
const queryClient = new QueryClient(); // Create QueryClient instance
//personal-competency
//patterns
//holland
const App = () => {
  const [userInfo, setUserInfo] = useState(null);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/registeration" element={<Registeration />} />
          <Route path="/home" element={<Home />} />
          <Route path="/survey" element={<SurveyForm />} />
          <Route path="/report" element={<Report />} />
          <Route path="/personality" element={<PersonalitySurvey />} />
          <Route path="/userSurvey/:phone" element={<UserSurveys />} />
          <Route path="/bigFiveResult/:name" element={<BigFiveResult />} />
          <Route path="/MBTIResult/:name" element={<MbtiResult />} />
          <Route path="/maslachResults/:name" element={<MaslachResult />} />
          <Route path="/teamwork/:name" element={<TeamworkResult />} />{" "}
          <Route path="/stress/:name" element={<StressResult />} />
          <Route
            path="/competencyResult/:name"
            element={<CompetencyResult />}
          />
          <Route path="/personal-competency/:name" element={<PResult />} />\{" "}
          <Route path="/leadership/:name" element={<LeadershipResult />} />
          <Route path="/patterns/:name" element={<PatternResult />} />
          <Route path="/holland/:name" element={<HollandResult />} />
          <Route path="/cds/:name" element={<CdsResult />} />
        </Routes>
      </Router>
    </QueryClientProvider>
    // <DecisionMatrix />
    // <Home />
  );
};

export default App;
