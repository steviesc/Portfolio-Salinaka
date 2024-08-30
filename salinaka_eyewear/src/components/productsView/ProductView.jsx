import React, { useEffect, useRef, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useParams } from "react-router-dom";
import ProductsData from "../../ListData";
import "../Home/Content_Style.css";
import "../productsView/productView.css";
import { createTheme, useTheme } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { addBasket, removeBasket, addToCart } from "../../store/count";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "@emotion/react";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = ["28 mm", "36 mm", "42 mm"];

function getStyles(name, size, theme) {
  return {
    fontWeight:
      size.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const popTheme = createTheme({
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

export default function ProductView() {
  const params = useParams();
  const targetItem = ProductsData.filter((v) => v.id === params.id);
  const obj = targetItem[0];
  const list = ProductsData.filter((v) => v.Recommended);
  const colors = [
    "rgb(0, 0, 0)",
    "rgb(197, 0, 197)",
    "rgb(0, 77, 132)",
    "rgb(117, 54, 0)",
    "rgb(247, 8, 8)",
    "rgb(9, 225, 182)",
    "rgb(255, 111, 0)",
  ];
  const [selectedColor, setSelectedColor] = useState("");

  const colorSelected = (color) => {
    setSelectedColor(color);
  };

  const theme = useTheme();
  const [size, setSize] = React.useState("");

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSize(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

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
      color: selectedColor,
      size: size[0],
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

  return (
    <div className="product-view">
      <a href="/shop">
        <h3 className="button-link d-inline-flex">
          <span className="anticon anticon-arrow-left">
            <ArrowBackIcon />
          </span>
          &nbsp;Back to shop
        </h3>
      </a>
      <div className="product-modal">
        <div className="product-modal-image-collection">
          <div className="product-modal-image-collection-wrapper">
            <img
              src={obj.image}
              alt=""
              className="product-modal-image-collection-img is-img-loaded"
            />
          </div>
        </div>
        <div className="product-modal-image-wrapper">
          <img
            src={obj.image}
            alt=""
            className="product-modal-image is-img-loaded"
          />
        </div>
        <div className="product-modal-details">
          <br />
          <span className="text-subtle">{obj.type}</span>
          <h1 className="margin-top-0">{obj.name}</h1>
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
            placeat similique dicta nulla praesentium deserunt. Corporis
            repellendus deleniti dolores eligendi.
          </span>
          <br />
          <br />
          <div className="diver"></div>
          <br />
          <div>
            <span className="text-subtle">Lens Width and Frame Size</span>

            <div>
              <FormControl sx={{ m: 1, width: 400, mt: 3 }}>
                <Select
                  // multiple
                  displayEmpty
                  value={size}
                  onChange={handleChange}
                  input={<OutlinedInput />}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return <em>--Select Size--</em>;
                    }

                    return selected.join(", ");
                  }}
                  MenuProps={MenuProps}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  {/* <MenuItem disabled value="">
                    <em>Placeholder</em>
                  </MenuItem> */}
                  {names.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, size, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
          <div>
            <span className="text-subtitle">Choose Color</span>
            <br />
            <br />
            <div className="color-chooser">
              {colors.map((color) => {
                return (
                  <div
                    className={`color-item ${
                      selectedColor === color ? "color-item-selected" : ""
                    }`}
                    style={{ backgroundColor: color }}
                    key={color}
                    onClick={() => colorSelected(color)}
                  ></div>
                );
              })}
            </div>
          </div>
          <h1>${obj.price}.00</h1>
          <div className="product-modal-action">
            {/* {productList.filter(v=> v.id==obj.id)} */}
            {/* {productList.filter((v) => v.id == obj.id)[0].basket ? ( */}
            <div style={{ display: "flex" }}>
              <ThemeProvider theme={popTheme}>
                <Box>
                  <button
                    className="button button-small"
                    onClick={() =>
                      add([obj.id, { vertical: "top", horizontal: "right" }])
                    }
                  >
                    Add To Basket
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
          </div>
        </div>
      </div>
      <div style={{ marginTop: "10rem" }}>
        <div className="display-header">
          <h1>Recommended</h1>
          <a href="/recommended">See All</a>
        </div>
        <div className="product-display-grid">
          {list.map((v, i) => {
            return (
              <div className="product-display" key={i}>
                <div className="product-display-img">
                  <img src={v.image} alt="" className="product-card-img " />
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
