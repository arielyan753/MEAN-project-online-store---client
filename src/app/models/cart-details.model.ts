import { CartModel } from "./cart.model";
import { ProductModel } from "./product.model";

export class CartDetailsModel {
    _id: string;
    productId: string;
    amount: number;
    cartId: string;
    totalPrice: number;
    products: ProductModel;
    name: string;

}