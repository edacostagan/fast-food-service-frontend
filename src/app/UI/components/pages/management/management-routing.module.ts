import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PendingsComponent } from '../pendings/pendings.component';
import { MenuOptionComponent } from '../menu-option/menu-option.component';
import { AdminGuard } from 'src/app/infrastructure/guards/admin.guard';
import { ManagementComponent } from './management.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'management' },
  { path: 'management', component: ManagementComponent, canActivate: [AdminGuard] },
  { path: 'pendings', component: PendingsComponent, canActivate: [AdminGuard] },
  { path: 'newMenu', component: MenuOptionComponent, canActivate: [AdminGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
