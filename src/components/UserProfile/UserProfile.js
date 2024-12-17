import React, { useEffect, useState } from "react";
import "./UserProfile.css";
export default function UserProfile() {

  // Function for Getting and Displaying Image
  const [profileImage, setProfileImage] = useState();
  const handleFileSelect = (event) => {

    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      setProfileImage(event.target.result);
    };

    reader.readAsDataURL(file);
  }

  // Function for Getting and Displaying Image






  return (
    <div className="UserProfile ">
      <div className="heroHeading d-flex flex-column justify-content-center align-items-center">
        <h3 className="opacity-8 w-100 text-center" style={{ marginTop: "40px" }}>
          My Profile
        </h3>
        {/* <i className="fas fa-user-circle h3 mt-2 text-dark"></i> */}

        <img alt=".." className="ProfileImage rounded-circle border" id="userProfileDiv" />
        <br></br>
        <label htmlFor="fileInput" className="p-1 px-2  " style={{ cursor: "pointer" }}>
          <div
            className="py-2 updateImg font-2 semibold text-center"
            style={{ width: "165px" }}
          >
            <input type="file" id="fileInput"
              style={{ display: "none" }}
              onChange={handleFileSelect}
            />

            Update Profile Image
          </div>
        </label>
      </div>
      <div className="formOuterDiv row">

        <div className="">

          <form className=''>
            <div className="mb-3">
              <label htmlFor="userRole" className="form-label">User Role</label>
              <select className="form-select rounded-0" id="userRole">
                <option value="">Teacher</option>
                <option value="teacher">Teacher</option>
                <option value="alumni">Alumni</option>
                <option value="student">Student</option>
                <option value="employee">Employee</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="department" className="form-label">Department</label>
              <select className="form-select rounded-0" id="department">
                <option value="">CS</option>
                <option value="se">SE</option>
                <option value="cs">CS</option>
                <option value="ee">EE</option>
              </select>
            </div>
            <div className="d-flex gap-3 mb-3">
              <div>
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input value="Lorem Ipsum" type="text" className="form-control rounded-0" id="firstName" />
              </div>
              <div>
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input value="Lorem Ipsum" type="text" className="form-control rounded-0" id="lastName" />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="university" className="form-label">University Name</label>
              <input value="Lorem Ipsum" type="text" className="form-control rounded-0" id="university" />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input value="Lorem Ipsum" type="email" className="form-control rounded-0" id="email" />
            </div>
          </form>

        </div>
      </div>

      <div className="heroHeading col-lg-6 col-sm-6 col-md-6">
        <h5 className="opacity-8" style={{ marginTop: "40px" }}>
          Update Password
        </h5>
      </div>

      <div className="row formOuterDiv">
        <div className="form-group formFields">
          <label className="control-label " htmlFor="fname">
            Old Password:
          </label>
          <div className="col-sm-11">
            <input
              type="text"
              className="form-control"
              id="fname"
              name="fname"
            />
          </div>
        </div>
        <div className="form-group formFields">
          <label className="control-label " htmlFor="fname">
            New Password:
          </label>
          <div className="col-sm-11">
            <input
              type="text"
              className="form-control"
              id="fname"
              name="fname"
            />
          </div>
        </div>
        <div className="form-group formFields">
          <label className="control-label " htmlFor="fname">
            Confirm Password:
          </label>
          <div className="col-sm-11">
            <input
              type="text"
              className="form-control"
              id="fname"
              name="fname"
            />
          </div>
        </div>
      </div>
      <div className="heroHeading ">
        <button
          id="updateAccountBtn"
          className=" updateImg font-2 p-2 semibold text-center"

        >
          Update Account
        </button>
      </div>
    </div>
  );
}
