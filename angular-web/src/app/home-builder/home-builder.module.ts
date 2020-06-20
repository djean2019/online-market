import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HomeComponent } from "./home.component";
import { MainContentComponent } from "./components/main-content/main-content.component";
import { HomeBuilderRoutingModule } from "./home-builder-routing.module";
import { SideNavComponent } from "./components/side-nav/side-nav.component";
import { ToolBarComponent } from "./components/tool-bar/tool-bar.component";
import { MaterialModule } from "../material/material.module";
import { FooterComponent } from "../material/layout";
import { SellerBuilderModule } from "../seller-builder/seller-builder.module";
import { AuthModule } from "../auth/auth.module";
import { SharedModule } from "../material/shared";
import { CoreModule } from "../core";
import { CartComponent } from "./components/cart/cart.component";
import { AuthGuard } from "../core/services/auth-guard.service";
import { NoAuthGuard } from "../auth/no-auth-guard.service";
import { AdminComponent } from "./components/admin/admin.component";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { BuyerBuilderModule } from "../buyer-builder/buyer-builder.module";

@NgModule({
    declarations: [
        HomeComponent,
        MainContentComponent,
        SideNavComponent,
        ToolBarComponent,
        FooterComponent,
        CartComponent,
        AdminComponent,
    ],
    imports: [
        CommonModule,
        HomeBuilderRoutingModule,
        MaterialModule,
        SellerBuilderModule,
        BuyerBuilderModule,
        AuthModule,
        SharedModule,
        CoreModule,
        MatSlideToggleModule,
    ],
    providers: [AuthGuard, NoAuthGuard],
})
export class HomeBuilderModule {}
