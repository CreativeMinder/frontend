import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import axios from "axios";
import Chart from 'chart.js/auto';
import '../AlumniDashboard/SearchComponent.css';
import { toast } from "react-toastify";
// import './SubmittedSurveysTable.css'; // Assuming you have a CSS file for additional styling
import emailjs from 'emailjs-com';
export function MyChart({ chartData }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null); // Reference to the Chart instance

  useEffect(() => {
    if (chartInstance.current !== null) {
      // If a chart instance already exists, destroy it before creating a new one
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: chartData.labels,
        datasets: [{
          label: 'Percentage',
          data: chartData.values,
          barThickness: 10,
          backgroundColor: function (context) {
            const chart = context.chart;
            const { ctx, chartArea } = chart;
            if (!chartArea) {
              // This case happens on initial chart creation
              return null;
            }
            const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top); // From bottom to top
            gradient.addColorStop(0, '#FF057E');
            gradient.addColorStop(1, '#FFCC00');
            return gradient;
          },
          borderRadius: {
            topLeft: 200,
            topRight: 200,
            bottomLeft: 200,
            bottomRight: 200
          }
        }]
      },
      options: {
        scales: {
          x: {
            stacked: true,
            ticks: {
              fontColor: "white",
              stepSize: 1,
              beginAtZero: true
            },
            grid: {
              display: false
            }
          },
          y: {
            stacked: true,
            ticks: {
              fontColor: "white",
              callback: function (value) {
                return value + "%";
              }
            },
            grid: {
              display: false
            }
          }
        },
        plugins: {
          legend: {
            display: false // Hide the legend
          }
        }
      }
    });

    // Cleanup function to destroy the chart instance on component unmount
    return () => {
      chartInstance.current.destroy();
    };
  }, [chartData]);

  return <canvas ref={chartRef} className="chart-canvas" style={{ width: '200px', height: '200px' }} />;
}

export function MyPieChart({ chartData }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null); // Reference to the Chart instance

  useEffect(() => {
    if (chartInstance.current !== null) {
      // If a chart instance already exists, destroy it before creating a new one
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: chartData.labels,
        datasets: [{
          label: 'Percentage',
          data: chartData.values,
          backgroundColor: [
            '#FF057E',
            '#FFCC00',
            '#66CC99',
            '#9933CC'
          ]
        }]
      },
      options: {
        plugins: {
          legend: {
            display: true // Show the legend
          }
        }
      }
    });

    // Cleanup function to destroy the chart instance on component unmount
    return () => {
      chartInstance.current.destroy();
    };
  }, [chartData]);

  return <canvas ref={chartRef} className="chart-canvas" style={{ width: '200px', height: '200px' }} />;
}

export function SubmittedSurveysTable() {
  const [submittedSurveys, setSubmittedSurveys] = useState([]);
  const [expandedRowId, setExpandedRowId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [minPercentage, setMinPercentage] = useState(0);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleMinPercentageChange = (event) => {
    setMinPercentage(event.target.value);
  };

  const handleDelete = (id) => {
    alert("Delete data from database");
    // Implement logic to delete the survey from the database
  };

  const fetchSubmittedSurveys = async () => {
    try {
      const response = await axios.post(
        "https://portal-sigma-two.vercel.app/api/admin/fetchteacherssurvay"
      );

      // Filter surveys by "student"
      const studentSurveys = response.data.surveys.filter(survey =>
        survey.surveyName.toLowerCase().includes('student')
      );

      setSubmittedSurveys(studentSurveys);
      console.log(response)

    } catch (error) {
      console.error("Error fetching Student surveys:", error);
    }
  };

  useEffect(() => {
    fetchSubmittedSurveys();
  }, []);

  const handleRowToggle = (id) => {
    setExpandedRowId((prevId) => (prevId === id ? null : id));
  };

  const getChartData = (user) => {
    const answerCounts = { 'somewhat agree': 0, 'strongly agree': 0, 'agree': 0, 'disagree': 0 };
    let totalAnswers = 0;

    user.answers.forEach(answerObj => {
      const answerText = answerObj.answerText.toLowerCase();
      if (answerCounts.hasOwnProperty(answerText)) {
        answerCounts[answerText]++;
        totalAnswers++;
      }
    });

    // Calculate percentages
    const labels = Object.keys(answerCounts);
    const values = labels.map(label => (answerCounts[label] / totalAnswers) * 100);

    return { labels, values };
  };

  // Filter surveys based on search query and minimum percentage
  const filteredSurveys = submittedSurveys
    .map(survey => ({
      ...survey,
      submittedUsers: survey.submittedUsers.filter(user =>
        user.answers[0]?.answerText.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }))
    .filter(survey => survey.submittedUsers.length > 0);

    

    const userEmails = [];
    const score = []
    let category = "teacher";
  
    const sendScores = async () => {
      // Check if arrays have data before making API requests
      if (userEmails.length === 0 || score.length === 0) {
        console.log("Error: UserEmails or Score array is empty. Please populate them before sending requests.");
        return; // Exit the function if either array is empty
      }
  
      for (let i = 0; i < userEmails.length; i++) {
        try {
          const response = await axios.post('https://portal-sigma-two.vercel.app/api/user/addscore', {
            userEmail: userEmails[i],
            score: score[i], // Updated to use the new score array
            category: category
          });
          // console.log(`Response for ${userEmails[i]}:`, response.data);
        } catch (error) {
          // console.error(`Error for ${userEmails[i]}:`, error);
        }
      }
    };

  return (
    <>
      <div className="search-container">
        <input className="input" type="text"
          placeholder="Search by Answer..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <svg viewBox="0 0 24 24" className="search__icon">
          <g>
            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z">
            </path>
          </g>
        </svg>
      </div>
      <table className="custom-table">
        <thead>
          <tr>
            <th><i className="me-2 fas fa-expand-arrows-alt"></i></th>
            <th>Serial Number</th>
            <th>User Name</th>
            <th className="text-end"></th>
          </tr>
        </thead>
        <tbody>
          {filteredSurveys.length > 0 ? (
            filteredSurveys.map((survey, index) => (

            <React.Fragment key={index}>


           {survey.submittedUsers.length > 0 ? (
            survey.submittedUsers.map((user, aIndex) => {
              const chartData = getChartData(user);

              const answerText = user.answers[2]?.answerText;
              if (answerText) {
                userEmails.push(answerText);
                    }
              // console.log(userEmails)
              const chartDatas = getChartData(user);
              const highestValue = Math.round(Math.max(...chartDatas.values));

              if (highestValue) {
                score.push(highestValue);
                    }

              return (
              <React.Fragment key={`${survey._id}-${aIndex}`}>
                <tr>
                  <td>
                    <button
                      className="btn btn-sm text-white rounded-circle bg-danger"
                      onClick={() => handleRowToggle(`${survey._id}-${aIndex}`)}
                    >
                      {expandedRowId === `${survey._id}-${aIndex}` ? '-' : '+'}
                    </button>
                  </td>
                  <td>{`${aIndex + 1}`}</td>
                  <td>
                    {user.answers[0] && user.answers[0].answerText}
                  </td>
                  <td className="text-end">
                  <td>{survey.email}</td>
                   </td>
                </tr>

                {expandedRowId === `${survey._id}-${aIndex}` && (
                  <tr>
                    <td colSpan="4">
                      <div className="p-2">
                        <h5>Additional details:</h5>
                        <table className="table">
                          <thead>
                            <tr>
                              <td style={{ fontWeight: "bold" }}>Questions</td>
                              <td style={{ fontWeight: "bold" }}>Answers</td>
                            </tr>
                          </thead>
                          <tbody>
                            {survey.questions.map((question, qIndex) => (
                              <tr key={qIndex}>
                                <td>{question.questionText}</td>
                                <td>
                                  {user.answers[qIndex] && user.answers[qIndex].answerText.toLowerCase()}
                                </td>
                              </tr>
                            ))}
                            <tr>
                              <td colSpan="2" style={{ padding: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                  <div className='chartShadow' style={{ backgroundColor: '#f9f9f9', borderRadius: '10px', padding: '20px', width: '48%' }}>
                                    <h3 style={{ marginBottom: '20px', color: '#333' }}>Bar Chart</h3>
                                    <MyChart chartData={chartData} />
                                  </div>
                                  <div className='chartShadow' style={{ backgroundColor: '#f9f9f9', borderRadius: '10px', padding: '20px', width: '48%' }}>
                                    <h3 style={{ marginBottom: '20px', color: '#333' }}>Pie Chart</h3>
                                    <MyPieChart chartData={chartData} />
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
              );
            })
              ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No records found
                </td>
              </tr>
          )}
            </React.Fragment>
          ))
    ) : (
          <tr>
            <td colSpan="4" className="text-center">
              No records found
            </td>
          </tr>
    )}
        </tbody>

        {(() => {
          if (userEmails.length > 0 && score.length > 0) {
            sendScores();
          }
        })()}
      </table>
    </>
  );
}



export function RemainingExitStudentsTable() {

  const [unsubmittedUsers, setUnsubmittedUsers] = useState([]);
  const [remainingUserEmailss, setRemainingUserEmail] = useState([]);
  const [surveyLink, setSurveyLink] = useState([]);
  const [surveyId, setSurveyId] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading stat
  useEffect(() => {
    // Fetch data from the API
    axios
      .post("https://portal-sigma-two.vercel.app/api/admin/fetchallsurvaydetails")
      .then((response) => {
        const surveys = response.data.surveys || [];

        const alumniSurvey = surveys.find((survey) =>
          survey.surveyName.toLowerCase().includes("student")
        );

        if (alumniSurvey) {
          // setUnsubmittedUsers(alumniSurvey.unsubmittedUsers || []);

          const unsubmitted = alumniSurvey.unsubmittedUsers || [];
          setUnsubmittedUsers(unsubmitted);

          const remEmails = unsubmitted.map((user) => user.email);


        setRemainingUserEmail(remEmails);

        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  


 
  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        setLoading(true);
        const response = await axios.post("https://portal-sigma-two.vercel.app/api/admin/fetchsurveys");
        setSurveyLink(response.data.surveys);
      } catch (error) {
        console.error("Error fetching surveys:", error);
        toast.error("Error fetching surveys");
      } finally {
        setLoading(false);
      }
    };

    fetchSurveys();
  }, []); // Only fetch once when component mounts

  const handleSendSurveyLink = () => {
    // Find the survey ID
    const survey = surveyLink.find(survey => survey.surveyName.toLowerCase().includes("student"));
    if (survey) {
      setSurveyId(survey._id);
    }

    if (!surveyId) {
      toast.warning("No survey found for student.");
      return;
    }

    // For Dummy Testing
    const emails = ["ym5480012@gmail.com", "zimalmalik989@gmail.com" ];

    // For Remaining Users

    // const emails = unsubmittedUsers ;


    const subject = "Survey Reminder From OBE Convener";
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; background-color: #f4f7f6; padding: 20px; border-radius: 8px; text-align: center;">
        <h2 style="color: #333;">Dear Student!</h2>
        <p style="font-size: 18px; color: #555; line-height: 1.6;">
          We kindly request you to submit the survey at your earliest convenience.
        </p>
        <p style="font-size: 16px; color: #333;">
          Your feedback is highly valuable to us.
        </p>
        <p style="margin-top: 20px;">
             ${
            surveyId ? 
            `<a href="/onesurvey/${surveyId}" style="background-color: #4CAF50; color: white; padding: 12px 25px; text-decoration: none; font-size: 16px; border-radius: 5px; transition: background-color 0.3s;">
              Submit Survey
            </a>` 
            : 
            `<p style="color: red;">Survey ID is not available. Please try again later.</p>`
          }
        </p>
      </div>
    `;

    const requestData = {
      emails,
      subject,
      htmlContent
    };

    axios.post('https://portal-sigma-two.vercel.app/api/user/sendEmail', requestData)
      .then(response => {
        toast.success("Email Sent Successfully");
      })
      .catch(error => {
        toast.error("Something went wrong, emails not sent");
      });
  };

  if (loading) {
    return <div>Loading...</div>; // Display a loading state if necessary
  }

  return (
    <>
    <br></br>

<div style={{ display: "grid", gap: "10px", placeItems: "center" }}>
  <h3>Send Reminder to Remaining ExitStudents</h3>
  <button

  onClick={handleSendSurveyLink}
    style={{
      minWidth: "200px",
      backgroundColor: "#ff004e",
      color: "#fff",
      padding: "10px 20px",
      borderRadius: "5px",
      border: "none",
      cursor: "pointer",
    }}
  >
    Send
  </button>
</div>
<br></br>
    <table className="custom-table">
      <thead>
        <tr>
          <th>Select All</th>
          <th>Serial Number</th>
          <th>User Email</th>
        </tr>
      </thead>
      <tbody>
        {unsubmittedUsers.length > 0 ? (
          unsubmittedUsers.map((userEmail, index) => (
            <tr key={index}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{`${index + 1}`}</td>
              <td>{userEmail}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="2">No Unsubmitted Users Found or Loading...</td>
          </tr>
        )}
      </tbody>
    </table>


</>
  );


}


export function GraphResults() {
  const [chartData, setChartData] = useState({ labels: [], values: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://portal-sigma-two.vercel.app/api/admin/fetchteacherssurvay"
        );

        const allResponses = response.data.surveys.flatMap(survey =>
          survey.submittedUsers.flatMap(user => user.answers)
        );

        const answerCounts = { 'somewhat agree': 0, 'strongly agree': 0, 'agree': 0, 'disagree': 0 };
        let totalAnswers = 0;

        allResponses.forEach(answerObj => {
          const answerText = answerObj.answerText.toLowerCase();
          if (answerCounts.hasOwnProperty(answerText)) {
            answerCounts[answerText]++;
            totalAnswers++;
          }
        });

        // Calculate percentages
        const labels = Object.keys(answerCounts);
        const values = labels.map(label => (answerCounts[label] / totalAnswers) * 100);

        setChartData({ labels, values });

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-5 text-center">
      <h2>Average Graph Results of Exit Students</h2>
      <div className=" mt-4">
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="card-title text-center">Bar Chart</h3>
                <MyChart chartData={chartData} />
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="card-title text-center">Pie Chart</h3>
                <MyPieChart chartData={chartData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


// export function SurveyLink() {
//   const [link, setLink] = useState("");

//   const handleInputChange = (e) => {
//     setLink(e.target.value);
//   };

//   const handleSendSurveyLink = () => {
//     // Implement logic to send survey link
//     console.log("Sending survey link:", link);
//   };

//   return (
//     <div style={{ display: "grid", gap: "10px", placeItems: "center" }}>
//       <input
//         type="text"
//         placeholder="Please paste your link"
//         value={link}
//         onChange={handleInputChange}
//         style={{
//           padding: "10px",
//           borderRadius: "5px",
//           border: "1px solid #ccc",
//           width: "300px",
//         }}
//       />
//       <button
//         onClick={handleSendSurveyLink}
//         style={{
//           backgroundColor: "#ff004e",
//           color: "#fff",
//           padding: "10px 20px",
//           borderRadius: "5px",
//           border: "none",
//           cursor: "pointer",
//         }}
//       >
//         Send Survey Link to Pass Students
//       </button>
//     </div>
//   );
// }
export default function PassStudents() {
  const [show, setShow] = useState(false);
  const [departmentFilter, setDepartmentFilter] = useState("All"); // State for department filter
  const [passStudents, setPassStudents] = useState([]);

// SMTP FUNDTION STARTS
  const handleSendSurveyReminder = () => {
    const link = 'https://your-survey-link.com'; // Replace with the actual survey link
  
    remainingUserEmailss.forEach((email) => {
      const templateParams = {
        user_email: email,
        survey_link: link,
      };
  
      emailjs
        .send(
          'your_service_id',    // Replace with your EmailJS Service ID
          'your_template_id',    // Replace with your EmailJS Template ID
          templateParams,
          'your_user_id'         // Replace with your EmailJS User ID
        )
        .then((response) => {
          console.log(`Email successfully sent to ${email}`, response.status, response.text);
        })
        .catch((error) => {
          console.error(`Failed to send email to ${email}`, error);
        });
    });
  };
  // SMTP FUNDTION STARTS


  const FetchStudents = async () => {
    try {
      const response = await axios.post(
        "https://portal-sigma-two.vercel.app/api/admin/fetchstudent"
      );
      console.log(response.data.students);
      // Assuming response.data.teachers is an array of teachers
      setPassStudents(response.data.students);
    } catch (error) {
      console.error("Error fetching Elumni:", error);
    }
  };

  useEffect(() => {
    FetchStudents();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = (student) => {
    setPassStudents(student);
    setShow(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPassStudents({ ...passStudents, [name]: value });
  };

  const handleUpdate = () => {
    // Implement update logic here
    console.log("Updated data:", passStudents);
    handleClose();
  };

  const handleDeleteStudent = async (Id) => {
    try {
      const response = await axios.delete(
        "https://portal-sigma-two.vercel.app/api/admin/deleteuser",
        {
          data: { userId: Id } // Send the surveyId in the data property
        }
      );
      toast.success(" Teacher Deleted Successfully");

    } catch (error) {
      console.error("Error deleting survey:", error.message);
    }
  };

  const handleDepartmentFilterChange = (e) => {
    setDepartmentFilter(e.target.value);
  };

  // Filter pass students based on department
  const filteredPassStudents =
    departmentFilter === "All"
      ? passStudents
      : passStudents.filter(
        (student) => student.department === departmentFilter
      );

  return (
    <>
      <div>
        <div className="py-5 px-2 d-flex flex-wrap justify-content-between">
          <h3>Exit Students list</h3>

          {/* <select
            className="form-select w-25"
            onChange={handleDepartmentFilterChange}
            value={departmentFilter}
          >
            <option value="All">All</option>
            <option value="CS">CS</option>
            <option value="AI">AI</option>
            <option value="SE">SE</option>
          </select> */}
        </div>
        {/* Select box for department filter */}

        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
          <table className="custom-table">
            <thead>
              <tr>
                <th>All</th>
                <th>ID</th>
                <th>Name</th>
                <th>University</th>
                <th>Email</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {passStudents.length == 0 ? (
                <h3>No record found</h3>
              ) : (
                passStudents.map((elumni, index) => (
                  <tr key={elumni._id}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>{`${index + 1}`}</td>
                    {/* <td>{elumni._id}</td> */}
                    <td>{elumni.firstName + " " + elumni.lastName}</td>
                    <td>{elumni.universityName}</td>
                    <td>{elumni.email}</td>
                    <td className="text-end">

                      <i
                        className="fas   fa-trash"
                        data-toggle="tooltip" title="delete"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDeleteStudent(elumni._id)}
                      ></i>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* <SurveyLink /> */}
        <div className="d-flex flex-wrap justify-content-between align-items-center py-3">
          <h3>Submitted Surveys</h3>
        </div>

        <br></br>
        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
          <SubmittedSurveysTable />
        </div>
        <br></br>
        <div className="d-flex flex-wrap justify-content-between align-items-center py-3">
          <h3>Remaining Users</h3>
        </div>

        <br></br>

        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
          <RemainingExitStudentsTable />
        </div>
      

        <GraphResults />
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title className="text-center w-100 h5">
              Edit Student
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="ID"
                name="id"
                // value={passStudentData.id}
                onChange={handleInputChange}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Name"
                name="name"
                // value={passStudentData.name}
                onChange={handleInputChange}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Department"
                name="department"
                // value={passStudentData.department}
                onChange={handleInputChange}
              />
            </InputGroup>
            <Button
              variant="danger"
              className="w-100 mb-3"
              onClick={handleUpdate}
            >
              Update
            </Button>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}
