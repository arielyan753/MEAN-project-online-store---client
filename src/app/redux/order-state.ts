import { OrderModel } from "../models/order.model";

export class OrderState {
    public order: OrderModel[] = [];
}

export enum OrderActionType {
    GetAllOrders = "GetAllOrders",
    AddOrder = "AddOrder"
}

export interface OrderAction {
    type: OrderActionType;
    payload: any;
}

export function getAllOrdersAction(order: OrderModel): OrderAction {
    return { type: OrderActionType.GetAllOrders, payload: order };
}

export function addOrder(order: OrderModel): OrderAction {
    return { type: OrderActionType.AddOrder, payload: order };
}

export function orderReducer(currentState = new OrderState(), action: OrderAction): OrderState {

    // Must duplicate the current state and not touch the given current state: 
    const newState = { ...currentState };

    switch (action.type) {

        case OrderActionType.GetAllOrders:
            newState.order = action.payload; // Here the payload is the products list.
            break;


        case OrderActionType.AddOrder:
            newState.order.push(action.payload);
            break;
    }
    return newState;

};