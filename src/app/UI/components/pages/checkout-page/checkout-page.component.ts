import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { OrderEntity } from '../../../../domain/models/entities/order.entity';
import { UserEntity } from '../../../../domain/models/entities/user.entity';
import { CartService } from '../../../../infrastructure/services/cart.service';
import { OrderApiService } from '../../../../infrastructure/services/order.service';
import { UserApiService } from '../../../../infrastructure/services/user.service';
import { CartEntity } from '../../../../domain/models/entities/cart.entity';
import { CartItemEntity } from '../../../../domain/models/entities/cart-item.entity';
import { IOrderItem } from '../../../../domain/models/interfaces/order.Interfaces';

/**
 * Checkout Page - Allow the user to confirm the current order and proceed to
 * payment
 *
 * @export
 * @class CheckoutPageComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {

  user: UserEntity;
  cart: CartEntity;
  order: OrderEntity = new OrderEntity();

  checkoutForm!: FormGroup;

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private userService: UserApiService,
    private toastrService: ToastrService,
    private orderService: OrderApiService,
    private router: Router) {

    this.cart = this.cartService.getCart();
    this.user = this.userService.currentUser;


  }

  ngOnInit(): void {

    let { userFullname, userAddress } = this.user;

    this.checkoutForm = this.formBuilder.group({
      userFullname: [userFullname, Validators.required],
      userAddress: [userAddress, Validators.required],
    });
  }


  /**
   * Getter to have easy access to the form controls
   * allows to retrieve controls without having to write
   * long senteces.
   *
   * @readonly
   * @memberof CheckoutPageComponent
   */
  get fc() {
    return this.checkoutForm.controls;
  }


  /**
   * Creates a new Order entity to be send to Backend
   *
   * @return {*}
   * @memberof CheckoutPageComponent
   */
  createOrder() {
    if (this.checkoutForm.invalid) {
      this.toastrService.warning('Please fill the inputs', 'Invalid Inputs');
      return;
    }

    this.order.customerId = this.user._id;
    this.order.recipientName = this.fc['userFullname'].value;
    this.order.recipientAddress = this.fc['userAddress'].value;
    this.order.paymentId = "642db3be64d9ae767132e5e5";
    this.order.orderDetail = getOrderDetail(this.cart.items);
    this.order.orderPrice = this.cart.totalPrice;

    this.orderService.createOrder(this.order)
      .subscribe({
        next: (res) => {

          this.cartService.clearCart();

          this.toastrService.success(
            `Congratulations! Your order # ${res} has been received!`,
            'Order Complete!');


          this.router.navigateByUrl('/payment');

        },
        error: (error) => {

          this.toastrService.error(
            `Sorry! Something got lost on the way to the kitchen!`,
            'Oops!');


        }
      })
  }
}

function getOrderDetail(items: CartItemEntity[]): IOrderItem[] {

  let details: IOrderItem[] = [];

  items.forEach(element => {
    let orderItem: IOrderItem = {
      menuId: element.menu._id,
      price: element.price,
      quantity: element.quantity
    }
    details.push(orderItem);
  });

  return details;
}

