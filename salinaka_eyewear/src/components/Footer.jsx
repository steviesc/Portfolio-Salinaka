import React from "react";
import "./Home/Content_Style.css";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-col-1">
        <strong>
          <span>
            Developed by <a href="">Stella Chen</a>
          </span>
        </strong>
      </div>
      <div className="footer-col-2">
        <img
          src="https://salinaka-ecommerce.web.app/images/logo-full.059e10fa5fedbfb65165e7565ed3936f.png"
          alt=""
          className="footer-logo"
        />
        <h5>© 2024</h5>
      </div>
      <div className="footer-col-3">
        <strong>
          <span>
            Fork this project  
            <a href="https://github.com/jgudo/ecommerce-react">HERE</a>
          </span>
        </strong>
      </div>
    </div>
  );
}
