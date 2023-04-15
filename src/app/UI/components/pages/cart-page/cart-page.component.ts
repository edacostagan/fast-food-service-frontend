import { Component } from '@angular/core';


import { CartService } from '../../../../infrastructure/services/cart.service';
import { CartEntity } from '../../../../domain/models/entities/cart.entity';
import { CartItemEntity } from '../../../../domain/models/entities/cart-item.entity';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent  {

  order!: CartEntity;

  constructor(private orderService: CartService){
    this.orderService.getCartObservable().subscribe((order) => this.order = order)
  }

  removeFromOrder(orderItem: CartItemEntity){
    this.orderService.removeFromCart(orderItem.menu._id);
  }

  changeQuantity(orderItem: CartItemEntity, newQuantity: string){
    const quantity = parseInt(newQuantity);
    this.orderService.changeQuantity(orderItem.menu._id, quantity);
  }
}
