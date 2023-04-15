import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutPageComponent } from './checkout-page.component';
import { AppModule } from 'src/app/app.module';
import { CartItemEntity } from 'src/app/domain/models/entities/cart-item.entity';
import { IOrderItem } from 'src/app/domain/models/interfaces/order.Interfaces';

describe('CheckoutPageComponent', () => {
  let component: CheckoutPageComponent;
  let fixture: ComponentFixture<CheckoutPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckoutPageComponent],
      imports: [AppModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CheckoutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return form invalid when any field is empty', () => {

    const userFullname = component.checkoutForm.controls['userFullname'];
    const userAddress = component.checkoutForm.controls['userAddress'];

    userFullname.setValue('');
    userAddress.setValue('');

    expect(component.checkoutForm.invalid).toBeTrue();

  });

  it('should return an IOrderItem[] when given CartItemEntity[]', () => {

    //Arrange
    const items: CartItemEntity[] = [{
      menu: {
        _id: '001',
        menuName: "mockName",
        menuDescription: "mockDescription",
        menuPrice: 100,
        menuImageUrl: 'n/a'
      },
      quantity: 10,
      price: 100
    }, {
      menu: {
        _id: '002',
        menuName: "mockName",
        menuDescription: "mockDescription",
        menuPrice: 100,
        menuImageUrl: 'n/a'
      },
      quantity: 10,
      price: 100
    }];

    const expectedResult: IOrderItem[] = [
      {
        menuId: '001',
        price: 100,
        quantity: 10
      }, {
        menuId: '002',
        price: 100,
        quantity: 10
      }];

    //Act

      const result = component.getOrderDetail(items);

    //Assert
    expect(result).toEqual(expectedResult);

  });

});
