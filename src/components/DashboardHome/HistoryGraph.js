import React, { useState, useEffect } from "react";
import axios from 'axios';
import { MyChart } from '../TeachersDashboard/TeachersDashboard';
import { MyPieChart } from '../TeachersDashboard/TeachersDashboard';
import './AverageGraph.css'; // Import the CSS file


const combinedCategoriesMapping = {
  'very satisfied': 'very effective',
  'very effective': 'very effective',
  'somewhat satisfied': 'somewhat agree',
  'somewhat agree': 'somewhat agree',
  'moderately': 'somewhat agree',
  'nuetral': 'nuetral',
  'fair': 'nuetral',
  'agree': 'good',
  'excellent': 'good',
  'good': 'good',
  'disagree': 'disagree',
  'dissatisfied': 'disagree',
  'poor': 'disagree',
  'strongly agree': 'strongly agree',
  'to a great extent': 'strongly agree',
  'strongly aligned': 'strongly agree',
  'not at all': 'not at all'
};

const categories = {
  History: [
    'very effective',
    'somewhat agree',
    'nuetral',
    'good',
    'disagree',
    'strongly agree',
    'not at all',
    'agree',
    'strongly aligned'
  ],
};

// Fetch Survey Data
const fetchSurveyData = async () => {
  try {
    const response = await axios.post(
      "https://portal-sigma-two.vercel.app/api/admin/fetchteacherssurvay"
    );
    const allResponses = response.data.surveys.flatMap(survey =>
      survey.submittedUsers.flatMap(user => ({
        submittedAt: user.submittedAt,
        answers: user.answers
      }))
    );
    return allResponses;
  } catch (error) {
    console.error("Error fetching survey data:", error);
    return [];
  }
};

// Fetch CQ Data
const fetchCQData = async () => {
  try {
    const response = await axios.post(
      "https://portal-sigma-two.vercel.app/api/admin/fetchcq"
    );
    return response.data.cqEntries.map(entry => ({
      submittedAt: entry.submittedAt,
      answers: entry
    }));
  } catch (error) {
    console.error("Error fetching CQ data:", error);
    return [];
  }
};

export default function AverageGraph() {
  const [chartData, setChartData] = useState({ labels: [], values: [] });
  const [improvementData, setImprovementData] = useState({ improvementLabels: [], improvementValues: [] });
  const [category, setCategory] = useState('History');
  const [availableYears, setAvailableYears] = useState([]);
  const [selectedYearPeriod, setSelectedYearPeriod] = useState(""); // The selected year and period
  const [periodGap, setPeriodGap] = useState(6); // Default to 6 months gap
  const [allResponses, setAllResponses] = useState([]); // Store fetched data
  const [previousResult, setPreviousResult] = useState(null);
  const [improvementText, setImprovementText] = useState(''); // Store improvement result text
  
  // Extract unique years from the data
  const extractYears = (data) => {
    const yearsSet = new Set();
    data.forEach(item => {
      const date = new Date(item.submittedAt);
      yearsSet.add(date.getFullYear());
    });
    setAvailableYears([...yearsSet].sort());
  };

  useEffect(() => {
    // Fetch survey and CQ data and extract years
    const fetchData = async () => {
      const surveyData = await fetchSurveyData();
      const cqData = await fetchCQData();

      const combinedData = [...surveyData, ...cqData];
      setAllResponses(combinedData);

      extractYears(combinedData);
    };

    fetchData();
  }, []);

  // Generate periods dynamically based on the period gap
  const generatePeriods = (year, gap) => {
    if (!year) {
      return []; // Return an empty array if year is not defined
    }
    const periods = [];
    const monthsInYear = 12;

    for (let startMonth = 0; startMonth < monthsInYear; startMonth += gap) {
      const periodLabel = `${year} (${Math.floor(startMonth / gap) + 1})`;
      periods.push({
        label: periodLabel,
        startMonth,
        endMonth: Math.min(startMonth + gap - 1, monthsInYear - 1)
      });
    }
    return periods;
  };

  // Filter data based on selected year and period
  const filterDataByPeriod = (data) => {
    if (!selectedYearPeriod) return data;

    const [selectedYear, periodNumber] = selectedYearPeriod.match(/\d+/g).map(Number);
    const gap = periodGap;
    const startMonth = (periodNumber - 1) * gap;
    const endMonth = Math.min(startMonth + gap, 11); // Ensure it doesn't exceed December

    return data.filter(item => {
      const date = new Date(item.submittedAt);
      return date.getFullYear() === selectedYear &&
        date.getMonth() >= startMonth && date.getMonth() <= endMonth;
    });
  };

  useEffect(() => {  
    const filteredData = filterDataByPeriod(allResponses);  
    const answerCounts = categories[category].reduce((acc, label) => {  
        acc[label] = 0;  
        return acc;  
    }, {});  

    let totalAnswers = 0;  
    filteredData.forEach(item => {  
        if (Array.isArray(item.answers)) {  
            item.answers.forEach(answer => {  
                const answerText = answer.answerText.toLowerCase();  
                const mappedAnswerText = combinedCategoriesMapping[answerText] || answerText;  
                if (answerCounts.hasOwnProperty(mappedAnswerText)) {  
                    answerCounts[mappedAnswerText]++;  
                    totalAnswers++;  
                }  
            });  
        } else {  
            console.warn('item.answers is not an array:', item.answers);  
        }  
    });  

    const labels = Object.keys(answerCounts);  
    const values = labels.map(label => (totalAnswers > 0 ? (answerCounts[label] / totalAnswers) * 100 : 0));  

    console.log("Current values:", values);  
    setChartData({ labels, values });  

    if (previousResult) {  
        let totalImprovement = 0;  
        let totalNeutral = 0;  
        let totalNoImprovement = 0;  
        let countComparisons = 0;  

        const previousValuesMap = new Map(previousResult.labels.map((label, index) => [label, previousResult.values[index]]));  
        console.log("Previous values:", Array.from(previousValuesMap.entries()));  

        labels.forEach((label, index) => {  
            const currentValue = values[index];  
            const previousValue = previousValuesMap.get(label) || 0;  

            // Calculate Improvement  
            let improvement = 0;  
            if (previousValue > 0) {  
                improvement = ((currentValue - previousValue) / previousValue) * 100;  
            } else if (previousValue === 0 && currentValue > 0) {  
                improvement = 100;  
            }  

            // Increment counts based on the comparison  
            if (currentValue === previousValue) {  
                totalNeutral++;  
            } else if (currentValue < previousValue) {  
                totalNoImprovement += ((previousValue - currentValue) / previousValue) * 100;  
            } else if (improvement > 0) {  
                totalImprovement += improvement;  
            }  

            countComparisons++;  
        });  

        // Calculate percentages  
        const totalComparisons = countComparisons > 0 ? countComparisons : 1;  
        let improvementPercentage = (totalImprovement / totalComparisons) || 0;  
        let neutralPercentage = (totalNeutral / totalComparisons) * 100 || 0;  
        let noImprovementPercentage = (totalNoImprovement / totalComparisons) || 0;  

        // Ensure percentages are valid around 100%  
        let totalPercentage = improvementPercentage + neutralPercentage + noImprovementPercentage;  

        // Normalize values to sum to 100%  
        if (totalPercentage > 0) {  
            const adjustmentFactor = 100 / totalPercentage;  
            improvementPercentage *= adjustmentFactor;  
            neutralPercentage *= adjustmentFactor;  
            noImprovementPercentage *= adjustmentFactor;  
        }  

        // Ensure the percentages are not exceeding 100% due to rounding  
        improvementPercentage = Math.min(100, Math.max(0, improvementPercentage));  
        neutralPercentage = Math.min(100, Math.max(0, neutralPercentage));  
        noImprovementPercentage = Math.min(100, Math.max(0, noImprovementPercentage));  

        // Log adjusted percentages  
        // console.log(`Adjusted Percentages:\n- Improvement: ${improvementPercentage.toFixed(2)}%\n- Neutral: ${neutralPercentage.toFixed(2)}%\n- Non Improvement: ${noImprovementPercentage.toFixed(2)}%`);  

        // Check to correct rounding errors that might lead to total exceeding 100  
        const finalTotal = improvementPercentage + neutralPercentage + noImprovementPercentage;  
        if (finalTotal !== 100) {  
            const correctionFactor = 100 / finalTotal;  
            improvementPercentage *= correctionFactor;  
            neutralPercentage *= correctionFactor;  
            noImprovementPercentage *= correctionFactor;  
        }  


console.log("**************", improvementText);

// Split the text by lines
const lines = improvementText.split('\n');

// Initialize temporary arrays with different names
const tempImprovementLabels = [];
const tempImprovementValues = [];

// Loop through each line to extract the label and value
lines.forEach(line => {
  const [label, value] = line.split(':').map(item => item.trim());
  
  tempImprovementLabels.push(label); // Store the label
  tempImprovementValues.push(parseFloat(value)); // Store the value as a number
});

// Update the state with the extracted data using correct keys
// Update the parent component when setting improvementData
setImprovementData({
  labels: tempImprovementLabels, // Pass improvementLabels as labels
  values: tempImprovementValues  // Pass improvementValues as values
});


// Remove the log after the state update, since it's asynchronous
// console.log("Updated improvementData:", improvementData);

        
        // Set the final output text  
        setImprovementText(`Improvement: ${improvementPercentage.toFixed(2)}%\nNeutral: ${neutralPercentage.toFixed(2)}%\nNon Improvement: ${noImprovementPercentage.toFixed(2)}%`);  
    } else {  
        setImprovementText('No previous data to compare.');  
    }  

    setPreviousResult({ labels, values });  
}, [selectedYearPeriod, category]);


// useEffect(() => {
//   if (improvementData.improvementLabels.length > 0) {
//     console.log("Updated improvementData:", improvementData);
//   }
// }, [improvementData]);

  return (
    <div className="container-fluid px-5 text-center" style={{  minHeight: "100vh" }}>
  <div
    className="navbar navbar-expand-lg text-end py-4 mb-4"
    style={{
      backgroundColor: "#fff",
      boxShadow:
        "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px",
      borderRadius: "16px",
      textAlign: "center"
    }}
  >
    <div className="d-flex flex-wrap justify-content-center align-items-center px-4 w-100">
      <h3 style={{ color: "#333", fontWeight: "bold", textAlign:"center"}}>Continuous Quality Improvement</h3>
    </div>
  </div>


  {/* Period selection */}
  <div className="my-4">
    <label className="my-2" style={{ fontSize: "1.2rem", fontWeight: "500" }}>Select Semester: </label>
    <br />
    <select
  onChange={(e) => setSelectedYearPeriod(e.target.value)}
  style={{
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1px solid #ff004e",
    backgroundColor: "#fff",
    fontSize: "1rem",
    boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
    outline: "none",
    transition: "box-shadow 0.3s ease",
  }}
  value={selectedYearPeriod || "defaultOption"} // Set default semester option here
  onMouseOver={(e) => (e.target.style.boxShadow = "0px 4px 10px rgba(0,0,0,0.15)")}
  onMouseOut={(e) => (e.target.style.boxShadow = "0px 2px 5px rgba(0,0,0,0.1)")}
>
  <option value="defaultOption" disabled>
    Select semester
  </option>
  {availableYears.map((year) =>
    generatePeriods(year, periodGap).map((period) => {
      const [yearPart, termPart] = period.label.split(" ");
      const term = termPart === "(1)" ? "Spring" : termPart === "(2)" ? "Fall" : "";
      return (
        <option key={period.label} value={period.label}>
          {`${term} ${yearPart} `}
        </option>
      );
    })
  )}
</select>


  </div>


  {/* Category buttons */}
  {/* <div className="button-group my-4">
    {Object.keys(categories).map((key) => (
      <button
        key={key}
        onClick={() => setCategory(key)}
        className={`category-btn ${category === key ? 'active' : ''}`}
        style={{
          padding: "10px 20px",
          margin: "5px",
          border: "none",
          borderRadius: "8px",
          backgroundColor: category === key ? "#4A90E2" : "#dc3545",
          color: "#fff",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#357ABD")}
        onMouseOut={(e) => (e.target.style.backgroundColor = category === key ? "#4A90E2" : "#ccc")}
      >
        {key}
      </button>
    ))}
  </div> */}

  <h4 className="mb-4" style={{ fontWeight: "600" }}>Specific Semester Graph</h4>

  {/* Chart containers */}
  <div className="chart-container" style={{ display: 'flex', justifyContent: 'space-between', gap: '24px', padding: '20px' }}>
  <div
    className="chart-item-container"
    style={{
      flex: '1 1 60%',
      borderRadius: '20px',
      border: "2px solid #dc3545",
      padding: "30px",
      backgroundColor: "#f9f9fb",
      boxShadow: '0px 8px 20px rgba(220, 53, 69, 0.4)',  // Updated box shadow color
     transition: "transform 0.3s ease, box-shadow 0.3s ease",
    }}
    data-aos="fade-right"
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "scale(1.03)";
      e.currentTarget.style.boxShadow = "0px 10px 25px rgba(220, 53, 69, 0.6)"; // Brighter shadow on hover
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "scale(1)";
      e.currentTarget.style.boxShadow = "0px 8px 20px rgba(220, 53, 69, 0.4)"; // Original shadow color
    }}
  >
    <div className="chart-item">
      <h3 style={{ color: "#34495E", fontWeight: "bold", fontSize: "1.6rem", marginBottom: "20px" }}>Line Graph</h3>
      <MyChart chartData={chartData} />
    </div>
  </div>

  <div
    className="chart-item-container"
    style={{
      flex: '1 1 40%',
      borderRadius: '20px',
      border: "2px solid #dc3545",
      padding: "30px",
      backgroundColor: "#f9f9fb",
      boxShadow: '0px 8px 20px rgba(220, 53, 69, 0.4)',  // Updated box shadow color
     transition: "transform 0.3s ease, box-shadow 0.3s ease",
    }}
    data-aos="fade-left"
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "scale(1.03)";
      e.currentTarget.style.boxShadow = "0px 10px 25px rgba(220, 53, 69, 0.6)"; // Brighter shadow on hover
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "scale(1)";
      e.currentTarget.style.boxShadow = "0px 8px 20px rgba(220, 53, 69, 0.4)"; // Original shadow color
    }}
  >
    <div className="chart-item ">
      <h3 style={{ color: "#34495E", fontWeight: "bold", fontSize: "1.6rem", marginBottom: "20px" }}>Pie Chart</h3>
      <MyPieChart chartData={chartData} />
    </div>
  </div>
</div>


  {/* Display the improvement result */}
  {/* <div className="improvement-text my-4" style={{
  padding: "20px",
  backgroundColor: "#ffffff",
  borderRadius: "16px",
  boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.15)",  // Enhanced shadow for a more pronounced effect
  border: "1px solid #e0e0e0",  // Light border to add subtle definition
  maxWidth: "600px",  // Max width for better readability
  margin: "0 auto",  // Center the container
  textAlign: "center"  // Center-align the text
}}>
  <p style={{
    fontSize: "1.2rem",
    fontWeight: "500",
    color: "#333333",
    margin: "0"
  }}>
    {/* {improvementText || "No improvement data available."} */}
  {/* </p> */}
{/* </div> */} 

{/*  */}
<div className="d-flex flex-wrap justify-content-center align-items-center px-4 w-100">
      <h3 style={{ color: "#333", fontWeight: "bold", textAlign:"center"}}>Comparing Result</h3>
    </div>
<div className="chart-container" style={{ display: 'flex', justifyContent: 'space-between', gap: '24px', padding: '20px' }}>
  <div
    className="chart-item-container"
    style={{
      flex: '1 1 60%',
      borderRadius: '20px',
      border: "2px solid #dc3545",
      padding: "30px",
      backgroundColor: "#f9f9fb",
      boxShadow: '0px 8px 20px rgba(220, 53, 69, 0.4)',  // Updated box shadow color
     transition: "transform 0.3s ease, box-shadow 0.3s ease",
    }}
    data-aos="fade-right"
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "scale(1.03)";
      e.currentTarget.style.boxShadow = "0px 10px 25px rgba(220, 53, 69, 0.6)"; // Brighter shadow on hover
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "scale(1)";
      e.currentTarget.style.boxShadow = "0px 8px 20px rgba(220, 53, 69, 0.4)"; // Original shadow color
    }}
  >
    <div className="chart-item">
      <h3 style={{ color: "#34495E", fontWeight: "bold", fontSize: "1.6rem", marginBottom: "20px" }}>Line Graph</h3>
      <MyChart chartData={improvementData} />
    </div>
  </div>

  <div
    className="chart-item-container"
    style={{
      flex: '1 1 40%',
      borderRadius: '20px',
      border: "2px solid #dc3545",
      padding: "30px",
      backgroundColor: "#f9f9fb",
      boxShadow: '0px 8px 20px rgba(220, 53, 69, 0.4)',  // Updated box shadow color
     transition: "transform 0.3s ease, box-shadow 0.3s ease",
    }}
    data-aos="fade-left"
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "scale(1.03)";
      e.currentTarget.style.boxShadow = "0px 10px 25px rgba(220, 53, 69, 0.6)"; // Brighter shadow on hover
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "scale(1)";
      e.currentTarget.style.boxShadow = "0px 8px 20px rgba(220, 53, 69, 0.4)"; // Original shadow color
    }}
  >
    <div className="chart-item ">
      <h3 style={{ color: "#34495E", fontWeight: "bold", fontSize: "1.6rem", marginBottom: "20px" }}>Pie Chart</h3>
      <MyPieChart chartData={improvementData} />
    </div>
  </div>
</div>



    {/*  */}

</div>

  );
}