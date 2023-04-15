import { TestBed } from '@angular/core/testing';

import { OrderApiService } from './order.service';
import { AppModule } from '../../../app/app.module';

describe('OrderService', () => {
  let service: OrderApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[AppModule]
    });
    service = TestBed.inject(OrderApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
