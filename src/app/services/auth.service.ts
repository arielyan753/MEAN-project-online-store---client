import { firstValueFrom } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import store from '../redux/store';
import { loginAction, logoutAction, registerAction } from '../redux/auth-state';
import { getCartAction } from '../redux/carts-state';
import { CartModel } from '../models/cart.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) { }

    public async registerStepOne(user: UserModel): Promise<UserModel> {
        const newUser = await firstValueFrom(this.http.post<UserModel>(environment.registerStepOneUrl, user));
        return newUser
    }
    public async registerStepTwo(user: UserModel): Promise<void> {
        const token = await firstValueFrom(this.http.post<string>(environment.registerStepTwoUrl, user));
        store.dispatch(registerAction(token));
        const userId = store.getState().authState.user._id
        const cart = await firstValueFrom(this.http.get<CartModel>(environment.cartByUserUrl + userId))
        store.dispatch(getCartAction(cart))
    }

    public async login(user: UserModel): Promise<void> {
        const token = await firstValueFrom(this.http.post<string>(environment.loginUrl, user));
        store.dispatch(loginAction(token));
        const userId = store.getState().authState.user._id
        const cart = await firstValueFrom(this.http.get<CartModel>(environment.cartByUserUrl + userId))
        store.dispatch(getCartAction(cart))
    }

    public logout(): void {
        store.dispatch(logoutAction());
    }

}
