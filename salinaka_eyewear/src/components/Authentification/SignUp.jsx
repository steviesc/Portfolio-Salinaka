import React, { useContext, useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import "../Home/Content_Style.css";
import "./authentification.css";
import { Link, useNavigate } from "react-router-dom";
import instance from "../../request";
import { UserContext } from "../../App";

export default function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState("");
  const { showUser, setShowUser, userName, setUserName } =
    useContext(UserContext);

  const handleNameChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setName(value);

    if (!value) {
      setNameError("Full name is required.");
    } else if (value.length < 4) {
      setNameError("Name should be at least 4 characters.");
    } else {
      setNameError("");
    }
  };

  const handleEmailChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setEmail(value);

    if (!value) {
      setEmailError("Email is required.");
    } else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value)) {
      setEmailError("Email is not valid.");
    } else {
      setEmailError("");
    }
  };

  const handlePwChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setPw(value);

    if (!value) {
      setPwError("Password is required.");
    } else if (value.length < 4) {
      setPwError("Password length should be at least 8 characters.");
    } else {
      setPwError("");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      setNameError("Full name is required.");
    }
    if (!email) {
      setEmailError("Email is required.");
    }
    if (!pw) {
      setPwError("Password is required.");
    }
    if (name && email && pw && !nameError && !emailError && !pwError) {
      instance
        .post("/signup", { name, email, password: pw })
        .then((response) => {
          console.log(response.data);
          setShowUser(true);
          setUserName(`${name}`);
          navigate("/home");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div className="auth-content">
      <div className="auth undefined">
        <div className="auth-main">
          <h3>Sign up to Salinaka</h3>
          <br />
          <div className="auth-wrapper">
            <form action="#" onSubmit={handleSubmit}>
              <div className="auth-field">
                <div className="input-group">
                  <label
                    htmlFor="fullname"
                    className="label-input"
                    style={{ color: nameError ? "red" : "" }}
                  >
                    {nameError || "* Full Name"}
                  </label>
                  <input
                    type="text"
                    id="fullname"
                    className="input-form undefined"
                    name="fullname"
                    placeholder="John Doe"
                    value={name}
                    onChange={handleNameChange}
                    style={{ borderColor: nameError ? "red" : "#c5c5c5" }}
                  />
                </div>
              </div>
              <div className="auth-field">
                <div className="input-group">
                  <label
                    htmlFor="email"
                    className="label-input"
                    style={{ color: emailError ? "red" : "" }}
                  >
                    {emailError || "* Email"}
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="input-form undefined"
                    name="email"
                    placeholder="test@example.com"
                    value={email}
                    onChange={handleEmailChange}
                    style={{ borderColor: emailError ? "red" : "#c5c5c5" }}
                  />
                </div>
              </div>
              <div className="auth-field">
                <div className="input-group">
                  <label
                    htmlFor="password"
                    className="label-input"
                    style={{ color: pwError ? "red" : "" }}
                  >
                    {pwError || "* Password"}
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="input-form undefined"
                    name="password"
                    placeholder="Your Password"
                    value={pw}
                    onChange={handlePwChange}
                    style={{ borderColor: pwError ? "red" : "#c5c5c5" }}
                  />
                </div>
              </div>
              <br />
              <div className="auth-field auth-action auth-action-signup">
                <button className="button auth-button" type="submit">
                  Sign Up
                  <span className="anticon anticon-arrow-right">
                    <ArrowForwardIcon />
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="auth-divider">
          <h6>OR</h6>
        </div>
        <div className="auth-provider">
          <button className="button auth-provider-button provider-facebook">
            <span className="anticon anticon-facebook">
              <FacebookIcon />
            </span>
            Continue with Facebook
          </button>
          <button className="button auth-provider-button provider-google">
            <span className="anticon anticon-google">
              <GoogleIcon />
            </span>
            Continue with Google
          </button>
          <button className="button auth-provider-button provider-github">
            <span className="anticon anticon-github">
              <GitHubIcon />
            </span>
            Continue with Github
          </button>
        </div>
      </div>
      <div className="auth-message">
        <span className="auth-info">
          <strong>Already have an account?</strong>
        </span>
        <Link
          className="button button-small button-border button-border-gray button-icon"
          to="/signin"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}
