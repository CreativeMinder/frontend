import React from 'react';
import { FaChartBar, FaClipboardList, FaUsers, FaGlobe, FaTools, FaRobot, FaDatabase, FaBook, FaCogs, FaUserFriends, FaLock } from 'react-icons/fa';

export function Card({ title, content, icon: Icon }) {
  return (
    <div className="objcard">
      <div className="card-header">
        {Icon && <Icon className="card-icon" />}
        <h2 className="card-title">{title}</h2>
      </div>
      <p className="card-content">{content}</p>
    </div>
  );
};
export default function Objectives() {
  const cardData = [
    {
      title: "Survey Collection",
      content: "Gathers insights from students, alumni, teachers, and employers.",
      icon: FaUsers
    },
    {
      title: "Survey Design and Distribution",
      content: "Allows custom survey creation and targeted distribution.",
      icon: FaClipboardList
    },
    {
      title: "Visualization",
      content: "Generates charts and graphs for easy data interpretation.",
      icon: FaChartBar
    },
    {
      title: "Integration",
      content: "Connects with university portals to access academic records and performance metrics.",
      icon: FaGlobe
    },
    {
      title: "Improvement Recommendations",
      content: "Provides practical actions for continuous quality improvement.",
      icon: FaTools
    },
    {
      title: "Automated Surveys",
      content: "Addresses the lack of automated systems for surveys and recommendations.",
      icon: FaRobot
    },
    {
      title: "Data Collection",
      content: "Solves issues with manual data collection processes.",
      icon: FaDatabase
    },
    {
      title: "Curriculum Alignment",
      content: "Helps align curriculum with OBE principles.",
      icon: FaBook
    },
    {
      title: "CQI Implementation",
      content: "Facilitates the establishment of a robust CQI framework.",
      icon: FaCogs
    },
    {
      title: "User Engagement",
      content: "Enhances user participation in surveys.",
      icon: FaUserFriends
    },
    {
      title: "Data Security",
      content: "Ensures compliance with data privacy laws.",
      icon: FaLock
    }
  ];

  return (
    <>
      <div className='py-5 container'>
      <h1 className="w-100 text-center pb-5">Our Objectives</h1>
         <div className="card-container d-flex flex-wrap justify-content-center gap-1">
        {cardData.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              content={card.content}
              icon={card.icon}
            />
          ))}
        </div>
      </div>
    </>
  );
}
