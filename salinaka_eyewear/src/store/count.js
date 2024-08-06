import { createSlice } from "@reduxjs/toolkit";
import ProductsData from "../ListData";

const initialState = {
  data: ProductsData,
  cart: [],
  filters: {
    brand: "",
    sortBy: "",
    priceRange: [56, 674],
    filter: false,
  },
};

export const countReducer = createSlice({
  name: "countStore",
  initialState,
  reducers: {
    addBasket: (state, action) => {
      let index = state.data.findIndex((v) => v.id === action.payload);
      if (index == -1) {
        console.log("undefined");
      } else {
        state.data[index].basket = true;
      }
    },
    removeBasket: (state, action) => {
      let index = state.data.findIndex((v) => v.id === action.payload);
      console.log("index", index);
      if (index == -1) {
        console.log("undefined");
      } else {
        state.data[index].basket = false;
      }
    },
    addToCart: (state, action) => {
      if (!state.cart) {
        console.log("undefined");
      } else if (
        state.cart.find(
          (obj) =>
            obj.id == action.payload.id &&
            obj.color == action.payload.color &&
            obj.size == action.payload.size
        )
      ) {
        state.cart[
          state.cart.findIndex((v) => v.id == action.payload.id)
        ].quantity += 1;
      } else {
        state.cart.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      if (!state.cart) {
        console.log("undefined");
      } else {
        state.cart.splice(action.payload, 1);
      }
    },
    emptyCart: (state) => {
      state.cart = [];
    },
    addQuantity: (state, action) => {
      state.cart[action.payload].quantity += 1;
    },
    minusQuantity: (state, action) => {
      if (state.cart[action.payload].quantity > 1) {
        state.cart[action.payload].quantity -= 1;
      }
    },
    updateFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.filters.filter = true;
    },
    resetFilters: (state) => {
      state.filters = {
        brand: "",
        sortBy: "",
        priceRange: [56, 674],
      };
      state.filters.filter = false;
    },
    changeFilters: (state, action) => {
      switch (action.payload) {
        case "brand":
          state.filters.brand = "";
          break;
        case "sortBy":
          state.filters.sortBy = "";
          break;
        case "priceRange":
          state.filters.priceRange = [56, 674];
          break;
        default:
          break;
      }
    },
  },
});

export default countReducer.reducer;
export const {
  addBasket,
  removeBasket,
  addToCart,
  removeFromCart,
  addQuantity,
  minusQuantity,
  emptyCart,
  updateFilters,
  resetFilters,
  changeFilters,
} = countReducer.actions;
