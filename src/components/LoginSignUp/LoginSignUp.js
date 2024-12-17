import React from "react";
import "./LoginSignUp.css";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import { useScore } from "./ScoreContext";
export function LoginSignUp() {
  const navigate = useNavigate();
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [signupstate, setSignupstate] = useState("Signup");
  const [loginstate, setLoginstate] = useState("Login");
  const [fronterror, setFronterror] = useState("");

  //   const history = useHistory();

  const toggleForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setFronterror("");
    setLoginstate("Please wait ....");

// //le.log(" Please wait", data.email)

    try {
  const response = await axios.post(
    "https://portal-sigma-two.vercel.app/api/user/loginuser",
    data
  );

  //le.log("This is response", response);
  //le.log("response data.......", response.data);
  const responseData = response.data;
  setLoginstate("Login");

  const { token } = responseData;
  //le.log("Token,", token);
  localStorage.setItem("token", token);

  const fetchScoreResponse = await axios.post(
    "https://portal-sigma-two.vercel.app/api/user/fetchscore",
    { userEmail: data.email }
  );

  //le.log("Fetch Score Response", fetchScoreResponse.data.data.userRole);

const gotUserRole = fetchScoreResponse.data.data.userRole;
const gotScore = fetchScoreResponse.data.data.score;

  if(gotUserRole === "teacher")
  {
    navigate("/Tch_recommendations", {
      state: { score: gotScore ,
        email: data.email 
      }
       // Passing the score to the st_recommendations page
    });

  }
  if(gotUserRole === "student")

  {
    navigate("/st_recommendations", {
      state: { score: gotScore }  // Passing the score to the st_recommendations page
    });

  }

  toast.success("Login and Fetch Score Successfully!");
} catch (error) {
      setLoginstate("Login");
      //le.log("Login failed:", error.message);
      setFronterror("Invalid Credentials");
      toast.error("Invalid Credentials");
    }
  };

  const onRegister = async (data) => {
    setFronterror("");
    setSignupstate("Please wait ....");

    try {
      const response = await axios.post(
        "https://portal-sigma-two.vercel.app/api/user/registeruser",
        data
      );
      const role = data.userRole;
      //le.log("user Role:", role);
      setSignupstate("Signup");
      //le.log("This is response", response);
      //le.log("response data.......", response.data);

      const responseData = response.data;

      const { token, message } = responseData;

      //   //le.log("Token,", token);

      //   history.push("/admin/dashboard");
      setFronterror(message);
      setShowLoginForm(true);
      navigate("/signup");
      toast.success("Your Account Register successfully!");
      localStorage.setItem("userRole", role);
    } catch (error) {
      setSignupstate("Signup");
      //le.log("Register failed:", error.message);
      setFronterror(" Register Failed");
      toast.error("Register failed");
    }
  };
  return (
    <div className="container mt-5 business-login">
      {showLoginForm ? (
        <>
          <div style={{ maxWidth: "400px" }} className="m-auto">
            <h2 className="text-center">Welcome Back</h2>
            <p
              className="text-center"
              style={{ fontSize: "12px", color: "#484848" }}
            >
              By continuing, you agree to Survey 2x{" "}
              <a href="#" style={{ color: "#ff004e" }}>
                Terms of Service
              </a>{" "}
              <br></br>
              and acknowledge our{" "}
              <a href="#" style={{ color: "#ff004e" }}>
                Privacy Policy
              </a>
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control rounded-0"
                  id="email"
                  {...register("email", {
                    required: "Email address is required",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                      message: "Invalid email!",
                    },
                  })}
                  placeholder="Email Address"
                />
                {/* error messge */}
                <div className="my-2">
                  <p style={{ color: "red", font: "10px" }}>
                    {errors.email?.message}
                  </p>
                </div>
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control rounded-0"
                  id="password"
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {/* error message */}
                <div className="my-2">
                  <p style={{ color: "red", font: "10px" }}>
                    {errors.password?.message}
                  </p>
                </div>
                {/* <div className="w-100 text-end" style={{ marginTop: "17px" }}>
                  <a
                    href="#"
                    className="form-text text-end font-3"
                    style={{ color: "#ff004e" }}
                  >
                    Forgot password?
                  </a>
                </div> */}
              </div>
              <button
                type="submit"
                className="btn btn-block w-100 text-white mt-4 rounded-0"
                style={{ backgroundColor: "#ff004e" }}
              >
                {loginstate}
              </button>
            </form>
            <p className="text-center mt-2" style={{ fontSize: "13.5px" }}>
              Don’t have an account?{" "}
              <a href="#" style={{ color: "#ff004e" }} onClick={toggleForm}>
                Sign up
              </a>
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="row">
            <div className="col-12 col-md-2 col-sm-2 col-lg-2 col-xl-2"></div>
            <div className="col-12 col-md-8 col-sm-8 col-lg-8 col-xl-8 businessRegistration">
              <h4
                className="w-100 text-center"
                style={{
                  fontSize: "20px",
                  color: "#484848",
                }}
              >
                Create a free account to manage your Survey page
              </h4>
              {/* Signup form */}
              <form
                className="needs-validation"
                onSubmit={handleSubmit(onRegister)}
                noValidate
              >
                <div className="mb-3">
                  <select
                    className="form-select rounded-0"
                    id="userRole"
                    required
                    {...register("userRole", {
                      required: "Select your is role",
                    })}
                  >
                    <option value="">Select user role</option>
                    <option value="teacher">Teacher</option>
                    <option value="alumni">Alumni</option>
                    <option value="student">Exit Student</option>
                    <option value="employee">Employer</option>
                  </select>
                  {/* Error message */}
                  <div className="my-2">
                    <p style={{ color: "red", font: "10px" }}>
                      {errors.userRole?.message}
                    </p>
                  </div>
                  <div className="invalid-feedback">
                    Please select a user role.
                  </div>
                </div>
                {/* <div className="mb-3">
                                    <select className="form-select rounded-0" id="department" required>
                                        <option value="">Select department</option>
                                        <option value="se">SE</option>
                                        <option value="cs">CS</option>
                                        <option value="ee">EE</option>
                                    </select>
                                </div> */}
                <div className="d-flex gap-3 mb-3">
                  <div>
                    <input
                      type="text"
                      className="form-control rounded-0"
                      id="firstName"
                      placeholder="First Name"
                      required
                      {...register("firstName", {
                        required: "First name is required!",
                        minLength: {
                          value: 2,
                          message: "Minimum length will be 2",
                        },
                        pattern: {
                          value: /^[A-Z][a-z]*$/,
                          message: "First latter must be upper case",
                        },
                      })}
                    />
                    {/* Error message */}
                    <div className="my-2">
                      <p style={{ color: "red", font: "10px" }}>
                        {errors.firstName?.message}
                      </p>
                    </div>
                  </div>

                  <div>
                    <input
                      type="text"
                      className="form-control rounded-0"
                      id="lastName"
                      placeholder="Last Name"
                      required
                      {...register("lastName", {
                        required: "Last name is required!",
                        minLength: {
                          value: 2,
                          message: "Minimum length will be 2",
                        },
                        pattern: {
                          value: /^[A-Z][a-z]*$/,
                          message: "First latter must be upper case",
                        },
                      })}
                    />
                    {/* Error message */}
                    <div className="my-2">
                      <p style={{ color: "red", font: "10px" }}>
                        {errors.lastName?.message}
                      </p>
                    </div>
                    <div className="invalid-feedback">
                      Please provide both first and last name.
                    </div>
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control rounded-0"
                      id="university"
                      placeholder="University Name"
                      {...register("universityName", {
                        required: "university is required!",
                        minLength: {
                          value: 3,
                          message: "Minimum length will be 3",
                        },
                        pattern: {
                          value: /^[A-Z][a-z]*$/,
                          message: "First latter must be upper case",
                        },
                      })}
                    />
                    {/* Error message */}
                    <div className="my-2">
                      <p style={{ color: "red", font: "10px" }}>
                        {errors.universityName?.message}
                      </p>
                    </div>
                  </div>
                  <div className="invalid-feedback">
                    Please provide your university name.
                  </div>
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control rounded-0"
                    id="email"
                    placeholder="Email Address"
                    required
                    {...register("email", {
                      required: "Email address is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                        message: "Invalid email!",
                      },
                    })}
                  />
                  {/* error message */}
                  <div className="my-2">
                    <p style={{ color: "red", font: "10px" }}>
                      {errors.email?.message}
                    </p>
                  </div>
                  <div className="invalid-feedback">
                    Please provide a valid email address.
                  </div>
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control rounded-0"
                    id="password"
                    placeholder="Password"
                    required
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: `Minimun length required is 8`,
                      },
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
                        message: "Password not strong enough",
                      },
                    })}
                  />
                  {/* error message */}
                  <div className="my-2">
                    <p style={{ color: "red", font: "10px" }}>
                      {errors.password?.message || fronterror}
                    </p>
                  </div>
                  <div className="invalid-feedback">
                    Please provide a password.
                  </div>
                </div>
                <p
                  className="text-center"
                  style={{ fontSize: "12px", color: "#484848" }}
                >
                  By continuing, you agree to Surveys{" "}
                  <a href="#" style={{ color: "#ff004e" }}>
                    Terms of Service
                  </a>{" "}
                  and acknowledge our{" "}
                  <a href="#" style={{ color: "#ff004e" }}>
                    Privacy Policy
                  </a>
                  . We may send you marketing emails about Survey 2x products,
                  services, and local events. Unsubscribe at any time.
                </p>
                <div className="w-100 text-center">
                  <button
                    type="submit"
                    className="btn btn-block text-white mt-4 rounded-0"
                    style={{ backgroundColor: "#ff004e", width: "400px" }}
                  >
                    {signupstate}
                  </button>
                </div>
              </form>
              <p className="text-center mt-2" style={{ fontSize: "13.5px" }}>
                Already have an account?{" "}
                <a href="#" style={{ color: "#ff004e" }} onClick={toggleForm}>
                  Login
                </a>
              </p>
            </div>
            <div className="col-12 col-md-2 col-sm-2 col-lg-2 col-xl-2"></div>
          </div>
        </>
      )}
      {/* <div>
        <div
          className="d-flex align-items-center my-1 m-auto"
          style={{ maxWidth: "400px", color: "#7C7C7C", opacity: "0.75" }}
        >
          <hr className="flex-grow-1" />
          <span className="mx-2">or</span>
          <hr className="flex-grow-1" />
        </div>
        <div
          className="d-flex p-2 px-2 m-auto"
          style={{
            maxWidth: "400px",
            border: "1px solid #484848",
            borderRadius: "2px",
            opacity: " 0.7",
          }}
        >
          <button
            className=" w-100 font-2 bg-transparent"
            style={{ opacity: "1", fontWeight: "600", color: "#484848" }}
          >
            Continue with Google
          </button>
        </div>
      </div> */}
    </div>
  );
}

export default function LoginForm() {
  return <LoginSignUp />;
}
