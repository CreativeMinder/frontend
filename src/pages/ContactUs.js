import React from 'react';
import './style.css'; // Make sure to import your CSS file

function ContactUsForm() {
  const handleSubmit = () => {
    alert('Your message has been sent successfully!');
  };

  return (
    <>
      <h1 className='w-100 text-center p-3 mt-3 m-0' style={{ color: "#ff004e" }}>Contact Us</h1>
      <p className='w-100 text-center'>
        Users can create accounts, log in, and manage sessions securely. For assistance, contact us through our website.
      </p>
      <div className="container mt-md-5">
        <div className="content">
          <div className="left-side">
            <div className="address details">
              <i className="fas fa-map-marker-alt"></i>
              <div className="topic">Address</div>
              <div className="text-one">Attock, Pakistan</div>
              <div className="text-two">Colony Road Attock</div>
            </div>
            <div className="phone details">
              <i className="fas fa-phone-alt"></i>
              <div className="topic">Phone</div>
              <div className="text-one">+92 3673839292</div>
              <div className="text-two">+92 3682973922</div>
            </div>
            <div className="email details">
              <i className="far fa-envelope"></i>
              <div className="topic">Email</div>
              <div className="text-one">comsatsuni@cuiatk.edu.pk</div>
              <div className="text-two">yaserali@gmail.com</div>
            </div>
          </div>
          <div className="right-side">
            <div className="topic-text">Send us a message</div>
            <p>If you have any work from me or any types of queries related to my tutorial, you can send me a message from here. It's my pleasure to help you.</p>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="input-box">
                <input type="text" placeholder="Enter your name" required />
              </div>
              <div className="input-box">
                <input type="email" placeholder="Enter your email" required />
              </div>
              <div className="input-box message-box">
                <textarea placeholder="Enter your message" required></textarea>
              </div>
              <div className="button">
                <input type="button" value="Send Now" onClick={handleSubmit} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUsForm;
