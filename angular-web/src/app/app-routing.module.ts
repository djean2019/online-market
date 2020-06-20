import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home-builder/home.component";
import { MainContentComponent } from "./home-builder/components/main-content/main-content.component";
import { NoAuthGuard } from "./auth/no-auth-guard.service";
import { ProductsComponent } from "./seller-builder/components/products/products.component";
import { AuthGuard } from "./core/services/auth-guard.service";
import { CartComponent } from "./home-builder/components/cart/cart.component";
// import { OrderComponent } from "./home-builder/components/order-d/order-d.component";
import { AuthComponent } from "./auth/auth.component";
import { AddProductComponent } from "./seller-builder/components/products/add-product.component";
import { AdminComponent } from "./home-builder/components/admin/admin.component";

const routes: Routes = [
    {
        path: "",
        component: HomeComponent,
        children: [
            { path: "", component: MainContentComponent },
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
            {
                path: "manageCart",
                component: CartComponent,
                canActivate: [AuthGuard],
            },
            // {
            //     path: "manageOrder",
            //     component: OrderComponent,
            //     canActivate: [AuthGuard],
            // },
            {
                path: "AddProduct",
                component: AddProductComponent,
                canActivate: [AuthGuard],
            },
            {
                path: "EditProduct",
                component: AddProductComponent,
                canActivate: [AuthGuard],
            },
            {
                path: "manageProducts",
                component: ProductsComponent,
                canActivate: [AuthGuard],
            },
            {
                path: "manageSellers",
                component: AdminComponent,
                canActivate: [AuthGuard],
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
