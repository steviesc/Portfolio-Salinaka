import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import "./authentification.css";

export default function ForgotPassword() {
  return (
    <div className="forgot_password">
      <h3>Forgot Your Password?</h3>
      <p>
        Enter your email address and we will send you a password reset email.
      </p>
      <br />
      <input
        type="text"
        name=""
        id=""
        className="input-form"
        aria-label="* Email"
        placeholder="Enter your email"
        style={{ width: "100%" }}
      />
      <br />
      <br />
      <button className="button w-100-mobile">
        <span className="anticon anticon-check" style={{ marginRight: "5px" }}>
          <CheckIcon />
        </span>
        Send Password Reset Email
      </button>
    </div>
  );
}
