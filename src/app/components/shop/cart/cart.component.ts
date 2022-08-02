import { CartsService } from 'src/app/services/carts.service';
import { CartDetailsModel } from 'src/app/models/cart-details.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartDetailsService } from 'src/app/services/cart-details.service';
import store from 'src/app/redux/store';
import { NotifyService } from 'src/app/services/notify.service';
import { Unsubscribe } from 'redux';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  public cartDetails: CartDetailsModel[];
  public cartId: string;
  public totalPrice: number = 0;
  private unsubscribe: Unsubscribe;
  public productToAdd: CartDetailsModel;
  public amount: number;
  public showFiller = false;
  public price: number;


  constructor(private cartsService: CartsService, private cartDetailsService: CartDetailsService, private notifyService: NotifyService) { }


  async ngOnInit() {
    try {
      this.cartId = store.getState().cartsState.cart._id
      this.cartDetails = await this.cartDetailsService.getCartDetails(this.cartId);
      this.totalPrice = this.cartDetails.reduce((startPrice, product) => {
        return startPrice + product.totalPrice
      }, 0)
      this.unsubscribe = store.subscribe(async () => {
        this.totalPrice = this.cartDetails.reduce((startPrice, product) => {
          return startPrice + product.totalPrice
        }, 0)
      });
    }
    catch (err: any) {
      this.notifyService.error(err);
    }

  }

  // delete a product from the cart
  async deleteProductFromCart(productId: string) {
    try {
      await this.cartDetailsService.deleteOneCartProduct(productId, this.cartId);
      this.notifyService.success('Product has been deleted');
    }
    catch (err: any) {
      this.notifyService.error(err);
    }

  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  // update a cart product
  async updateCartProduct(id: string) {
    this.productToAdd = this.cartDetails.find(p => { return p._id === id });
    this.price = this.productToAdd.totalPrice / this.productToAdd.amount;
    this.productToAdd.amount = this.amount;
    this.productToAdd.totalPrice = this.price * this.amount;
    try {
      await this.cartDetailsService.addCartProduct(this.productToAdd);
    }
    catch (err: any) {
      this.notifyService.error(err);
    }
  }

  // delete all product from the cart
  async clearCart() {
    try {
      await this.cartDetailsService.deleteAllCartProduct(this.cartId);
      this.notifyService.success('All products have been deleted');
    }
    catch (err: any) {
      this.notifyService.error(err);
    }
  }

}

