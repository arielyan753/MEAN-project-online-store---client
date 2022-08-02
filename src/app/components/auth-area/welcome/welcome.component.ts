import { CartDetailsService } from 'src/app/services/cart-details.service';
import { CartsService } from './../../../services/carts.service';
import { CartModel } from './../../../models/cart.model';
import { OrdersService } from 'src/app/services/orders.service';
import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductsService } from 'src/app/services/products.service';
import { UserModel } from 'src/app/models/user.model';
import { Unsubscribe } from 'redux';
import store from 'src/app/redux/store';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  // a lot of flag changes for login component and register component and if logged in it need to show more info
  public flag: string = '';
  public shopflag: string = '';
  public products: ProductModel[];
  public productsLen: number;
  public ordersLen: number;
  public user: UserModel = new UserModel();
  private unsubscribe: Unsubscribe;
  public cart: CartModel = new CartModel();
  public lastOrder: any = '';
  public cartLen: number = 0;
  public newShopper: number;

  constructor(private productsService: ProductsService,
    private orderService: OrdersService,
    private notifyService: NotifyService,
    private cartService: CartsService,
    private cartDetailsService: CartDetailsService) { }

  async ngOnInit(): Promise<void> {
    try {
      this.products = await this.productsService.getAllProducts();
      console.log(this.products);
      this.productsLen = this.products.length;
      this.ordersLen = await this.orderService.getOrdersNum();
      this.user = await store.getState().authState.user;
      if (this.user) {
        this.cart = await this.cartService.getCart(this.user._id);
        this.cartLen = (await this.cartDetailsService.getCartDetails(this.cart._id)).length;
        this.lastOrder = await this.orderService.getLastOrder(this.user._id)
        this.newShopper = (await this.cartService.bringCarts(this.user._id)).length;
        this.shopflag = 'y';
      }

      this.unsubscribe = store.subscribe(async () => {
        this.user = await store.getState().authState.user;
        this.cart = store.getState().cartsState.cart;
        this.lastOrder = await this.orderService.getLastOrder(this.user._id);
        this.newShopper = (await this.cartService.bringCarts(this.user._id)).length;
        this.shopflag = 'y';

      });


    }
    catch (err: any) {
      this.notifyService.error(err);
    }
  }

  public handlerFlag(): void {
    this.flag = 'y'
  }

  public test(result: string) {
    this.flag = result;
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

}
