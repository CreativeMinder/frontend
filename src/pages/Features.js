import React from 'react';
import { FaDatabase, FaUniversity, FaBriefcase, FaChartPie, FaSync, FaLightbulb, FaFileAlt } from 'react-icons/fa';

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
export default function Features() {
    const cardData = [
        {
          title: "Data Collection and Integration",
          content: "Gathers data from exit students, alumni, employers, and teachers.",
          icon: FaDatabase
        },
        {
          title: "OBE Integration",
          content: "Incorporates OBE principles to define Student Outcomes (SOs) and Course Learning Outcomes (CLOs).",
          icon: FaUniversity
        },
        {
          title: "Employability Analysis",
          content: "Assesses graduate skills against job market demands.",
          icon: FaBriefcase
        },
        {
          title: "Reporting and Visualization",
          content: "Provides reports and visualizations highlighting university performance and growth opportunities.",
          icon: FaChartPie
        },
        {
          title: "Continuous Improvement",
          content: "Ensures ongoing updates and enhancements to stay aligned with educational trends.",
          icon: FaSync
        },
        {
          title: "Actionable Recommendations",
          content: "Offers data-driven suggestions to improve academic programs and infrastructure.",
          icon: FaLightbulb
        },
        {
          title: "Reporting and Insights",
          content: "Summarizes survey results and educational outcomes for comprehensive analysis.",
          icon: FaFileAlt
        }
      ];

  return (
    <>
      <div className='py-5 container'>
      <h1 className="w-100 text-center pb-5">Our Features</h1>
      <p className='py-1 w-100 text-center'>Empowers decision-makers with data-driven insights for continuous quality improvement and strategic development, fostering sustained excellence in education.</p>
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
