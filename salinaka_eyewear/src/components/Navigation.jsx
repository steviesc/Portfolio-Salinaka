import React, { useEffect, useState, createContext, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./Home/Content_Style.css";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import {
  Routes,
  Route,
  Link,
  Navigate,
  NavLink,
  useRoutes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Basket from "../components/shop/Basket";
import { useSelector } from "react-redux";
import Filter from "./shop/Filter";
import ProductsData from "../ListData";
import { UserContext } from "../App";
import UserNav from "./Navbar/userNav";

export default function Navigation() {
  const numCartItems = useSelector((state) => {
    // console.log("numcartitems state", state);
    return state.countStore.cart.length;
  });
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [filterBtn, setFilterBtn] = useState(false);
  const { showUser, setShowUser, userName, setUserName } =
    useContext(UserContext);

  useEffect(() => {
    setFilterBtn(pathname === "/shop");
    if (pathname !== "/signin" && pathname !== "/signup") {
      setSignin(true);
      setSignup(true);
    }
    if (showUser) {
      setSignup(false);
      setSignin(false);
    }
  }, [pathname, showUser]);

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    // setState({ ...state, [anchor]: open });
    setState((prevState) => ({ ...prevState, [anchor]: open }));
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 550 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <h1>content</h1>
    </Box>
  );

  //sign in/sign up
  const [signup, setSignup] = useState(true);
  const [signin, setSignin] = useState(true);
  const signupClicked = () => {
    setSignin(false);
    setSignup(true);
  };
  const signinClicked = () => {
    setSignup(false);
    setSignin(true);
  };

  //search products
  const [searchInput, setSearchInput] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchInput(query); 
    if (query) {
      const results = ProductsData.filter((product) => {
        return product.name.toLowerCase().includes(query.toLowerCase());
      });
      console.log("res", results, "query", query);
      setFilteredProducts(results);
      // navigate(`/search/${query}`);
    } else {
      setFilteredProducts([]);
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      navigate(`/search/${searchInput}`, {
        state: { results: filteredProducts },
      });
    }
  };

  /* divider */
  return (
    <nav className="navigation is-nav-scrolled">
      <div className="logo">
        <a href="">
          <img
            src="https://salinaka-ecommerce.web.app/images/logo-full.059e10fa5fedbfb65165e7565ed3936f.png"
            alt=""
            className="user-nav-img"
          />
        </a>
      </div>
      <ul className="navigation-menu-main">
        <li>
          <NavLink to="/home">Home</NavLink>
        </li>
        <li>
          <NavLink to="/shop">Shop</NavLink>
        </li>
        <li>
          <NavLink to="/featured">Featured</NavLink>
        </li>
        <li>
          <NavLink to="/recommended">Recommended</NavLink>
        </li>
      </ul>
      {filterBtn ? <Filter /> : null}

      <div className="searchbar">
        <span className="anticon anticon-search searchbar-icon">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </span>
        <input
          type="text"
          className="search-input searchbar-input"
          placeholder="Search product..."
          value={searchInput}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
        />
      </div>
      <ul className="navigation-menu">
        <li className="navigation-menu-item">
          <button className="button-link navigation-menu-link basket-toggle">
            <div className="badge">
              <Basket />
              {numCartItems == 0 ? null : (
                <span className="badge-count">{numCartItems}</span>
              )}
            </div>
          </button>
        </li>
        {showUser ? (
          <li className="navigation-menu-item">
            <div className="user-nav">
              <h5 className="text-overflow-ellipsis">{userName}</h5>
              <div className="user-nav-img-wrapper">
                <img
                  src="https://salinaka-ecommerce.web.app/images/defaultAvatar.4e9edb2a624547982816014bf128fcd5.jpg"
                  alt=""
                  className="user-nav-img"
                />
              </div>
              <UserNav />
            </div>
          </li>
        ) : null}

        <li className="navigation-action">
          {signin ? (
            <Link
              to="/signup"
              href=""
              className="button button-small"
              onClick={signupClicked}
            >
              Sign Up
            </Link>
          ) : null}
          {/* <Link to="/signup" href="" className="button button-small" onClick={signupClicked}> 
            Sign Up
          </Link> */}
          {signup ? (
            <Link
              to="/signin"
              className="button button-small button-muted margin-left-s"
              onClick={signinClicked}
            >
              Sign In
            </Link>
          ) : null}
          {/* <Link
            to="/signin"
            className="button button-small button-muted margin-left-s"
            onClick={signinClicked}
          >
            Sign In
          </Link> */}
        </li>
      </ul>
    </nav>
  );
}
