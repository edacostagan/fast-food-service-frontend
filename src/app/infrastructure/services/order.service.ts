import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

import { OrderGateway } from '../../domain/models/gateways/order.gateway';
import { OrderEntity } from '../../domain/models/entities/order.entity';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderApiService implements OrderGateway {

  constructor(
    private http: HttpClient
  ) { }



  /**
   * Gets all the pending orders of an UserId
   *
   * @param {string} userId
   * @return {*}  {Observable<OrderEntity[]>}
   * @memberof OrderApiService
   */
  getOrdersOfUser(userId: string): Observable<OrderEntity[]> {

    return this.http.get<OrderEntity[]>(`${environment.API_BASE_URL}/order/of/${userId}`);

  }


  /**
   * Sends the http request to API for the creation of a new order
   * It sends the order data to back to be stored in DB
   *
   * @param {OrderEntity} newOrder
   * @return {*}  {Observable<string>}
   * @memberof OrderApiService
   */
  createOrder(newOrder: OrderEntity): Observable<string> {

    return this.http.post<string>(`${environment.API_BASE_URL}/order/create/`, newOrder)


  }

}
