import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


import { environment } from '../../../environments/environment';
import { MenuEntity } from '../../domain/models/entities/menu.entity';
import { MenuGateway } from '../../../app/domain/models/gateways/menu.gateway';



@Injectable({
  providedIn: 'root'
})
export class MenuApiService extends MenuGateway {

  constructor(
    private readonly http: HttpClient,
  ){
    super();
  }


  getAllMenus() : Observable<MenuEntity[]> {

    return this.http.get<MenuEntity[]>(`${environment.API_BASE_URL}/menu/`);

  }

  getMenuById(menuId: string): Observable<MenuEntity> {

    return this.http.get<MenuEntity>(`${environment.API_BASE_URL}/menu/${menuId}`);

  }



}


