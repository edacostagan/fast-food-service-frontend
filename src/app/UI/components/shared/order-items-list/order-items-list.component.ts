import { Component, Input } from '@angular/core';
import { CartEntity } from '../../../../domain/models/entities/cart.entity';

@Component({
  selector: 'order-items-list',
  templateUrl: './order-items-list.component.html',
  styleUrls: ['./order-items-list.component.css']
})
export class OrderItemsListComponent {

 @Input()
 order!: CartEntity;


}
