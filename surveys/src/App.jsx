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
const queryClient = new QueryClient(); // Create QueryClient instance

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
          <Route path="/bigFiveResult" element={<BigFiveResult />} />
          <Route path="/MBTIResult" element={<MbtiResult />} />
          <Route path="/maslachResults" element={<MaslachResult />} />
        </Routes>
      </Router>
    </QueryClientProvider>
    // <DecisionMatrix />
    // <Home />
  );
};

export default App;
