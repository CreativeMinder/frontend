import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import InterestList from '../components/LearningMaterial/LearningMaterial';

const StudentsRecommendations = () => {
  const [interest, setInterest] = useState('');
  const [showBooks, setShowBooks] = useState(true);
  const [books, setBooks] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [showButtons, setShowButtons] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [activeSection, setActiveSection] = useState('books'); // State for active button

  useEffect(() => {
    const fetchBooks = async () => {
      if (interest) {
        setLoading(true);
        try {
          const payload = { score: 40, subject: interest };
          const response = await axios.post('https://portal-sigma-two.vercel.app/api/user/fetchbooks', payload);
          setBooks(response.data.books);
          setShowBooks(true);
          setShowButtons(true);
        } catch (error) {
          console.error('Error fetching books:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchBooks();
  }, [interest]);

  const handleBooksClick = () => {
    setShowBooks(true);
    setShowRoadmap(false);
    setActiveSection('books');
  };

  const handleJobsClick = async () => {
    setShowBooks(false);
    setShowRoadmap(false);
    setActiveSection('jobs');
    setLoading(true);
    try {
      const payload = { interest, score: 63 };
      const response = await axios.post('https://portal-sigma-two.vercel.app/api/user/fetchjobs', payload);
      setJobs(response.data.jobs);
      // console.log(response.data.jobs)
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoadmapClick = () => {
    setShowRoadmap(true);
    setShowBooks(false);
    setActiveSection('roadmap');
  };

  return (
    <div className="container my-4">
      {loading && (
        <div className="text-center my-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {!loading && (
        <>
          {showButtons && (
            <div className="text-center mb-4">
              <button
                className={`btn mx-2 ${activeSection === 'books' ? 'btn-danger' : 'btn-outline-danger'}`}
                onClick={handleBooksClick}
              >
                Books
              </button>
              <button
                className={`btn mx-2 ${activeSection === 'jobs' ? 'btn-danger' : 'btn-outline-danger'}`}
                onClick={handleJobsClick}
              >
                Jobs & Learning Material
              </button>
              <button
                className={`btn mx-2 ${activeSection === 'roadmap' ? 'btn-danger' : 'btn-outline-danger'}`}
                onClick={handleRoadmapClick}
              >
                Roadmap
              </button>
            </div>
          )}

          {!showButtons && (
            <>
              <h1 className="text-center mb-4">Select Your Interest</h1>
              <div className="mb-3">
                <label htmlFor="interest" className="form-label">Choose a subject:</label>
                <select
                  id="interest"
                  className="form-select"
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                >
                  <option value="">Select an option</option>
                  <option value="Electrical Engineering">Electrical Engineering</option>
                  {/* <option value="Computer Science">Computer Science</option> */}
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Graphic Design">Graphic Design</option>
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                  <option value="Artificial Intelligence">Artificial Intelligence</option>
                  <option value="Mobile App Development">Mobile App Development</option>
                  <option value="Cloud Computing">Cloud Computing</option>
                  <option value="Blockchain Technology">Blockchain Technology</option>
                  <option value="Game Development">Game Development</option>
                  <option value="Software Testing">Software Testing</option>
                  <option value="Network Engineering">Network Engineering</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Robotics">Robotics</option>
                  <option value="Business Analytics">Business Analytics</option>
                  <option value="Augmented Reality (AR)">Augmented Reality (AR)</option>
                  <option value="Virtual Reality (VR)">Virtual Reality (VR)</option>
                  <option value="Internet of Things (IoT)">Internet of Things (IoT)</option>
                  <option value="Big Data">Big Data</option>
                </select>
              </div>
            </>
          )}

          {showBooks && showButtons && (
            <>
              <h1 className="text-center mb-5">Recommended Books</h1>
              <div className="row">
                {books.map((book, index) => (
                  <div key={index} className="col-lg-12 col-md-12 col-sm-12 mb-4">
                    <div className="row mt-5 border rounded-4" style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
                      <div className="col-12 col-sm-12 col-md-3 col-lg-3 mb-md-0 h-100 d-flex flex-column justify-content-center">
                        <img src={book.thumbnailUrl} alt={book.title} className="img-fluid w-100 h-100" />
                      </div>
                      <div className="col-12 col-sm-12 col-md-9 col-lg-9 d-flex flex-column justify-content-center p-3">
                        <h5>{book.title}</h5>
                        <p>{book.description}</p>
                        <p><strong>Author:</strong> {book.author}</p>
                        <a href={book.bookUrl} target="_blank" rel="noopener noreferrer" className="btn btn-danger" style={{ width: "15rem" }}>
                          View on Amazon
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {showRoadmap && (
            <div className="row">
              <InterestList selectedInterest={interest} />
            </div>
          )}

          {!showBooks && !showRoadmap && showButtons && (
            <div>
            <h1 style={{ textAlign: "center", marginBottom: "2rem", color: "#333", fontFamily: "'Helvetica Neue', sans-serif" }}>Recommended Jobs</h1>
            <div className="row justify-content-center">
                {jobs.length > 0 ? (
                    jobs.map((job, index) => (
                        <div key={index} className="col-lg-3 col-md-4 col-sm-6 col-12 m-3">
                            <div 
                                style={{
                                    borderRadius: "1.5rem", 
                                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)", 
                                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                    border: "1px solid #e2e2e2", // Light border for separation
                                    backgroundColor: "white" // White background for clarity
                                }} 
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "translateY(-5px)";
                                    e.currentTarget.style.boxShadow = "0 15px 30px rgba(0, 0, 0, 0.25)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.15)";
                                }}
                            >
                                <div style={{ padding: "2rem", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
                                    <h5 style={{ color: "#d63384", fontWeight: "bold", fontSize: "1.5rem", margin: "0" }}>{job.jobTitle}</h5>
                                    <p style={{ color: "#555", margin: "0.5rem 0", fontSize: "0.9rem", lineHeight: "1.5" }}>{job.description}</p>
                                    <p style={{ color: "#555", margin: "0.5rem 0", fontSize: "0.9rem", lineHeight: "1.5" }}>
                                        <strong style={{ color: "#d63384" }}>Job Description:</strong> {job.jobTitle}
                                    </p>
                                    <a 
                                        href={job.jobLink} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        style={{
                                            marginTop: "1.5rem", 
                                            padding: "0.75rem 1.5rem", 
                                            borderRadius: "0.5rem", 
                                            backgroundColor: "#ff6b6b", // Danger color
                                            color: "white", 
                                            textAlign: "center", 
                                            textDecoration: "none", 
                                            fontWeight: "bold",
                                            transition: "background-color 0.3s ease, transform 0.3s ease",
                                            border: "none", // No border for button
                                            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" // Subtle shadow for button
                                        }}
                                        onMouseOver={(e) => {
                                            e.currentTarget.style.backgroundColor = "#ff4d4d"; // Darker shade on hover
                                            e.currentTarget.style.transform = "scale(1.05)";
                                        }}
                                        onMouseOut={(e) => {
                                            e.currentTarget.style.backgroundColor = "#ff6b6b";
                                            e.currentTarget.style.transform = "scale(1)";
                                        }}
                                    >
                                        View Job Details
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12 text-center">
                        <h5 style={{ color: "red", fontFamily: "'Helvetica Neue', sans-serif" }}>Click Again or Check Internet Connection</h5>
                    </div>
                )}
            </div>
        </div>
        
          )}
        </>
      )}
    </div>
  );
};

export default StudentsRecommendations;
