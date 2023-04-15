import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderItemsListComponent } from './order-items-list.component';
import { AppModule } from 'src/app/app.module';
import { CartEntity } from 'src/app/domain/models/entities/cart.entity';
import { CartItemEntity } from 'src/app/domain/models/entities/cart-item.entity';

describe('OrderItemsComponent', () => {
  let component: OrderItemsListComponent;
  let fixture: ComponentFixture<OrderItemsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderItemsListComponent],
      imports: [AppModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(OrderItemsListComponent);
    component = fixture.componentInstance;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
