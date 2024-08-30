import React, { useContext, useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckIcon from "@mui/icons-material/Check";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

export default function Payment() {
  const navigate = useNavigate();
  const { checkTotal, setCheckTotal, showUser } = useContext(UserContext);
  console.log(checkTotal);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  // useEffect to save checkTotal in localStorage
  useEffect(() => {
    if (checkTotal !== 0) {
      localStorage.setItem("checkTotal", checkTotal);
    }
  }, [checkTotal]);
  // useEffect to recover checkTotal from localStorage
  useEffect(() => {
    const savedCheckTotal = localStorage.getItem("checkTotal");
    if (savedCheckTotal) {
      setCheckTotal(Number(savedCheckTotal));
    }
  }, [setCheckTotal]);

  const handlePaymentChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };
  return (
    <div className="checkout">
      <div className="checkout-header">
        <ul className="checkout-header-menu">
          <li className="checkout-header-list">
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
          <li className="checkout-header-list is-active-step">
            <div className="checkout-header-item">
              <div className="checkout-header-icon">
                <h4 className="checkout-header-step">3</h4>
              </div>
              <h6 className="checkout-header-subtitle">Payment</h6>
            </div>
          </li>
        </ul>
      </div>
      <div className="checkout-step-3">
        <h3 className="text-center">Payment</h3>
        <br />
        <span className="d-block padding-s">Payment Option</span>
        <div
          className="checkout-fieldset-collapse is-selected-payment"
          style={{ height: "101px" }}
        >
          <div className="checkout-field margin-0">
            <div className="checkout-checkbox-field">
              <input
                type="radio"
                name="type"
                id="modeCredit"
                value="credit"
                onChange={handlePaymentChange} // when clicked to start handlePaymentChange
                checked={selectedPaymentMethod === "credit"} // control checked using condition
              />
              <label htmlFor="modeCredit" className="d-flex w-100">
                <div className="d-flex-grow-1 margin-left-s">
                  <h4 className="margin-0">Credit Card</h4>
                  <span className="text-subtle d-block margin-top-s">
                    Pay with Visa, Master Card and other debit or credit card
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>
        <div
          className="checkout-fieldset-collapse "
          style={{ height: "101px" }}
        >
          <div className="checkout-field margin-0">
            <div className="checkout-checkbox-field">
              <input
                type="radio"
                name="type"
                id="modePayPal"
                value="paypal" 
                onChange={handlePaymentChange} 
                checked={selectedPaymentMethod === "paypal"}
              />
              <label htmlFor="modePayPal" className="d-flex w-100">
                <div className="d-flex-grow-1 margin-left-s">
                  <h4 className="margin-0">PayPal</h4>
                  <span className="text-subtle d-block margin-top-s">
                    Pay easily, fast and secure with PayPal.
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>
        <br />
        <div className="basket-total text-right">
          <p className="basket-total-title">Total:</p>
          <h2 className="basket-total-amount">${checkTotal}.00</h2>
        </div>
        <br />
        <div className="checkout-shipping-action">
          <button
            className="button button-muted"
            onClick={() => navigate("/checkout/step2")}
          >
            <span className="anticon anticon-shop">
              <ArrowBackIcon />
            </span>
            Go Back
          </button>
          {selectedPaymentMethod === "credit" && showUser ? (
            <form
              action="https://project3-mysql-express.onrender.com/create-checkout-session"
              method="POST"
            >
              <input
                type="hidden"
                name="totalAmount"
                value={checkTotal * 100}
              />{" "}
              {/* Multiply by 100 to convert to cents */}
              <button className="button" type="submit">
                <span className="anticon anticon-arrow-right">
                  <CheckIcon />
                </span>
                &nbsp;Confirm
              </button>
            </form>
          ) : null}
        </div>
      </div>
    </div>
  );
}
