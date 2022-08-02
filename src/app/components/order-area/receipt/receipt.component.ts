import store from 'src/app/redux/store';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';
import { OrdersService } from 'src/app/services/orders.service';
import { Router } from '@angular/router';
import * as saveAs from 'file-saver';
import { deleteCartAction, getCartAction } from 'src/app/redux/carts-state';
import { CartsService } from 'src/app/services/carts.service';
import { deleteAllCartDetailsAction } from 'src/app/redux/cart-details-state';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {

  public cartId: string;


  constructor(private cartsService: CartsService, private order: OrdersService, private authService: AuthService, private notify: NotifyService, private router: Router) { }

  ngOnInit(): void {
    this.cartId = store.getState().cartsState.cart._id;
  }

  // download the receipt and delete the current cart in the store and get the new one
  async download() {
    (await this.order.fetchReceipt(this.cartId)).subscribe(
      data => saveAs(data),
      error => this.notify.error('Try again')
    )
    store.dispatch(deleteCartAction())
    store.dispatch(deleteAllCartDetailsAction())
    await this.cartsService.getCart(store.getState().authState.user._id)
    this.router.navigateByUrl('/shop')
  }

  // move to shop btn need to also delete the current cart in the store and get the new one 
  async deleteCart() {
    store.dispatch(deleteCartAction())
    store.dispatch(deleteAllCartDetailsAction())
    await this.cartsService.getCart(store.getState().authState.user._id)
    this.router.navigateByUrl('/shop')
  }

}
