import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import ProductDetail from "../pages/Product/ProductDetail";
import { FilterProductDetailPage } from "../pages/Product/filterProductPage/FilterProductDetailPage";
import Cart from "../pages/Cart";

import Login from "../pages/Login";
import Register from "../pages/Register";
import CheckOut from "../pages/CheckOut";
import Order from "../pages/Order";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Razorpay from "../pages/Razorpay";
import CtegoryDetail from "../pages/CtegoryDetail";

const Routing = () => {
  const location = useLocation();
  return (
    <>

        <Routes location={location} key={location.pathname}>
          <Route exact path='/' element={<Home />}></Route>
          <Route path='product-detail/:id' element={<ProductDetail />} />
          <Route path='filter-page/:id' element={<FilterProductDetailPage />} />
          <Route path='sign-up' element={<Register />} />
          <Route path='login' element={<Login />} />
          <Route path='cart' element={<Cart />} />
          <Route path='CheckOut' element={<CheckOut />} />
          <Route path='payment' element={<Order/>} />
          <Route path="categoryDetail/:id" element={<CtegoryDetail/>}/>
        </Routes>
        <ToastContainer />
  
    </>
  );
};

export default Routing;
