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
import OrderSummary from "../components/checkout/OrderSummary";
import ShippingDetails from "../components/checkout/ShippingDetails";
import Payment from "../components/checkout/Payment";
import ForgotPassword from "../components/Authentification/ForgotPassword";

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
  { path: "/forgot_password", element: <ForgotPassword /> },
  { path: "/search/:value", element: <Search /> },
  { path: "checkout/step1", element: <OrderSummary /> },
  { path: "checkout/step2", element: <ShippingDetails /> },
  { path: "checkout/step3", element: <Payment /> },
];
