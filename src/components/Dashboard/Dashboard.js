import React, { useEffect, useState } from 'react';
import Navbar from '../DashboardNav/DashboardNav';
import DashBoardNavbar from '../DashboardNavbar/DashboardNavbar';
import TeachersTable from '../TeachersDashboard/TeachersDashboard.js';
import AlumniTable from '../AlumniDashboard/AlumniDashboard.js';
import PassStudentsTable from '../PassStudents/PassStudents.js';
import Employees from '../EmployeeDashboard/EmployeeDashboard.js';
import DashboardSurvey from '../DashboardSurveys/DashboardSurveys.js';
import DashboardHome from '../DashboardHome/DashboardHome.js';
import CreateNewSurvey from '../CreateNewSurvey/CreateNewSurvey.js'
import SubmitSurvey from '../surveylist/Sumbitsurvey.jsx';
import OneSurvey from '../surveylist/OneSurvey.jsx';
import SurveyForms from '../UserNewSurveys/UserNewSurveys.js';
import './dashboard.css';
import Cqi from '../CQI/cqi.js';
export default function Dashboard() {
    const [selectedComponent, setSelectedComponent] = useState('dashboard'); // Set default selected component to 'dashboard'
    const handleMenuItemClick = (item) => {
        setSelectedComponent(item);
    };

    return (
        <div className="container-fluid m-0 vw-100 vh-100 overflow-hidden">
            <div className="row h-100">
                {/* //sidebar */}
                <div class="col-lg-2 custom-scrollbar">
                    <DashBoardNavbar onItemClick={handleMenuItemClick} />
                </div>
                {/* // main content area */}
                <div className="col-lg-10 p-0 h-100 overflow-scroll-outside">
                    <Navbar onItemClick={handleMenuItemClick} />
                    <div className="p-3 m-0" style={{ backgroundColor: "#fff" }}>
                        <div className=''>
                            {selectedComponent === 'dashboard' && <DashboardHome />}
                            {selectedComponent === 'surveys' && <DashboardSurvey onItemClick={handleMenuItemClick} />}
                            {selectedComponent === 'teachers' && <TeachersTable />}
                            {selectedComponent === 'alumni' && <AlumniTable />}
                            {selectedComponent === 'passstudents' && <PassStudentsTable />}
                            {selectedComponent === 'employees' && <Employees />}
                            {selectedComponent === 'cqi' && <Cqi />}
                            <div className=''>
                                {selectedComponent === 'NewUserSurveys' && <SurveyForms />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
