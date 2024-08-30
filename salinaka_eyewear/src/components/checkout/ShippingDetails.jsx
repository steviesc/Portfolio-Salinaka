import React, { useContext, useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useSelector } from "react-redux";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { UserContext } from "../../App";

export default function ShippingDetails() {
  const [isChecked, setIsChecked] = useState(() => {
    const saved = localStorage.getItem("isInternationalChecked");
    return saved === "true";
  });

  const { checkTotal, setCheckTotal } = useContext(UserContext);

  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const cartItems = useSelector((state) => {
    return state.countStore.cart;
  });
  let subtotal = 0;
  cartItems.forEach((element) => {
    subtotal += element.quantity * element.price;
  });
  const [isInternational, setIsInternational] = useState(isChecked);

  useEffect(() => {
    // when isChecked is changed, update localStorage
    localStorage.setItem("isInternationalChecked", isChecked);
  }, [isChecked]);

  return (
    <div className="checkout">
      <div className="checkout-header">
        <ul className="checkout-header-menu">
          <li className="checkout-header-list ">
            <div className="checkout-header-item">
              <div className="checkout-header-icon">
                <h4 className="checkout-header-step">1</h4>
              </div>
              <h6 className="checkout-header-subtitle">Order Summary</h6>
            </div>
          </li>
          <li className="checkout-header-list is-active-step">
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
      <div className="checkout-step-2">
        <h3 className="text-center">Shipping Details</h3>
        <form action="#">
          <div className="checkout-shipping-wrapper">
            <div className="checkout-shipping-form">
              <div className="checkout-fieldset">
                <div className="d-block checkout-field">
                  <div className="input-group">
                    <label htmlFor="fullname" className="label-input">
                      * Full Name
                    </label>
                    <input
                      type="text"
                      id="fullname"
                      className="input-form undefined"
                      placeholder="Enter your full name"
                      style={{ textTransform: "capitalize" }}
                    />
                  </div>
                </div>
                <div className="d-block checkout-field">
                  <div className="input-group">
                    <label htmlFor="email" className="label-input">
                      * Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="input-form undefined"
                      placeholder="Enter your email address"
                      style={{ textTransform: "capitalize" }}
                    />
                  </div>
                </div>
              </div>
              <div className="checkout-fieldset">
                <div className="d-block checkout-field">
                  <div className="input-group">
                    <label htmlFor="address" className="label-input">
                      * Shipping Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      className="input-form undefined"
                      placeholder="Enter full shipping address"
                    />
                  </div>
                </div>
                <div className="d-block checkout-field">
                  <div className="input-group">
                    <label htmlFor="mobile" className="label-input">
                      Mobile Number
                    </label>
                    <PhoneInput
                      country={"us"}
                      value={phone}
                      onChange={(value) => setPhone(value)}
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>
              </div>
              <div className="checkout-fieldset">
                <div className="checkout-field">
                  <label htmlFor="isInternational" className="label-input">
                    Shipping Option
                  </label>
                  <div className="checkout-checkbox-field">
                    <input
                      type="checkbox"
                      name=""
                      id="isInternational"
                      checked={isChecked}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setIsChecked(checked);
                        setIsInternational(checked);
                        setCheckTotal(checked ? 50 + subtotal : subtotal);
                      }}
                    />
                    <label htmlFor="isInternational" className="d-flex w-100">
                      <h5 className="d-flex-grow-1 margin-0">
                        &nbsp;International Shipping&nbsp;
                        <span className="text-subtle"> 7-14 days</span>
                      </h5>
                      <h4 className="margin-0">$50.00</h4>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        <br />
        <div className="checkout-total d-flex-end padding-right-m">
          <table>
            <tbody>
              <tr>
                <td>
                  {" "}
                  <span className="d-block margin-0 padding-right-s text-right">
                    International Shipping:{" "}
                  </span>
                </td>
                <td>
                  <h4 className="basket-total-amount text-subtle text-right margin-0 ">
                    ${isInternational ? 50 : 0}.00
                  </h4>
                </td>
              </tr>
              <tr>
                <td>
                  {" "}
                  <span className="d-block margin-0 padding-right-s text-right">
                    Subtotal:
                  </span>
                </td>
                <td>
                  <h4 className="basket-total-amount text-subtle text-right margin-0 ">
                    ${subtotal}.00
                  </h4>
                </td>
              </tr>
              <tr>
                <td>
                  {" "}
                  <span className="d-block margin-0 padding-right-s text-right">
                    Total:
                  </span>
                </td>
                <td>
                  <h2 className="basket-total-amount text-right ">
                    ${isInternational ? 50 + subtotal : subtotal}.00$
                    {/* {checkTotal}.00 */}
                  </h2>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* <div className="basket-total text-right">
          <p className="basket-total-title">Subtotal:</p>
          <h2 className="basket-total-amount">${subtotal}.00</h2>
        </div> */}
        <br />
        <div className="checkout-shipping-action">
          <button
            className="button button-muted"
            onClick={() => navigate("/checkout/step1")}
          >
            <span className="anticon anticon-shop">
              <ArrowBackIcon />
            </span>{" "}
            Go Back
          </button>
          <button
            className="button"
            onClick={(e) => {
              e.preventDefault();
              navigate("/checkout/step3");
            }}
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
