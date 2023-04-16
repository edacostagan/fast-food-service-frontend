import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Handles the transitions between pages
 * shows a Loading page when there is waiting time
 *
 * @export
 * @class LoadingService
 */
@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private isLoadingBehaviourSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /**
   * Shows the loading screen
   *
   * @memberof LoadingService
   */
  showLoading(){
    this.isLoadingBehaviourSubject.next(true);
  }
  /**
   * Hides the loading screen
   *
   * @memberof LoadingService
   */
  hideLoading(){
    this.isLoadingBehaviourSubject.next(false);
  }

  /**
   * getter that return the current loading status
   *
   * @readonly
   * @memberof LoadingService
   */
  get isLoading(){
    return this.isLoadingBehaviourSubject.asObservable();
  }
}
