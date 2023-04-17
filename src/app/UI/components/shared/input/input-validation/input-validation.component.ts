import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';


const VALIDATORS_MESSAGE: any = {
  required: 'Should not be Empty!',
  email:'Email not Valid!',
  notMatch: 'Passwords do not match!',
  minlength: 'Too short!',
  maxlength: 'Too long!',

}


@Component({
  selector: 'input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.css']
})
export class InputValidationComponent implements OnInit, OnChanges {
  @Input()
  control!: AbstractControl;

  @Input()
  showErrorsWhen:boolean = true;

  errorMessages: string[] = [];

  ngOnInit(): void {
    this.control.statusChanges.subscribe(() => this.checkValidation());
    this.control.valueChanges.subscribe(() => this.checkValidation());
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.checkValidation()
  }

  checkValidation(){
    const errors = this.control.errors;
    if(!errors){
      this.errorMessages = [];
      return;
    }

    const errorKeys = Object.keys(errors);

    this.errorMessages = errorKeys.map(key => VALIDATORS_MESSAGE[key])
  }
}
