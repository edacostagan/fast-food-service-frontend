import { Observable } from "rxjs";
import { OrderEntity } from "../entities/order.entity";

export abstract class OrderGateway {

  abstract createOrder(order: OrderEntity): Observable<string>;
  abstract getOrdersOfUser(userId: string): Observable<OrderEntity[]>;
  abstract changeOrderStatus(orderId: string, newStatus: number): Observable<boolean>;

}

