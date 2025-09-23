import React from "react";
import { useUserStore } from "../../store/useUserStore";
import { useTranslation } from "react-i18next";
import { useNormalSurveyStore } from "../../store/useNormalSurveyStore";
import Layout from "../../layout/Layout";
import { useParams } from "react-router-dom";

// 🟦 Question to Skill mapping (based on your table)
const questionToSkill = {
  // Leadership Ability
  1: "Leadership Ability",
  10: "Leadership Ability",
  17: "Leadership Ability",
  26: "Leadership Ability",
  27: "Leadership Ability",
  30: "Leadership Ability",
  49: "Leadership Ability",
  51: "Leadership Ability",
  54: "Leadership Ability",
  57: "Leadership Ability",
  60: "Leadership Ability",
  62: "Leadership Ability",
  59: "Leadership Ability",
  67: "Leadership Ability",
  68: "Leadership Ability",

  // Achievement Orientation
  6: "Achievement Orientation",
  14: "Achievement Orientation",
  15: "Achievement Orientation",
  16: "Achievement Orientation",
  19: "Achievement Orientation",
  22: "Achievement Orientation",
  31: "Achievement Orientation",
  36: "Achievement Orientation",
  45: "Achievement Orientation",
  50: "Achievement Orientation",
  66: "Achievement Orientation",

  // Responsibility
  7: "Responsibility",
  11: "Responsibility",
  12: "Responsibility",
  34: "Responsibility",
  39: "Responsibility",
  48: "Responsibility",
  52: "Responsibility",
  40: "Responsibility",
  53: "Responsibility",
  55: "Responsibility",
  56: "Responsibility",
  58: "Responsibility",

  // Team Spirit
  4: "Team Spirit",
  13: "Team Spirit",
  23: "Team Spirit",
  29: "Team Spirit",
  33: "Team Spirit",
  37: "Team Spirit",
  41: "Team Spirit",
  70: "Team Spirit",
  42: "Team Spirit",
  61: "Team Spirit",
  64: "Team Spirit",
  65: "Team Spirit",
  69: "Team Spirit",

  // Social Status
  2: "Social Status",
  18: "Social Status",
  21: "Social Status",
  24: "Social Status",
  35: "Social Status",
  38: "Social Status",
  32: "Social Status",
  44: "Social Status",
  43: "Social Status",
  47: "Social Status",
};

// 🟩 Classification logic
const calculateScores = (answers) => {
  const skillScores = {};

  for (const [q, { freq, imp }] of Object.entries(answers)) {
    const skill = questionToSkill[q];
    if (!skill) continue;

    const score = freq * imp;

    if (!skillScores[skill]) {
      skillScores[skill] = { total: 0, count: 0 };
    }

    skillScores[skill].total += score;
    skillScores[skill].count += 1;
  }

  const classified = {};
  for (const [skill, { total, count }] of Object.entries(skillScores)) {
    const maxPossible = count * 9; // max per question = 3*3=9
    const percentage = (total / maxPossible) * 100;

    let level = "Low"; // أقل من 25%
    if (percentage >= 25 && percentage < 50)
      level = "Below Average"; // من 25% إلى أقل من 50%
    else if (percentage >= 50 && percentage < 75)
      level = "Above Average"; // من 50% إلى أقل من 75%
    else if (percentage >= 75) level = "High"; // 75% فما فوق

    classified[skill] = {
      score: total,
      max: maxPossible,
      percentage: percentage.toFixed(1),
      level,
    };
  }

  return classified;
};

// 🎨 Optional color mapping for categories
const skillColors = {
  "Leadership Ability": "bg-blue-50 text-blue-800",
  "Achievement Orientation": "bg-green-50 text-green-800",
  Responsibility: "bg-yellow-50 text-yellow-800",
  "Team Spirit": "bg-purple-50 text-purple-800",
  "Social Status": "bg-pink-50 text-pink-800",
};

const LeadershipResult = () => {
  const { responses } = useNormalSurveyStore();
  const answers = responses.leadership.answers; // <-- using answers instead of scores
  const calculatedScores = calculateScores(answers);

  const user = useUserStore((state) => state);
  const { t } = useTranslation();
  const { name } = useParams();

  return (
    <Layout>
      <div className="p-6 bg-white shadow-xl rounded-2xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          {t("Results")}
        </h2>
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          <span className="font-semibold">مقياس الخصال القيادية</span>
        </h2>
        <p className="text-center text-lg text-gray-700 mb-10">
          {t("Report for")} <span className="font-semibold">{name}</span>
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {Object.entries(calculatedScores).map(
            ([skill, { score, max, percentage, level }]) => (
              <div
                key={skill}
                className={`p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition ${skillColors[skill]}`}
              >
                <h3 className="font-bold text-lg mb-2">{t(skill)}</h3>

                <p className="text-xs opacity-90 leading-relaxed mb-2">
                  {level === "High"
                    ? t(`${skill} (Strong)`)
                    : t(`${skill} (Needs Improvement)`)}
                </p>

                <p className="text-sm">
                  <span className="font-semibold">{t("Score")}:</span> {score} /{" "}
                  {max} ({percentage}%) – {level}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </Layout>
  );
};

export default LeadershipResult;
