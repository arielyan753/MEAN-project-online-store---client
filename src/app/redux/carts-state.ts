import { CartModel } from "../models/cart.model";

export class CartsState {
    public cart: CartModel;

    public constructor() {
        this.cart = JSON.parse(localStorage.getItem("cart"))
    }
}

// action type
export enum CartsActionType {
    GetCart = "GetCart",
    Delete = "Delete"
}

// action
export interface CartsAction {
    type: CartsActionType;
    payload?: any;
}

// Action Creators: 
export function getCartAction(cart: CartModel): CartsAction {
    return { type: CartsActionType.GetCart, payload: cart };
}
export function deleteCartAction(): CartsAction {
    return { type: CartsActionType.Delete };
}

//reducer
export function cartsReducer(currentState = new CartsState(), action: CartsAction): CartsState {

    // Must duplicate the current state and not touch the given current state: 
    const newState = { ...currentState };

    switch (action.type) {

        case CartsActionType.GetCart:
            newState.cart = action.payload; // Here the payload is the products list.
            localStorage.setItem("cart", JSON.stringify(newState.cart));
            break;
        case CartsActionType.Delete:
            localStorage.removeItem("cart");
            newState.cart = null;
    }
    return newState;

}