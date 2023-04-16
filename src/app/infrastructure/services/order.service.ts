import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { OrderGateway } from '../../domain/models/gateways/order.gateway';
import { OrderEntity, OrderStatusEnum } from '../../domain/models/entities/order.entity';
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


  /**
   * Allows to change the status of the selected order
   * it receives the number of the new status (see OrderStatusEnum)
   * return True if the process is succesfull or error if not
   *
   * Uses Patch method, but it can be changed for Put or even Post method
   *
   * @param {string} orderId
   * @param {number} newStatus
   * @return {*}  {Observable<boolean>}
   * @memberof OrderApiService
   */
  changeOrderStatus(orderId: string, newStatus: number): Observable<boolean> {

    const uri: string =  `${environment.API_BASE_URL}/order/update/${orderId}/${newStatus}`;

    return this.http.patch<boolean>(uri,null)
  }


  /**
   * Retrieves all the orders that meet the criteria
   * in this case that have the given status (see OrderStatusEnum)
   *
   * @param {number} status
   * @return {*}  {Observable<OrderEntity[]>}
   * @memberof OrderApiService
   */
  getAllOrdersByStatus(status: number): Observable<OrderEntity[]> {

    const uri: string =  `${environment.API_BASE_URL}/order/status/${status}`;

    return this.http.get<OrderEntity[]>(uri)
  }


  /**
   * Receives the number code of the OrderStatus and
   * returns the name(key) of the OrderStatus
   *
   * @param {number} orderStatus
   * @return {*}  {string}
   * @memberof PaymentPageComponent
   */
  getOrderStatusKey(orderStatus: number): string {

    return Object.keys(OrderStatusEnum)[Object.values(OrderStatusEnum).indexOf(orderStatus)];
  }
}
