import { configureStore } from "@reduxjs/toolkit";
import getCategorySearchReducer from "../features/getAllCategory/getCategorySearchSlice";
import productReducers from "../features/product/productSlice";
import categoryReducers from "../features/category/categorySlice";
import cartSlice from "../features/cart/cartSlice";
import authReducers from "../features/auth/authSlice";
import checkoutReducers from "../features/checkout/checkOutSlice";
import orderReducers from "../features/order/orderSlice";
import addressReducers from "../features/address/addressSlice";
import subcategoryReducers from "../features/subcategory/subcategorySlice";
const store = configureStore({
  reducer: {
    cart: cartSlice,
    auth: authReducers,
    product: productReducers,
    category: getCategorySearchReducer,
    subcategories: subcategoryReducers,
    categories: categoryReducers,
    checkout: checkoutReducers,
    order: orderReducers,
    address: addressReducers,
  },
});
export default store;
