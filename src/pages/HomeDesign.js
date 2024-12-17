import React from "react";
import img_1 from "../assets/img_1.png";
import img_2 from "../assets/img_2.png";
import { Link } from 'react-router-dom';

export function HomeSection() {
    return (
        <div className="py-5 back" style={{ boxShadow: "none" }}>
            <div className="row align-items-center">
                <div className="col-lg-1"></div>
                <div className="col-lg-5">
                    <div className="home-content">
                        <h1 className="d-none d-md-block m-0 p-0 mb-3"
                            style={{ fontSize: '60px', fontWeight: '800' }}>
                            A Recommendation System for <span style={{ color: "#ff004e" }}>  OBE Paradigm   </span> </h1>
                       <p>"A recommendation system for OBE paradigm" is a comprehensive tool designed to enhance Outcome-Based Education (OBE) by integrating survey data from students, alumni, employers, and faculty. It aims to address challenges in data collection, analysis, and continuous quality improvement (CQI) for universities</p>
                        <div className="button-container d-flex flex-wrap">
                            <div>
                                <Link to="/objectives" className="btn btn-lg me-3 text-white" style={{ backgroundColor: "#ff004e" }}>
                                    Learn More
                                </Link>
                            </div>
                            <div>
                                <Link to="/contactUs" className="btn btn-lg me-3" style={{ border: "1px solid #ff004e", color: "#ff004e" }}>
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-5">
                    <div className="image-container">
                        <img className="img-fluid" src="https://img.freepik.com/free-vector/online-review-concept-illustration_114360-1398.jpg?t=st=1716268763~exp=1716272363~hmac=ddead8820e7a99430d5ba0925e5bd465003a10bcfa08cef4f94388c622651e88&w=826" alt="Placeholder" />
                    </div>
                </div>
                <div className="col-lg-1"></div>
            </div>
        </div>
    );
};

export function FeatureCard({ featureTitle, featureDescription, featureIconClass }) {
    return (
        <div className="card text-center" style={{ height: "25rem", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
            <div className="card-body  d-flex flex-column justify-content-center align-items-center">
                <i className={featureIconClass} style={{ color: "#ff004e", fontSize: "100px" }}> </i>
                <h5 className="card-title mt-3">{featureTitle}</h5>
                <p className="card-text mt-3">{featureDescription}</p>
            </div>
        </div>
    );
};

export function FeaturesSection() {
    return (
        <section className="features custom-border">
            <div className="container" style={{ boxShadow: "none" }}>
                <h2 className="text-center my-5 text-dark">Key Features</h2>
                <div className="row">
                    <div className="col-md-4">
                        <FeatureCard
                            featureTitle="Data Collection and Integration"
                            featureDescription=" Gathers data from exit students, alumni, employers, and teachers."
                            featureIconClass="fas fa-heart"
                        />
                    </div>
                    <div className="col-md-4">
                        <FeatureCard
                            featureTitle="OBE Integration"
                            featureDescription="Incorporates OBE principles to define Student Outcomes (SOs) and Course Learning Outcomes (CLOs).."
                            featureIconClass="fas fa-star"
                        />
                    </div>
                    <div className="col-md-4">
                        <FeatureCard
                            featureTitle="Employability Analysis"
                            featureDescription="Assesses graduate skills against job market demands"
                            featureIconClass="fas fa-check"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};



export function TestimonialCard({ quote, imageSrc, name, profession }) {
    return (
        <div data-aos-duration="1500" data-aos="fade-up" className="card p-2 mb-3">
            <div className="d-flex justify-content-between align-items-center">
                <i className="fa-solid fa-quote-left" style={{ fontSize: '100px' }}></i>
                <div>
                    {[...Array(5)].map((star, index) => (
                        <i key={index} className="fa-solid fa-star text-warning"></i>
                    ))}
                </div>
            </div>
            <div className="card-body">
                <p className="card-text text-center text-secondary fw-bold" style={{ fontWeight: '600' }}>{quote}</p>
                <div className="d-flex justify-content-center align-items-center pt-2 carousel w-100">
                    <img className="carousel" src={imageSrc} alt="" />
                    <div className="text-start">
                        <h5 className="fw-bold m-0 my-1 text-start text-secondary">{name}</h5>
                        <span className="text-info">{profession}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// 
export function CardComponent({ title, description, iconClass }) {
    return (
        <div className="card border-0" data-aos="fade-up" data-aos-duration="1500">
            <div className="card-body row">
                <div className="col-12 col-sm-2 col-md-2 col-lg-2 col-xl-2 d-flex justify-content-center align-items-center">
                    <i className={`fa-solid ${iconClass} text-white bg-danger p-3`}></i>
                </div>
                <div className="col-12 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                    <h4 className="">{title}</h4>
                    <p className="text-secondary">{description}</p>
                </div>
            </div>
        </div>
    );
};



export default function HomeDesign() {
    return (
        <>
            <HomeSection />
            <FeaturesSection />
            <div className="custom-border" style={{

                backgroundColor: "#e4e4e4"


            }}>
                <h2 className="text-center my-5 text-dark py-5">Our Services</h2>
                <div className="container py-5 shadow-0" style={{ boxShadow: "none" }}>
                    <div className="row">
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 section-4 d-flex flex-column justify-content-center align-items-center">
                            <img src={img_2} className="rounded-3 img-fluid" />

                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 section-4 d-flex flex-column justify-content-center align-items-center">

                            <CardComponent
                                title="Data Collection and Integration"
                                description="Gathers data from exit students, alumni, employers, and teachers."
                                iconClass="fa-database"
                            />
                            <CardComponent
                                title="OBE Integration"
                                description="Incorporates OBE principles to define Student Outcomes (SOs) and Course Learning Outcomes (CLOs)."
                                iconClass="fa-balance-scale"
                            />
                            <CardComponent
                                title="Employability Analysis"
                                description="Assesses graduate skills against job market demands."
                                iconClass="fa-chart-line"
                            />
                            <CardComponent
                                title="Reporting and Visualization"
                                description="Provides reports and visualizations highlighting university performance and growth opportunities."
                                iconClass="fa-chart-bar"
                            />


                            {/* Add more instances of CardComponent as needed */}
                        </div>

                    </div>
                </div>

            </div>
            <div className="container-lg py-5 cardB" style={{ boxShadow: "none" }}>
                <div className="row">

                    <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 section-4 d-flex flex-column justify-content-center align-items-center">
                        <h1 className="heading-1 text-center" style={{ fontWeight: "800", fontSize: '35px', color: "#ff004e" }} data-aos="fade-up" data-aos-duration="1500">
                            HOW WE WORK
                        </h1>
                        <p className="text-center" data-aos="fade-up" data-aos-duration="1500">
                            We provide truly professional Credentialing and Medical Billing Services
                        </p>
                        <CardComponent
                            title="Survey Collection"
                            description="Gathers insights from students, alumni, teachers, and employers."
                            iconClass="fa-heart"
                        />
                        <CardComponent
                            title="Survey Design and Distribution"
                            description="Allows custom survey creation and targeted distribution."
                            iconClass="fa-heart"
                        />
                        <CardComponent
                            title="Visualization"
                            description=" Generates charts and graphs for easy data interpretation."
                            iconClass="fa-heart"
                        />
                    </div>
                    <div data-aos="fade-right" className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 d-flex justify-content-center align-items-center">
                        <img src={img_1} className="rounded-3 img-fluid" />
                    </div>
                </div>
            </div>

            <div className="custom-border" style={{
                backgroundImage: "url('https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
            }}>                <div style={{ backgroundColor: "rgba(0, 0, 0, 0.7)", padding: "100px" }} className="h-100 d-flex flex-column justify-content-center align-items-center">
                    <h1 className="d-none d-md-block m-0 p-0 py-2 text-white text-center"
                        style={{ fontSize: '40px', fontWeight: '800' }}>
                        Importance of CQI:

                    </h1>
                    <h3 className="d-md-none py-2" style={{ fontWeight: '800' }}> Importance of CQI:

                    </h3>
                    <p className="w-100 text-center text-light">
                        CQI in higher education is crucial for continuously improving educational offerings, aligning them with student and market needs, and enhancing institutional competitiveness. It enables informed decision-making and effective resource allocation.

                    </p>


                </div>
            </div>
            <div className="section-6 row  pb-md-5 px-md-5" style={{ marginTop: "100px" }}>
                <div className="col-12 col-sm-5 col-md-5 col-lg-5 col-xl-5 testtimonial-cards">
                    <TestimonialCard
                        quote="Our system empowers university administrators with insights to make informed decisions, aligning educational programs with industry needs and student expectations."
                        imageSrc="https://robustcredentialing.com/wp-content/uploads/2023/10/patient_1.jpg"
                        name="Saybah Glay"
                        profession="Doctor"
                    />
                    <TestimonialCard
                        quote="I have been working with this company for a short while now and I am more than pleased. At first I was a little scared and nervous but working with Shawn Benson has been the BEST!"
                        imageSrc="https://robustcredentialing.com/wp-content/uploads/2023/10/patient_2.jpg"
                        name="Naimah Colloway"
                        profession="Doctor"
                    />
                </div>
                <div className="col-12 col-sm-7 col-md-7 col-lg-7 col-xl-7">
                    <div className="p-5">
                        <h1 className="m-0 py-5">Testimonials</h1>
                        <div>
                            <Link to="/contactUs" className="btn btn-lg me-3" style={{ border: "1px solid #ff004e", color: "#ff004e" }}>
                                Contact Us
                            </Link>
                        </div>                    </div>
                </div>
            </div>
            {/* <HeroSection />
            <FeaturesSection />
            <AboutSection />
            <ServicesSection />
            <TestimonialsSection />
            <PortfolioSection />
            <TeamSection />
            <FaqSection />
            <ContactSection /> */}
        </>
    );
}


