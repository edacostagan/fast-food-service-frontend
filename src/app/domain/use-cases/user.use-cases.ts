import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { UserGateway } from "../models/gateways/user.gateway";
import { IUserLogin, IUserRegister } from "../models/interfaces/user.interfaces";
import { UserEntity } from "../models/entities/user.entity";


@Injectable({
  providedIn: 'root'
})

export class UserUseCases {

  constructor(private userGateway: UserGateway){}

  userLogin(userData: IUserLogin): Observable<UserEntity>{
    return this.userGateway.userLogin(userData);
  }

  registerUser(userData:IUserRegister): Observable<UserEntity>
  {
    return this.userGateway.registerUser(userData);
  }

  updateUser(userId: string, userData:IUserRegister): Observable<UserEntity>{
    return this.userGateway.updateUser(userId, userData);
  }


}
