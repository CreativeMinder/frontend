import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import Chart from 'chart.js/auto';
import { toast } from "react-toastify";
import axios from "axios";
import './SearchComponent.css'; // Import the CSS file for styling  

export function MyChart({ chartData }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null); // Reference to the Chart instance
<div className="chart-container" style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
    <div className="chart-item-container" style={{ flex: '1 1 60%', borderRadius: '16px' }} data-aos="fade-right">
        <div className="chart-item chartShadow">
            <h3>Line Graph</h3>
            <MyChart chartData={chartData} />
        </div>
    </div>
    <div className="chart-item-container" style={{ flex: '1 1 40%', borderRadius: '16px' }} data-aos="fade-right">
        <div className="chart-item chartShadow">
            <h3>Pie Chart</h3>
            <MyPieChart chartData={chartData} />
        </div>
    </div>
</div>

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
  const [expandedRows, setExpandedRows] = useState({}); // Track expanded rows
  const [searchQuery, setSearchQuery] = useState(''); // Track search query

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Fetch data from the API
  const fetchSubmittedSurveys = async () => {
    try {
      const response = await axios.post(
        "https://portal-sigma-two.vercel.app/api/admin/fetchteacherssurvay"
      );
      console.log("Fetched Surveys:", response.data.surveys);

      // Filter surveys by "alumni"
      const alumniSurveys = response.data.surveys.filter(survey =>
        survey.surveyName.toLowerCase().includes("alumni")
      );

      setSubmittedSurveys(alumniSurveys);
    } catch (error) {
      console.error("Error fetching Alumni surveys:", error);
    }
  };

  useEffect(() => {
    fetchSubmittedSurveys();
  }, []);

  // Filter the submitted users within filtered surveys based on the search query
  const filteredSurveys = submittedSurveys.map(survey => ({
    ...survey,
    submittedUsers: survey.submittedUsers.filter(user =>
      user.answers[0]?.answerText.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(survey => survey.submittedUsers.length > 0);

  // Function to toggle the expanded state for a specific row
  const handleRowToggle = (id) => {
    setExpandedRows((prevExpandedRows) => ({
      ...prevExpandedRows,
      [id]: !prevExpandedRows[id],
    }));
  };
  const handleDelete = (id) => {
    alert("Delete data from database");
    // Implement logic to delete the survey from the database
  };
  // Function to get chart data
  const getChartData = (user) => {
    const answerCounts = { 'excellent': 0, 'good': 0, 'fair': 0, 'poor':0};
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
      <div style={{ maxHeight: "400px", overflowY: "auto" }}>
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
            {filteredSurveys.map((survey) => (
              survey.submittedUsers.map((user, aIndex) => (
                <React.Fragment key={`${survey._id}-${aIndex}`}>
                  <tr>
                    <td>
                      <button
                        className="btn btn-sm text-white rounded-circle bg-danger"
                        onClick={() => handleRowToggle(`${survey._id}-${aIndex}`)}
                      >
                        {expandedRows[`${survey._id}-${aIndex}`] ? "-" : "+"}
                      </button>
                    </td>
                    <td>{`${aIndex + 1}`}</td>
                    <td>
                      {user.answers[0] && user.answers[0].answerText}
                    </td>
                    <td className="text-end">
                      {/* <i
                        className="fas fa-trash"
                        style={{ cursor: "pointer" }}
                        data-toggle="tooltip"
                        title="delete"
                        onClick={() => handleDelete(survey._id)}
                      ></i> */}
                    </td>
                  </tr>

                  {/* Render additional details here only for the expanded row */}
                  {expandedRows[`${survey._id}-${aIndex}`] && (
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
                                    {user.answers[qIndex] &&
                                      user.answers[qIndex].answerText.toLowerCase()}
                                  </td>
                                </tr>
                              ))}

                              <tr>
                                <td colSpan="2" style={{ padding: '20px' }}>
                                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div className='chartShadow' style={{ backgroundColor: '#f9f9f9', borderRadius: '10px', padding: '20px', width: '48%' }}>
                                      <h3 style={{ marginBottom: '20px', color: '#333' }}>Bar Chart</h3>
                                      <MyChart chartData={getChartData(user)} />
                                    </div>
                                    <div className='chartShadow' style={{ backgroundColor: '#f9f9f9', borderRadius: '10px', padding: '20px', width: '48%' }}>
                                      <h3 style={{ marginBottom: '20px', color: '#333' }}>Pie Chart</h3>
                                      <MyPieChart chartData={getChartData(user)} />
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
              ))
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}




export function RemainingAlumnisTable() {
 
  const [unsubmittedUsers, setUnsubmittedUsers] = useState([]);
  const [surveyLink, setSurveyLink] = useState([]);
  const [surveyId, setSurveyId] = useState([]);
  const [loading, setLoading] = useState(false); 


  useEffect(() => {
    // Fetch data from the API
    axios
      .post("https://portal-sigma-two.vercel.app/api/admin/fetchallsurvaydetails")
      .then((response) => {
        const surveys = response.data.surveys || [];
        // Find the survey with the name "Alumni Survey"
        const alumniSurvey = surveys.find((survey) =>
          survey.surveyName.toLowerCase().includes("alumni")
        );

        // Set the unsubmitted users if the Alumni Survey is found
        if (alumniSurvey) {
          setUnsubmittedUsers(alumniSurvey.unsubmittedUsers || []);
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
    const survey = surveyLink.find(survey => survey.surveyName.toLowerCase().includes("alumni"));
    if (survey) {
      setSurveyId(survey._id);
    }

    if (!surveyId) {
      toast.warning("No survey found for Alumni.");
      return;
    }

    // For Dummy Testing
    const emails = ["ym5480012@gmail.com", "zimalmalik989@gmail.com" ];

    // For Remaining Users

    // const emails = unsubmittedUsers ;


    const subject = "Survey Reminder From OBE Convener";
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; background-color: #f4f7f6; padding: 20px; border-radius: 8px; text-align: center;">
        <h2 style="color: #333;">Dear Alumni!</h2>
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
    <div style={{ display: "grid", gap: "10px", placeItems: "center" }}>
  <h3>Send Reminder to Remaining Alumnis</h3>
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

<br></br>


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

        const answerCounts = { 'excellent': 0, 'good': 0, 'fair': 0,'poor':0 };
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
      <h2>Average Graph Results of Alumnis</h2>
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


export function SurveyLink() {
  const [link, setLink] = useState("");

  const handleInputChange = (e) => {
    setLink(e.target.value);
  };

  const handleSendSurveyLink = () => {
    // Implement logic to send survey link
    console.log("Sending survey link:", link);
  };

  return (
    <div style={{ display: "grid", gap: "10px", placeItems: "center" }}>
      <input
        type="text"
        placeholder="Please paste your link"
        value={link}
        onChange={handleInputChange}
        style={{
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          width: "300px",
        }}
      />
      <button
        onClick={handleSendSurveyLink}
        style={{
          backgroundColor: "#ff004e",
          color: "#fff",
          padding: "10px 20px",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Send Survey Link to Alumnis
      </button>
    </div>
  );
}
export default function AlumniTableFiltered() {
  const [show, setShow] = useState(false);
  const [alumniData, setAlumniData] = useState([]);
  const [departmentFilter, setDepartmentFilter] = useState("All"); // State for department filter

  const fetchAlumni = async () => {
    try {
      const response = await axios.post(
        "https://portal-sigma-two.vercel.app/api/admin/fetchalumni"
      );
      console.log(response.data.alumnis);

      setAlumniData(response.data.alumnis);
    } catch (error) {
      console.error("Error fetching Elumni:", error);
    }
  };

  useEffect(() => {
    fetchAlumni();
  }, []);

  const [selectedAlumniData, setSelectedAlumniData] = useState({});


  const handleClose = () => setShow(false);
  const handleShow = (row) => {
    setSelectedAlumniData(row);
    setShow(true);
  };

  const handleInputChanges = (e) => {
    const { name, value } = e.target;
    console.log(`Changing ${name} to ${value}`); // Debugging line
    setSelectedAlumniData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
  try {
    const response = await axios.put('https://portal-sigma-two.vercel.app/api/admin/edituser', {
      userId: selectedAlumniData._id,
      updatedUser: {
        firstName: selectedAlumniData.firstName,
        lastName: selectedAlumniData.lastName,
        universityName: selectedAlumniData.universityName,
        email: selectedAlumniData.email,
        userRole: selectedAlumniData.userRole
      }
    });

    console.log("Updated data:", response.data);
    toast.success("Alumni updated successfully");

    // Re-fetch the data to refresh the table
    await fetchAlumni();
    
    handleClose();
  } catch (error) {
    console.error("Error updating user:", error);
    toast.error("Failed to update alumni");
  }
};

  const handleDeleteAlumni = async (id) => {
    try {
      const response = await axios.delete(
        "https://portal-sigma-two.vercel.app/api/admin/deleteuser",
        {
          data: { userId: id } // Send the Id in the data property
        }
        
      );
      
      toast.success(" Alumni Deleted Successfully");
      await fetchAlumni();

    } catch (error) {
      console.error("Error deleting survey:", error.message);
    }
  };


  // Sample alumni data
  const alumniList = [
    { id: 1, name: "Alumni 1", department: "CS" },
    { id: 2, name: "Alumni 2", department: "AI" },
    { id: 3, name: "Alumni 3", department: "CS" },
    { id: 4, name: "Alumni 4", department: "EE" },
    { id: 5, name: "Alumni 5", department: "CS" },
  ];

  // Filter alumni based on department
  const filteredAlumni =
    departmentFilter === "All"
      ? alumniList
      : alumniList.filter((alumni) => alumni.department === departmentFilter);

  const handleDepartmentFilterChange = (e) => {
    setDepartmentFilter(e.target.value);
  };

  return (
    <div>
      <div className="py-5 px-2 d-flex flex-wrap justify-content-between">
        <h3>Alumni List</h3>
        {/* <select
          className="form-select w-25   fw-bold"
          onChange={handleDepartmentFilterChange}
          value={departmentFilter}
        >
          <option value="All">All</option>
          <option value="CS">CS</option>
          <option value="AI">AI</option>
          <option value="EE">EE</option>
        </select> */}
      </div>
      <div style={{ maxHeight: "400px", overflowY: "auto" }}>
        <table className="custom-table">
          <thead>
            <tr>
              <th>All</th>
              <th>ID</th>
              <th>Name</th>
              <th>University</th>
              <th>email</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {alumniData.length == 0 ? (
              <h3>No record found</h3>
            ) : (
              alumniData.map((elumni, index) => (
                <tr key={elumni._id}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{`${index + 1}`}</td>
                  <td>{elumni.firstName + " " + elumni.lastName}</td>
                  <td>{elumni.universityName}</td>
                  <td>{elumni.email}</td>
                  <td className="text-end">
                  <i
                      className="fas fa-edit"
                      data-toggle="tooltip" title="edit"
                      style={{ marginRight: "10px", cursor: "pointer" }}
                      onClick={() => handleShow(elumni)}
                    ></i>
                    <i
                      className="fas fa-trash"
                      data-toggle="tooltip" title="delete"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDeleteAlumni(elumni._id)}
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
      <div

        className="d-flex flex-wrap justify-content-between align-items-center py-3"
      >
        <h3>Remaining Users</h3>
      </div>

      <br></br>

      <div
        style={{
          maxHeight: "400px",
          overflowY: "auto",
        }}
      >
        <RemainingAlumnisTable />
      </div>
      <br></br>

     

      <GraphResults />
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-center w-100 h5">
            Edit Alumni
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="ID"
              name="id"
              value={selectedAlumniData._id}
              onChange={handleInputChanges}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <FormControl
              placeholder="First Name"
              name="firstName"
              value={selectedAlumniData.firstName}
              onChange={handleInputChanges}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <FormControl
              placeholder="Last Name"
              name="lastName"
              value={selectedAlumniData.lastName}
              onChange={handleInputChanges}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <FormControl
              placeholder="University Name"
              name="universityName"
              value={selectedAlumniData.universityName}
              onChange={handleInputChanges}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <FormControl
              placeholder="Email"
              name="email"
              value={selectedAlumniData.email}
              onChange={handleInputChanges}
            />
          </InputGroup>

          <Button variant="danger" className="w-100 mb-3" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
}
