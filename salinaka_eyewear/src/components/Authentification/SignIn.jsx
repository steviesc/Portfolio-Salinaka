import React, { useState, useContext } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import "../Home/Content_Style.css";
import "./authentification.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import instance from "../../request";
import { UserContext } from "../../App";

export default function SignIn() {
  const location = useLocation();
  const navigate = useNavigate();
  const { showUser, setShowUser, userName, setUserName } =
    useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loginError, setLoginError] = useState(false);

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
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    instance
      .get("/signin")
      .then((res) => {
        const users = res.data;
        const user = users.find(
          (user) => user.email === email && user.password === password
        );
        if (user) {
          console.log("User Data:", user);
          setShowUser(true);
          setUserName(`${user.name}`);
          // save info in localStorage
          localStorage.setItem("user", JSON.stringify({ name: user.name }));
          navigate("/home");
        } else {
          setLoginError(true);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <div className="auth-content">
      {loginError ? (
        <h5 className="text-center toast-error">Incorrect email or password</h5>
      ) : null}
      <div className="auth undefined">
        <div className="auth-main">
          <h3>Sign in to Salinaka</h3>
          <br />
          <div className="auth-wrapper">
            <form action="#" onSubmit={handleSubmit}>
              <div className="auth-field">
                <div className="input-group">
                  <label
                    htmlFor="email"
                    className="label-input"
                    style={{ color: emailError ? "red" : "" }}
                  >
                    {emailError || "Email"}
                  </label>
                  <input
                    type="email"
                    id="email"
                    className={`input-form ${emailError ? "input-error" : ""}`}
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
                  <label htmlFor="password" className="label-input">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="input-form undefined"
                    name="password"
                    placeholder="Your Password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>
              </div>
              <br />
              <div className="auth-field auth-action">
                <a
                  href="/forgot_password"
                  style={{ textDecoration: "underline" }}
                >
                  <span>Forgot password?</span>
                </a>
                <button className="button auth-button" type="submit">
                  Sign In
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
          <strong>Don't have an account?</strong>
        </span>
        <Link
          to="/signup"
          className="button button-small button-border button-border-gray button-icon"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
