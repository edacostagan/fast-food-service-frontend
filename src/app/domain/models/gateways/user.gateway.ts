import { Observable } from "rxjs";

import { IUserLogin, IUserRegister } from "../interfaces/user.interfaces";
import { UserEntity } from "../entities/user.entity";

export abstract class UserGateway {

  abstract userLogin(userLogin: IUserLogin): Observable<UserEntity>;
  abstract registerUser(newUser: IUserRegister): Observable<UserEntity>;
  abstract updateUser(userId: string, updatedUser: IUserRegister): Observable<UserEntity>;

}
