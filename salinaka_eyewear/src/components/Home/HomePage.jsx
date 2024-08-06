import React from "react";
import DisplayFeatured from "./DisplayFeatured";
import "./Content_Style.css";
import ProductsData from "../../ListData";
import DisplayRecommended from "./DisplayRecommended";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function HomePage(props) {
  return (
    <div className="home">
      <div className="banner">
        <div className="banner-desc">
          <h1 className="text-thin">
            <strong>See</strong> everything with <strong>Clarity</strong>
          </h1>
          <p>
            Buying eyewear should leave you happy and good-looking, with money
            in your pocket. Glasses, sunglasses, and contacts—we’ve got your
            eyes covered.
          </p>
          <br />
          <a href="/shop" className="button">
            Shop Now  
            <span className="anticon anticon-arrow-right">
              <ArrowForwardIcon />
            </span>
          </a>
        </div>
        <div className="banner-img">
          <img src="https://salinaka-ecommerce.web.app/images/banner-girl.789f1fa6f451ad26c5039fcbc049ace7.png"></img>
        </div>
      </div>
      <DisplayFeatured list={ProductsData.filter((v) => v.Featured)} />
      <DisplayRecommended list={ProductsData.filter((v) => v.Recommended)} />
    </div>
  );
}
