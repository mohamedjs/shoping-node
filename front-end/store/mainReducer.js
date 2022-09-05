import { combineReducers } from "redux";
import productSlice  from "./products/product.slice";
import categoriesSlice  from "./categories/category.slice";

export default combineReducers({
    products   : productSlice,
    categories   : categoriesSlice,
});