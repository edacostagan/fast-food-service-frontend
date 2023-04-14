import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';


import { MenuEntity } from '../../../../domain/models/entities/menu.entity';
import { MenuApiService } from '../../../../infrastructure/services/menu.service';
import { CartService } from '../../../../infrastructure/services/cart.service';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.css']
})
export class MenuPageComponent implements OnInit {

  menu!: MenuEntity;

  constructor(
    activatedRoute: ActivatedRoute,
    private readonly menuService: MenuApiService,
    private readonly orderService: CartService,
    private readonly router: Router,
  ){
    activatedRoute.params.subscribe((params) =>{
      if(params['id']) {
        menuService.getMenuById(params['id']).subscribe(menuItem => this.menu = menuItem);
    }
    })
  };

  ngOnInit(): void {

  }

  addToOrder(){
    this.orderService.addToCart(this.menu);
    this.router.navigateByUrl('/cart');
  }

}
