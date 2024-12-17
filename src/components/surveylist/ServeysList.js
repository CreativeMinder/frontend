import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

export function SurveyCard({ id, name }) {
  const handleViewDetails = () => {
    window.location.href = `/submitsurvey/${id}`;
  };
  return (
    <>
      <div
        className="card  bg-transparent text-white"
        style={{ maxWidth: "18rem", border: "2px solid #ff004e" }}
      >
        <div className="card-body text-center">
          <h3 className="text-dark">
            ID: <p style={{ fontSize: 18, fontWeight: 400 }}>{id}</p>{" "}
          </h3>
          <h3 className="card-title text-dark">
            Survey Name <p style={{ fontSize: 18, fontWeight: 400 }}>{name}</p>{" "}
          </h3>

          <button
            type="button"
            className="btn text-white"
            onClick={handleViewDetails}
            style={{ backgroundColor: "#ff004e" }}
          >
            Solve Survey
          </button>
        </div>
      </div>
    </>
  );
}

export default function ServeysList() {
  const [surveys, setsurveys] = useState([]);
  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await axios.post(
          "https://portal-sigma-two.vercel.app/api/admin/fetchsurveys"
        );
        // console.log(response.data);
        // console.log("Here is my guessed data:", response.data.surveys);
        setsurveys(response.data.surveys);
        // console.log("This is survey:", surveys);
      } catch (error) {
        console.error("Error fetching surveys:", error);
      }
    };

    fetchSurveys();
  });
  //   const surveyIds = ["1", "2", "3", "4", "5", "6", "7"]; // Example survey IDs, you can replace these with your actual IDs

  return (
    <div className="py-5">
      <h1 className="w-100 text-center pb-5">New Surveys List</h1>
      <div className="d-flex flex-wrap justify-content-center gap-5">
        {surveys.map((survey, id) => (
          <SurveyCard key={id} id={survey._id} name={survey.surveyName} />
        ))}
      </div>
    </div>
  );
}
