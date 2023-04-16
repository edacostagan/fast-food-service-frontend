import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { BehaviorSubject } from 'rxjs';
import { CartEntity } from '../../../app/domain/models/entities/cart.entity';


describe('CartService', () => {
  let cartService: CartService;
  let localStorageMock: {
    getItem: jasmine.Spy,
    setItem: jasmine.Spy,
  };

  //Arrange
  const mockCart: CartEntity = {
    items: [{
      menu: {
        _id: '01',
        menuName: 'mock',
        menuDescription: 'mock',
        menuPrice: 100,
        menuImageUrl: 'mock'
      },
      quantity: 1,
      price: 100
    }],
    totalPrice: 100,
    itemsCount: 1
  }

  let cartBehaviourSubjectMock: BehaviorSubject<any>;

  beforeEach(() => {

    localStorageMock = {
      setItem: jasmine.createSpy('setItem'),
      getItem: jasmine.createSpy('getItem')
    }
    cartService = new CartService();

    cartService = TestBed.inject(CartService);
  });


  it('should be created', () => {
    expect(cartService).toBeTruthy();
  });


  it('should set Cart data and recover it correctly ', () => {


    cartService.cart = mockCart;

    //Act
    cartService.setCartToLocalStorage();

    const storedCart = cartService.getCart()
    //Assert

    expect(storedCart).toEqual(mockCart);

  });

  it('should set Cart as empty', () => {

    //Act
    cartService.clearCart();

    const storedCart = cartService.getCart()
    //Assert

    expect(storedCart).toEqual(new CartEntity());

  });
});



