import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClosTips = () => {
  const [submittedSurveys, setSubmittedSurveys] = useState([]);
  const [programTips, setProgramTips] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('https://portal-sigma-two.vercel.app/api/admin/fetchteacherssurvay');
        console.log('Survey Data:', response);
        setSubmittedSurveys(response.data.surveys);

        // Create a map to group programs by the prefix of their tip (e.g., 'clo9', 'clo10')
        const tipProgramMap = {};

        response.data.surveys.forEach(survey => {
          // Check if survey.name includes 'teacher'
          if (survey.surveyName && survey.surveyName.toLowerCase().includes('teacher')) {
            survey.submittedUsers.forEach(user => {
              const program = user.answers[4]?.answerText || 'N/A';
              const tip = user.answers[13]?.answerText.toLowerCase() || 'N/A';

              if (program && tip !== 'no' && tip !== 'nope' && tip !== 'nill' && tip !== 'never') {
                // Extract the prefix of the tip (e.g., 'clo9', 'clo10')
                const tipPrefix = tip.split(' ')[0];

                // Group programs by the tip prefix
                if (!tipProgramMap[tipPrefix]) {
                  tipProgramMap[tipPrefix] = { tip, programs: [] };
                }
                if (!tipProgramMap[tipPrefix].programs.includes(program)) {
                  tipProgramMap[tipPrefix].programs.push(program);
                }
              }
            });
          }
        });

        // Convert the map to an array of objects for rendering
        const groupedProgramTips = Object.values(tipProgramMap);

        setProgramTips(groupedProgramTips); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container my-4">
      <div className="d-flex flex-wrap justify-content-center align-items-center px-4 w-100">
        <h3 style={{ color: "#4A4A4A", fontWeight: "bold", textAlign: "center", fontSize: "2rem" }}>
          CLOs Recommendations
        </h3>
      </div>
      <div>
        {programTips.length > 0 ? (
          programTips.map((entry, index) => (
            <div
              key={index}
              className="shadow-lg p-4 mb-4 rounded-4 bg-light"
              style={{
                borderLeft: "6px solid #ff004e",
                backgroundColor: "#ff004e",
              }}
            >
              <h5 style={{ fontWeight: "bold", color: "#333", marginBottom: "1rem" }}>
                <span style={{ color: "#ff004e" }}>Program:</span>{' '}
                {Array.isArray(entry.programs) ? entry.programs.join(', ') : 'N/A'}
              </h5>
              <p style={{ fontSize: "1rem", color: "#555", lineHeight: "1.6" }}>
                <strong style={{ color: "#ff004e" }}>Tip:</strong> {entry.tip}
              </p>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", color: "#666", fontStyle: "italic", fontSize: "1.2rem" }}>
            No data available.
          </p>
        )}
      </div>
    </div>
  );
};

export default ClosTips;
