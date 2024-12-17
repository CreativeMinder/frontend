import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const MyChart = () => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null); // Reference to the Chart instance

    useEffect(() => {
        if (chartInstance.current !== null) {
            // If a chart instance already exists, destroy it before creating a new one
            chartInstance.current.destroy();
        }

        const ctx = chartRef.current.getContext('2d');
        chartInstance.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: '# of Votes',
                    data: [10, 15, 20, 25, 30, 15, 20, 25, 30, 20, 25, 30],
                    barThickness: 10,
                    backgroundColor: function (context) {
                        const chart = context.chart;
                        const { ctx, chartArea } = chart;
                        if (!chartArea) {
                            // This case happens on initial chart creation
                            return null;
                        }
                        const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top); // From bottom to top
                        gradient.addColorStop(0, '#FF057E');
                        gradient.addColorStop(1, '#FFCC00');
                        return gradient;
                    },
                    borderRadius: {
                        topLeft: 200,
                        topRight: 200,
                        bottomLeft: 200,
                        bottomRight: 200
                    }                
                }]



            },
            options: {
                scales: {
                    x: {
                        stacked: true,
                        ticks: {
                            fontColor: "white",
                            stepSize: 1,
                            beginAtZero: true
                        },
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        stacked: true,
                        ticks: {
                            fontColor: "white",
                        },
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false // Hide the legend
                    }
                }
            }
        });

        // Cleanup function to destroy the chart instance on component unmount
        return () => {
            chartInstance.current.destroy();
        };
    }, []);

    return <canvas ref={chartRef} className="chart-canvas" />;
};

export default MyChart;
