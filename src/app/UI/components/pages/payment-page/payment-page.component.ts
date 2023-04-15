import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  returnUrl = '';

  constructor(
    private orderService: OrderApiService,
    private userService: UserApiService,
    private toastrService: ToastrService,
    private readonly activatedRoute: ActivatedRoute,
    private router: Router,
  ) {

  }
  ngOnInit(): void {

    this.user = this.userService.currentUser;
    this.getAllUserOrders();
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
  }

  /**
   * Retrieves from DB all the pending orders of the user
   * If there is no orders display a NotFound Page
   * If there is any error displays an popup alert message
   *
   * @memberof PaymentPageComponent
   */
  getAllUserOrders() {
    this.orderService.getOrdersOfUser(this.userService.currentUser._id)
      .subscribe({
        next: ((res) => {
          this.orders = res.reverse();

          //this.orders.reverse();
        }),
        error: () => {
          this.toastrService.warning(
            `It seems that the Lemmings are busy right now!`,
            'Something does not work in the back!');
        }
      })
  }

  /**
   * Starts the process of payment for the pending order selected
   *
   * @param {string} orderId
   * @memberof PaymentPageComponent
   */
  payOrder(orderId: string) {

    const newStatus = 30; //InProcess
    this.orderService.changeOrderStatus(orderId,newStatus)
    .subscribe({
      next: ((res) => {
        this.toastrService.success(
          `Order succesfully paid!`,
          'Going back to work boys!');

          this.getAllUserOrders();

      }),
      error: () => {
        this.toastrService.warning(
          `It seems that the Lemmings are busy right now!`,
          'Something does not work in the back!');
      }
    })
  }



  /**
   * Allows to Cancel the selected order
   * return True if the process is succesful
   *
   * @param {string} orderId
   * @memberof PaymentPageComponent
   */
  cancelOrder(orderId: string) {

    const cancelStatus = 50; //Canceled
    this.orderService.changeOrderStatus(orderId,cancelStatus)
    .subscribe({
      next: ((res) => {
        this.toastrService.success(
          `Order has been Canceled!`
          );

          this.getAllUserOrders();
      }),
      error: () => {
        this.toastrService.warning(
          `It seems that the Lemmings are busy right now!`,
          'Something does not work in the back!');
      }
    })
  }

  /**
   * Allows to change the status of the selected order and mark it as completed
   * shows a message if the process is succesful
   *
   * @param {string} orderId
   * @memberof PaymentPageComponent
   */
  markAsReceived(orderId: string) {

    const cancelStatus = 40; //COMPLETED
    this.orderService.changeOrderStatus(orderId,cancelStatus)
    .subscribe({
      next: ((res) => {
        this.toastrService.success(
          `Order has been Delivered!`,
          'Enjoy Compadre!');

          this.getAllUserOrders();
      }),
      error: () => {
        this.toastrService.warning(
          `It seems that the Lemmings are busy right now!`,
          'Something does not work in the back!');
      }
    })
  }


  /**
   * Receives the number code of the OrderStatus and
   * returns the name(key) of the OrderStatus
   *
   * @param {number} orderStatus
   * @return {*}  {string}
   * @memberof PaymentPageComponent
   */
  getOrderStatusLabel(orderStatus: number): string {

    return Object.keys(OrderStatusEnum)[Object.values(OrderStatusEnum).indexOf(orderStatus)];
  }


}
