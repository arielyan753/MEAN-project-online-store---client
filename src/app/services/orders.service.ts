import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderModel } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private sanitizer: DomSanitizer;
  public receiptTrustedUrl: {};


  constructor(private http: HttpClient) { }

  public async createOrder(order: OrderModel): Promise<OrderModel> {
    const newOrder = await firstValueFrom(this.http.post<OrderModel>(environment.ordersUrl, order))
    return newOrder
  }

  public async fetchReceipt(cartId: string) {
    return this.http.get("http://localhost:3001/api/orders/" + cartId, {
      responseType: 'blob'
    });

  }

  public async getOrdersNum(): Promise<number> {
    const orders = await firstValueFrom(this.http.get<OrderModel[]>(environment.ordersUrl))
    return orders.length;
  }

  public async getLastOrder(userId: string): Promise<OrderModel> {
    const lastOrder = await firstValueFrom(this.http.get<OrderModel>(environment.ordersUrl + 'last/' + userId))
    return lastOrder;
  }

}

