import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderEntity, OrderStatusEnum } from '../../../../domain/models/entities/order.entity';
import { UserEntity } from '../../../../domain/models/entities/user.entity';
import { OrderApiService } from '../../../../infrastructure/services/order.service';
import { UserApiService } from '../../../../infrastructure/services/user.service';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent implements OnInit {

  orders: OrderEntity[] = [];
  public user!: UserEntity;

  constructor(
    private orderService: OrderApiService,
    private userService: UserApiService,
    private toastrService: ToastrService,
    router: Router,
  ) {

    this.user = userService.currentUser;

    orderService.getOrdersOfUser(userService.currentUser._id)
      .subscribe({
        next: ((res) => {
          this.orders = res;


        }),
        error: () => {
          this.toastrService.warning(
            `It seems that the Lemmings are busy right now!`,
            'Something does not work in the back!');

        }
      })
  }

  ngOnInit(): void {

  }

  payOrder(orderId: string){

    alert(`Do Payment Proccess for order # ${orderId}`)
  }

  cancelOrder(orderId: string){

    alert(`Do Cancel Proccess for order # ${orderId}`)
  }

  markAsDelivered(orderId: string){

    alert(`Do Delivered Proccess for order # ${orderId}`)
  }

  getOrderStatusLabel(orderStatus: number): string{

    return Object.keys(OrderStatusEnum)[Object.values(OrderStatusEnum).indexOf(orderStatus)];
  }


}
