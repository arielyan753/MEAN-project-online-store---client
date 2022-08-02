import { CityEnum } from "./city.enum"
import { RoleEnum } from "./role.enum"

export class UserModel {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    confirmedPassword: string;
    id: string;
    street: string;
    city: CityEnum;
    role: string;
    email: string;
}