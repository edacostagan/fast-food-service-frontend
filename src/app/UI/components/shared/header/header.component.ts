import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../../infrastructure/services/cart.service';
import { UserEntity } from '../../../../domain/models/entities/user.entity';
import { UserApiService } from '../../../../infrastructure/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  orderCount: number = 0;
  user! :UserEntity;

  constructor(
    private readonly orderService: CartService,
    private readonly userService: UserApiService,
  ) {
    orderService.getCartObservable().subscribe((newOrder) => this.orderCount = newOrder.itemsCount)

    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;

    })

  }
  ngOnInit(): void { }


  logout(){
    this.userService.userLogout();
  }

  get isAuth(){
    return this.user.token;
  }
}
