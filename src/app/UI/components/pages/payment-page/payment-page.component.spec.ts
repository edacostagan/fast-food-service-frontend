import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentPageComponent } from './payment-page.component';
import { OrderEntity, OrderStatusEnum } from '../../../../../app/domain/models/entities/order.entity';
import { AppModule } from '../../../../../app/app.module';
import { Observable, of } from 'rxjs';
import { OrderApiService } from 'src/app/infrastructure/services/order.service';

describe('PaymentPageComponent', () => {
  let paymenPageComponent: PaymentPageComponent;
  let orderServiceSpy: jasmine.SpyObj<OrderApiService>;
  let userService: any;
  let toastrService: any;
  let activatedRoute: any;
  let router: any;

  /* {
    getOrdersOfUser(userId: string): Observable<OrderEntity[]>;
    changeOrderStatus(orderId: string, newStatus: number): Observable<boolean>;
    OrderApiService: jasmine.Spy
} */


  let fixture: ComponentFixture<PaymentPageComponent>;

  //Arrange
  const mockOrdersArray: OrderEntity[] = [{
    _id: '01',
    orderDate: '16/04/2023',
    customerId: '01',
    recipientName: 'John Doe',
    recipientAddress: 'mockAddress 1',
    orderDetail: [],
    orderPrice: 100,
    paymentId: '01',
    orderStatus: 40
  }, {
    _id: '02',
    orderDate: '16/04/2023',
    customerId: '01',
    recipientName: 'John Doe',
    recipientAddress: 'mockAddress 1',
    orderDetail: [],
    orderPrice: 100,
    paymentId: '01',
    orderStatus: 40
  }]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule]
    }).compileComponents();

    orderServiceSpy = jasmine.createSpyObj('OrderApiService', ['getOrdersOfUser', 'changeOrderStatus']);

    fixture = TestBed.createComponent(PaymentPageComponent);
    paymenPageComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(paymenPageComponent).toBeTruthy();
  });

  it('should return the correct OrderStatus Label', () => {
    //Arrange
    const orderStatus = 10;
    const expectedResult = Object.keys(OrderStatusEnum)[Object.values(OrderStatusEnum).indexOf(orderStatus)];

    //Act
    const result = paymenPageComponent.getOrderStatusLabel(orderStatus);

    //Assert
    expect(result).toEqual(expectedResult);
  });

  it('should retrieve orders for current user and stores them in variable', (done) => {
    //Arrange
    const userId: string = '01'
    const expectedReturn: OrderEntity[] = mockOrdersArray.reverse();
    const paymentPageComponent = new PaymentPageComponent(
      orderServiceSpy,
      userService,
      toastrService,
      activatedRoute,
      router);

    //Act
    orderServiceSpy.getOrdersOfUser.and.returnValue(of(mockOrdersArray));

    paymenPageComponent.getAllUserOrders()

    orderServiceSpy.getOrdersOfUser(userId).subscribe((result) => {
      //Assert
      expect(result).toEqual(expectedReturn); //paymenPageComponent.orders
      done();
    })

  })

  it('should change the status for given order', (done) => {
    //Arrange
    const orderId: string = '01';
    const newStatus: number = 20;
    const expectedReturn: boolean = true;

    const paymentPageComponent = new PaymentPageComponent(
      orderServiceSpy,
      userService,
      toastrService,
      activatedRoute,
      router);

    //Act

    orderServiceSpy.changeOrderStatus.and.returnValue(of(expectedReturn));
    const result = paymenPageComponent.updateOrderStatus(orderId, newStatus);

    //Assert
    expect(result).toBeTrue;
    done();
  })
});
