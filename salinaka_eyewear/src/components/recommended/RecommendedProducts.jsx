import React from "react";
import ProductsData from "../../ListData";
import "../Home/Content_Style.css";
import "../featured/featuredProducts.css";
import { useNavigate } from "react-router-dom";

export default function RecommendedProducts() {
  const list = ProductsData.filter((v) => v.Recommended);
  const navigate = useNavigate();
  const toProductView = (id) => {
    navigate(`/product/${id}`);
  };
  return (
    <div className="recommended">
      <div className="banner">
        <div className="banner-desc">
          <h1>Recommended Products</h1>
        </div>
        <div className="banner-img">
          <img
            src="https://salinaka-ecommerce.web.app/images/banner-girl-1.24e9b8f48d5a0ac32680edd194503695.png"
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
