import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Auth, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';

import { environment } from '../../../environments/environment';
import { UserGateway } from '../../domain/models/gateways/user.gateway';
import { UserEntity } from '../../domain/models/entities/user.entity';
import { IUserLogin, IUserRegister, IUserUpdate } from '../../domain/models/interfaces/user.interfaces';
import { Router } from '@angular/router';

/**
 * Class UserApiService provides a service for managing user authentication and session management for the APP.
 * The class extends class UserGateway.
 *
 * @export
 * @class UserApiService
 * @extends {UserGateway}
 */
@Injectable({
  providedIn: 'root'
})
export class UserApiService extends UserGateway {

  private userBehaviourSubject = new BehaviorSubject<UserEntity>(this.getUserFromLocalStorage());
  public userObservable!: Observable<UserEntity>;

  constructor(
    private http: HttpClient,
    private toastrService: ToastrService,
    private auth: Auth,
    private router: Router
  ) {
    super();
    this.userObservable = this.userBehaviourSubject.asObservable();
  }

  /**
   * returns the latest value of current user
   *
   * @readonly
   * @type {UserEntity}
   * @memberof UserApiService
   */
  public get currentUser(): UserEntity {
    return this.userBehaviourSubject.value;
  }


  /**
   * Allows to update the current User data
   * handled by the userBehaviourSubject
   *
   * @param {UserEntity} user
   * @memberof UserApiService
   */
  setCurrentUser(user: UserEntity) {
    this.userBehaviourSubject.next(user);
  }

  /**
   * Allows the user to login to the APP
   *
   * @param {IUserLogin} userLogin
   * @return {*}  {Observable<UserEntity>}
   * @memberof UserApiService
   */
  userLogin(userLogin: IUserLogin): Observable<UserEntity> {
    return this.http.post<UserEntity>((`${environment.API_BASE_URL}/user/login/`), userLogin)
      .pipe(
        tap({
          next: (user) => {
            this.setUserToLocalStorage(user);
            this.userBehaviourSubject.next(user);
          },
          error: (errorResponse) => {
            this.toastrService.error(
              errorResponse.message,
              'Login Failed!')
          }
        })
      );
  }



  /**
   * Allows to update the User information stored in DB
   *
   * @param {string} userId
   * @param {IUserRegister} updatedUser
   * @return {*}  {Observable<UserEntity>}
   * @memberof UserApiService
   */
  updateUser(userId: string, updatedUser: IUserUpdate): Observable<UserEntity> {

    let actualToken = this.getUserFromLocalStorage().token;

    return this.http.patch<UserEntity>((`${environment.API_BASE_URL}/user/update/${userId}`), updatedUser)
      .pipe(
        map((res: UserEntity) => {
          const tempUser = res;
          tempUser.token = actualToken;
          this.setUserToLocalStorage(tempUser);
          return tempUser;
        })
      )
  }

updateCurrentUser(user: UserEntity): void{
  this.userBehaviourSubject.next(user);
}
  /**
   * Close the current open session of the user in the APP
   *
   * @memberof UserApiService
   */
  userLogout() {
    this.setCurrentUser(new UserEntity());
    localStorage.removeItem(environment.CART_KEY);
    localStorage.removeItem(environment.USER_KEY);

    this.router.navigateByUrl('/menu');
  }


  /**
   * Allows the new User to create an account in the APP
   * Registers and Stores the info in our own DB
   *
   * @memberof UserApiService
   */
  registerUser(newUser: IUserRegister): Observable<UserEntity> {

    return this.http.post<UserEntity>((`${environment.API_BASE_URL}/user/new/`), newUser)
      .pipe(
        tap({
          next: (user) => {
            this.setUserToLocalStorage(user);
            this.userBehaviourSubject.next(user);
          },
          error: (errorResponse) => {
             this.toastrService.error(
              errorResponse.error,
              'Register Failed!')
          }
        })
      );
  }


  /**
   * Register a new user with Firebase Authentication
   *
   * @param {string} email
   * @param {string} password
   * @return {*}  {Promise<UserCredential>}
   * @memberof UserApiService
   */
  async registerWithFirebase(email: string, password: string): Promise<UserCredential> {

    return await createUserWithEmailAndPassword(this.auth, email, password);
  }


  /**
   * Allows to login using Firebase Authentication
   *
   * @param {string} email
   * @param {string} password
   * @return {*}  {Promise<UserCredential>}
   * @memberof UserApiService
   */
  async loginWithFirebase(email: string, password: string): Promise<UserCredential> {

    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  /**
   * Stores the current User data info in the LocalStorage
   *
   * @private
   * @param {UserEntity} user
   * @memberof UserApiService
   */
  private setUserToLocalStorage(user: UserEntity) {
    localStorage.setItem(environment.USER_KEY, JSON.stringify(user));
  }

  /**
  * Recovers the User data info from LocalStorage
  *
  * @private
  * @param {UserEntity} user
  * @memberof UserApiService
  */
  private getUserFromLocalStorage(): UserEntity {

    const jsonUser = localStorage.getItem(environment.USER_KEY);

    if (jsonUser) return JSON.parse(jsonUser);
    return new UserEntity();
  }
}
