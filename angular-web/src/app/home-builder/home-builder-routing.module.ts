import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home.component";
import { MainContentComponent } from "./components/main-content/main-content.component";
import { ProductsComponent } from "../seller-builder/components/products/products.component";
import { AuthComponent } from "../auth/auth.component";
import { NoAuthGuard } from "../auth/no-auth-guard.service";
import { CartComponent } from "./components/cart/cart.component";
import { AuthGuard } from "../core/services/auth-guard.service";

const routes: Routes = [];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HomeBuilderRoutingModule {}
