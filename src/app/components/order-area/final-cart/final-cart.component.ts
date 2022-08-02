import { Component, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import { CartDetailsModel } from 'src/app/models/cart-details.model';
import store from 'src/app/redux/store';
import { CartDetailsService } from 'src/app/services/cart-details.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-final-cart',
  templateUrl: './final-cart.component.html',
  styleUrls: ['./final-cart.component.css']
})
export class FinalCartComponent implements OnInit {

  constructor(private cartDetailsService: CartDetailsService, private notifyService: NotifyService) { }

  public cartDetails: CartDetailsModel[];
  public cartId: string;
  public totalPrice2: number;
  public amount: number;
  public price: number;
  public search: string;

  async ngOnInit() {
    try {
      this.cartId = store.getState().cartsState.cart._id;
      this.cartDetails = await this.cartDetailsService.getCartDetails(this.cartId);
      this.totalPrice2 = this.cartDetails.reduce((startPrice, product) => {
        return startPrice + product.totalPrice
      }, 0)

    }
    catch (err: any) {
      this.notifyService.error(err);
    }

  }

}
