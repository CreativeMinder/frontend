// dashboard cards code
import React, { useState, useEffect,useRef } from 'react';
import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap';
import MyChart from '../MyChart/MyChart';
import AverageGraph from './AverageGraph';
import HistoryGraph from './HistoryGraph';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the calendar CSS  
import RandomTip from './RandomTIps';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'; 

import axios from 'axios';
import ClosTips from './ClosTips';
export function Card({ heading, paragraph, icon, backgroundColor }) {
    const [number, setNumber] = useState(0);
    const [targetNumber, setTargetNumber] = useState(0); // State for dynamic target number

    useEffect(() => {
        // Fetch the total count from the API
        const fetchTotalCount = async () => {
            try {
                const response = await axios.post('https://portal-sigma-two.vercel.app/api/admin/fetchallsurvaydetails');
                console.log("Hellow Dear", response.data.surveys.submittedUsers)
                console.log("Hellow Dear", response.data.surveys.length)
                const totalCount = response.data.surveys.length; // Assuming response data is an array

                setTargetNumber(totalCount); // Set the target number from the API response
            } catch (error) {
                console.error('Error fetching the data:', error);
            }
        };

        fetchTotalCount(); // Fetch data on component mount

    }, []); // Empty dependency array to fetch only once

    useEffect(() => {
        let start = 0;
        const duration = 2000; // Animation duration in milliseconds  
        const stepTime = Math.abs(Math.floor(duration / targetNumber));

        const step = () => {
            if (start < targetNumber) {
                start += 1;
                setNumber(start);
                setTimeout(step, stepTime);
            } else {
                setNumber(targetNumber); // Ensure it ends exactly at the target number  
            }
        };

        if (targetNumber > 0) { // Only start counting when targetNumber is available
            step(); // Start the counting animation  
        }

    }, [targetNumber]); // Re-run when targetNumber changes

    return (
        <div className='col-md-3'>
            <div className="cardd text-white" style={{ backgroundColor: backgroundColor }}>
                <div className="card-block">
                    <h6 className="mb-2">{heading}</h6>
                    <div className="d-flex justify-content-between h2">
                        <i className={icon}></i>
                        <span>{number}</span>
                    </div>
                    <p className="mb-0">{paragraph}<span className="f-right">{number}</span></p>
                </div>
            </div>
        </div>
    );
}

export function RemainingCard({ heading, paragraph, icon, backgroundColor }) {
    const [number, setNumber] = useState(0);
    const [targetNumber, setTargetNumber] = useState(0); // State for dynamic target number

    useEffect(() => {
        // Fetch the total count from the API
        const fetchTotalCount = async () => {
            try {
                const response = await axios.post('https://portal-sigma-two.vercel.app/api/admin/fetchallsurvaydetails');
                console.log("Hellow Dear All", response)
                console.log("Hellow Dear", response.data.surveys[0].unsubmittedUsers.length)
                const totalCount = response.data.surveys[0].unsubmittedUsers.length; // Assuming response data is an array

                setTargetNumber(totalCount); // Set the target number from the API response
            } catch (error) {
                console.error('Error fetching the data:', error);
            }
        };

        fetchTotalCount(); // Fetch data on component mount

    }, []); // Empty dependency array to fetch only once

    useEffect(() => {
        let start = 0;
        const duration = 2000; // Animation duration in milliseconds  
        const stepTime = Math.abs(Math.floor(duration / targetNumber));

        const step = () => {
            if (start < targetNumber) {
                start += 1;
                setNumber(start);
                setTimeout(step, stepTime);
            } else {
                setNumber(targetNumber); // Ensure it ends exactly at the target number  
            }
        };

        if (targetNumber > 0) { // Only start counting when targetNumber is available
            step(); // Start the counting animation  
        }

    }, [targetNumber]); // Re-run when targetNumber changes

    return (
        <div className='col-md-3'>
            <div className="cardd text-white" style={{ backgroundColor: backgroundColor }}>
                <div className="card-block">
                    <h6 className="mb-2">{heading}</h6>
                    <div className="d-flex justify-content-between h2">
                        <i className={icon}></i>
                        <span>{number}</span>
                    </div>
                    <p className="mb-0">{paragraph}<span className="f-right">{number}</span></p>
                </div>
            </div>
        </div>
    );
}

export function SurveysCard({ heading, paragraph, icon, backgroundColor }) {
    const [number, setNumber] = useState(0);
    const [targetNumber, setTargetNumber] = useState(0); // State for dynamic target number

    useEffect(() => {
        // Fetch the total count from the API
        const fetchTotalCount = async () => {
            try {
                const response = await axios.post('https://portal-sigma-two.vercel.app/api/admin/fetchallsurvaydetails');
                const totalCount = response.data.surveys[0].submittedUsers.length; // Assuming response data is an array

                setTargetNumber(totalCount); // Set the target number from the API response
            } catch (error) {
                console.error('Error fetching the data:', error);
            }
        };

        fetchTotalCount(); // Fetch data on component mount

    }, []); // Empty dependency array to fetch only once

    useEffect(() => {
        let start = 0;
        const duration = 2000; // Animation duration in milliseconds  
        const stepTime = Math.abs(Math.floor(duration / targetNumber));

        const step = () => {
            if (start < targetNumber) {
                start += 1;
                setNumber(start);
                setTimeout(step, stepTime);
            } else {
                setNumber(targetNumber); // Ensure it ends exactly at the target number  
            }
        };

        if (targetNumber > 0) { // Only start counting when targetNumber is available
            step(); // Start the counting animation  
        }

    }, [targetNumber]); // Re-run when targetNumber changes

    return (
        <div className='col-md-3'>
            <div className="cardd text-white" style={{ backgroundColor: backgroundColor }}>
                <div className="card-block">
                    <h6 className="mb-2">{heading}</h6>
                    <div className="d-flex justify-content-between h2">
                        <i className={icon}></i>
                        <span>{number}</span>
                    </div>
                    <p className="mb-0">{paragraph}<span className="f-right">{number}</span></p>
                </div>
            </div>
        </div>
    );
}

export function AllUsersCard({ heading, paragraph, icon, backgroundColor }) {
    const [number, setNumber] = useState(0);
    const [targetNumber, setTargetNumber] = useState(0); // State for dynamic target number

    useEffect(() => {
        const fetchTotalCounts = async () => {
            try {
                // Combine all API calls with Promise.all
                const [teachersRes, studentsRes, employeesRes, alumniRes] = await Promise.all([
                    axios.post('https://portal-sigma-two.vercel.app/api/admin/fetchteaher'),
                    axios.post("https://portal-sigma-two.vercel.app/api/admin/fetchstudent"),
                    axios.post("https://portal-sigma-two.vercel.app/api/admin/fetchemployee"),
                    axios.post("https://portal-sigma-two.vercel.app/api/admin/fetchalumni"),
                ]);

                // Process and calculate total count
                const totalCount = teachersRes.data.teachers.length +
                    studentsRes.data.students.length +
                    employeesRes.data.employees.length +
                    alumniRes.data.alumnis.length;

                setTargetNumber(totalCount); // Set the target number
            } catch (error) {
                console.error('Error fetching the data:', error);
            }
        };

        fetchTotalCounts(); // Fetch data on component mount

    }, []); // Empty dependency array to fetch only once

    useEffect(() => {
        let start = 0;
        const duration = 2000; // Animation duration in milliseconds  

        const step = (timestamp, lastTimestamp) => {
            if (!lastTimestamp) lastTimestamp = timestamp;
            const progress = timestamp - lastTimestamp;

            if (progress >= (duration / targetNumber)) { // Progress per frame
                start += 1;
                setNumber(start);
            }

            if (start < targetNumber) {
                requestAnimationFrame((newTimestamp) => step(newTimestamp, lastTimestamp));
            } else {
                setNumber(targetNumber); // Ensure it ends exactly at the target number  
            }
        };

        if (targetNumber > 0) { // Only start counting when targetNumber is available
            requestAnimationFrame(step); // Start the counting animation  
        }

    }, [targetNumber]); // Re-run when targetNumber changes

    return (
        <div className='col-md-3'>
            <div className="cardd text-white" style={{ backgroundColor: backgroundColor }}>
                <div className="card-block">
                    <h6 className="mb-2">{heading}</h6>
                    <div className="d-flex justify-content-between h2">
                        <i className={icon}></i>
                        <span>{number}</span>
                    </div>
                    <p className="mb-0">{paragraph}<span className="f-right">{number}</span></p>
                </div>
            </div>
        </div>
    );
}




export default function DashboardHome() {
    const currentDate = new Date();
    const options = {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    };

    // Format current date and time  
    const formattedDate = currentDate.toLocaleString('en-US', options);
    const formattedEndDate = new Date(currentDate.getTime() + 1000 * 60 * 60).toLocaleString('en-US', options);

    const [date, setDate] = useState(new Date());
    const [loading, setLoading] = useState(true);

    const reportRef = useRef();
    const downloadPDF = async () => {  
        const element = reportRef.current;  
    
        // Check if the element is valid  
        if (!element) {  
            console.error("Report element is not available");  
            return;  
        }  
    
        const canvas = await html2canvas(element);  
        const imgData = canvas.toDataURL('image/png');  
        const pdf = new jsPDF();  
    
        // Define margins and padding  
        const margin = { top: 10, bottom: 10, left: 10, right: 10 }; // Margins for the PDF  
        const padding = { top: 5, bottom: 5 }; // Padding to be added in top and bottom of the page  
        const imgWidth = pdf.internal.pageSize.width - margin.left - margin.right; // Adjust width for margins  
        const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio  
        let heightLeft = imgHeight;  
        let position = margin.top + padding.top; // Start position considering top margin and padding  
    
        // Add the first page with the image  
        pdf.addImage(imgData, 'PNG', margin.left, position, imgWidth, imgHeight);  
        heightLeft -= (pdf.internal.pageSize.height - margin.top - margin.bottom - padding.top - padding.bottom); // Adjust height left  
    
        // Add additional pages if needed  
        while (heightLeft >= 0) {  
            pdf.addPage();  
            position = heightLeft - imgHeight + margin.top + padding.top; // Adjust position for new page with margins and padding  
            pdf.addImage(imgData, 'PNG', margin.left, position, imgWidth, imgHeight);  
            heightLeft -= (pdf.internal.pageSize.height - margin.top - margin.bottom - padding.top - padding.bottom); // Adjust height left  
        }  
    
        // Save the PDF  
        pdf.save('report.pdf');  
    };
    

    const onChange = (date) => {
        setDate(date);
    }

    const renderShortWeekday = (locale, date) => {
        const options = { weekday: 'short' };
        return new Intl.DateTimeFormat(locale, options).format(date)[0]; // Return the first character of the abbreviated day name  
    };

    // Simulate data loading  
    useEffect(() => {
        const loadData = async () => {
            // Simulate a delay for loading  
            await new Promise(resolve => setTimeout(resolve, 1000)); // Reduced delay for quicker loading  
            setLoading(false);
        };

        loadData();
    }, []);
     
    return (
        <>
            <div className='d-flex flex-wrap justify-content-between align-items-center'>
                <h3>Dashboard</h3>
                <div className="input-group bg-white m-0 p-0 d-flex justify-content-center align-items-center" style={{ maxWidth: "165px" }}>
                <button className="btn btn-danger" type="button" id="download_report" onClick={downloadPDF} disabled={loading}>
    {loading ? 'Loading...' : 'Download Report'}
</button>


                </div>
            </div>
            <div ref={reportRef} className='row py-3 p-2'>
                <Card
                    heading="Surveys"
                    paragraph="Recent Surveys"
                    icon="fas fa-star"
                    targetNumber={4}  // Update to targetNumber  
                    backgroundColor="#EA3986"
                />
                <AllUsersCard
                    heading="Users List"
                    paragraph="Recent Users"
                    icon="fas fa-star"
                    targetNumber={22}  // Update to targetNumber  
                    backgroundColor="#F1C40F"
                />
                <SurveysCard
                    heading="Surveys New"
                    paragraph="Submitted Surveys"
                    icon="fas fa-star"
                    targetNumber={103}   // Update to targetNumber  
                    backgroundColor="#18A4E1"
                />
                <RemainingCard
                    heading="Remaining Users"
                    paragraph="Remaining Users"
                    icon="fas fa-star"
                    targetNumber={45}  // Update to targetNumber  
                    backgroundColor="#F98925"
                />
            </div>
            <div ref={reportRef} className="w-100 row bg-white h-auto pb-0 pe-0 p-2 pt-2" style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
                {loading ? (
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <span className="ms-3">Loading Average Graph...</span>
                    </div>
                ) : (
                    <>
                        <AverageGraph />
                        <HistoryGraph />
                        <div >
                            <RandomTip />
                        </div>
                        <div>
                        <ClosTips/>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}