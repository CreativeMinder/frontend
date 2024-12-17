import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router-dom";
import "./list.css"; // Make sure to import your CSS file
import RandomTip from "../components/DashboardHome/RandomTIps";
import TeachingMethods from "../components/Teaching Methods/TeachingMethods";
import ContactHod from "../components/Teaching Methods/ContactHod";
const TeachersRecommendations = () => {
  const location = useLocation();
  const gotScore = location.state?.score; // Access the passed score here

  // Array of teaching tips for each range of scores
  const teachingTips = [
    {
      range: "0-25",
      tips: [
        "Focus on basic concepts and clear explanations.",
        "Use visual aids like charts, diagrams, and presentations.",
        "Encourage student engagement through questions and discussions.",
        "Provide frequent pauses for students to ask questions.",
        "Simplify complex ideas using analogies and examples.",
        "Create a supportive and non-intimidating environment.",
        "Offer extra help sessions outside of class time.",
        "Incorporate more one-on-one interactions with students.",
        "Encourage students to summarize what they’ve learned.",
        "Use repetition and recap important points frequently.",
      ],
    },
    {
      range: "26-50",
      tips: [
        "Incorporate group activities to promote collaboration.",
        "Use real-life examples to make learning relatable.",
        "Provide formative assessments to gauge understanding.",
        "Encourage active participation by calling on students.",
        "Break lessons into smaller, digestible sections.",
        "Assign team projects to encourage cooperative learning.",
        "Incorporate multimedia (videos, animations) for engagement.",
        "Provide written summaries or handouts for key lessons.",
        "Encourage peer-to-peer discussions and problem-solving.",
        "Use class polls or quizzes to assess comprehension.",
        "Offer praise and constructive feedback regularly.",
      ],
    },
    {
      range: "51-75",
      tips: [
        "Introduce hands-on projects and case studies.",
        "Encourage students to lead discussions on key topics.",
        "Incorporate technology, like interactive quizzes or simulations.",
        "Provide more autonomy in choosing project topics.",
        "Focus on application-based learning and problem-solving.",
        "Create opportunities for reflective learning (journals, blogs).",
        "Encourage critical thinking through debates or challenges.",
        "Assign peer review tasks to deepen understanding.",
        "Organize workshops or guest speaker sessions for real-world insights.",
        "Incorporate feedback loops to help students self-assess progress.",
      ],
    },
    {
      range: "76-90",
      tips: [
        "Personalize learning plans based on individual progress.",
        "Encourage peer-to-peer teaching and collaborative projects.",
        "Use flipped classroom techniques to engage students.",
        "Incorporate real-world applications and fieldwork.",
        "Organize student presentations on their learning progress.",
        "Use differentiated instruction to cater to various learning styles.",
        "Challenge students with open-ended questions and research tasks.",
        "Encourage innovation and creativity in project work.",
        "Provide opportunities for leadership roles in group activities.",
        "Use project-based assessments to measure deeper understanding.",
        "Encourage students to set personal learning goals.",
      ],
    },
    {
      range: "91-100",
      tips: [
        "Focus on developing critical thinking and problem-solving skills.",
        "Offer opportunities for independent research and exploration.",
        "Provide continuous feedback and encourage self-assessment.",
        "Foster a culture of inquiry and curiosity in the classroom.",
        "Encourage students to mentor peers in lower-scoring groups.",
        "Use advanced technology tools for simulations and modeling.",
        "Offer enrichment activities for students excelling in subjects.",
        "Promote interdisciplinary projects that integrate multiple subjects.",
        "Encourage entrepreneurial thinking with innovative assignments.",
        "Organize student-led workshops, webinars, or seminars.",
        "Use real-time data and analytics to track and optimize learning outcomes.",
      ],
    },
  ];

  // Function to get teaching tips based on score
  const getTeachingTips = (score) => {
    switch (true) {
      case score <= 25:
        return teachingTips[0].tips; // Tips for score range 0-25
      case score <= 50:
        return teachingTips[1].tips; // Tips for score range 26-50
      case score <= 75:
        return teachingTips[2].tips; // Tips for score range 51-75
      case score <= 90:
        return teachingTips[3].tips; // Tips for score range 76-90
      case score <= 100:
        return teachingTips[4].tips; // Tips for score range 91-100
      default:
        return ["No valid score."]; // If score is out of range
    }
  };

  // Get the teaching tips based on the gotScore
  const tips = gotScore !== undefined ? getTeachingTips(gotScore) : [];

  const recommendations = {
    yes: [
      "Continue building on students' foundational knowledge by introducing more complex concepts that challenge their understanding.",
      "Provide opportunities for students to apply prerequisite knowledge in real-world scenarios to reinforce learning.",
      "Consider integrating advanced readings or supplemental resources for students to deepen their understanding.",
      "Encourage peer-led sessions or group work, allowing students to help each other and reinforce prerequisite knowledge.",
      "Offer optional enrichment activities or assignments that extend the learning for those who demonstrate mastery of prerequisite knowledge.",
    ],
    no: [
      "Provide pre-course materials or introductory sessions to help students gain the necessary prerequisite knowledge.",
      "Create a list of resources, such as videos or articles, that cover foundational concepts students can review independently.",
      "Consider running a refresher module at the beginning of the course to address any knowledge gaps.",
      "Encourage students to form study groups to collectively cover prerequisite topics and support each other’s learning.",
      "Set up office hours or Q&A sessions for students to ask questions about foundational topics they may have missed.",
    ],
    notApplicable: [
      "Ensure course content is accessible for all students by including an introductory module covering fundamental concepts.",
      "Offer a self-paced learning module at the start of the course for students who may need additional background information.",
      "Consider providing a variety of learning materials that cater to different levels, allowing students to start at their own pace.",
      "Encourage flexibility in assignments, so students can demonstrate understanding at their own level without needing specific prerequisites.",
      "Design assessments that measure growth and understanding rather than prior knowledge, making the course inclusive for all students.",
    ],
  };
  //  const location = useLocation();
  const Useremail = location.state?.email; // Access the email passed via location

  const [teachingMethods, setTeachingMethods] = useState([]);
  const [teachingMethods1, setTeachingMethods1] = useState([]);

  const [answerObject, setAnswerObject] = useState([]); // Array to store answers

  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const getrecommendations = {
    positive: ["Thanks for being satisfied with the CLO."],

    negative: [
      "It seems there are concerns about the CLO. Please contact the HoD for clarification.",
    ],

    other: ["Your answer does not provide sufficient feedback for the CLO."],
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://portal-sigma-two.vercel.app/api/admin/fetchteacherssurvay"
        );

        const answerData = [];

        // Iterate over the surveys
        response.data.surveys.forEach((survey) => {
          // Check if survey name includes 'teacher'
          if (
            survey.surveyName &&
            survey.surveyName.toLowerCase().includes("teacher")
          ) {
            survey.submittedUsers.forEach((user) => {
              const answerObject = {
                Email: user.answers[2]?.answerText, // Assuming index 2 holds relevant email-answer
                Answer: user.answers[11]?.answerText, // Assuming index 11 holds the relevant answer (Yes, No, Not applicable)
              };
              answerData.push(answerObject);
            });
          }
        });

        setAnswerObject(answerData); // Set the answerObject data

        // Find the user data based on the email
        const userAnswer = answerData.find((item) => item.Email === Useremail);
        console.log(userAnswer);
        if (userAnswer) {
          const userAnswerText = userAnswer.Answer.toLowerCase();

          // Set the teaching recommendations based on the answer text
          if (userAnswerText === "yes") {
            setTeachingMethods(recommendations.yes);
          } else if (userAnswerText === "no") {
            setTeachingMethods(recommendations.no);
          } else if (userAnswerText === "not applicable") {
            setTeachingMethods(recommendations.notApplicable);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const fetchData1 = async () => {
      try {
        const response = await axios.post(
          "https://portal-sigma-two.vercel.app/api/admin/fetchteacherssurvay"
        );
        const answerData1 = [];

        response.data.surveys.forEach((survey) => {
          if (
            survey.surveyName &&
            survey.surveyName.toLowerCase().includes("teacher")
          ) {
            survey.submittedUsers.forEach((user) => {
              const answerObject1 = {
                Email: user.answers[2]?.answerText || "N/A",
                Answer: user.answers[13]?.answerText || "N/A",
              };
              answerData1.push(answerObject1);
            });
          }
        });

        const userAnswer1 = answerData1.find(
          (item) => item.Email === Useremail
        );

        if (userAnswer1) {
          const userAnswerText1 = userAnswer1.Answer.toLowerCase();

          // Define positive and negative keywords
          // Expanded list of keywords
          const positiveKeywords = [
            "clear",
            "satisfied",
            "good",
            "no",
            "nope",
            "defined",
            "effective",
            "helpful",
            "precise",
            "accurate",
            "organized",
            "appropriate",
            "relevant",
            "informative",
            "useful",
            "structured",
            "understandable",
            "coherent",
            "adequate",
            "reasonable",
            "detailed",
            "comprehensive",
            "supportive",
            "satisfactory",
            "encouraging",
            "logical",
            "fair",
            "excellent",
            "agree",
            "positive",
            "constructive",
            "thorough",
            "concise",
            "improved",
            "clarified",
            "exemplary",
            "sufficient",
            "encouraged",
            "well-defined",
            "logical",
            "valuable",
            "progressive",
            "insightful",
            "enlightening",
            "beneficial",
            "great",
            "suitable",
            "important",
            "achievable",
            "accessible",
            "aligned",
            "consistent",
            "credible",
            "feasible",
            "innovative",
            "measurable",
            "motivating",
            "practical",
            "productive",
            "reliable",
            "reasonable",
            "responsive",
            "rewarding",
            "successful",
            "supportive",
            "understood",
            "valid",
            "well-organized",
            "worthwhile",
            "competent",
            "empowering",
            "effective communication",
            "teamwork",
            "goal-oriented",
            "trustworthy",
            "exemplified",
          ];

          const negativeKeywords = [
            "not",
            "yes",
            "does not",
            "unclear",
            "confusing",
            "bad",
            "better",
            "ineffective",
            "irrelevant",
            "insufficient",
            "inadequate",
            "unstructured",
            "vague",
            "disorganized",
            "misleading",
            "problematic",
            "incomplete",
            "inaccurate",
            "unsatisfactory",
            "unhelpful",
            "inappropriate",
            "unfair",
            "biased",
            "negative",
            "ambiguous",
            "unsupported",
            "unreasonable",
            "lacking",
            "missing",
            "uncertain",
            "contradictory",
            "flawed",
            "overwhelming",
            "complex",
            "difficult",
            "poor",
            "unachievable",
            "impractical",
            "conflict",
            "irreconcilable",
            "unmotivating",
            "failure",
            "criticism",
            "uninformative",
            "deterrent",
            "counterproductive",
            "unacceptable",
            "obscure",
            "problem",
            "faulty",
            "untrustworthy",
            "uncooperative",
            "restrictive",
            "overcomplicated",
            "challenging",
            "unfeasible",
            "inefficient",
            "disappointing",
            "regressive",
            "unresponsive",
            "pointless",
            "limited",
            "flimsy",
            "unsuitable",
            "unachievable",
            "undesirable",
            "demotivating",
            "discouraging",
            "unrewarding",
            "critical",
            "substandard",
            "failure to clarify",
            "general",
            "unclear",
            "lacks",
            "vague",
            "undefined",
            "alignment",
            "broad",
            "detail",
            "benchmarks",
            "revised",
            "criteria",
            "clarity",
            "clarity",
            "definition",
            "indicators",
            "objectives",
            "expectations",
            "alignment",
            "feedback",
            "description",
            "specify",
            "objectives",
            "outcomes",
            "definitions",
            "clearer",
            "benchmarks",
            "descriptors",
            "detail",
            "integration",
            "standards",
            "descriptions",
            "define",
            "clarity",
            "objectives",
            "research",
            "outcomes",
          ];

          // Check for negative keywords first (priority)
          const isNegative = negativeKeywords.some((word) =>
            userAnswerText1.includes(word)
          );
          const isPositive = positiveKeywords.some((word) =>
            userAnswerText1.includes(word)
          );

          if (isNegative) {
            setTeachingMethods1(getrecommendations.negative);
          } else if (isPositive) {
            setTeachingMethods1(getrecommendations.positive);
          } else {
            setTeachingMethods1(getrecommendations.other);
          }
        } else {
          setTeachingMethods1(["No recommendations available for this user."]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch recommendations. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData1();
  }, [Useremail]); // Dependency on Useremail to fetch correct data

  return (
    <div className="container my-4">
      <h1 className="text-center mb-5">Recommended Teaching Methods</h1>
      <div className="row">
        <div className="col-12 mb-4">
          <div className="card h-100">
            <div className="card-body">
              {/* Render tips */}
              {tips.length > 0 ? (
                tips.map((tip, idx) => (
                  <div className="card-unique" key={idx}>
                    <div className="inside-unique">
                      <div className="circle-unique">{idx + 1}</div>{" "}
                      {/* Display serial number */}
                    </div>
                    <div className="text-unique"></div>
                    <p className="content-unique m-3 p-2 text-dark mt-4 text-center">
                      {tip}
                    </p>
                  </div>
                ))
              ) : (
                <>No tips available.</>
              )}

              {/* Render teaching methods, continuing the numbering */}
              {teachingMethods.length > 0 ? (
                teachingMethods.map((method, idx) => (
                  <div className="card-unique" key={tips.length + idx}>
                    <div className="inside-unique">
                      <div className="circle-unique">
                        {tips.length + idx + 1}
                      </div>{" "}
                      {/* Continue serial number */}
                    </div>
                    <div className="text-unique"></div>
                    <p className="content-unique m-3 p-2 text-dark mt-4 text-center">
                      {method}
                    </p>
                  </div>
                ))
              ) : (
                <p>Loading recommendations...</p>
              )}
              {teachingMethods1.length > 0 ? (
                teachingMethods1.map((method, idx) => (
                  <div
                    className="card-unique"
                    key={tips.length + teachingMethods.length + idx}
                  >
                    <div className="inside-unique">
                      <div className="circle-unique">
                        {tips.length + teachingMethods.length + idx + 1}
                      </div>
                    </div>
                    <p className="content-unique m-3 p-2 text-dark mt-4 text-center">
                      {method}
                    </p>
                  </div>
                ))
              ) : (
                <p>Loading recommendations...</p>
              )}
            </div>
          </div>
        </div>
        {/* <div >
          <TeachingMethods />
        </div> */}
      </div>
    </div>
  );
};

export default TeachersRecommendations;
