import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export function TeamCard({ name, role, description, image, socialLinks }) {
  return (
    <div className="card" style={{ width: '18rem', background: 'radial-gradient(100% 70% at top, #ff004e50%, white 50.1%)' }}>
      <div className="w-100 text-center" style={{ height: '13rem' }}>
        <img
          src={image}
          className="card-img-top rounded-circle"
          style={{
            position: 'absolute',
            top: '40px',
            left: '20%',
            height: '10.5rem',
            width: '10.5rem',
            zIndex: '900',
            border: '5px solid #ff004e',
          }}
          alt="Profile"
        />
      </div>
      <div className="card-body text-center">
        <h3 className="card-title"><b>{name}</b></h3>
        <h6 className="card-title"><b>{role}</b></h6>
        <p className="card-text">{description}</p>
        <div className="w-100 rounded d-flex text-white justify-content-center" style={{ backgroundColor: '#ff004e' }}>
          {socialLinks.facebook && (
            <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer">
              <i className="py-2 me-3 fab fa-facebook text-white"></i>
            </a>
          )}
          {socialLinks.instagram && (
            <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
              <i className="py-2 me-3 fab fa-instagram text-white"></i>
            </a>
          )}
          {socialLinks.twitter && (
            <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">
              <i className="py-2 me-3 fab fa-twitter text-white"></i>
            </a>
          )}
          {socialLinks.whatsapp && (
            <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer">
              <i className="py-2 fab fa-whatsapp text-white"></i>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

const AboutUsPage = () => {
  return (
    <Container>
      <Row className="mt-5">
        <Col>
          <h1 className="w-100 text-center p-3 mt-3 m-0" style={{ color: '#ff004e' }}>About Us</h1>

          <p className="text-center mb-4">
            A recommender system for OBE paradigm is a comprehensive tool designed to enhance Outcome-Based Education (OBE) by integrating survey data from students, alumni, employers, and faculty. It aims to address challenges in data collection, analysis, and continuous quality improvement (CQI) for universities.
          </p>
          <img
            src="https://img.freepik.com/free-photo/business-survey-research-concept_53876-121246.jpg?t=st=1724232956~exp=1724236556~hmac=0c86f83855bd4a315ec34a458fa869fa65735648376478d15a9f5bb325d008f5&w=1380"
            className="img-fluid d-block mx-auto mb-4"
            alt="Image"
          />
          <p className="text-center mb-4">
            Welcome to our innovative platform, dedicated to revolutionizing the educational landscape through the application of our advanced recommender system specifically designed for the Outcome-Based Education (OBE) paradigm. Our comprehensive tool is crafted to significantly enhance the OBE framework by seamlessly integrating and analyzing survey data collected from a diverse array of stakeholders including students, alumni, employers, and faculty. This holistic approach ensures that every voice within the educational ecosystem is heard and valued, providing a robust foundation for continuous improvement.
          </p>
          <img
            src="https://cdn.pixabay.com/photo/2015/01/08/18/27/startup-593341_1280.jpg"
            className="img-fluid d-block mx-auto mb-4"
            alt="Image"
          />
          <h3 className="text-center mb-4">Our Team</h3>
          <div className="d-flex justify-content-center align-items-center flex-wrap gap-5">
            <TeamCard
              name="Ravia Iqbal"
              role="Software Engineer"
              description="Web developer and UI/UX designer"
              image="https://static.vecteezy.com/system/resources/thumbnails/033/661/660/small_2x/beautiful-asian-girl-wearing-long-hijab-standing-in-plain-background-ai-generative-photo.jpg"
              socialLinks={{
                facebook: 'https://facebook.com/',
                instagram: 'https://instagram.com/',
                twitter: 'https://twitter.com/',
                whatsapp: 'https://wa.me/03405758655',
              }}
            />
            <TeamCard
              name="DR. Yaser Ali Shah"
              role="OBE Convener"
              description="Assistant Professor Computer Science at CUI Attock campus"
              image="https://media.licdn.com/dms/image/D4D03AQHsRHWocXRAcg/profile-displayphoto-shrink_800_800/0/1675135045373?e=2147483647&v=beta&t=NqFNr9VDVkNCwy-ufDdGnpJZibGZ2wc5jKm0y9PEISM"
              socialLinks={{
                facebook: 'https://facebook.com/',
                instagram: 'https://instagram.com/',
                twitter: 'https://twitter.com/',
                whatsapp: 'https://wa.me/03339048965',
              }}
            />
            <TeamCard
              name="Aghna Rasool"
              role="UI/UX Designer"
              description="UI/UX designer, Graphic designer"
              image="https://static.vecteezy.com/system/resources/thumbnails/033/661/660/small_2x/beautiful-asian-girl-wearing-long-hijab-standing-in-plain-background-ai-generative-photo.jpg"
              socialLinks={{
                facebook: 'https://facebook.com/',
                instagram: 'https://instagram.com/',
                twitter: 'https://twitter.com/',
                whatsapp: 'https://wa.me/031806709070',
              }}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUsPage;
