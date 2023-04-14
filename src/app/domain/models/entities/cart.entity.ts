import { CartItemEntity as CartItemEntity } from "./cart-item.entity";

export class CartEntity {

  items: CartItemEntity[] = [];
  totalPrice: number = 0;
  itemsCount: number = 0;
}
