import SignIn from "../components/Authentification/SignIn";
import SignUp from "../components/Authentification/SignUp";
import HomePage from "../components/Home/HomePage";
import NotFound from "../components/NotFound";
import FeaturedProducts from "../components/featured/FeaturedProducts";
import ProductView from "../components/productsView/ProductView";
import RecommendedProducts from "../components/recommended/RecommendedProducts";
import Shop from "../components/shop/Shop";
import Search from "../components/shop/Search";
import { Navigate } from "react-router-dom";

export default [
  { path: "/", element: <Navigate to={{ pathname: "/home" }} /> },
  { path: "/home", element: <HomePage /> },
  { path: "/shop", element: <Shop /> },
  { path: "/featured", element: <FeaturedProducts /> },
  { path: "/recommended", element: <RecommendedProducts /> },
  { path: "*", element: <NotFound /> },
  { path: "/product/:id", element: <ProductView /> },
  { path: "/signin", element: <SignIn /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/search/:value", element: <Search /> },
];
