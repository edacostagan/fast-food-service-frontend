import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


import { environment } from '../../../environments/environment';
import { MenuEntity } from '../../domain/models/entities/menu.entity';
import { MenuGateway } from '../../../app/domain/models/gateways/menu.gateway';
import { IMenuRegister } from '../../../app/domain/models/interfaces/menu.interfaces';



/**
 * Handles all the http interactions between the front and the API
 * and gives all the functionalities needed for the Menu Entity
 *
 * @export
 * @class MenuApiService
 * @extends {MenuGateway}
 */
@Injectable({
  providedIn: 'root'
})
export class MenuApiService extends MenuGateway {
  /**
   * Creates an instance of MenuApiService.
   * @param {HttpClient} http
   * @memberof MenuApiService
   */
  constructor(
    private readonly http: HttpClient,
  ){
    super();
  }
  /**
   * retrieves all the menu options available in DB
   *
   * @return {*}  {Observable<MenuEntity[]>}
   * @memberof MenuApiService
   */
  getAllMenus() : Observable<MenuEntity[]> {

    return this.http.get<MenuEntity[]>(`${environment.API_BASE_URL}/menu/`);

  }
  /**
   * retrieves the menu information for the given menuId
   *
   * @param {string} menuId
   * @return {*}  {Observable<MenuEntity>}
   * @memberof MenuApiService
   */
  getMenuById(menuId: string): Observable<MenuEntity> {
    return this.http.get<MenuEntity>(`${environment.API_BASE_URL}/menu/${menuId}`);
  }
  /**
   * Adds a new Menu option
   *
   * @param {IMenuRegister} newMenu
   * @return {*}  {Observable<MenuEntity>}
   * @memberof MenuApiService
   */
  addNewMenuOption(newMenu: IMenuRegister): Observable<MenuEntity> {
    return this.http.post<MenuEntity>(`${environment.API_BASE_URL}/menu/new/`,newMenu);
  }


}


