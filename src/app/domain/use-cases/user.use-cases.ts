import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { UserGateway } from "../models/gateways/user.gateway";


@Injectable({
  providedIn: 'root'
})

export class UserUseCases {

  constructor(private userGateway: UserGateway){}

  userLogin(mail: string, password: string): Observable<string>{

    return this.userGateway.userLogin(mail, password);
  }
}
