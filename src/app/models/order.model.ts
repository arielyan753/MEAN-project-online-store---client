import { CityEnum } from './city.enum';
import { CartModel } from "./cart.model";
import { UserModel } from "./user.model";

export class OrderModel {

    _id: string;
    userId: string;
    cartId: string;
    totalPrice: number;
    city: CityEnum;
    street: string;
    shippingDate: string;
    orderDate: Date;
    fourDigits: string;
}