import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsComponent } from './components.component';
import { AuthGuard } from 'src/app/infrastructure/guards/auth.guard';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { PaymentPageComponent } from './pages/payment-page/payment-page.component';

const routes: Routes = [
  { path: '', component: ComponentsComponent },
  { path: 'cart', component: CartPageComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'checkout', component: CheckoutPageComponent, canActivate: [AuthGuard] },
  { path: 'payment', component: PaymentPageComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
