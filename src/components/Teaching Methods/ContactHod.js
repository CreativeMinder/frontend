import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const ContactHod = () => {
  const location = useLocation();
  const Useremail = location.state?.email; // Access the email passed via location

  const [teachingMethods1, setTeachingMethods1] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const getrecommendations = {
    positive: ["Thanks for being satisfied with the CLO."],

    negative: ["It seems there are concerns about the CLO. Please contact the HoD for clarification.",],
    
    other: ["Your answer does not provide sufficient feedback for the CLO."],
  };

  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const response = await axios.post(
          'https://portal-sigma-two.vercel.app/api/admin/fetchteacherssurvay'
        );
        const answerData = [];

        // Iterate over the surveys
        response.data.surveys.forEach((survey) => {
          if (survey.surveyName && survey.surveyName.toLowerCase().includes('teacher')) {
            survey.submittedUsers.forEach((user) => {
              const answerObject = {
                Email: user.answers[2]?.answerText || 'N/A', // Default to 'N/A' if missing
                Answer: user.answers[13]?.answerText || 'N/A', // Default to 'N/A' if missing
              };
              answerData.push(answerObject);
            });
          }
        });

        // Find the user data based on the email
        const userAnswer = answerData.find((item) => item.Email === Useremail);

        if (userAnswer) {
          const userAnswerText = userAnswer.Answer.toLowerCase();

          // Define positive and negative keywords
          // Expanded list of keywords
const positiveKeywords = [
    "clear", "satisfied", "good", "yes", "defined", "effective", 
    "helpful", "precise", "accurate", "organized", "appropriate", 
    "relevant", "informative", "useful", "structured", "understandable", 
    "coherent", "adequate", "reasonable", "detailed", "comprehensive", 
    "supportive", "satisfactory", "encouraging", "logical", "fair", 
    "excellent", "agree", "positive", "constructive", "thorough", 
    "concise", "improved", "clarified", "exemplary", "sufficient", 
    "encouraged", "well-defined", "logical", "valuable", "progressive", 
    "insightful", "enlightening", "beneficial", "great", "suitable", 
    "important", "achievable", "accessible", "aligned", "consistent", 
    "credible", "feasible", "innovative", "measurable", "motivating", 
    "practical", "productive", "reliable", "reasonable", "responsive", 
    "rewarding", "successful", "supportive", "understood", "valid", 
    "well-organized", "worthwhile", "competent", "empowering", 
    "effective communication", "teamwork", "goal-oriented", 
    "trustworthy", "exemplified"
  ];
  
  const negativeKeywords = [
    "not", "does not", "no", "unclear", "confusing", "bad", 
    "ineffective", "irrelevant", "insufficient", "inadequate", 
    "unstructured", "vague", "disorganized", "misleading", 
    "problematic", "incomplete", "inaccurate", "unsatisfactory", 
    "unhelpful", "inappropriate", "unfair", "biased", "negative", 
    "ambiguous", "unsupported", "unreasonable", "lacking", "missing", 
    "uncertain", "contradictory", "flawed", "overwhelming", "complex", 
    "difficult", "poor", "unachievable", "impractical", "conflict", 
    "irreconcilable", "unmotivating", "failure", "criticism", 
    "uninformative", "deterrent", "counterproductive", "unacceptable", 
    "obscure", "problem", "faulty", "untrustworthy", "uncooperative", 
    "restrictive", "overcomplicated", "challenging", "unfeasible", 
    "inefficient", "disappointing", "regressive", "unresponsive", 
    "pointless", "limited", "flimsy", "unsuitable", "unachievable", 
    "undesirable", "demotivating", "discouraging", "unrewarding", 
    "critical", "substandard", "failure to clarify"
  ];
  

          // Check for negative keywords first (priority)
          const isNegative = negativeKeywords.some((word) =>
            userAnswerText.includes(word)
          );

          // Check for positive keywords
          const isPositive = positiveKeywords.some((word) =>
            userAnswerText.includes(word)
          );

          // Determine the recommendation
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
        console.error('Error fetching data:', error);
        setError('Failed to fetch recommendations. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData1();
  }, [Useremail]); // Dependency on Useremail to fetch correct data

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Recommendations For CLO</h2>
      {loading ? (
        <p>Loading recommendations...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <div
          style={{
            margin: '20px',
            border: '1px solid #ddd',
            borderRadius: '10px',
            padding: '20px',
            background: '#f9f9f9',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            {teachingMethods1.map((method, idx) => (
              <li key={idx} style={{ marginBottom: '10px' }}>
                {method}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ContactHod;
