//average graph of teacher, students, alumni etc
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MyChart } from '../TeachersDashboard/TeachersDashboard';
import { MyPieChart } from '../TeachersDashboard/TeachersDashboard';
import './AverageGraph.css'; // Import the CSS file
//categories and their lables
const categories = {
    All: [
        'very effective',
        'somewhat agree',
        'nuetral',
        'good',
        'disagree',
        'strongly agree',
        'not at all'
    ],Teachers: ['very satisfied', 'somewhat satisfied', 'nuetral', 'dissatisfied'],
    Students: ['somewhat agree', 'strongly agree', 'agree', 'disagree'],
    Alumni: ['excellent', 'good', 'fair', 'poor'],
    Employer: ['somewhat', 'moderately', 'not at all', 'to a great extent'],
    CQEntries: ['disagree', 'somewhat agree', 'agree', 'good', 'strongly aligned', 'strongly agree', 'very effective'] // New category for CQ entries
};
//map answers to categories for consistency
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



export default function AverageGraph() {
    const [chartData, setChartData] = useState({ labels: [], values: [] });
    const [category, setCategory] = useState('All');

    useEffect(() => {
        //Handles two types of data: Survey Data ,CQ Data
        const fetchSurveyData = async () => {
            try {
                const response = await axios.post(
                    "https://portal-sigma-two.vercel.app/api/admin/fetchteacherssurvay"
                );
                console.log("*((W(E(W(E(WE", response)
                // extract all responses
                const allResponses = response.data.surveys.flatMap(survey =>
                    survey.submittedUsers.flatMap(user => user.answers)
                );
                //if all then use combinedCategoriesMapping function 
                //else use categories labels
                const answerCounts = category === 'All'
                ? Object.keys(combinedCategoriesMapping).reduce((acc, key) => {
                    acc[combinedCategoriesMapping[key]] = 0;
                    return acc;
                }, {})
                : categories[category].reduce((acc, label) => {
                    acc[label] = 0;
                    return acc;
                }, {});

                let totalAnswers = 0;

                allResponses.forEach(answerObj => {
                    const answerText = answerObj.answerText.toLowerCase();
                    const mappedAnswerText = category === 'All' ? combinedCategoriesMapping[answerText] : answerText;

                    if (answerCounts.hasOwnProperty(mappedAnswerText)) {
                        answerCounts[mappedAnswerText]++;
                        totalAnswers++;
                    }
                });

                const labels = Object.keys(answerCounts);
                const values = labels.map(label => (answerCounts[label] / totalAnswers) * 100);

                return { labels, values };
            } catch (error) {
                return { labels: [], values: [] };
            }
        };

        const fetchCQData = async () => {
            try {
                const response = await axios.post(
                    "https://portal-sigma-two.vercel.app/api/admin/fetchcq"
                );

                const cqData = response.data.cqEntries;


                const cqCategoryCounts = {
                    disagree: 0, 'somewhat agree': 0, agree: 0, good: 0, 'strongly aligned': 0, 'strongly agree': 0, 'very effective': 0
                };

                let cqTotalCounts = {
                    disagree: 0, 'somewhat agree': 0, agree: 0, good: 0, 'strongly aligned': 0, 'strongly agree': 0, 'very effective': 0
                };

                cqData.forEach(entry => {
                    Object.keys(entry).forEach(key => {
                        if (key.startsWith('so')) {
                            const value = parseInt(entry[key], 10);
                            if (value >= 0 && value < 16) {
                                cqCategoryCounts['disagree']++;
                                cqTotalCounts['disagree'] += value;
                            } else if (value >= 16 && value < 30) {
                                cqCategoryCounts['somewhat agree']++;
                                cqTotalCounts['somewhat agree'] += value;
                            } else if (value >= 31 && value < 45) {
                                cqCategoryCounts['agree']++;
                                cqTotalCounts['agree'] += value;
                            } else if (value >= 46 && value <= 60) {
                                cqCategoryCounts['good']++;
                                cqTotalCounts['good'] += value;
                            }
                            else if (value >= 61 && value <= 75) {
                                cqCategoryCounts['strongly aligned']++;
                                cqTotalCounts['strongly aligned'] += value;
                            }
                            else if (value >= 76 && value <= 90) {
                                cqCategoryCounts['strongly agree']++;
                                cqTotalCounts['strongly agree'] += value;
                            }
                            else if (value >= 91 && value <= 100) {
                                cqCategoryCounts['very effective']++;
                                cqTotalCounts['very effective'] += value;
                            }
                        }
                    });
                });

                const labels = Object.keys(cqCategoryCounts);
                const values = labels.map(label => {
                    if (cqCategoryCounts[label] > 0) {
                        return cqTotalCounts[label] / cqCategoryCounts[label];
                    } else {
                        return 0;
                    }
                });

                return { labels, values };
            } catch (error) {
                return { labels: [], values: [] };
            }
        };

        const fetchData = async () => {
            let surveyData = { labels: [], values: [] };
            let cqData = { labels: [], values: [] };

            if (category === 'All' || category === 'CQEntries') {
                cqData = await fetchCQData();
            }
            if (category === 'All' || category !== 'CQEntries') {
                surveyData = await fetchSurveyData();
            }

            if (category === 'All') {
                const combinedLabels = [...new Set([...surveyData.labels, ...cqData.labels])];
                const combinedValues = combinedLabels.map(label => {
                    const surveyValue = surveyData.values[surveyData.labels.indexOf(label)] || 0;
                    const cqValue = cqData.values[cqData.labels.indexOf(label)] || 0;
                    return (surveyValue + cqValue) / 2;
                });
                setChartData({ labels: combinedLabels, values: combinedValues });
            } else {
                setChartData(category === 'CQEntries' ? cqData : surveyData);
            }
        };

        fetchData();
    }, [category]);

    return (
        <div className="p-5 text-center">
            <div className="button-group">
                {Object.keys(categories).map(key => (
                    <button
                        key={key}
                        onClick={() => setCategory(key)}
                        className={category === key ? 'active' : ''}
                    >
                        {key}
                    </button>
                ))}
            </div>
            <h4 className="mb-4" style={{ fontWeight: "600" }}>Combined Surveys Graph</h4>

            <div className="chart-container" style={{ display: 'flex', justifyContent: 'space-between', gap: '24px', padding: '20px' }}>
            <div className="chart-item-container"
    style={{
      flex: '1 1 60%',
      borderRadius: '20px',
      border: "2px solid #dc3545",
      padding: "30px",
      backgroundColor: "#f9f9fb",
    //   overflow: 'hidden', 
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
    }}>
    <div className="chart-item">
        <h3 style={{ color: "#34495E", fontWeight: "bold", fontSize: "1.6rem", marginBottom: "20px" }}>Line Graph</h3>
        <MyChart chartData={chartData} />
    </div>
</div>

                <div className="chart-item-container"
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
   }}>
                    <div className="chart-item ">
      <h3 style={{ color: "#34495E", fontWeight: "bold", fontSize: "1.6rem", marginBottom: "20px" }}>Pie Chart</h3>
       <MyPieChart chartData={chartData} />
                    </div>
                </div>
            </div>
        </div>
    );
}
