// show navigation bar for dashboard
import React from 'react';

export default function Navbar() {

  // const handleLogout = () => {
  //   // Remove loginToken from localStorage
  //   localStorage.removeItem("loginToken");
  //   window.location.href = `/login`;

  // };

  return (
    <>

      <nav className="navbar navbar-expand-lg text-end py-4" style={{boxShadow: "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px"}}>
        <div className="container-fluid px-5 text-end d-flex justify-content-between ">
          <div>
            <h1 className='m-0 '><b>Dashboard</b> </h1>
          </div>
        </div>
      </nav>
    </>
  );
};

