import { TestBed } from '@angular/core/testing';

import { OrderApiService } from './order.service';

describe('OrderService', () => {
  let service: OrderApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
