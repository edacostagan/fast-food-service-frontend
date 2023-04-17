import { Pipe, PipeTransform } from '@angular/core';
import { OrderStatusEnum } from '../../../app/domain/models/entities/order.entity';

@Pipe({
  name: 'orderStatusName',
  standalone: true
})
export class OrderStatusNamePipe implements PipeTransform {

  transform(value: number): string {
      const result = Object.keys(OrderStatusEnum)[Object.values(OrderStatusEnum).indexOf(value)];
      if(!result) return 'UNKNOWN';
      return  result;

  }

}
