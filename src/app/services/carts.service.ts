import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartModel } from '../models/cart.model';
import { getCartAction } from '../redux/carts-state';
import store from '../redux/store';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  constructor(private http: HttpClient) { }

  public async getCart(userId: string): Promise<CartModel> {
    let cart = store.getState().cartsState.cart;
    if (!cart) {
      cart = await firstValueFrom(this.http.get<CartModel>(environment.cartByUserUrl + userId));
      store.dispatch(getCartAction(cart)); 
    }
    return cart
  }

  public async bringCarts(userId: string): Promise<CartModel[]> {
    const carts = await firstValueFrom(this.http.get<CartModel[]>(environment.cartAmount + userId));
    return carts;
  }


}
