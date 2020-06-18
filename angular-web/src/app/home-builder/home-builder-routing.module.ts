import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { ProductsComponent } from '../seller-builder/components/products/products.component';
import { AuthComponent } from '../auth/auth.component';
import { NoAuthGuard } from '../auth/no-auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: MainContentComponent },
      {
        path: 'manageProducts',
        component: ProductsComponent,
      },
      {
        path: 'login',
        component: AuthComponent,
        canActivate: [NoAuthGuard],
      },
      {
        path: 'register',
        component: AuthComponent,
        canActivate: [NoAuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeBuilderRoutingModule {}
