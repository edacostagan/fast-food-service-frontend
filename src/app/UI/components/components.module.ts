import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { ComponentsRoutingModule } from './components-routing.module';
import { ComponentsComponent } from './components.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MenuPageComponent } from './pages/menu-page/menu-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { DefaultButtonComponent } from './shared/default-button/default-button.component';
import { InputContainerComponent } from './shared/input/input-container/input-container.component';
import { InputValidationComponent } from './shared/input/input-validation/input-validation.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { OrderItemsListComponent } from './shared/order-items-list/order-items-list.component';
import { TextInputComponent } from './shared/text-input/text-input.component';
import { TitleComponent } from './shared/title/title.component';
import { PaymentPageComponent } from './pages/payment-page/payment-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { PendingsComponent } from './pages/pendings/pendings.component';
import { MenuOptionComponent } from './pages/menu-option/menu-option.component';
import { ProfileComponent } from './pages/profile/profile.component';


@NgModule({
  declarations: [
    ComponentsComponent,
    HeaderComponent,
    LoadingComponent,
    HomeComponent,
    TitleComponent,
    NotFoundComponent,
    InputContainerComponent,
    InputValidationComponent,
    TextInputComponent,
    DefaultButtonComponent,
    OrderItemsListComponent,
    MenuPageComponent,
    CartPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    CheckoutPageComponent,
    PaymentPageComponent,
    PendingsComponent,
    MenuOptionComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    ComponentsRoutingModule
  ],
  exports:[
    HomeComponent,
    RouterModule,
    HttpClientModule,
    LoadingComponent,
    HeaderComponent

  ]
})
export class ComponentsModule { }
