import { Observable } from "rxjs";
import { MenuEntity } from "../entities/menu.entity";

export abstract class MenuGateway {

  abstract getAllMenus(): Observable<MenuEntity[]>;
  abstract getMenuById(menuId: string): Observable<MenuEntity>;
}
