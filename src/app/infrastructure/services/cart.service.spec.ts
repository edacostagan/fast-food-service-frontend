import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { BehaviorSubject } from 'rxjs';
import { CartEntity } from '../../../app/domain/models/entities/cart.entity';
import { CartItemEntity } from 'src/app/domain/models/entities/cart-item.entity';
import { MenuEntity } from 'src/app/domain/models/entities/menu.entity';


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
  describe('RemoveFromCart', () => {
    it('should remove item from cart', () => {
      // arrange
      const itemId = '001';
      const mockCart: CartEntity = {
        items: [
          {
            menu: {
              _id: '001',
              menuName: 'mock',
              menuDescription: 'mock',
              menuPrice: 100,
              menuImageUrl: 'mock'
            },
            quantity: 1,
            price: 100
          }, {
            menu: {
              _id: '002',
              menuName: 'mock',
              menuDescription: 'mock',
              menuPrice: 100,
              menuImageUrl: 'mock'
            },
            quantity: 1,
            price: 100
          }

        ],
        totalPrice: 0,
        itemsCount: 0
      }
      const expectedCart: CartEntity = {
        items: [
          {
            menu: {
              _id: '002',
              menuName: 'mock',
              menuDescription: 'mock',
              menuPrice: 100,
              menuImageUrl: 'mock'
            },
            quantity: 1,
            price: 100
          }

        ],
        totalPrice: 0,
        itemsCount: 0
      }
      cartService.cart = mockCart;

      // act
      cartService.removeFromCart(itemId);

      // assert
      expect(cartService.cart).toEqual(expectedCart);
    });

    it('should update local storage', () => {
      // arrange
      spyOn(localStorage, 'setItem');

      // act
      cartService.removeFromCart('001');

      // assert
      expect(localStorage.setItem).toHaveBeenCalled();
    });
  });

});
