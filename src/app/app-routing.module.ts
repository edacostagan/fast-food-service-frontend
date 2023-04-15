import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './UI/components/pages/home/home.component';
import { MenuPageComponent } from './UI/components/pages/menu-page/menu-page.component';

const routes: Routes = [

  { path: 'components', loadChildren: () => import('./UI/components/components.module').then(m => m.ComponentsModule) },
  { path: 'management', loadChildren: () => import('./UI/components/pages/management/management.module').then(m => m.ManagementModule) },
  { path: 'menu', component: HomeComponent },
  { path: 'menu/:id', component: MenuPageComponent },
  { path: '', pathMatch: 'full', redirectTo: 'menu' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

