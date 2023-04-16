import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OrderEntity } from 'src/app/domain/models/entities/order.entity';
import { OrderApiService } from 'src/app/infrastructure/services/order.service';
import { OrderStatusEnum } from '../../../../domain/models/entities/order.entity';

@Component({
  selector: 'app-pendings',
  templateUrl: './pendings.component.html',
  styleUrls: ['./pendings.component.css']
})
export class PendingsComponent implements OnInit {

  orders: OrderEntity[] = [];
  public orderStatus: number = 10;

  constructor(
    private orderService: OrderApiService,
    private toastrService: ToastrService,

  ) { }

  ngOnInit(): void {
    this.getOrdersWithStatus(10)
  }

  /**
   * Retrieves all the orders that match the given criteria
   * in this case the order status
   *
   * @param {number} status
   * @memberof PendingsComponent
   */
  getOrdersWithStatus(status: number) {
    this.orderService.getAllOrdersByStatus(status)
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
   * Handles the order Status change for each case
   *
   * @param {string} orderId
   * @memberof PendingsComponent
   */
  changeOrderStatus(orderId: string, newStatus: number ) {

    this.orderService.changeOrderStatus(orderId, newStatus)
    .subscribe({
      next: ((res) => {
        this.toastrService.success(
          `Order has been ${this.getOrderStatusLabel(newStatus)}!`
          );
          this.getOrdersWithStatus(newStatus)
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
  getOrderStatusLabel(orderStatus: number){
    return this.orderService.getOrderStatusKey(orderStatus);
  }



}
