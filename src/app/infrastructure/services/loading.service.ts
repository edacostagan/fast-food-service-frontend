import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private isLoadingBehaviourSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  constructor() { }

  showLoading(){
    this.isLoadingBehaviourSubject.next(true);
  }

  hideLoading(){
    this.isLoadingBehaviourSubject.next(false);
  }

  get isLoading(){
    return this.isLoadingBehaviourSubject.asObservable();
  }
}
