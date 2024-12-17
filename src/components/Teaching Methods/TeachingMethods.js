//not use
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const TeachingRecommendations = () => {
  const location = useLocation();
  const Useremail = location.state?.email; // Access the email passed via location

  const [teachingMethods, setTeachingMethods] = useState([]);
  const [answerObject, setAnswerObject] = useState([]); // Array to store answers

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('https://portal-sigma-two.vercel.app/api/admin/fetchteacherssurvay');

        const answerData = [];

        // Iterate over the surveys
        response.data.surveys.forEach((survey) => {
          // Check if survey name includes 'teacher'
          if (survey.surveyName && survey.surveyName.toLowerCase().includes('teacher')) {
            survey.submittedUsers.forEach((user) => {
              const answerObject = {
                Email: user.answers[2]?.answerText, // Assuming index 2 holds relevant email-answer
                Answer: user.answers[12]?.answerText, // Assuming index 12 holds the relevant answer text
              };
              answerData.push(answerObject);
            });
          }
        });

        setAnswerObject(answerData); // Set the answerObject data

        // Find the user data based on the email
        const userAnswer = answerData.find((item) => item.Email === Useremail);
        if (userAnswer) {
          const userAnswerText = userAnswer.Answer?.toLowerCase() || '';

          // Check if the response contains "CLOs"
          if (userAnswerText.includes('clos')) {
            setTeachingMethods(['Contact with HOD']); // Recommendation if "CLOs" is present
          } else {
            setTeachingMethods([]); // No recommendations if "CLOs" is not present
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [Useremail]); // Dependency on Useremail to fetch correct data

  return (
    <div style={{ padding: '20px' }}>
      <h2>Recommendations for Teaching</h2>
      {teachingMethods.length > 0 ? (
        <div style={{ margin: '20px', border: '1px solid #ddd', borderRadius: '10px', padding: '10px' }}>
          <ul>
            {teachingMethods.map((method, idx) => (
              <li key={idx}>{method}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No recommendations available.</p>
      )}
    </div>
  );
};

export default TeachingRecommendations;
