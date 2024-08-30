import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./checkout.css";
import {
  removeFromCart,
  addQuantity,
  minusQuantity,
  removeBasket,
} from "../../store/count";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import ProductsData from "../../ListData";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";

export default function OrderSummary() {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => {
    return state.countStore.cart;
  });
  let subtotal = 0;
  cartItems.forEach((element) => {
    subtotal += element.quantity * element.price;
  });

  const dispatch = useDispatch();
  const handleAddQuantity = (id) => {
    dispatch(addQuantity(id));
  };
  const handleMinusQuantity = (id) => {
    dispatch(minusQuantity(id));
  };
  const removeItem = (index) => {
    dispatch(removeFromCart(index));
    dispatch(removeBasket(cartItems[index].id));
  };

  return (
    <div className="checkout">
      <div className="checkout-header">
        <ul className="checkout-header-menu">
          <li className="checkout-header-list is-active-step">
            <div className="checkout-header-item">
              <div className="checkout-header-icon">
                <h4 className="checkout-header-step">1</h4>
              </div>
              <h6 className="checkout-header-subtitle">Order Summary</h6>
            </div>
          </li>
          <li className="checkout-header-list">
            <div className="checkout-header-item">
              <div className="checkout-header-icon">
                <h4 className="checkout-header-step">2</h4>
              </div>
              <h6 className="checkout-header-subtitle">Shipping Details</h6>
            </div>
          </li>
          <li className="checkout-header-list">
            <div className="checkout-header-item">
              <div className="checkout-header-icon">
                <h4 className="checkout-header-step">3</h4>
              </div>
              <h6 className="checkout-header-subtitle">Payment</h6>
            </div>
          </li>
        </ul>
      </div>
      <div className="checkout-step-1">
        <h3 className="text-center">Order Summary</h3>
        <span className="d-block text-center">
          Review items in your basket.
        </span>
        <br />
        <div className="checkout-items">
          {cartItems.map((v, i) => (
            <div className="basket-item" key={i}>
              <div className="basket-item-control">
                <button
                  className="button
                button-border
                button-border-gray
                button-small
                basket-control
                basket-control-add"
                  onClick={() => handleAddQuantity(i)}
                >
                  <span
                    className="anticon anticon-plus"
                    style={{ fontSize: "9px" }}
                  >
                    <AddIcon />
                  </span>
                </button>
                <button
                  className="button
                button-border
                button-border-gray
                button-small
                basket-control
                basket-control-minus"
                  onClick={() => handleMinusQuantity(i)}
                >
                  <span
                    className="anticon anticon-minus"
                    style={{ fontSize: "9px" }}
                  >
                    <RemoveIcon />
                  </span>
                </button>
              </div>
              <div className="basket-item-wrapper">
                <div className="basket-item-img-wrapper">
                  <img
                    src={
                      ProductsData.filter((item) => item.id == v.id)[0].image
                    }
                    alt=""
                    className="basket-item-img is-img-loaded"
                  />
                </div>
                <div className="basket-item-details">
                  <a href={`/product/${v.id}`}>
                    <h4 className="underline basket-item-name">
                      {ProductsData.filter((item) => item.id == v.id)[0].name}
                    </h4>
                  </a>
                  <div className="basket-item-specs">
                    <div>
                      <span className="spec-title">Quantity</span>
                      <h5 className="my-0">{v.quantity}</h5>
                    </div>
                    <div>
                      <span className="spec-title">Size</span>
                      <h5 className="my-0">{v.size}</h5>
                    </div>
                    <div>
                      <span className="spec-title">Color</span>
                      <div
                        style={{
                          backgroundColor: `${v.color}`,
                          width: "15px",
                          height: "15px",
                          borderRadius: "50%",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="basket-item-price">
                  <h4 className="my-0">
                    $
                    {ProductsData.filter((item) => item.id == v.id)[0].price *
                      v.quantity}
                    .00
                  </h4>
                </div>
                <button
                  className="basket-item-remove button button-border button-border-gray button-small"
                  onClick={() => {
                    removeItem(i);
                  }}
                >
                  <span className="anticon anticon-close">
                    <CloseIcon />
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
        <br />
        <div className="basket-total text-right">
          <p className="basket-total-title">Subtotal:</p>
          <h2 className="basket-total-amount">${subtotal}.00</h2>
        </div>
        <br />
        <div className="checkout-shipping-action">
          <button
            className="button button-muted"
            onClick={() => navigate("/home")}
          >
            <span className="anticon anticon-shop">
              <StorefrontIcon />
            </span>{" "}
            Continue Shopping
          </button>
          <button
            className="button"
            onClick={() => navigate("/checkout/step2")}
          >
            Next Step{" "}
            <span className="anticon anticon-arrow-right">
              <ArrowForwardIcon />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
