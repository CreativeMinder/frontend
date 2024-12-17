import React, { useState, useEffect } from "react";
import axios from 'axios';
import { MyChart } from '../TeachersDashboard/TeachersDashboard';
import { MyPieChart } from '../TeachersDashboard/TeachersDashboard';
import './AverageGraph.css'; // Import the CSS file
// Example fetch functions (replace with actual API calls)


const categories = {
  All: ['very effective', 'somewhat satisfied', 'strongly aligned', 'good', 'somewhat agree', 'strongly agree', 'agree', 'disagree', 'fair'],
  Teachers: ['very effective', 'somewhat satisfied', 'strongly aligned', 'fine'],
  Students: ['somewhat agree', 'strongly agree', 'agree', 'disagree'],
  Alumni: ['excellent', 'good', 'fair'],
  Employer: ['somewhat', 'moderately', 'not at all', 'to a great extent'],
  CQEntries: ['disagree', 'somewhat agree', 'agree', 'good', 'strongly aligned', 'strongly agree', 'very effective']
};

const fetchSurveyData = async () => {
  try {
    const response = await axios.post(
      "https://portal-sigma-two.vercel.app/api/admin/fetchteacherssurvay"
    );

    // Extract all responses and dates from the surveys
    const allfullResponses = response.data.surveys.flatMap(survey =>
      survey.submittedUsers.flatMap(user => user.answers)
    );
    const allDates = response.data.surveys.flatMap(survey =>
      survey.submittedUsers.flatMap(user => user.submittedAt || []) // Ensure no undefined values
    );
console.log(allDates)
    // Return the dates fetched from the API
    return {
      allResponses: allDates.map(date => ({ submittedAt: date }))
    };
  } catch (error) {
    console.error("Error fetching survey data:", error);
    return { allResponses: [] }; // Return an empty array in case of an error
  }
};


// const fetchSurveyData = async () => {
//   // Simulate API call
//   return {
//     allResponses: [
//       { submittedAt: "2023-01-15T00:00:00Z" },
//       { submittedAt: "2023-07-20T00:00:00Z" },
//       { submittedAt: "2024-03-10T00:00:00Z" },
//       { submittedAt: "2024-09-30T00:00:00Z" }
//     ]
//   };
// };

const fetchCQData = async () => {
  // Simulate API call for additional data
  return [
    { submittedAt: "2023-05-15T00:00:00Z" },
    { submittedAt: "2024-08-10T00:00:00Z" }
  ];
};

const DynamicPeriodFilter = () => {
  const [periodGap, setPeriodGap] = useState(6); // Default to 6 months gap
  const [availableYears, setAvailableYears] = useState([]); // Available years in the data
  const [selectedYearPeriod, setSelectedYearPeriod] = useState(""); // The selected year and period
  const [filteredResponses, setFilteredResponses] = useState([]); // Filtered survey data
  const [filteredCQData, setFilteredCQData] = useState([]); // Filtered CQ data

  // Function to extract unique years from the data
  const extractYears = (data) => {
    const yearsSet = new Set();
    data.forEach((item) => {
      const date = new Date(item.submittedAt);
      yearsSet.add(date.getFullYear());
    });
    setAvailableYears(Array.from(yearsSet).sort()); // Store unique years
  };

  // Fetch survey and CQ data and extract years
  useEffect(() => {
    const fetchData = async () => {
      const { allResponses } = await fetchSurveyData();
      const cqData = await fetchCQData();

      extractYears(allResponses); // Extract years from survey data
    };

    fetchData();
  }, []);

  // Generate periods dynamically based on the period gap
  const generatePeriods = (year, gap) => {
    const periods = [];
    const monthsInYear = 12;

    for (let startMonth = 0; startMonth < monthsInYear; startMonth += gap) {
      const periodLabel = `${year}(${Math.floor(startMonth / gap) + 1})`;
      periods.push({
        label: periodLabel,
        startMonth,
        endMonth: Math.min(startMonth + gap - 1, monthsInYear - 1)
      });
    }

    return periods;
  };

  // Function to filter data based on selected year and period
  const filterDataByPeriod = (data, dateKey) => {
    if (!selectedYearPeriod) return data; // If no period is selected, return all data

    const [selectedYear, periodNumber] = selectedYearPeriod.match(/\d+/g).map(Number); // Extract year and period number

    const gap = periodGap;
    const startMonth = (periodNumber - 1) * gap;
    const endMonth = Math.min(startMonth + gap - 1, 11); // Ensure it doesn't exceed December (month 11)

    return data.filter((item) => {
      const itemDate = item[dateKey] ? new Date(item[dateKey]) : null;
      if (!itemDate) return false;

      return (
        itemDate.getFullYear() === selectedYear &&
        itemDate.getMonth() >= startMonth &&
        itemDate.getMonth() <= endMonth
      );
    });
  };

  // Apply filter when period or periodGap changes
  useEffect(() => {
    const fetchData = async () => {
      const { allResponses } = await fetchSurveyData();
      const cqData = await fetchCQData();

      // Filter the data based on the selected year and period
      setFilteredResponses(filterDataByPeriod(allResponses, "submittedAt"));
      setFilteredCQData(filterDataByPeriod(cqData, "submittedAt"));
    };

    fetchData();
  }, [periodGap, selectedYearPeriod]);

  return (
    <div>
      {/* Period Gap Adjustment */}
      <div>
        <label htmlFor="gap-select">Set Period Gap (in months): </label>
        <input
          id="gap-select"
          type="number"
          value={periodGap}
          onChange={(e) => setPeriodGap(Number(e.target.value))}
          min="1"
          max="12"
        />
      </div>

      {/* Dynamic Select Box for Periods */}
      <div className="date-selector" style={{ marginBottom: "16px" }}>
        <label htmlFor="date-select">Select Period: </label>
        <select
          id="date-select"
          value={selectedYearPeriod}
          onChange={(e) => setSelectedYearPeriod(e.target.value)}
        >
          <option value="">--Select Period--</option>
          {availableYears.map((year) => {
            const periods = generatePeriods(year, periodGap);
            return periods.map((period) => (
              <option key={period.label} value={period.label}>
                {period.label} ({period.startMonth + 1} to {period.endMonth + 1})
              </option>
            ));
          })}
        </select>
      </div>

      {/* Display Filtered Data */}
      <div>
        <h3>Filtered Survey Responses:</h3>
        <pre>{JSON.stringify(filteredResponses, null, 2)}</pre>

        <h3>Filtered CQ Data:</h3>
        <pre>{JSON.stringify(filteredCQData, null, 2)}</pre>
      </div>
    </div>
  );
};

export default DynamicPeriodFilter;
