import { MenuEntity } from "./menu.entity";

export class CartItemEntity{
  constructor(public menu: MenuEntity){}
  quantity: number = 1;
  price:number = this.menu.menuPrice;
}
