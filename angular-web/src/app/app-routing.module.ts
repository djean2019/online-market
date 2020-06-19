import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home-builder/home.component";
import { MainContentComponent } from "./home-builder/components/main-content/main-content.component";
import { NoAuthGuard } from "./auth/no-auth-guard.service";
import { ProductsComponent } from "./seller-builder/components/products/products.component";
import { AuthGuard } from "./core/services/auth-guard.service";
import { CartComponent } from "./home-builder/components/cart/cart.component";
import { AuthComponent } from "./auth/auth.component";

const routes: Routes = [
    {
        path: "",
        component: HomeComponent,
        children: [
            { path: "", component: MainContentComponent },
            {
                path: "manageProducts",
                component: ProductsComponent,
                canActivate: [AuthGuard],
            },
            {
                path: "manageCart",
                component: CartComponent,
                canActivate: [AuthGuard],
            },
            {
                path: "login",
                component: AuthComponent,
                canActivate: [NoAuthGuard],
            },
            {
                path: "register",
                component: AuthComponent,
                canActivate: [NoAuthGuard],
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
