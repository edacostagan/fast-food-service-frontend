import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementComponent } from './management.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ManagementRoutingModule } from './management-routing.module';
import { MenuOptionComponent } from '../menu-option/menu-option.component';
import { PendingsComponent } from '../pendings/pendings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ManagementComponent,
    //MenuOptionComponent,
    //PendingsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    ManagementRoutingModule
  ],
  exports:[
    /* PendingsComponent,
    MenuOptionComponent,
    RouterModule,
    HttpClientModule */


  ]
})
export class ManagementModule { }
