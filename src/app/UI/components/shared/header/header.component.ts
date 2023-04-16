import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../../infrastructure/services/cart.service';
import { UserEntity } from '../../../../domain/models/entities/user.entity';
import { UserApiService } from '../../../../infrastructure/services/user.service';

/**
 * Controls the behaviour and functionalities of the header component
 * allows to navigate throught the site and shows the differents areas to
 * the user
 * Also has Administrative area
 *
 * @export
 * @class HeaderComponent
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  orderCount: number = 0;
  user!: UserEntity;

  constructor(
    private readonly orderService: CartService,
    private readonly userService: UserApiService  ) {  }


  ngOnInit(): void {
    this.orderService.getCartObservable().subscribe((newOrder) => this.orderCount = newOrder.itemsCount)

    this.userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    })
  }

  /**
   * calls the logout process for the current user
   *
   * @memberof HeaderComponent
   */
  logout() {
    this.userService.userLogout();
  }

  /**
   * returns if the user is an Administrator
   *
   * @readonly
   * @memberof HeaderComponent
   */
  get isAdmin() {

    return this.user.userIsAdmin;
  }

  /**
   * Returns the token associated with the current user
   * the token controls the type of access that the user has
   *
   * @readonly
   * @memberof HeaderComponent
   */
  get isAuth() {
    return this.user.token;
  }
}
