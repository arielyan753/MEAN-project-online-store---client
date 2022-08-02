import { CartDetailsModel } from "../models/cart-details.model";

export class CartDetailsState {
    public cartDetails: CartDetailsModel[] = [];

}

// Action Type
export enum CartDetailsActionType {
    FetchCartDetails = "FetchCartDetails",
    AddProductToCart = "AddProductToCart",
    UpdateCartProduct = "UpdateCartProduct",
    DeleteCartProduct = "DeleteCartProduct",
    DeleteAllCartProduct = "DeleteAllCartProduct",
}

// Action 
export interface CartDetailsAction {
    type: CartDetailsActionType;
    payload?: any;
}

// Action Creators: 
export function fetchCartDetailsAction(cartDetails: CartDetailsModel[]): CartDetailsAction {
    return { type: CartDetailsActionType.FetchCartDetails, payload: cartDetails };
}
export function addProductToCartAction(cartDetails: CartDetailsModel): CartDetailsAction {
    return { type: CartDetailsActionType.AddProductToCart, payload: cartDetails };
}
export function updateCartDetailsAction(cartDetails: CartDetailsModel): CartDetailsAction {
    return { type: CartDetailsActionType.UpdateCartProduct, payload: cartDetails };
}
export function deleteCartDetailsAction(_id: string): CartDetailsAction {
    return { type: CartDetailsActionType.DeleteCartProduct, payload: _id };
}
export function deleteAllCartDetailsAction(): CartDetailsAction {
    return { type: CartDetailsActionType.DeleteAllCartProduct };
}

// Reducer: 
export function cartDetailsReducer(currentState = new CartDetailsState(), action: CartDetailsAction): CartDetailsState {

    // Must duplicate the current state and not touch the given current state: 
    const newState = { ...currentState };

    switch (action.type) {

        case CartDetailsActionType.FetchCartDetails:
            newState.cartDetails = action.payload; // Here the payload is the CartDetails list.
            break;

        case CartDetailsActionType.AddProductToCart:
            const indexToCheck = newState.cartDetails.findIndex(p => p.productId === action.payload.productId);  // Here the payload is a single object to add.
            if (indexToCheck >= 0) {
                newState.cartDetails[indexToCheck] = action.payload;
            }
            else {
                newState.cartDetails.push(action.payload);
            }
            break;

        case CartDetailsActionType.UpdateCartProduct:
            const indexToUpdate = newState.cartDetails.findIndex(p => p._id === action.payload.id); // Here the payload is a single object to update.
            if (indexToUpdate >= 0) {
                newState.cartDetails[indexToUpdate] = action.payload;
            }
            break;

        case CartDetailsActionType.DeleteCartProduct:
            const indexToDelete = newState.cartDetails.findIndex(p => p.productId === action.payload); // Here the payload is the id to delete.
            if (indexToDelete >= 0) {
                newState.cartDetails.splice(indexToDelete, 1);
            }
            break;

        case CartDetailsActionType.DeleteAllCartProduct: 
            newState.cartDetails.length = 0
            break;
    }

    return newState;
}