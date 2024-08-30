import React, { useContext, useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import BasketItem from "./BasketItem";
import { useDispatch, useSelector } from "react-redux";
import { emptyCart } from "../../store/count";
import { Modal } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../../App";

export default function Basket() {
  const { showUser, setShowUser, userName, setUserName } =
    useContext(UserContext);
  const [isDisabledPath, setIsDisabledPath] = useState(false);
  const location = useLocation();
  useEffect(() => {
    console.log("useEffecting");
    if (location.pathname === "/signin" || location.pathname === "/signup") {
      setIsDisabledPath(true);
    } else {
      setIsDisabledPath(false);
    }
  }, [location.pathname]);

  //checkout
  const [modalOpen, setModalOpen] = React.useState(false);
  const navigate = useNavigate();
  const toSignIn = () => {
    navigate("/signin");
  };
  let cartItems = useSelector((state) => {
    return state.countStore.cart;
  });
  let subtotal = 0;
  cartItems.forEach((element) => {
    subtotal += element.quantity * element.price;
  });
  let itemsTotal = cartItems.length;
  const dispatch = useDispatch();
  const clearBasket = () => {
    dispatch(emptyCart());
  };
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const basketRef = useRef(null);
  const closeRef = useRef(null);

  const openDrawer = (anchor) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: true });
  };

  const closeDrawer = (anchor) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    if (event && closeRef.current && closeRef.current.contains(event.target)) {
      setState({ ...state, [anchor]: false });
    } else if (
      event &&
      basketRef.current &&
      basketRef.current.contains(event.target)
    ) {
      return;
    } else {
      setState({ ...state, [anchor]: false });
    }
  };
  const list = (anchor) => (
    <Box
      role="presentation"
      onClick={closeDrawer(anchor)}
      onKeyDown={closeDrawer(anchor)}
      className="basket"
      ref={basketRef}
    >
      <div className="basket">
        <div className="basket-list">
          <div className="basket-header">
            <h3 className="basket-header-title">
              My Basket  
              <span>
                ( {itemsTotal} {itemsTotal > 1 ? "items" : "item"})
              </span>
            </h3>
            <span
              className="basket-toggle button button-border button-border-gray button-small"
              onClick={closeDrawer(anchor)}
              ref={closeRef}
            >
              Close
            </span>
            <button
              className="basket-clear button button-border button-border-gray button-small"
              type="button"
              onClick={clearBasket}
              disabled={itemsTotal == 0}
            >
              <span>Clear Basket</span>
            </button>
          </div>
          {cartItems.length > 0 ? null : (
            <div className="basket-empty">
              <h5 className="basket-empty-msg">Your basket is empty</h5>
            </div>
          )}
          <BasketItem />
        </div>
        <div className="basket-checkout">
          <div className="basket-total">
            <p className="basket-total-title">Subtotal Amount:</p>
            <h2 className="basket-total-amount">${subtotal}.00</h2>
          </div>
          <button
            className="basket-checkout-button button"
            onClick={() => {
              if (showUser) {
                navigate("/checkout/step1");
                closeDrawer("right")();
              } else {
                setModalOpen(true);
              }
            }}
            type="button"
            // disableAutoFocus
            disabled={cartItems.length === 0}
          >
            Check Out
          </button>
          <Modal
            open={modalOpen}
            onClose={() => {
              setModalOpen(false);
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={checkStyle}>
              <p className="text-center">
                You must sign in to continue checking out
              </p>
              <br />
              <div className="d-flex-center">
                <button
                  className="button button-border button-border-gray button-small"
                  style={{ marginRight: "2px" }}
                  onClick={() => {
                    setModalOpen(false);
                    closeDrawer(anchor);
                  }}
                >
                  Continue shopping
                </button>
                <button
                  className="button button-small"
                  style={{ marginLeft: "2px" }}
                  onClick={() => {
                    toSignIn();
                    setModalOpen(false);
                    closeDrawer(anchor);
                  }}
                >
                  Sign in to checkout
                </button>
              </div>
            </Box>
          </Modal>
        </div>
      </div>
    </Box>
  );
  //check out
  const checkStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 370,
    height: 216,
    bgcolor: "background.paper",
    border: "1.5px solid grey",
    boxShadow: 24,
    p: 4,
  };
  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <FontAwesomeIcon
            icon={faBagShopping}
            onClick={!isDisabledPath ? openDrawer(anchor) : undefined}
            disabled={isDisabledPath}
            style={{
              color: isDisabledPath ? "gray" : "inherit",
              cursor: isDisabledPath ? "not-allowed" : "pointer",
            }}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={closeDrawer(anchor)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
