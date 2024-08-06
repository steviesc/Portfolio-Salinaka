import React, { useState } from "react";
import ProductsData from "../../ListData";
import "./shop_style.css";
import { addBasket, addToCart } from "../../store/count";
import { useDispatch, useSelector } from "react-redux";
import CheckIcon from "@mui/icons-material/Check";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";

const theme = createTheme({
  components: {
    MuiSnackbar: {
      styleOverrides: {
        anchorOriginTopRight: {
          "@media (min-width: 600px)": {
            top: "100px",
            right: "50px",
            left: "auto",
          },
        },
        root: {
          "& .MuiSnackbarContent-root": {
            backgroundColor: "rgb(225, 247, 216)",
            color: "green",
            minWidth: "150px",
            minHeight: "50px",
            fontSize: "12px",
            transition: "none",
          },
        },
      },
    },
  },
});

export default function Search() {
  //add to cart
  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const add = (input) => {
    dispatch(addBasket(input[0]));
    const product = ProductsData.find((product) => product.id === input[0]);
    const newItem = {
      color: "rgb(0, 0, 0)",
      size: "28 mm",
      id: input[0],
      quantity: 1,
      price: product ? product.price : "Price not found",
    };
    dispatch(addToCart(newItem));
    setState({ ...input[1], open: true });
  };
  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const cartItems = useSelector((state) => {
    return state.countStore.cart;
  });
  //search state
  const location = useLocation();
  const { value } = useParams();
  const { results } = location.state || { results: [] };

  return (
    <section className="product-list-wrapper">
      {results[0] ? (
        <h4 style={{ textAlign: "center" }}>
          Found {results.length} product{results.length > 1 ? "s" : null} with
          keyword "{value}"
        </h4>
      ) : null}
      {results[0] ? (
        <div className="product-grid">
          {results.map((v, i) => {
            return (
              <div className="product-card" key={v.id}>
                {cartItems.some((item) => item.id == v.id) ? (
                  <span className="anticon anticon-check fa fa-check product-card-check">
                    <CheckIcon />
                  </span>
                ) : null}
                <div className="product-card-content">
                  <div className="product-card-img-wrapper">
                    <img
                      src={v.image}
                      alt=""
                      className="product-card-img is-img-loaded"
                    />
                  </div>
                  <div className="product-details">
                    <h5 className="product-card-name text-overflow-ellipsis margin-auto">
                      {v.name}
                    </h5>
                    <p className="product-card-brand">{v.type}</p>
                    <h4 className="product-card-price">${v.price}.00</h4>
                  </div>
                </div>
                <ThemeProvider theme={theme}>
                  <Box>
                    <button
                      className="product-card-button button-small button button-block "
                      onClick={() =>
                        add([v.id, { vertical: "top", horizontal: "right" }])
                      }
                    >
                      Add to basket
                    </button>
                    <Snackbar
                      sx={{
                        backgroundColor: "rgb(225, 247, 216)",
                        border: "solid green 1px",
                        borderStyle: "none",
                      }}
                      anchorOrigin={{ vertical, horizontal }}
                      open={open}
                      onClose={handleClose}
                      message="Item added to cart"
                      key={vertical + horizontal}
                      autoHideDuration={4000}
                    />
                  </Box>
                </ThemeProvider>
              </div>
            );
          })}
        </div>
      ) : (
        <div
          style={{
            textAlign: "center",
            lineHeight: "700px",
            fontSize: "20px",
          }}
        >
          No product found
        </div>
      )}
    </section>
  );
}
