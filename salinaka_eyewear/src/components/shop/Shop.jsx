import React, { useEffect, useState } from "react";
import ProductsData from "../../ListData";
import "./shop_style.css";
import { addBasket, addToCart, changeFilters } from "../../store/count";
import { useDispatch, useSelector } from "react-redux";
import CheckIcon from "@mui/icons-material/Check";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

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

export default function Shop() {
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

  //show more
  const cartItems = useSelector((state) => {
    return state.countStore.cart;
  });
  const [showMore, setShowMore] = useState(false);
  const [shopList, setShopList] = useState(ProductsData.slice(0, 12));
  const shopMore = () => {
    setShowMore(true);
    // setShopList(ProductsData);
  };

  //filter and sort
  const filters = useSelector((state) => state.countStore.filters) || {};
  useEffect(() => {
    let productsToFilter = showMore ? ProductsData : ProductsData.slice(0, 12);
    let filteredProducts = productsToFilter;

    if (filters.filter) {
      // Apply filters
      filteredProducts = filteredProducts.filter((product) => {
        if (
          filters.brand &&
          product.type.toLowerCase() !== filters.brand.toLowerCase()
        ) {
          return false;
        }
        if (
          product.price < filters.priceRange[0] ||
          product.price > filters.priceRange[1]
        ) {
          return false;
        }
        return true;
      });
    }

    // Apply sorting
    let sortedProducts = [...filteredProducts];
    switch (filters.sortBy) {
      case "name-asc":
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "price-asc":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    setShopList(sortedProducts);
  }, [filters, showMore]);

  //no filter no sort
  const removeFilter = (filterType) => {
    dispatch(changeFilters(filterType));
  };

  return (
    <section className="product-list-wrapper">
      {filters.sortBy ||
      filters.brand ||
      filters.priceRange[0] !== 56 ||
      filters.priceRange[1] !== 674 ? (
        <div className="product-list-header">
          <div className="product-list-header-title">
            <h5>
              Found {shopList.length} product{shopList.length > 1 ? "s" : null}
            </h5>
          </div>
        </div>
      ) : null}
      <div className="product-applied-filters">
        {filters.brand ? (
          <div className="pill-wrapper">
            <span className="d-block">Brand</span>
            <div className="pill padding-right-l">
              <h5 className="pill-content margin-0">{filters.brand}</h5>
              <div className="pill-remove">
                <h5 className="margin-0 text-subtle">
                  <span
                    className="anticon anticon-close-circle"
                    onClick={() => removeFilter("brand")}
                  >
                    <HighlightOffIcon />
                  </span>
                </h5>
              </div>
            </div>
          </div>
        ) : null}
        {filters.priceRange[0] == 56 && filters.priceRange[1] == 674 ? null : (
          <div className="pill-wrapper">
            <span className="d-block">Price Range</span>
            <div className="pill padding-right-l">
              <h5 className="pill-content margin-0">
                ${filters.priceRange[0]} - ${filters.priceRange[1]}{" "}
              </h5>
              <div className="pill-remove">
                <h5 className="margin-0 text-subtle">
                  <span
                    className="anticon anticon-close-circle"
                    onClick={() => removeFilter("priceRange")}
                  >
                    <HighlightOffIcon />
                  </span>
                </h5>
              </div>
            </div>
          </div>
        )}
        {filters.sortBy ? (
          <div className="pill-wrapper">
            <span className="d-block">Sort By</span>
            <div className="pill padding-right-l">
              <h5 className="pill-content margin-0">{filters.sortBy}</h5>
              <div className="pill-remove">
                <h5 className="margin-0 text-subtle">
                  <span
                    className="anticon anticon-close-circle"
                    onClick={() => removeFilter("sortBy")}
                  >
                    <HighlightOffIcon />
                  </span>
                </h5>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <div className="product-grid">
        {shopList.map((v, i) => {
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
      {showMore ? null : (
        <div className="shop-more" onClick={shopMore}>
          <button className="button button-small">Show More Items</button>
        </div>
      )}
    </section>
  );
}
