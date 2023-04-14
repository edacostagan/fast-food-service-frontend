import { Injectable } from "@angular/core";

import { Observable } from "rxjs";

import { OrderGateway } from "../models/gateways/order.gateway";
import { OrderEntity } from "../models/entities/order.entity";


@Injectable({
  providedIn: 'root'
})

export class OrderUseCases {

  constructor(private orderGateway: OrderGateway) { }

  createOrder(newOrder: OrderEntity): Observable<string> {
    return this.orderGateway.createOrder(newOrder);
  }

  getOrdersOfUser(userId: string): Observable<OrderEntity[]>{
    return this.orderGateway.getOrdersOfUser(userId);
  }

}
