import { combineReducers } from "redux";
import productSlice  from "./products/product.slice";
import categoriesSlice  from "./categories/category.slice";
import authSlice from "./auth/auth.slice";

export default combineReducers({
    products   : productSlice,
    categories : categoriesSlice,
    auth       : authSlice
});