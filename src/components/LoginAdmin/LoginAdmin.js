import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginadminstyles from "./loginadmin.module.css"; // Import the CSS module
import loginadminbg from "../../assets/loginadminbg.jpg";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

export default function LoginAdmin() {
  const navigate = useNavigate();
  const [loginstate, setLoginstate] = useState("Login");
  const [fronterror, setFronterror] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setFronterror("");
    setLoginstate("Please wait ....");
    try {
      const response = await axios.post(
        "https://portal-sigma-two.vercel.app/api/admin/adminlogin",
        data
      );

      console.log("This is response", response);
      console.log("response data.......", response.data);
      const responseData = response.data;
      setLoginstate("Login");
      const { token, message } = responseData;
      //   router.push("/admin/dashboard");
      console.log("Token,", token);
      localStorage.setItem("token", token);
      localStorage.setItem("IsAdmin", true);

      navigate("/dashboard");
      toast.success("Admin Login Successfully");
    } catch (error) {
      setLoginstate("Login");
      console.log("Login failed:", error.message);
      setFronterror("Invalid Credentials");
      toast.error("Invalid Credentials");
    }
  };

  return (
    <div
      className={loginadminstyles.main}
      style={{
        backgroundImage: `url(https://t3.ftcdn.net/jpg/03/48/55/20/360_F_348552050_uSbrANL65DNj21FbaCeswpM33mat1Wll.jpg)`,
        height: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container-fluid vh-100 vw-100">
        <div className="row h-100 d-flex justify-content-center align-items-center">
          {/* <div className=" col-12 col-md-6 col-lg-6 col-xl-6 d-flex justify-content-center align-items-center flex-column">
            <img
              src=""
              className="img-fluid"
              style={{
                width: "270px",
                height: "104px",
              }}
            />
          </div> */}
          <div className="col-12 col-md-6 col-lg-6 col-xl-6 d-flex justify-content-center align-items-center flex-column">

            <div className={`d-flex justify-content-center align-items-center flex-column h-auto ${loginadminstyles.formdiv}`}>
            <i className="fas fa-user-circle m-auto text-danger text-center h1 m-0" style={{fontSize:"100px"}}></i>

              <div className="mb-4 text-center">
                <h6 className="w-100 text-white">Admin Login</h6>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group mb-4">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    aria-label="Email"
                    aria-describedby="basic-addon1"
                    {...register("email", {
                      required: "Email address is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                        message: "Invalid email!",
                      },
                    })}
                  />
                </div>
                {/* error messge */}
                <div className="my-1">
                  <p style={{ color: "red", font: "10px" }}>
                    {errors.email?.message}
                  </p>
                </div>
                <div className="input-group mb-4">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    aria-label="Password"
                    aria-describedby="basic-addon2"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                </div>
                {/* error message */}
                <div className="my-1">
                  <p style={{ color: "red", font: "10px" }}>
                    {errors.password?.message || fronterror}
                  </p>
                </div>
                <div className="mb-4 d-flex justify-content-between align-items-center">
                  <button
                    type="submit"
                    className={`btn-danger w-100 py-2 border-0 text-white px-5 ${loginadminstyles.signInbtn}`}
                  >
                    {loginstate}
                  </button>
                </div>
                <hr></hr>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
