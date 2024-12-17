import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { MyChart } from '../TeachersDashboard/TeachersDashboard';
import { MyPieChart } from '../TeachersDashboard/TeachersDashboard';

export default function Cqi() {
    const [chartData, setChartData] = useState({ labels: [], values: [] });
    const [percentages, setPercentages] = useState({
        so1: '',
        so2: '',
        so3: '',
        so4: '',
        so5: '',
        so6: '',
        so7: '',
        so8: '',
        so9: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCQData = async () => {
            try {
                const response = await axios.post(
                    "https://portal-sigma-two.vercel.app/api/admin/fetchcq"
                );

                const cqData = response.data.cqEntries;
                const cqCategoryCounts = { disagree:0, 'somewhat agree':0, agree: 0, good: 0, 'strongly aligned':0, 'strongly agree':0, 'very effective': 0 };
                const cqTotalCounts = { disagree:0, 'somewhat agree':0, agree: 0, good: 0, 'strongly aligned':0, 'strongly agree':0, 'very effective': 0  };

                cqData.forEach(entry => {
                    Object.keys(entry).forEach(key => {
                        if (key.startsWith('so')) {
                            const value = parseInt(entry[key], 10);
                            if (value >= 0 && value < 15) {
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

                setChartData({ labels, values });
            } catch (error) {
                console.error("Error fetching CQ data:", error);
                setChartData({ labels: [], values: [] });
            }
        };

        fetchCQData();
    }, []);

    const handleChange = (e) => {
        const { id, value } = e.target;
        const numericValue = Math.max(0, Math.min(100, Number(value)));
        setPercentages({
            ...percentages,
            [id]: numericValue
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = {
            userId: '64e3b2a5b12c4f1234567890',
            ...percentages
        };

        try {
            const response = await axios.post('https://portal-sigma-two.vercel.app/api/admin/solvecq', data);
            console.log('Response after submission:', response.data);
            alert('Data submitted successfully!');
        } catch (error) {
            console.error('Error submitting data', error);
            alert('Error submitting data');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5 shadow-0">
            <div className="container p-4 rounded shadow-0">
                <div className="container p-4 rounded shadow-0 border-0">
                    <h2 className="text-center text-dark mb-5">Percentage Input Form</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="so1" className="form-label text-dark fw-bold">S01%</label>
                                <input
                                    type="number"
                                    className="form-control border-dark border rounded-0"
                                    id="so1"
                                    placeholder="Enter S01%"
                                    value={percentages.so1}
                                    onChange={handleChange}
                                    min="1" max="100" />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="so2" className="form-label text-dark fw-bold">S02%</label>
                                <input
                                    type="number"
                                    className="form-control border-dark border rounded-0"
                                    id="so2"
                                    placeholder="Enter S02%"
                                    value={percentages.so2}
                                    onChange={handleChange}
                                    min="1" max="100" />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="so3" className="form-label text-dark fw-bold">S03%</label>
                                <input
                                    type="number"
                                    className="form-control border-dark border rounded-0"
                                    id="so3"
                                    placeholder="Enter S03%"
                                    value={percentages.so3}
                                    onChange={handleChange}
                                    min="1" max="100" />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="so4" className="form-label text-dark fw-bold">S04%</label>
                                <input
                                    type="number"
                                    className="form-control border-dark border rounded-0"
                                    id="so4"
                                    placeholder="Enter S04%"
                                    value={percentages.so4}
                                    onChange={handleChange}
                                    min="1" max="100" />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="so5" className="form-label text-dark fw-bold">S05%</label>
                                <input
                                    type="number"
                                    className="form-control border-dark border rounded-0"
                                    id="so5"
                                    placeholder="Enter S05%"
                                    value={percentages.so5}
                                    onChange={handleChange}
                                    min="1" max="100" />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="so6" className="form-label text-dark fw-bold">S06%</label>
                                <input
                                    type="number"
                                    className="form-control border-dark border rounded-0"
                                    id="so6"
                                    placeholder="Enter S06%"
                                    value={percentages.so6}
                                    onChange={handleChange}
                                    min="1" max="100" />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="so7" className="form-label text-dark fw-bold">S07%</label>
                                <input
                                    type="number"
                                    className="form-control border-dark border rounded-0"
                                    id="so7"
                                    placeholder="Enter S07%"
                                    value={percentages.so7}
                                    onChange={handleChange}
                                    min="1" max="100" />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="so8" className="form-label text-dark fw-bold">S08%</label>
                                <input
                                    type="number"
                                    className="form-control border-dark border rounded-0"
                                    id="so8"
                                    placeholder="Enter S08%"
                                    value={percentages.so8}
                                    onChange={handleChange}
                                    min="1" max="100" />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="so9" className="form-label text-dark fw-bold">S09%</label>
                                <input
                                    type="number"
                                    className="form-control border-dark border rounded-0"
                                    id="so9"
                                    placeholder="Enter S09%"
                                    value={percentages.so9}
                                    onChange={handleChange}
                                    min="1" max="100" />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-danger w-100 mt-4">
                            {loading ? 'Submitting Data...' : 'Submit'}
                        </button>
                    </form>
                </div>
            </div>
            <div className="chart-container" style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', marginTop: '20px' }}>
                <div className="chart-item-container" style={{ flex: '1 1 60%', borderRadius: '16px' }} data-aos="fade-right">
                    <div className="chart-item chartShadow">
                        <h3 className='text-center mb-5'>CQI Entries Line Graph</h3>
                        <MyChart chartData={chartData} />
                    </div>
                </div>
                <div className="chart-item-container" style={{ flex: '1 1 40%', borderRadius: '16px' }} data-aos="fade-right">
                    <div className="chart-item chartShadow">
                        <h3 className='text-center mb-5'>CQI Entries Pie Chart</h3>
                        <MyPieChart chartData={chartData} />
                    </div>
                </div>
            </div>
        </div>
    );
}
