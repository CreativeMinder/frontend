// show left nave bar

import React, { useState } from 'react';
import "./DashBoardNavbar.css";

export default function DashBoardNavbar({ onItemClick }) {

  const [activeItem, setActiveItem] = useState('dashboard'); // Default active item is 'dashboard'

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
    onItemClick(itemName);
  };

  return (
    <div className="unique-sidebar bg-danger unique-text-light p-0 ">
      <div className="p-3 py-5 text-white d-flex flex-column justify-content-center align-items-center">
        <i className="fas fa-user-circle text-white m-0" style={{ fontSize: "100px" }}>
        </i>
        <h3 className='p-0 m-0 mt-2 fw-bolder'><span className='text-dark'>Ravia</span>Iqbal</h3>
        <p className='mt-1 m-0'>raviaiqbal@gmail.com</p>
      </div>
      <ul className="list-unstyled unique-components p-0 m-0 fw-bold ps-4 menu">
        <li className={`mb-3 unique-dashboard-btns px-3 ${activeItem === 'dashboard' ? 'unique-bg-active-nav' : ''}`} onClick={() => handleItemClick('dashboard')}>
          <i className="me-2 fas fa-chart-line"></i> <a href="#" className="text-decoration-none">Dashboard</a>
        </li>
        <li className={`mb-3 unique-dashboard-btns px-3 ${activeItem === 'surveys' ? 'unique-bg-active-nav' : ''}`} onClick={() => handleItemClick('surveys')}>
          <i className="me-2 fas fa-file-invoice-dollar"></i> <a href="#" className="text-decoration-none">Surveys</a>
        </li>
        
        <li className={`mb-3 unique-dashboard-btns px-3 ${activeItem === 'teachers' ? 'unique-bg-active-nav' : ''}`} onClick={() => handleItemClick('teachers')}>
          <i className="me-2 fas fa-chalkboard-teacher"></i> <a href="#" className="text-decoration-none">Teachers</a>
        </li>
        <li className={`mb-3 unique-dashboard-btns px-3 ${activeItem === 'passstudents' ? 'unique-bg-active-nav' : ''}`} onClick={() => handleItemClick('passstudents')}>
          <i className="me-2 fas fa-graduation-cap"></i> <a href="#" className="text-decoration-none">Exit Students</a>
        </li>
        <li className={`mb-3 unique-dashboard-btns px-3 ${activeItem === 'alumni' ? 'unique-bg-active-nav' : ''}`} onClick={() => handleItemClick('alumni')}>
          <i className="me-2 fas fa-user-graduate"></i> <a href="#" className="text-decoration-none">Alumni</a>
        </li>
        <li className={`mb-3 unique-dashboard-btns px-3 ${activeItem === 'employees' ? 'unique-bg-active-nav' : ''}`} onClick={() => handleItemClick('employees')}>
          <i className="me-2 fas fa-briefcase"></i> <a href="#" className="text-decoration-none">Employer</a>
        </li>
        <li className={`mb-3 unique-dashboard-btns px-3 ${activeItem === 'cqi' ? 'unique-bg-active-nav' : ''}`} onClick={() => handleItemClick('cqi')}>
          <i className="me-2 fab fa-alipay"></i> <a href="#" className="text-decoration-none">SLOs data</a>
        </li>
        
        {/* <li className={`mb-3 unique-dashboard-btns px-3 ${activeItem === 'logout' ? 'unique-bg-active-nav' : ''}`} onClick={() => handleItemClick('logout')}>
          <i className="me-2 fas fa-sign-out-alt"></i> <a href="#" className="text-decoration-none">Logout</a>
        </li> */}
      </ul>
    </div>
  );
}
