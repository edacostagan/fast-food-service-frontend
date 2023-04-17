import { MenuEntity } from './menu.entity';
import { CartItemEntity } from './cart-item.entity';

describe('CartItemEntity', () => {
  let menu: MenuEntity;
  let cartItem: CartItemEntity;

  beforeEach(() => {
    menu = new MenuEntity();
    menu.menuPrice = 10;
    cartItem = new CartItemEntity(menu);
  });

  it('should create a new cart item instance', () => {
    expect(cartItem).toBeTruthy();
  });

  it('should have a default quantity of 1', () => {
    expect(cartItem.quantity).toBe(1);
  });

  it('should have a price equal to the menu item price', () => {
    expect(cartItem.price).toBe(10);
  });
});
