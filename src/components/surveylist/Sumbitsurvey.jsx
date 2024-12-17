import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function SubmitSurvey() {
  const [surveyData, setSurveyData] = useState(null);
  const [answers, setAnswers] = useState({});
  const [userEmail, setUserEmail] = useState("");
  const { id } = useParams();

  useEffect(() => {
    fetchSurvey(id);
  }, [id]);

  const fetchSurvey = async (surveyId) => {
    try {
      const response = await axios.post(
        "https://portal-sigma-two.vercel.app/api/admin/fetchsurveydetail",
        { surveyId }
      );
      setSurveyData(response.data.survey);
      initializeAnswers(response.data.survey.questions);
    } catch (error) {
      console.error("Error fetching survey:", error.message);
    }
  };

  const initializeAnswers = (questions) => {
    const initialAnswers = {};
    questions.forEach((question) => {
      initialAnswers[question._id] = "";
    });
    setAnswers(initialAnswers);
  };

  const handleInputChange = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
    <style>font-size="30px"</style>
  };

  const handleEmailChange = (e) => {
    setUserEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      surveyId: id,
      userEmail,
      answers: Object.keys(answers).map((questionId, index) => ({
        questionIndex: index,
        answerText: answers[questionId],
      })),
    };
    console.log("SDFSD", postData);
    try {

      await axios.post(
        "https://portal-sigma-two.vercel.app/api/user/solvesurvey",
        postData
      );
    
      toast.success(`Survey Submitted Successfully by ${userEmail}`);
    } catch (error) {
      console.error("Error submitting survey:", error.message);
      toast.error("Survey submission failed");
    }
  };

  return (
    <>
      <h1 className="text-center mt-4">Survey Details</h1>
      {surveyData ? (
        <div className="container">
          <h2>Survey Name: {surveyData.surveyName}</h2>
          <p>Date: {surveyData.date}</p>
          <div>
            <h4>Enter your Email:</h4>
            <input
              type="email"
              required
              name="userEmail"
              id="userEmail"
              value={userEmail}
              onChange={handleEmailChange}
              className="form-control border-dark mb-3"
            />
          </div>
          <h3>Questions:</h3>
          <form onSubmit={handleSubmit}>
            {surveyData.questions.map((question, index) => (
              <div key={index}>
                <p className="fs-5">
                  {question.questionText} <br /> Question Type: {question.questionType}
                </p>
                {question.questionType === "mcq" ? (
                  question.options.map((option, idx) => (
                    <div key={idx}>
                      <input
                        type="radio"
                        id={`${question._id}-${idx}`}
                        name={question._id}
                        value={option}
                        className="me-3"
                        checked={answers[question._id] === option}
                        onChange={(e) =>
                          handleInputChange(question._id, e.target.value)

                        }
                      />
                      <label className="fs-5" htmlFor={`${question._id}-${idx}`}>{option}</label>
                    </div>
                  ))
                ) : question.questionType === "detail" ? (
                  <input
                    className="form-control border-dark mb-3 fs-5"
                    type="text"
                    value={answers[question._id]}
                    onChange={(e) =>
                      handleInputChange(question._id, e.target.value)
                    }
                  />
                ) : null}
              </div>
            ))}
            <button type="submit" className="btn btn-danger mt-4 mb-4 px-4 fs-5">
              Submit
            </button>
          </form>
          {/* <h3>Submitted Users:</h3>
          <ul>
            {surveyData.submittedUsers.map((user, index) => (
              <li key={index}>{user.userEmail}</li>
            ))}
          </ul> */}
        </div>
      ) : (
        <div>Loading survey details...</div>
      )}
    </>
  );
}
