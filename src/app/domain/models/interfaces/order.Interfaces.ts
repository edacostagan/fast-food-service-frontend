import { MenuEntity } from "../entities/menu.entity";

export interface IOrderItem {
  menuId: string,
  price: number;
  quantity: number;
}
