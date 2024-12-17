import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function OneSurvey() {
  const [surveyData, setSurveyData] = useState(null);
  const { id } = useParams();
  const [submitedsurveys, setSubmittedsurveys] = useState([]);

  const handleDelete = (id) => {
    alert("Delete data from database");
  };

  const FetchSurvey = async (surveyid) => {
    try {
      const response = await axios.post(
        "https://portal-sigma-two.vercel.app/api/admin/fetchsurveydetail",
        { surveyId: surveyid }
      );

      const responseData = response.data;
      setSurveyData(responseData.survey);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    FetchSurvey(id);
  }, [id]);

  return (
    <>
      <h1
        style={{
          textAlign: "center",
          marginTop: "20px",
          fontSize: "2.5rem",
          fontWeight: "bold",
          color: "#ff004e",
        }}
      >
        Survey Details
      </h1>
      {surveyData && (
        <div
          className="container"
          style={{
            backgroundColor: "#fff8f9",
            borderRadius: "15px",
            padding: "20px",
            margin: "30px auto",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            maxWidth: "800px",
            color: "#333",
          }}
        >
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "600",
              color: "#ff004e",
              marginBottom: "10px",
            }}
          >
            Survey Name: {surveyData.surveyName}
          </h2>
          <p
            style={{
              fontSize: "1rem",
              fontWeight: "400",
              marginBottom: "20px",
            }}
          >
            Date: {new Date(surveyData.date).toLocaleDateString()}
          </p>

          <h3
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#ff004e",
              marginBottom: "15px",
            }}
          >
            Questions:
          </h3>
          <ul style={{ listStyleType: "none", padding: "0" }}>
            {surveyData.questions.map((question, index) => (
              <li
                key={index}
                style={{
                  marginBottom: "15px",
                  padding: "10px",
                  border: "1px solid #fc7094",
                  borderRadius: "10px",
                  backgroundColor: "#ffeef2",
                }}
              >
                <p style={{ margin: "0", fontWeight: "500" }}>
                  {question.questionText}
                </p>
                <span
                  style={{
                    fontSize: "0.9rem",
                    color: "#555",
                  }}
                >
                  Question Type: {question.questionType}
                </span>
                {question.questionType === "mcq" && (
                  <ul style={{ marginTop: "10px", marginLeft: "20px" }}>
                    {question.options.map((option, optIndex) => (
                      <li
                        key={optIndex}
                        style={{
                          fontSize: "0.9rem",
                          color: "#333",
                        }}
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          <h3
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#ff004e",
              marginTop: "30px",
            }}
          >
            Submitted Users:
          </h3>
          <ul style={{ listStyleType: "none", padding: "0" }}>
            {surveyData.submittedUsers.map((user, index) => (
              <li
                key={index}
                style={{
                  marginBottom: "10px",
                  padding: "10px",
                  border: "1px solid #fc7094",
                  borderRadius: "10px",
                  backgroundColor: "#ffeef2",
                  fontSize: "1rem",
                  color: "#333",
                }}
              >
                {user.userEmail}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
