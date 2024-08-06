import React from "react";
import "./Content_Style.css";
import { useNavigate } from "react-router-dom";

export default function DisplayRecommended({ list }) {
  const navigate = useNavigate();
  const toProductView = (id) => {
    navigate(`/product/${id}`);
  };
  return (
    <div className="display">
      <div className="display-header">
        <h1>Recommended Products</h1>
        <a href="/recommended">See All</a>
      </div>
      <div className="product-display-grid">
        {list.map((v, i) => {
          return (
            <div
              className="product-display"
              onClick={() => toProductView(v.id)}
              key={v.id}
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
  );
}
