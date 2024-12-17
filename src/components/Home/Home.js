import React from 'react';
// import './HomeSection.css'; // External CSS file for custom styles

export function HomeSection () {
    return (
        <div className="container py-5">
            <div className="row align-items-center">
                <div className="col-lg-6">
                    <div className="home-content">
                        <h2>Welcome to Our Website</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <div className="button-container">
                            <button className="btn btn-primary mr-3">Learn More</button>
                            <button className="btn btn-secondary">Contact Us</button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="image-container">
                        <img src="https://via.placeholder.com/400" alt="Placeholder" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function Home()
{
    <HomeSection />
}


