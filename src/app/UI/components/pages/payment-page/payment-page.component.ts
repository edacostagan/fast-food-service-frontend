import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderEntity } from '../../../../domain/models/entities/order.entity';
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
  ) { }
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
        }),
        error: () => {
          this.toastrService.warning(
            `It seems that the Lemmings are busy right now!`,
            'Something does not work in the back!');
        }
      })
  }


  /**
   * handles all the order status changes
   *
   * @param {string} orderId
   * @param {number} newStatus
   * @memberof PaymentPageComponent
   */
  updateOrderStatus(orderId: string, newStatus: number): void {

    let title: string = '';
    let comment: string = '';

    switch (newStatus) {
      case 20: {
        title = 'Order succesfully paid!';
        comment = 'Going back to work boys!';
        break;
      }
      case 40: {
        title = `Order has been Delivered!`;
        comment = 'Enjoy Compadre!';
        break;
      }
      case 50: {
        title = `Order has been Canceled!`;
        comment = 'sorry to see you go... but.. do not get hungry!';
        break;
      }
    }


    this.orderService.changeOrderStatus(orderId, newStatus)
      .subscribe({
        next: ((res) => {
          this.toastrService.success(
            title,
            comment);

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
   * returns the correct order status key (name)
   *
   * @param {number} orderStatus
   * @return {*}
   * @memberof PendingsComponent
   */
  getOrderStatusLabel(orderStatus: number) {
    return this.orderService.getOrderStatusKey(orderStatus);
  }

}
