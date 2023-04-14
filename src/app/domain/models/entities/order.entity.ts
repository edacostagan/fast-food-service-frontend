import { IOrderItem } from "../interfaces/order.Interfaces";

export class OrderEntity {
  _id!: string;
  orderDate!: string;
  customerId!: string;
  recipientName!: string;
  recipientAddress!: string;
  orderDetail!: IOrderItem[];
  orderPrice!: number;
  paymentId!: string;
  orderStatus!: number;
}

export enum OrderStatusEnum{
  WAITING_FOR_PAYMENT = 10,
  INPROCESS = 20,
  SHIPPED = 30,
  COMPLETED = 40,
  CANCELED = 50,
  REFUNDED = 60
}
