import { CartsAction, deleteCartAction } from './../../../redux/carts-state';
import { OrderModel } from './../../../models/order.model';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CityEnum } from 'src/app/models/city.enum';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';
import store from 'src/app/redux/store';
import { OrdersService } from 'src/app/services/orders.service';
import { CartsService } from 'src/app/services/carts.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {

  public orderDetails = new OrderModel();
  public cities = CityEnum;
  public cityPattern: string = '';
  public curDate: Date = new Date();
  public currentDateToForm: string;



  constructor(private cartService: CartsService, private order: OrdersService, private authService: AuthService, private notify: NotifyService, private router: Router) { }

  ngOnInit(): void {
    const values = Object.values(this.cities);
    values.forEach(city => this.cityPattern = this.cityPattern + city + '|')


    // get the full date
    let year = this.curDate.getFullYear();

    let month: any = this.curDate.getMonth() + 1;
    month = ('0' + month).slice(-2);


    let date: any = this.curDate.getDate();
    date = ('0' + date).slice(-2);


    this.currentDateToForm = `${year}-${month}-${date}`;


  }

  //create order
  public async orderFunc() {
    try {
      this.orderDetails.cartId = store.getState().cartsState.cart._id;
      this.orderDetails.userId = store.getState().authState.user._id;
      await this.order.createOrder(this.orderDetails);
      this.notify.success('Order has been sent!')
      this.router.navigateByUrl('/receipt')
    }

    catch (err: any) {
      this.notify.error(err);
    }
  }

  // for the double click auto fill in the city and street
  public bringCity() {
    this.orderDetails.city = store.getState().authState.user.city;
    this.orderDetails.street = store.getState().authState.user.street;
  }



}

