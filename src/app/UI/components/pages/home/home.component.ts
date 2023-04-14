import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';


import { MenuEntity } from '../../../../domain/models/entities/menu.entity';
import { MenuApiService } from '../../../../infrastructure/services/menu.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  menus: MenuEntity[] = [];

  constructor(
    private readonly menuService:MenuApiService,
    activatedRoute: ActivatedRoute,
  ){
    let menuObservable: Observable<MenuEntity[]>;
    menuObservable = menuService.getAllMenus();

    menuObservable.subscribe((menuItems) => this.menus = menuItems);

  }

  ngOnInit(): void {  }
}
