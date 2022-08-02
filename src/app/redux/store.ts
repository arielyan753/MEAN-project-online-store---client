import { combineReducers, createStore } from "redux";
import { authReducer } from "./auth-state";
import { cartDetailsReducer } from "./cart-details-state";
import { cartsReducer } from "./carts-state";
import { categoriesReducer } from "./categories-state";
import { orderReducer } from "./order-state";
import { productsReducer } from "./products-state";

// Creating reducers object from all our reducers: 
const reducers = combineReducers({
    productsState: productsReducer,
    authState: authReducer,
    cartsState: cartsReducer,
    cartDetailsState: cartDetailsReducer,
    orderState: orderReducer,
    categoriesState: categoriesReducer

});

// The most important Redux object: 
const store = createStore(reducers);

export default store;
