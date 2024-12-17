//new survey create
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import DashboardSurvey from "../DashboardSurveys/DashboardSurveys";
const SurveyForms = () => {
  const { control, handleSubmit, reset } = useForm();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState({ questionType: "detail" });
  
  // const [currentQuestion, setCurrentQuestion] = useState({ questionType: "mcq", options: ["", "", "", ""] });
  const [surveyDescription, setSurveyDescription] = useState(""); // State for survey description
  const [showForm, setShowForm] = useState(true); // State to control form visibility

  const handleCancel = () => {
    setShowForm(false); // Hide the form on cancel
    location.reload()
  };

  const handleQuestionTypeChange = (type) => {
    setCurrentQuestion({
      questionType: type,
      options: type === "mcq" ? ["", "", "", ""] : [],
    });
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, currentQuestion]);
    setCurrentQuestion({ questionType: "mcq", options: ["", "", "", ""] });
    setCurrentQuestionIndex(questions.length);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentQuestion(questions[currentQuestionIndex + 1]);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setCurrentQuestion(questions[currentQuestionIndex - 1]);
    }
  };

  const onSubmit = async (data) => {
    const { surveyName } = data;
    try {
      const response = await axios.post("https://portal-sigma-two.vercel.app/api/admin/createsurvey", {
        surveyName,
        surveyDescription, // Include the description in the request
        questions,
      });
      const { message } = response.data;
      console.log(message);
      toast.success("New Survey Created Successfully");
      reset();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Survey failed to create");
    }
  };

  const renderQuestionForm = () => {
    return (
      <div className="container">
        <h2 className="py-3 fs-5">Question Details</h2>
        <div className="form-group">
          <label className="mb-1 mt-2 fs-5">Question:</label>
          <Controller
            name={`questions[${currentQuestionIndex}].questionText`}
            control={control}
            defaultValue={currentQuestion.questionText || ""}
            render={({ field }) => (
              <input
                type="text"
                className="form-control mb-4 border-dark fs-5"
                {...field}
                value={currentQuestion.questionText || ""}
                onChange={(e) => setCurrentQuestion({ ...currentQuestion, questionText: e.target.value })}
              />
            )}
          />
        </div>
        {currentQuestion.questionType === "mcq" && (
          <div className="form-group">
            <label className="mb-1 fs-5">Options:</label>
            {currentQuestion.options.map((option, idx) => (
              <Controller
                key={idx}
                name={`questions[${currentQuestionIndex}].options[${idx}]`}
                control={control}
                defaultValue={option}
                render={({ field }) => (
                  <input
                    type="text"
                    className="form-control mb-4 border-dark fs-5"
                    {...field}
                    value={currentQuestion.options[idx] || ""}
                    onChange={(e) => {
                      const newOptions = [...currentQuestion.options];
                      newOptions[idx] = e.target.value;
                      setCurrentQuestion({ ...currentQuestion, options: newOptions });
                    }}
                  />
                )}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {showForm ? (
        <div className="container" style={{ boxShadow: "none" }}>
          <h1 className="py-3 fs-5">Create a New Survey</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="py-3 fs-5">Survey Information</h2>
            <div className="form-group">
              <label className="mb-1 fs-5">Survey Name:</label>
              <Controller
                name="surveyName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    type="text"
                    className="form-control mb-4 border-dark fs-5"
                    placeholder="Enter survey name"
                    {...field}
                  />
                )}
              />
            </div>
            <div className="form-group">
              {/* <label className="mb-1 fs-5">Survey Description:</label> */}
              {/* <Controller
                name="surveyDescription"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <textarea
                    className="form-control mb-4 border-dark fs-5"
                    placeholder="Enter survey description"
                    rows="3"
                    {...field}
                    value={surveyDescription}
                    onChange={(e) => setSurveyDescription(e.target.value)}
                  />
                )}
              /> */}
            </div>
            <h2 className="py-3 fs-5">Add and Navigate Questions</h2>
            <div className="form-group">
              <label className="mb-1 fs-5">Question Type:</label>
              <br />
              <div
                className="btn btn-danger me-2 mb-2 fs-5"
                onClick={() => handleQuestionTypeChange("mcq")}
              >
                Multiple Choice
              </div>
              <div
                className="btn btn-danger mb-2 fs-5"
                onClick={() => handleQuestionTypeChange("detail")}
              >
                Detail
              </div>
            </div>
            {renderQuestionForm()}
            
            <div type="button" className="btn btn-danger my-4 mx-5 fs-5" onClick={handleAddQuestion}>
              Add Question
            </div>
            
            {/* <div className="btn btn-danger me-2 mx-5 fs-5" onClick={handlePreviousQuestion}>
              Previous Question
            </div>
            <div className="btn btn-danger fs-5" onClick={handleNextQuestion}>
              Next Question
            </div> */}

            <div className="w-100 d-flex justify-content-center align-items-center fs-5">
              <button type="submit" className="btn btn-danger mt-4 mx-5 fs-5">
                Submit Survey
              </button>
              <button
                type="button"
                className="btn btn-danger mt-4 mx-5 fs-5"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        < DashboardSurvey />
      )}
    </>
  );
};

export default SurveyForms;
