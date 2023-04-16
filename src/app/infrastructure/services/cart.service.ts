import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { MenuEntity } from '../../domain/models/entities/menu.entity';
import { CartEntity } from '../../domain/models/entities/cart.entity';
import { CartItemEntity } from '../../domain/models/entities/cart-item.entity';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: CartEntity = this.getCartFromLocalStorage();
  private readonly cartBehaviourSubject: BehaviorSubject<CartEntity> = new BehaviorSubject(this.cart);

  constructor() { }

  addToCart(menuItem: MenuEntity): void{
    let cartItem = this.cart.items.find(item => item.menu._id === menuItem._id);
    if(cartItem) return;
    this.cart.items.push(new CartItemEntity(menuItem));
    this.setCartToLocalStorage();
  }

  removeFromCart(menuId: string): void{
    this.cart.items = this.cart.items.filter(item => item.menu._id != menuId);
    this.setCartToLocalStorage();
  }

  changeQuantity(menuId: string, quantity: number): void {

    let cartItem = this.cart.items.find(item => item.menu._id === menuId);
    if(!cartItem) return;

    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.menu.menuPrice;
    this.setCartToLocalStorage();
  }

  clearCart(){
    this.cart = new CartEntity();
    this.setCartToLocalStorage();
  }

  getCartObservable(): Observable<CartEntity> {
    return this.cartBehaviourSubject.asObservable();
  }

  getCart() : CartEntity{
    return this.cartBehaviourSubject.value;
  }


  setCartToLocalStorage(): void {
    this.cart.totalPrice = this.cart.items.reduce((prevSum, currentItem) => prevSum + currentItem.price, 0);
    this.cart.itemsCount = this.cart.items.reduce((prevSum, currentItem) => prevSum + currentItem.quantity, 0);

    const jsonCart = JSON.stringify(this.cart);
    localStorage.setItem(environment.CART_KEY, jsonCart);

    this.cartBehaviourSubject.next(this.cart);
  }

  private getCartFromLocalStorage(): CartEntity {
    const jsonCart = localStorage.getItem(environment.CART_KEY);
    return jsonCart? JSON.parse(jsonCart): new CartEntity();
  }
}
