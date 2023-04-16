import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuGateway } from './domain/models/gateways/menu.gateway';
import { MenuApiService } from './infrastructure/services/menu.service';
import { OrderGateway } from './domain/models/gateways/order.gateway';
import { UserGateway } from './domain/models/gateways/user.gateway';
import { UserApiService } from './infrastructure/services/user.service';
import { OrderApiService } from './infrastructure/services/order.service';
import { AuthInterceptor } from './infrastructure/interceptors/auth.interceptor';
import { LoadingInterceptor } from './infrastructure/interceptors/loading.interceptor';
import { ComponentsModule } from './UI/components/components.module';
import { ManagementModule } from './UI/components/pages/management/management.module';




@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ComponentsModule,
    ManagementModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      newestOnTop: false
    }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),

  ],
  providers: [
    { provide: MenuGateway, useClass: MenuApiService },
    { provide: UserGateway, useClass: UserApiService },
    { provide: OrderGateway, useClass: OrderApiService },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
