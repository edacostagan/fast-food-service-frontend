import { Injectable } from "@angular/core";
import { MenuGateway } from '../models/gateways/menu.gateway';
import { Observable } from "rxjs";
import { MenuEntity } from "../models/entities/menu.entity";

@Injectable({
  providedIn: 'root'
})

export class MenuUseCases {

  constructor(private menuGateway: MenuGateway){}


  getAllMenus(): Observable<MenuEntity[]>{

    return this.menuGateway.getAllMenus();
  }


  getMenuById(menuId: string): Observable<MenuEntity>{

    return this.menuGateway.getMenuById(menuId);
  }
}
