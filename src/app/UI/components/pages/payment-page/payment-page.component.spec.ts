import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentPageComponent } from './payment-page.component';
import { OrderStatusEnum } from 'src/app/domain/models/entities/order.entity';
import { AppModule } from 'src/app/app.module';

describe('PaymentPageComponent', () => {
  let component: PaymentPageComponent;
  let fixture: ComponentFixture<PaymentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentPageComponent],
      imports:[AppModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PaymentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return the correct OrderStatus Label', () => {
    //Arrange
    const orderStatus=10;
    const expectedResult= Object.keys(OrderStatusEnum)[Object.values(OrderStatusEnum).indexOf(orderStatus)];

    //Act
    const result = component.getOrderStatusLabel(orderStatus);
    //Assert

    expect(result).toEqual(expectedResult);
  });


});
