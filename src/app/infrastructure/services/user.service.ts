import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Auth, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';

import { environment } from '../../../environments/environment';
import { UserGateway } from '../../domain/models/gateways/user.gateway';
import { UserEntity } from '../../domain/models/entities/user.entity';
import { IUserLogin, IUserRegister } from '../../domain/models/interfaces/user.interfaces';




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
    private readonly http: HttpClient,
    private toastrService: ToastrService,
    private readonly auth: Auth,
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
   * Allows the user to login to the APP
   *
   * @param {IUserLogin} userLogin
   * @return {*}  {Observable<UserEntity>}
   * @memberof UserApiService
   */
  override userLogin(userLogin: IUserLogin): Observable<UserEntity> {
    return this.http.post<UserEntity>((`${environment.API_BASE_URL}/user/login/`), userLogin)
      .pipe(
        tap({
          next: (user) => {
            this.setUserToLocalStorage(user);
            this.userBehaviourSubject.next(user);
            this.toastrService.success(
              `Welcome to Fast Food Service ${user.userFullname}!`,
              'Login Successful')
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
   * Close the current open session of the user in the APP
   *
   * @memberof UserApiService
   */
  userLogout() {
    this.userBehaviourSubject.next(new UserEntity());
    localStorage.removeItem(environment.CART_KEY);
    localStorage.removeItem(environment.USER_KEY);
    window.location.reload();
  }


  /**
   * Allows the new User to create an account in the APP
   * Registers and Stores the info in our own DB
   *
   * @memberof UserApiService
   */
  override registerUser(newUser: IUserRegister): Observable<UserEntity> {

    return this.http.post<UserEntity>((`${environment.API_BASE_URL}/user/new/`), newUser)
    .pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userBehaviourSubject.next(user);
          this.toastrService.success(
            `Welcome to Fast Food Service ${user.userFullname}!`,
            'Register Successful')
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
  async loginWithFirebase(email: string, password: string): Promise<UserCredential>{

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