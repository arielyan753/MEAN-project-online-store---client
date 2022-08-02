import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartDetailsModel } from '../models/cart-details.model';
import { addProductToCartAction, deleteAllCartDetailsAction, deleteCartDetailsAction, fetchCartDetailsAction, updateCartDetailsAction } from '../redux/cart-details-state';
import store from '../redux/store';

@Injectable({
  providedIn: 'root'
})
export class CartDetailsService {

  constructor(private http: HttpClient) { }


  public async getCartDetails(cartId: string): Promise<CartDetailsModel[]> {

    let cartDetails = store.getState().cartDetailsState.cartDetails;
    if (cartDetails.length === 0) {
      cartDetails = await firstValueFrom(this.http.get<CartDetailsModel[]>(environment.cartProductsUrl + cartId));
      store.dispatch(fetchCartDetailsAction(cartDetails));
    }
    return cartDetails
  }

  public async addCartProduct(cartDetails: CartDetailsModel): Promise<CartDetailsModel> {
    const addedCartDetails = await firstValueFrom(this.http.post<CartDetailsModel>(environment.cartProductsUrl, cartDetails));
    store.dispatch(addProductToCartAction(cartDetails));
    return addedCartDetails
  }

  public async updateCartProduct(cartDetails: CartDetailsModel): Promise<CartDetailsModel> {
    const updatedCartDetails = await firstValueFrom(this.http.put<CartDetailsModel>(environment.cartProductsUrl + cartDetails._id, cartDetails));
    store.dispatch(updateCartDetailsAction(updatedCartDetails));
    return updatedCartDetails
  }

  public async deleteOneCartProduct(productId: string, cartId: string): Promise<void> {
    await firstValueFrom(this.http.delete<void>(environment.cartProductsUrl + cartId + '/' + productId));
    store.dispatch(deleteCartDetailsAction(productId));
  }


  public async deleteAllCartProduct(cartId: string): Promise<void> {
    await firstValueFrom(this.http.delete<void>(environment.cartProductsUrl + cartId));
    store.dispatch(deleteAllCartDetailsAction());
  }

}
