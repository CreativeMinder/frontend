// Recent servays page
//edit, delete, email
//view surveys detail---> surveylist
import React, { useState, useEffect } from "react";
import { Button, InputGroup, FormControl, Table } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './DashboardSurveys.css';
import { toast } from "react-toastify"; //display notifications 

export function SurveysTable() {
  const navigate = useNavigate();
  const [surveys, setsurveys] = useState([]);
  const [copiedText, setCopiedText] = useState("");
  const [showCopyMessage, setShowCopyMessage] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [rowData, setRowData] = useState({});

  const handleDelete = async (surveyId) => {
    console.log("***********", surveyId);
  
    try {
      const response = await axios.delete(
        "https://portal-sigma-two.vercel.app/api/admin/deletesurvey",
        {
          data: { surveyId } // Send the surveyId in the data property
        }
      );
      toast.success(" Survey Deleted Successfully");

    } catch (error) {
      console.error("Error deleting survey:", error.message);
    }
  };
  

  const handleViewDetails = (id) => {
    window.location.href = `/onesurvey/${id}`;
  };

  const openGmail = (emailAddress, surveyLink) => {
    var subject = "Subject";
    var body = "Here is the survey link: " + surveyLink;

    var emailAddress = "info@amshealthcaresolution.com";
    window.location.href =
      "https://mail.google.com/mail/?view=cm&fs=1&to=" +
      encodeURIComponent(emailAddress) +
      "?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(body);
  };

  const handleCopy = (text) => {
    const tempInput = document.createElement("textarea");
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    tempInput.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    setCopiedText(text);
    setShowCopyMessage(true);
    setTimeout(() => {
      setShowCopyMessage(false);
    }, 2000);
  };

  const handleShowEditForm = (row) => {
    setRowData(row);
    setShowEditForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("question_")) {
      const index = parseInt(name.split("_")[1]);
      const updatedQuestions = [...rowData.questions];
      updatedQuestions[index].questionText = value;
      setRowData({ ...rowData, questions: updatedQuestions });
    } else {
      setRowData({ ...rowData, [name]: value });
    }
  };


const handleUpdate = async () => {
  try {
    const response = await axios.put("https://portal-sigma-two.vercel.app/api/admin/editsurvey", {
      surveyId: rowData._id, // Assuming rowData contains the survey's ID
      updatedSurvey: {
        surveyName: rowData.surveyName, // Assuming rowData has the survey name
        questions: rowData.questions,   // Assuming rowData has the questions array
        submittedUsers: rowData.submittedUsers // Assuming rowData has the submitted users array
      }
    });

    toast.success("Survay Updated Successfully");

    setShowEditForm(false);
  } catch (error) {
    console.error("Error updating survey:", error);
  }
};

  const handleCancel = () => {
    setShowEditForm(false);
  };
  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await axios.post(
          "https://portal-sigma-two.vercel.app/api/admin/fetchsurveys"
        );

        // console.log(response.data.surveys)

        setsurveys(response.data.surveys);
      } catch (error) {
        console.error("Error fetching surveys:", error);
      }
    };

    fetchSurveys();
  }, []);

  return (
    <>
      {showEditForm ? (
        <EditForm rowData={rowData} handleInputChange={handleInputChange} handleUpdate={handleUpdate} handleCancel={handleCancel}
        />
      ) : (
        <table className="custom-table p-3">
          <thead className="rounded-3" style={{ height: "50px" }}>
            <tr>
              <th>All</th>
              <th>Name</th>
              <th>Survey Link</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {surveys.length > 0 ? (
              surveys.map((survey, index) => (
                <tr key={index}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{survey.surveyName}</td>
                  <td>
                    <a href={`/submitsurvey/${survey._id}`} target="_blank" rel="noopener noreferrer">
                      {`localhost:3000/submitsurvey/${survey._id}`}
                    </a>
                  </td>
                  <td className="text-end">
                    <i
                      className="fas fa-copy"
                      style={{ marginRight: "10px", cursor: "pointer" }}
                      data-toggle="tooltip" title="copy"
                      onClick={() => handleCopy(`localhost:3000/submitsurvey/${survey._id}`)}
                    ></i>
                    <i
                      className="fas fa-edit"
                      style={{ marginRight: "10px", cursor: "pointer" }}
                      data-toggle="tooltip" title="edit"
                      onClick={() => handleShowEditForm(survey)}
                    ></i>
                    <i
                      className="fas fa-trash"
                      style={{ marginRight: "10px", cursor: "pointer" }}
                      data-toggle="tooltip" title="delete"
                      onClick={() => handleDelete(survey._id)}
                    ></i>
                    <i
                      className="fas fa-eye"
                      style={{ marginRight: "10px", cursor: "pointer" }}
                      data-toggle="tooltip" title="view"
                      onClick={() => {
                        navigate(`/onesurvey/${survey._id}`);
                        handleViewDetails(survey._id);
                      }}
                    ></i>
                    <i
                      className="far fa-envelope"
                      style={{ cursor: "pointer" }}
                      data-toggle="tooltip" title="email"
                      onClick={() => openGmail("info@amshealthcaresolution.com", `localhost:3000/submitsurvey/${survey._id}`)}
                    ></i>
                  </td>
                </tr>
              ))
            ) : (
              <div>Loading .....</div>
            )}
          </tbody>
        </table>
      )}
    </>
  );
}

const EditForm = ({ rowData, handleInputChange, handleUpdate, handleCancel }) => {
  const handleCancelClick = () => {
    console.log("Cancel button clicked"); // Debugging statement
    handleCancel();
  };

  return (
    <div className="edit-form d-flex flex-column" style={{ height: "100%" }}>
      <h2 className="text-center">Edit Survey</h2>
      <div className="input-group-container">
        <InputGroup className="mb-3 surveyname">
          <FormControl
            placeholder="ID"
            name="id"
            value={rowData._id}
            onChange={handleInputChange}
            disabled
          />
        </InputGroup>
        <InputGroup className="mb-3 surveyname">
          <FormControl
            placeholder="Name"
            name="surveyName"
            value={rowData.surveyName}
            onChange={handleInputChange}
          />
        </InputGroup>
      </div>
      {Array.isArray(rowData.questions) && rowData.questions.map((question, index) => (
        <React.Fragment key={`table-${index}`}>
          <Table bordered className="question-table">
            <thead>
              <tr>
                <th className="question-header" colSpan="2">
                  <span>Question  {index + 1}</span>
                  <InputGroup className="mb-3 question-input-group">
                    <FormControl
                      name={`question_${index}`}
                      value={question.questionText}
                      onChange={handleInputChange}
                      className="question-input"
                    />
                  </InputGroup>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="options-text">
                  <div className="d-flex flex-wrap justify-content-center">
                    {Array.isArray(question.options) && question.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="option-container d-flex align-items-center">
                        <label className="option-label"><b>{`${String.fromCharCode(97 + optionIndex)}`}</b></label>
                        <FormControl
                          name={`option_${index}_${optionIndex}`}
                          value={option}
                          onChange={handleInputChange}
                          className="option-input"
                        />
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            </tbody>
          </Table>
        </React.Fragment>
      ))}
      <div className="mt-auto d-flex justify-content-center gap-3">
        <Button variant="danger" style={{ width: "200px" }} className=" mb-3" onClick={handleCancelClick}>
          Cancel
        </Button>
        <Button variant="danger" style={{ width: "200px" }} className=" mb-3" onClick={handleUpdate}>
          Update
        </Button>
      </div>
    </div>
  );
};

export default function DashboardSurvey({ onItemClick }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="d-flex flex-wrap justify-content-between align-items-center py-3">
        <h2 className="px-3">Recent Surveys</h2>
        <button
          type="button"
          className="btn text-white"
          onClick={() => onItemClick("NewUserSurveys")}
          style={{ backgroundColor: "#ff004e" }}
        >
          Create New Survey
        </button>
      </div>
      <br></br>
      <br></br>
      <div style={{ overflowY: "auto" }}>
        <SurveysTable />
      </div>
      {/* <SurveyLink /> */}
    </>
  );
}