import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import ProductsData from "../../ListData";
import { useSelector } from "react-redux";
import {
  removeFromCart,
  addQuantity,
  minusQuantity,
  removeBasket,
} from "../../store/count";
import { useDispatch } from "react-redux";

export default function BasketItem() {
  // const productList = useSelector((state) => {
  //   return state.countStore.data.filter((v) => v.basket);
  // });
  const cartItems = useSelector((state) => {
    return state.countStore.cart;
  });
  //   useEffect(() => {
  //     console.log("basketitems", productList);
  //   });
  //   const [quantity, setQuantity] = useState(1);
  const handleAddQuantity = (id) => {
    dispatch(addQuantity(id));
  };
  const handleMinusQuantity = (id) => {
    dispatch(minusQuantity(id));
  };

  const dispatch = useDispatch();
  const removeItem = (index) => {
    dispatch(removeFromCart(index));
    dispatch(removeBasket(cartItems[index].id));
  };

  return (
    <div>
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
                src={ProductsData.filter((item) => item.id == v.id)[0].image}
                alt=""
                className="basket-item-img is-img-loaded"
              />
            </div>
            <div className="basket-item-details">
              <a href="/product">
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

    // <div className="basket-item">
    //   <div className="basket-item-control">
    //     <button
    //       className="button
    //       button-border
    //       button-border-gray
    //       button-small
    //       basket-control
    //       basket-control-add"
    //     >
    //       <span className="anticon anticon-plus" style={{ fontSize: "9px" }}>
    //         <AddIcon />
    //       </span>
    //     </button>
    //     <button
    //       className="button
    //       button-border
    //       button-border-gray
    //       button-small
    //       basket-control
    //       basket-control-minus"
    //     >
    //       <span className="anticon anticon-minus" style={{ fontSize: "9px" }}>
    //         <RemoveIcon />
    //       </span>
    //     </button>
    //   </div>
    //   <div className="basket-item-wrapper">
    //     <div className="basket-item-img-wrapper">
    //       <img src="" alt="" className="basket-item-img is-img-loaded" />
    //     </div>
    //     <div className="basket-item-details">
    //       <a href="/product">
    //         <h4 className="underline basket-item-name">{}</h4>
    //       </a>
    //       <div className="basket-item-specs">
    //         <div>
    //           <span className="spec-title">Quantity</span>
    //           <h5 className="my-0">{}</h5>
    //         </div>
    //         <div>
    //           <span className="spec-title">Size</span>
    //           <h5 className="my-0">{}</h5>
    //         </div>
    //         <div>
    //           <span className="spec-title">Color</span>
    //           <div
    //             style={{
    //               backgroundColor: "rgb(0, 77, 132)",
    //               width: "15px",
    //               height: "15px",
    //               borderRadius: "50%",
    //             }}
    //           ></div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="basket-item-price">
    //       <h4 className="my-0">${}.00</h4>
    //     </div>
    //     <button className="basket-item-remove button button-border button-border-gray button-small">
    //       <span className="anticon anticon-close">
    //         <CloseIcon />
    //       </span>
    //     </button>
    //   </div>
    // </div>
  );
}
