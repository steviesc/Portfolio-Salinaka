import React from "react";
import ProductsData from "../../ListData";
import "../Home/Content_Style.css";
import "./featuredProducts.css";
import { useNavigate } from "react-router-dom";

export default function FeaturedProducts() {
  const list = ProductsData.filter((v) => v.Featured);
  const navigate = useNavigate();
  const toProductView = (id) => {
    navigate(`/product/${id}`);
  };
  return (
    <div className="featured">
      <div className="banner">
        <div className="banner-desc">
          <h1>Featured Products</h1>
        </div>
        <div className="banner-img">
          <img
            src="https://salinaka-ecommerce.web.app/images/banner-guy.fbf4f0f7396fe31ca288dc1dd9822342.png"
            alt=""
          />
        </div>
      </div>
      <div className="display">
        <div className="product-display-grid">
          {list.map((v, i) => {
            return (
              <div
                className="product-display"
                onClick={() => toProductView(v.id)}
              >
                <div className="product-display-img">
                  <img
                    src={v.image}
                    alt=""
                    className="product-card-img is-img-loaded"
                  />
                </div>
                <div className="product-display-details">
                  <h2>{v.name}</h2>
                  <p className="text-subtle text-italic">{v.type}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
