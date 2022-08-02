import { CategoryModel } from "../models/category.model";

export class CategoriesState {
    public categories: CategoryModel[] = [];
}

export enum CategoriesActionType {
    GetCategories = "GetCategories"
}

export interface CategoriesAction {
    type: CategoriesActionType;
    payload: any;
}

export function getCategoriesAction(categories: CategoryModel[]): CategoriesAction {
    return { type: CategoriesActionType.GetCategories, payload: categories };
}

export function categoriesReducer(currentState = new CategoriesState(), action: CategoriesAction): CategoriesState {

    // Must duplicate the current state and not touch the given current state: 
    const newState = { ...currentState };

    switch (action.type) {

        case CategoriesActionType.GetCategories:
            newState.categories = action.payload; // Here the payload is the products list.
            break;
    }

    return newState;
}